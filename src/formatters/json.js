const formatJson = (lines) => {
  const result = {}

  lines.forEach((line) => {
    const match = line.match(/^\s*([-+ ])\s(\w+):\s(.+)$/)
    if (match) {
      const [, statusSymbol, key, value] = match
      const status = statusSymbol === '-' ? 'removed' : statusSymbol === '+' ? 'added' : 'unchanged'

      let parsedValue
      try {
        parsedValue = JSON.parse(value)
      }
      catch {
        parsedValue = value // Fallback for non-JSON strings
      }

      if (status === 'removed' && result[key]?.status === 'added') {
        result[key] = {
          status: 'updated',
          oldValue: parsedValue,
          newValue: result[key].value,
        }
      }
      else if (status === 'added' && result[key]?.status === 'removed') {
        result[key] = {
          status: 'updated',
          oldValue: result[key].value,
          newValue: parsedValue,
        }
      }
      else {
        result[key] = { status, value: parsedValue }
      }
    }
  })

  return JSON.stringify(result)
}

export default formatJson
