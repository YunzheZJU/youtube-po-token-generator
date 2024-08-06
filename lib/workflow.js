const { download } = require('./utils')
const { url } = require('./consts')

const fetchVisitorData = async () => {
  const data = await download(url)
  const matched = data.match(/"visitorData":"([^"]+)/)
  if (matched) {
    return matched[1]
  } else {
    throw new Error(`Failed to find visitorData`)
  }
}

module.exports = { fetchVisitorData }
