const { parentPort, Worker, isMainThread } = require('worker_threads')
const { createTask } = require('../lib/task')
const { formatError } = require('../lib/utils')
const { fetchVisitorData } = require('../lib/workflow')
const os = require('os')

if (isMainThread) {
  const generate = async () => {
    const visitorData = await fetchVisitorData()

    return new Promise((res, rej) => {
      try {
        const workers = Array(Math.max(1, os.cpus().length - 1)).fill(0).map(() => new Worker(__filename))

        workers.forEach((worker, i) => {
          worker.on('message', ({ result, data }) => {
            if (result === 'success') {
              console.log(`Worker ${i} finished the race.`)
              workers.forEach(worker => {
                worker.postMessage({ action: 'stop' })
              })
              res(data)
            }
          })

          worker.on('error', (err) => {
            console.error(`Worker ${i} encountered an error ${formatError(err)}`)
          })

          worker.on('exit', (code) => {
            console.error(`Worker ${i} exited (${code})`)
          })

          console.log(`Starting worker ${i}...`)
          worker.postMessage({ action: 'start', data: { visitorData } })
        })
      } catch (err) {
        rej(err)
      }
    })
  }

  module.exports = { generate }
} else {
  let flagStop = false
  let visitorData = undefined
  let stop

  const start = async () => {
    try {
      if (!visitorData) {
        throw new Error('visitorData is absent')
      }
      const task = await createTask(visitorData)
      stop = task.stop
      const { poToken } = await task.start()
      return { result: 'success', data: { visitorData, poToken } }
    } catch (err) {
      return { result: 'failure', data: { reason: formatError(err) } }
    }
  }

  parentPort.on('message', async ({ action, data }) => {
    if (action === 'start') {
      visitorData = data.visitorData
      const message = await start()
      if (flagStop) {
        return
      }
      parentPort.postMessage(message)
    }
    if (action === 'stop') {
      flagStop = true
      stop?.()
      process.exit(0)
    }
  })
}
