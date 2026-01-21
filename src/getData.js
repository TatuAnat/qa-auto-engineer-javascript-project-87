import fs from 'fs'
import path from 'path'
import parse from './parsers/index.js'

const getFullpath = (filepath) => {
  if (path.isAbsolute(filepath)) {
    return filepath
  }
  return path.resolve(process.cwd(), filepath)
}

const extractFormat = (filepath) => {
  const ext = path.extname(filepath).toLowerCase()
  if (ext === '.json') {
    return 'json'
  }
  if (ext === '.yml' || ext === '.yaml') {
    return ext.slice(1)
  }
  throw new Error(`Unsupported file type: ${ext}`)
}

const getData = (filepath) => {
  const fullpath = getFullpath(filepath)
  const format = extractFormat(filepath)
  const content = fs.readFileSync(fullpath, 'utf8')
  return parse(content, format)
}

export default getData
