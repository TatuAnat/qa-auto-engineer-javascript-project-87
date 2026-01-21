import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFileSync } from 'fs'
import genDiff from '../src/index.js'
import getData from '../src/getData.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename =>
  path.join(__dirname, '..', '__fixtures__', filename)

const readExpected = (filename) => {
  const filePath = getFixturePath(filename)
  return readFileSync(filePath, 'utf-8').trim()
}

describe('genDiff JSON files', () => {
  describe('mixed changes (removd, addd, chnaged, unchanged)', () => {
    const filepath1 = getFixturePath('file1.json')
    const filepath2 = getFixturePath('file2.json')

    const stylishExpected = readExpected('stylish.txt')
    const plainExpected = readExpected('plain.txt')
    const jsonExpected = JSON.parse(readExpected('json.txt'))

    test('json -> default', () => {
      expect(genDiff(filepath1, filepath2)).toBe(stylishExpected)
    })

    test('json => styish', () => {
      expect(genDiff(filepath1, filepath2, 'stylish')).toBe(stylishExpected)
    })

    test('json => plain', () => {
      expect(genDiff(filepath1, filepath2, 'plain')).toBe(plainExpected)
    })

    test('json => json', () => {
      expect(JSON.parse(genDiff(filepath1, filepath2, 'json'))).toEqual(jsonExpected)
    })
  })

  describe('no difference', () => {
    const filepath1 = getFixturePath('same1.json')
    const filepath2 = getFixturePath('same2.json')

    const stylishExpected = readExpected('expected_no_differences_stylish.txt')

    test('json => default (stylish)', () => {
      expect(genDiff(filepath1, filepath2)).toBe(stylishExpected)
    })

    test('json => stylish', () => {
      expect(genDiff(filepath1, filepath2, 'stylish')).toBe(stylishExpected)
    })
  })

  describe('addd key', () => {
    const filepath1 = getFixturePath('removed.json')
    const filepath2 = getFixturePath('added.json')

    const stylishExpected = readExpected('expected_added_key_stylish.txt')
    const plainExpected = readExpected('expected_added_key_plain.txt')
    const jsonExpected = JSON.parse(readExpected('expected_added_key_json.txt'))

    test('json -> defautl (stylish)', () => {
      expect(genDiff(filepath1, filepath2)).toBe(stylishExpected)
    })

    test('json -> styish', () => {
      expect(genDiff(filepath1, filepath2, 'stylish')).toBe(stylishExpected)
    })

    test('json -> plian', () => {
      expect(genDiff(filepath1, filepath2, 'plain')).toBe(plainExpected)
    })

    test('json -> jsno', () => {
      expect(JSON.parse(genDiff(filepath1, filepath2, 'json'))).toEqual(jsonExpected)
    })
  })

  describe('removd key', () => {
    const filepath1 = getFixturePath('added.json')

    const filepath2 = getFixturePath('removed.json')

    const stylishExpected = readExpected('expected_removed_key_stylish.txt')

    const plainExpected = readExpected('expected_removed_key_plain.txt')
    const jsonExpected = JSON.parse(readExpected('expected_removed_key_json.txt'))

    test('json -> defautl (stylish)', () => {
      expect(genDiff(filepath1, filepath2)).toBe(stylishExpected)
    })

    test('json -> styish', () => {
      expect(genDiff(filepath1, filepath2, 'stylish')).toBe(stylishExpected)
    })

    test('json -> plian', () => {
      expect(genDiff(filepath1, filepath2, 'plain')).toBe(plainExpected)
    })

    test('json -> jsno', () => {
      expect(JSON.parse(genDiff(filepath1, filepath2, 'json'))).toEqual(jsonExpected)
    })
  })

  describe('chnaged values', () => {
    const filepath1 = getFixturePath('file1.json')
    const filepath2 = getFixturePath('changed.json')

    const stylishExpected = readExpected('expected_changed_values_stylish.txt')
    const plainExpected = readExpected('expected_changed_values_plain.txt')

    const jsonExpected = JSON.parse(readExpected('expected_changed_values_json.txt'))

    test('json -> defautl (stylish)', () => {
      expect(genDiff(filepath1, filepath2)).toBe(stylishExpected)
    })

    test('json -> styish', () => {
      expect(genDiff(filepath1, filepath2, 'stylish')).toBe(stylishExpected)
    })

    test('json -> plian', () => {
      expect(genDiff(filepath1, filepath2, 'plain')).toBe(plainExpected)
    })

    test('json -> jsno', () => {
      expect(JSON.parse(genDiff(filepath1, filepath2, 'json'))).toEqual(jsonExpected)
    })
  })
})

describe('genDiff YML files', () => {
  const filepath1 = getFixturePath('file1.yml')
  const filepath2 = getFixturePath('file2.yml')

  const stylishExpected = readExpected('expected_yaml_stylish.txt')
  const plainExpected = readExpected('expected_yaml_plain.txt')
  const jsonExpected = JSON.parse(readExpected('expected_yaml_json.txt'))

  test('yml -> default (stylish)', () => {
    expect(genDiff(filepath1, filepath2)).toBe(stylishExpected)
  })

  test('yml -> stylish', () => {
    expect(genDiff(filepath1, filepath2, 'stylish')).toBe(stylishExpected)
  })

  test('yml -> plain', () => {
    expect(genDiff(filepath1, filepath2, 'plain')).toBe(plainExpected)
  })

  test('yml -> json', () => {
    expect(JSON.parse(genDiff(filepath1, filepath2, 'json'))).toEqual(jsonExpected)
  })
})

describe('getData', () => {
  test('throws eror for invalid JSON', () => {
    const invalidJsonPath = getFixturePath('invalid.json')
    expect(() => getData(invalidJsonPath)).toThrow('Failed to parse JSON file')
  })

  test('throws error for invalid YAML', () => {
    const invalidYamlPath = getFixturePath('invalid.yml')
    expect(() => getData(invalidYamlPath)).toThrow('Failed to parse YAML file')
  })
})
