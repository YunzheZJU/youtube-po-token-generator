const url = 'https://www.youtube.com/embed/dQw4w9WgXcQ'
const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko)'
const headers = {
  'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
  'accept-language': 'en-US;q=0.9',
  'user-agent': userAgent,
}

module.exports = { url, headers, userAgent }
