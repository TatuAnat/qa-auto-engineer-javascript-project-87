import path from 'node:path'
import { fileURLToPath } from 'node:url'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename)

describe('genDiff ', () => {
  test('no differences', () => {
    const file1 = getFixturePath('file1.json')
    const file2 = getFixturePath('file2.json')

    const expected = `{
    follow: false
    host: hexlet.io
    proxy: 123.234.53.22
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
  - proxy: 123.234.53.22
  + proxy: null
  - timeout: 50
  + timeout: 20
}`

    expect(genDiff(file1, file2)).toBe(expected)
  })
})
