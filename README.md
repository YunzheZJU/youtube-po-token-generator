# YouTube PoToken Generator

## Introduction

This program outputs the mysterious pair `{ visitorData, poToken }`, with the help of `jsdom`.

## How does it work

Only one network request is made to get a fresh copy of `visitorData`.

Then `poToken` is generated with pre-downloaded scripts from YouTube and some magic provided in `lib/inject.js`

No real browser is required to install.

## How to use it from another language or command line

```bash
# Install NodeJS >= 18.0 and issue the folling command to install this tool
npm install -g youtube-po-token-generator

# Execute the following command somewhere in your program or directly in a shell
youtube-po-token-generator
# => {"visitorData":"...","poToken":"..."}
# A string of JSON format would be printed to stdout, parse and use it as you like
```

Define proxy settings before you run the program If you are in the case that typically a proxy is needed to access YouTube.

```bash
export HTTPS_PROXY=http://127.0.0.1:8888
# For Windows users
# set HTTPS_PROXY=http://127.0.0.1:8888

youtube-po-token-generator
```

## How to use it in your JavaScript code

```bash
# Clone this repo and install dependencies
cd youtube-po-token-generator && yarn
# Or issue `npm install` instead of `yarn`, alternatively
```

`generate` is exported as the primary entry to execute the program.

```javascript
const { generate } = require('youtube-po-token-generator')

generate().then(console.log, console.error)
// => { visitorData: '...', poToken: '...' }
```

Require `lib/task` directly if you have already prepared your `visitorData`.

```javascript
const { createTask } = require('youtube-po-token-generator/lib/task')

const visitorData = '...'

createTask(visitorData).then(task => task.start()).then(console.log, console.error)
// => { poToken: '...' }
```

Inspect `examples` and `bin/cli.mjs` for simple examples.

## Related works

This project is inspired by [iv-org/youtube-trusted-session-generator](https://github.com/iv-org/youtube-trusted-session-generator).

## What is a PoToken and when to use it

Please refer to the excellent explanation [here](https://github.com/LuanRT/BgUtils?tab=readme-ov-file#when-to-use-a-po-token).

## More

Debugging the source code from YouTube was a pain.

* Pausing at key parts of the `poToken` generation may lead to misleading branches.

* Modification on the injected code from `botguardData.program` may lead to invalid tokens.

* Improper userAgent would lead to valid or invalid poToken being generated randomly, like a lottery.
