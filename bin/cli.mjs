#!/usr/bin/env node

import 'global-agent/bootstrap.js'
import process from 'node:process'
import { generate } from '../index.js'
import { formatError } from '../lib/utils.js'

try {
  global.GLOBAL_AGENT.HTTPS_PROXY ||= process.env.HTTPS_PROXY

  const data = await generate()

  console.log(JSON.stringify(data))
} catch (err) {
  console.error(JSON.stringify({ error: 'An unexpected error occurred', details: formatError(err.message) }))

  process.exit(1)
}

