import yaml from 'js-yaml'

const parseYaml = (content) => {
  try {
    return yaml.load(content)
  }
  catch (err) {
    throw new Error(`Failed to parse YAML file: ${err.message}`)
  }
}

export default parseYaml
