const { createTask } = require('./lib/task')
const { fetchVisitorData } = require('./lib/workflow')

const generate = async () => {
  const visitorData = await fetchVisitorData()
  const task = await createTask(visitorData)
  const { poToken } = await task.start()
  return { visitorData, poToken }
}

module.exports = { generate }
