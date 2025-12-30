const formatPlain = (lines) => {
  const changes = []

  const formatValue = (value) => {
    if (value === 'null' || value === 'true' || value === 'false' || !isNaN(value)) {
      return value
    }
    return `'${value}'`
  }

  lines.filter(Boolean).forEach((line, index) => {
    const match = line.match(/([+-])\s(\w+):\s(.+)/)
    if (!match) return

    const [, sign, key, value] = match

    if (sign === '-') {
      const nextLine = lines[index + 1]
      const nextMatch = nextLine && nextLine.match(/\+\s(\w+):\s(.+)/)

      if (nextMatch && nextMatch[1] === key) {
        changes.push(`Property '${key}' was updated. From ${formatValue(value)} to ${formatValue(nextMatch[2])}`)
        lines[index + 1] = null // Mark the next line as processed
      }
      else {
        changes.push(`Property '${key}' was removed`)
      }
    }
    else if (sign === '+') {
      const prevLine = lines[index - 1]
      const prevMatch = prevLine && prevLine.match(/-\s(\w+):\s(.+)/)

      if (!prevMatch || prevMatch[1] !== key) {
        changes.push(`Property '${key}' was added with value: ${formatValue(value)}`)
      }
    }
  })

  return changes.join('\n')
}

export default formatPlain
