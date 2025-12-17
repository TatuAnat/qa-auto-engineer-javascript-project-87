import fs from 'fs'
import path from 'path'

const parseFile = (filepath) => {
  const content = fs.readFileSync(filepath, 'utf8')
  const ext = path.extname(filepath).toLowerCase()

  if (ext === '.json') {
    try {
      return JSON.parse(content)
    } catch (err) {
      throw new Error(`Failed to parse JSON file: ${filepath}`)
    }
  }

  if (ext === '.yml' || ext === '.yaml') {
    throw new Error('YAML parsing not implemented. Only JSON supported in this task.')
  }

  throw new Error(`Unsupported file type: ${ext}`)
}

export default parseFile
