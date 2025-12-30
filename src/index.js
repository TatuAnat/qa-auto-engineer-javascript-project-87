import parseFile from './parseFile.js'
import sortBy from 'lodash/sortBy.js'

const formatValue = (value) => {
  if (value === null) return 'null'
  if (typeof value === 'string') return `'${value}'`
  return String(value)
}

const buildDiff = (data1, data2) => {
  const keys = sortBy([...new Set([...Object.keys(data1), ...Object.keys(data2)])])

  return keys.map((key) => {
    const has1 = Object.hasOwn(data1, key)
    const has2 = Object.hasOwn(data2, key)

    if (has1 && !has2) {
      return { key, type: 'removed', value: data1[key] }
    }

    if (!has1 && has2) {
      return { key, type: 'added', value: data2[key] }
    }

    if (data1[key] === data2[key]) {
      return { key, type: 'unchanged', value: data1[key] }
    }

    return {
      key,
      type: 'updated',
      oldValue: data1[key],
      newValue: data2[key],
    }
  })
}

const formatStylish = (diff) => {
  const lines = diff.flatMap((node) => {
    switch (node.type) {
      case 'added':
        return `  + ${node.key}: ${node.value}`
      case 'removed':
        return `  - ${node.key}: ${node.value}`
      case 'unchanged':
        return `    ${node.key}: ${node.value}`
      case 'updated':
        return [
          `  - ${node.key}: ${node.oldValue}`,
          `  + ${node.key}: ${node.newValue}`,
        ]
      default:
        throw new Error(`Unknown type: ${node.type}`)
    }
  })

  return ['{', ...lines, '}'].join('\n')
}

const formatPlain = diff =>
  diff
    .filter(node => node.type !== 'unchanged')
    .map((node) => {
      switch (node.type) {
        case 'added':
          return `Property '${node.key}' was added with value: ${formatValue(node.value)}`
        case 'removed':
          return `Property '${node.key}' was removed`
        case 'updated':
          return `Property '${node.key}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`
        default:
          throw new Error(`Unknown type: ${node.type}`)
      }
    })
    .join('\n')

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)

  const diff = buildDiff(data1, data2)

  return format === 'plain'
    ? formatPlain(diff)
    : formatStylish(diff)
}

export default genDiff
