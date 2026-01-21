const formatValue = (value) => {
  if (value === null) return 'null'
  if (typeof value === 'string') return value
  return String(value)
}

const formatStylish = (diff) => {
  const lines = diff.map((item) => {
    if (item.status === 'removed') {
      return `  - ${item.key}: ${formatValue(item.value)}`
    }
    if (item.status === 'added') {
      return `  + ${item.key}: ${formatValue(item.value)}`
    }
    if (item.status === 'updated') {
      return [
        `  - ${item.key}: ${formatValue(item.oldValue)}`,
        `  + ${item.key}: ${formatValue(item.newValue)}`,
      ]
    }
    return `    ${item.key}: ${formatValue(item.value)}`
  }).flat()

  return ['{', ...lines, '}'].join('\n')
}

export default formatStylish
