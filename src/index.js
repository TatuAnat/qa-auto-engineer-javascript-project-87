import getData from './getData.js'
import buildDiff from './buildDiff.js'
import format from './formatters/index.js'

const genDiff = (filepath1, filepath2, formatType = 'stylish') => {
  const data1 = getData(filepath1)
  const data2 = getData(filepath2)

  const diff = buildDiff(data1, data2)

  return format(diff, formatType)
}

export default genDiff
