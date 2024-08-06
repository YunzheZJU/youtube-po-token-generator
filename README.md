# YouTube PoToken Generator

## Introduction

This program outputs the mysterious pair `{ visitorData, poToken }`, with the help of `js-dom`.

## How it works

Only one network request is made to get a fresh copy of `visitorData`.

Then `poToken` is generated with pre-downloaded scripts from YouTube and some magic provided in `lib/inject.js`

No real browser is required to install.

## How to use

```bash
yarn add youtube-po-token-generator
# Or
npm install youtube-po-token-generator
```

See `examples` for simple usages.

```javascript
const { generate } = require('youtube-po-token-generator')

generate().then(console.log, console.error)
// => { visitorData: '...', poToken: '...' }
```

Require `lib/task` directly if you have already prepared your `visitorData`.

```javascript
const { createTask } = require('youtube-po-token-generator/lib/task')

const visitorData = '...'

createTask(visitorData).then(task => task.start).then(console.log, console.error)
// => { poToken: '...' }
```

## Related works

This project is inspired by https://github.com/iv-org/youtube-trusted-session-generator .

## More

Debugging the source code from YouTube was a pain.

* Pausing at key parts of the `poToken` generation may lead to misleading branches.

* Modification on the injected code from `botguardData.program` may lead to invalid tokens.

* Improper userAgent would lead to valid or invalid poToken being generated randomly, like a lottery.
