const formatJson = (diff) => {
  const result = {}

  diff.forEach((item) => {
    if (item.status === 'updated') {
      result[item.key] = {
        status: 'updated',
        oldValue: item.oldValue,
        newValue: item.newValue,
      }
    }
    else {
      result[item.key] = {
        status: item.status,
        value: item.value,
      }
    }
  })

  return JSON.stringify(result, null, 2)
}

export default formatJson
