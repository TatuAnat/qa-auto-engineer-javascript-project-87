import parseFile from './parseFile.js'
import sortBy from 'lodash/sortBy.js'

const formatValue = (value) => {
  if (value === null) return 'null'
  if (typeof value === 'boolean' || typeof value === 'number') return String(value)
  return String(value)
}

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)

  const keys = sortBy(Array.from(new Set([...Object.keys(data1), ...Object.keys(data2)])))

  const lines = keys.flatMap((key) => {
    const has1 = Object.prototype.hasOwnProperty.call(data1, key)
    const has2 = Object.prototype.hasOwnProperty.call(data2, key)

    if (has1 && !has2) {
      return `  - ${key}: ${formatValue(data1[key])}`
    }

    if (!has1 && has2) {
      return `  + ${key}: ${formatValue(data2[key])}`
    }

    // both have the key
    const val1 = data1[key]
    const val2 = data2[key]

    if (JSON.stringify(val1) === JSON.stringify(val2)) {
      return `    ${key}: ${formatValue(val1)}`
    }

    return [`  - ${key}: ${formatValue(val1)}`, `  + ${key}: ${formatValue(val2)}`]
  })

  return ['{', ...lines, '}'].join('\n')
}

export default genDiff
