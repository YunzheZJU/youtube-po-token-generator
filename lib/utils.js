const https = require('https')
const { headers, url } = require('./consts')

const download = (url) => new Promise((resolve, reject) => {
  https.get(url, { headers }, (res) => {
    let data = ''

    res.on('data', (chunk) => {
      data += chunk
    })

    res.on('end', () => {
      resolve(data)
    })
  }).on('error', (err) => {
    reject(err)
  })
})

const formatError = (err) => err.message || err.toString()

module.exports = { download, formatError }
