const { generate } = require('../index')
const { formatError } = require('../lib/utils')

generate().then(console.log, err => console.log(formatError(err)))
