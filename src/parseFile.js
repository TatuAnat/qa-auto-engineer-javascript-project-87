import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
const parseFile = (filepath) => {
  const content = fs.readFileSync(filepath, 'utf8')
  const ext = path.extname(filepath).toLowerCase()

  if (ext === '.json') {
    try {
      return JSON.parse(content)
    }
    catch (err) {
      throw new Error(`Failed to parse JSON file: ${filepath} error: ${err.message}`)
    }
  }

  if (ext === '.yml' || ext === '.yaml') {
    try {
      return yaml.load(content)
    }
    catch (err) {
      throw new Error('Failed to parse YAML file' + filepath + ' error: ' + err.message)
    }
  }

  throw new Error(`Unsupported file type: ${ext}`)
}

export default parseFile
