import sortBy from 'lodash/sortBy.js'

const buildDiff = (data1, data2) => {
  const keys = sortBy(Array.from(new Set([...Object.keys(data1), ...Object.keys(data2)])))

  const diff = keys.map((key) => {
    const has1 = Object.hasOwn(data1, key)
    const has2 = Object.hasOwn(data2, key)

    if (has1 && !has2) {
      return { key, status: 'removed', value: data1[key] }
    }

    if (!has1 && has2) {
      return { key, status: 'added', value: data2[key] }
    }

    const val1 = data1[key]
    const val2 = data2[key]

    if (JSON.stringify(val1) === JSON.stringify(val2)) {
      return { key, status: 'unchanged', value: val1 }
    }

    return { key, status: 'updated', oldValue: val1, newValue: val2 }
  })

  return diff
}

export default buildDiff
