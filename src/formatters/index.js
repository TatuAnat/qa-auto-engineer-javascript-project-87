import formatStylish from './stylish.js'
import formatPlain from './plain.js'

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
}

const getFormatter = (format) => {
  if (!formatters[format]) {
    throw new Error(`Unknown format: ${format}`)
  }
  return formatters[format]
}

export default getFormatter
