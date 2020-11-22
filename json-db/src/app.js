const express = require('express')
const morgan = require('morgan')
const { file, readDb, writeDb } = require('../lib/db.js')

;(async () => {
  const app = express()
  app.use(morgan('combined'))
  const adapter = file('db.json', {})

  app.get('/', (req, res) => {
    const collection = readDb(adapter)
    res.send(collection)
  })

  app.post('/', (req, res) => {
    const collection = readDb(adapter)
    const data = {
      ...collection,
      [`${Date.now()} ${Math.random()}`]: 'x'
    }
    writeDb(adapter, data)
    res.send(data)
  })

  app.listen(3000, () => console.log('listening localhost:3000'))
})()
