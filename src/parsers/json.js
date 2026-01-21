const parseJson = (content) => {
  try {
    return JSON.parse(content)
  }
  catch (err) {
    throw new Error(`Failed to parse JSON file: ${err.message}`)
  }
}

export default parseJson
