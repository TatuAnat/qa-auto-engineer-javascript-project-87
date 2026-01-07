import path from 'node:path'
import { fileURLToPath } from 'node:url'
import genDiff from '../src/index.js'
import parseFile from '../src/parseFile.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename =>
  path.join(__dirname, '..', '__fixtures__', filename)

describe('genDiff ', () => {
  test('no differences', () => {
    const file1 = getFixturePath('file1.json')
    const file2 = getFixturePath('file2.json')

    const expected = `{
    follow: false
    host: hexlet.io
    proxy: a.b.c.d
    timeout: 50
}`

    expect(genDiff(file1, file2)).toBe(expected)
  })

  test('added key', () => {
    const file1 = getFixturePath('removed.json')
    const file2 = getFixturePath('added.json')

    const expected = `{
    timeout: 50
  + verbose: true
}`

    expect(genDiff(file1, file2)).toBe(expected)
  })

  test('removed key', () => {
    const file1 = getFixturePath('added.json')
    const file2 = getFixturePath('removed.json')

    const expected = `{
    timeout: 50
  - verbose: true
}`

    expect(genDiff(file1, file2)).toBe(expected)
  })

  test('changed values', () => {
    const file1 = getFixturePath('file1.json')
    const file2 = getFixturePath('changed.json')

    const expected = `{
  - follow: false
  - host: hexlet.io
  - proxy: a.b.c.d
  + proxy: null
  - timeout: 50
  + timeout: 20
}`

    expect(genDiff(file1, file2)).toBe(expected)
  })

  test('compare flat yaml files', () => {
    const file1 = getFixturePath('file1.yml')
    const file2 = getFixturePath('file2.yml')

    const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: a.b.c.d
  - timeout: 50
  + timeout: 20
  + verbose: true
}`

    expect(genDiff(file1, file2)).toBe(expected)
  })
})

describe('parseFile', () => {
  test('throws error for invalid JSON', () => {
    const invalidJsonPath = getFixturePath('invalid.json')
    expect(() => parseFile(invalidJsonPath)).toThrow('Failed to parse JSON file')
  })

  test('throws error for invalid YAML', () => {
    const invalidYamlPath = getFixturePath('invalid.yml')
    expect(() => parseFile(invalidYamlPath)).toThrow('Failed to parse YAML file')
  })
})

describe('genDiff plain format', () => {
  test('plain format with json files', () => {
    const file1 = getFixturePath('file1.json')
    const file2 = getFixturePath('changed.json')

    const expected = [
      'Property \'follow\' was removed',
      'Property \'host\' was removed',
      'Property \'proxy\' was updated. From \'a.b.c.d\' to null',
      'Property \'timeout\' was updated. From 50 to 20',
    ].join('\n')

    expect(genDiff(file1, file2, 'plain')).toBe(expected)
  })

  test('plain format with added key', () => {
    const file1 = getFixturePath('removed.json')
    const file2 = getFixturePath('added.json')

    const expected = 'Property \'verbose\' was added with value: true'

    expect(genDiff(file1, file2, 'plain')).toBe(expected)
  })

  test('plain format with removed key', () => {
    const file1 = getFixturePath('added.json')
    const file2 = getFixturePath('removed.json')

    const expected = 'Property \'verbose\' was removed'

    expect(genDiff(file1, file2, 'plain')).toBe(expected)
  })

  test('plain format with yaml files', () => {
    const file1 = getFixturePath('file1.yml')
    const file2 = getFixturePath('file2.yml')

    const expected = [
      'Property \'follow\' was removed',
      'Property \'proxy\' was removed',
      'Property \'timeout\' was updated. From 50 to 20',
      'Property \'verbose\' was added with value: true',
    ].join('\n')

    expect(genDiff(file1, file2, 'plain')).toBe(expected)
  })
})

describe('genDiff JSON format', () => {
  test('json format with json files', () => {
    const file1 = getFixturePath('file1.json')
    const file2 = getFixturePath('changed.json')

    const expected = {
      follow: { status: 'removed', value: false },
      host: { status: 'removed', value: 'hexlet.io' },
      proxy: { status: 'updated', oldValue: 'a.b.c.d', newValue: null },
      timeout: { status: 'updated', oldValue: 50, newValue: 20 },
    }

    expect(JSON.parse(genDiff(file1, file2, 'json'))).toEqual(expected)
  })

  test('json format with added key', () => {
    const file1 = getFixturePath('removed.json')
    const file2 = getFixturePath('added.json')

    const expected = {
      timeout: { status: 'unchanged', value: 50 },
      verbose: { status: 'added', value: true },
    }

    expect(JSON.parse(genDiff(file1, file2, 'json'))).toEqual(expected)
  })

  test('json format with removed key', () => {
    const file1 = getFixturePath('added.json')
    const file2 = getFixturePath('removed.json')

    const expected = {
      timeout: { status: 'unchanged', value: 50 },
      verbose: { status: 'removed', value: true },
    }

    expect(JSON.parse(genDiff(file1, file2, 'json'))).toEqual(expected)
  })

  test('json format with yaml files', () => {
    const file1 = getFixturePath('file1.yml')
    const file2 = getFixturePath('file2.yml')

    const expected = {
      follow: { status: 'removed', value: false },
      host: { status: 'unchanged', value: 'hexlet.io' },
      proxy: { status: 'removed', value: 'a.b.c.d' },
      timeout: { status: 'updated', oldValue: 50, newValue: 20 },
      verbose: { status: 'added', value: true },
    }

    expect(JSON.parse(genDiff(file1, file2, 'json'))).toEqual(expected)
  })
})
