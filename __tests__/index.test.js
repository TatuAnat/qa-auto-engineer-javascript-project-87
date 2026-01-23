import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'
import genDiff from '../src/index.js'
import getData from '../src/getData.js'
import parse from '../src/parsers/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

const readExpected = filename => readFileSync(getFixturePath(filename), 'utf-8').trim()

describe('genDiff', () => {
  describe('JSON input', () => {
    const filepath1 = getFixturePath('file1.json')
    const filepath2 = getFixturePath('file2.json')
    const stylishExpected = readExpected('stylish.txt')
    const plainExpected = readExpected('plain.txt')
    const jsonExpected = JSON.parse(readExpected('json.txt'))

    test('default format (stylish)', () => {
      expect(genDiff(filepath1, filepath2)).toBe(stylishExpected)
    })

    test('stylish format', () => {
      expect(genDiff(filepath1, filepath2, 'stylish')).toBe(stylishExpected)
    })

    test('plain format', () => {
      expect(genDiff(filepath1, filepath2, 'plain')).toBe(plainExpected)
    })

    test('json format', () => {
      expect(JSON.parse(genDiff(filepath1, filepath2, 'json'))).toEqual(jsonExpected)
    })
  })

  describe('YML input', () => {
    const filepath1 = getFixturePath('file1.yml')
    const filepath2 = getFixturePath('file2.yml')
    const stylishExpected = readExpected('expected_yaml_stylish.txt')
    const plainExpected = readExpected('expected_yaml_plain.txt')
    const jsonExpected = JSON.parse(readExpected('expected_yaml_json.txt'))

    test('default format (stylish)', () => {
      expect(genDiff(filepath1, filepath2)).toBe(stylishExpected)
    })

    test('stylish format', () => {
      expect(genDiff(filepath1, filepath2, 'stylish')).toBe(stylishExpected)
    })

    test('plain format', () => {
      expect(genDiff(filepath1, filepath2, 'plain')).toBe(plainExpected)
    })

    test('json format', () => {
      expect(JSON.parse(genDiff(filepath1, filepath2, 'json'))).toEqual(jsonExpected)
    })
  })
})

describe('getData', () => {
  test('throws error for invalid JSON', () => {
    expect(() => getData(getFixturePath('invalid.json'))).toThrow('Failed to parse JSON file')
  })

  test('throws error for invalid YAML', () => {
    expect(() => getData(getFixturePath('invalid.yml'))).toThrow('Failed to parse YAML file')
  })

  test('throws error for unsupported file type', () => {
    expect(() => getData(getFixturePath('stylish.txt'))).toThrow('Unsupported file type: .txt')
  })

  test('handles relative paths', () => {
    const result = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')
    expect(result).toBeDefined()
  })
})

describe('format', () => {
  test('throws error for unknown format', () => {
    expect(() => genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'unknown')).toThrow('Unknown format: unknown')
  })

  test('handles null values', () => {
    const filepath1 = getFixturePath('with_null1.json')
    const filepath2 = getFixturePath('with_null2.json')
    const result = genDiff(filepath1, filepath2, 'stylish')
    expect(result).toContain('null')
    const plainResult = genDiff(filepath1, filepath2, 'plain')
    expect(plainResult).toContain('null')
  })
})

describe('parse', () => {
  test('throws error for unsupported format', () => {
    expect(() => parse('{}', 'xml')).toThrow('Unsupported format: xml')
  })
})
