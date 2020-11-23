const app = require('express')()
const morgan = require('morgan')('combined')
const { file, readDb, writeDb } = require('../lib/db.js')

;(async () => {
  app.use(morgan)
  const adapter = file('db.json', {})

  app.get('/', (req, res) => {
    const db = readDb(adapter)
    res.send(db)
  })

  app.post('/', (req, res) => {
    const db = readDb(adapter)
    const data = {
      ...db,
      [`${Date.now()} ${Math.random()}`]: 'x'
    }
    writeDb(adapter, data)
    res.send(data)
  })

  app.listen(3000, () => console.log('listening localhost:3000'))
})()
