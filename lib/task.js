const fs = require('fs/promises')
const path = require('path')
const { JSDOM, VirtualConsole } = require('jsdom')
const { url, userAgent } = require('./consts')

const createTask = async (visitorData) => {
  const domContent = await fs.readFile(path.join(__dirname, '..', 'vendor', 'index.html'), 'utf-8')
  const baseContent = await fs.readFile(path.join(__dirname, '..', 'vendor', 'base.js'), 'utf-8')
  const baseAppendContent = await fs.readFile(path.join(__dirname, 'inject.js'), 'utf-8')
  let destroy = undefined
  return {
    stop: () => destroy?.(),
    start: async () => {
      while (true) {
        const { poToken } = await new Promise(async (res, rej) => {
          const { window } = new JSDOM(domContent, {
            url,
            pretendToBeVisual: true,
            runScripts: 'dangerously',
            virtualConsole: new VirtualConsole(),
          })
          Object.defineProperty(window.navigator, 'userAgent', { value: userAgent, writable: false })
          window.visitorData = visitorData
          window.onPoToken = (poToken) => {
            res({ poToken })
          }
          window.eval(baseContent.replace(/}\s*\)\(_yt_player\);\s*$/, (matched) => `;${baseAppendContent};${matched}`))
          destroy = () => {
            window.close()
            rej(new Error('Window is closed'))
          }
        }).finally(() => destroy())
        if (poToken.length === 160) {
          return { poToken }
        }
      }
    },
  }
}

module.exports = { createTask }
