import parseJson from './json.js'
import parseYaml from './yaml.js'

const parsers = {
  json: parseJson,
  yml: parseYaml,
  yaml: parseYaml,
}

const parse = (content, format) => {
  const parser = parsers[format]
  if (!parser) {
    throw new Error(`Unsupported format: ${format}`)
  }
  return parser(content)
}

export default parse
