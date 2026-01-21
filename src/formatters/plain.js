const formatValue = (value) => {
  if (value === null) return 'null'
  if (value === true || value === false) return String(value)
  if (typeof value === 'number') return String(value)
  return `'${value}'`
}

const formatPlain = (diff) => {
  const changes = diff
    .filter(item => item.status !== 'unchanged')
    .map((item) => {
      if (item.status === 'removed') {
        return `Property '${item.key}' was removed`
      }
      if (item.status === 'added') {
        return `Property '${item.key}' was added with value: ${formatValue(item.value)}`
      }
      return `Property '${item.key}' was updated. From ${formatValue(item.oldValue)} to ${formatValue(item.newValue)}`
    })

  return changes.join('\n')
}

export default formatPlain
