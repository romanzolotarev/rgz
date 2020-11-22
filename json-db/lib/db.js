const fs = require('graceful-fs')

const serialize = x => JSON.stringify(x, null, 0)
const deserialize = JSON.parse

const file = (source, defaultValue) => ({
  read: () => {
    if (!fs.existsSync(source)) {
      fs.writeFileSync(source, serialize(defaultValue), 'utf8')
      return defaultValue
    }
    const data = fs.readFileSync(source, 'utf-8')
    if (!data) {
      throw Error(`can't read file ${source}`)
    }
    const trimmed = data.trim()
    return trimmed ? deserialize(trimmed) : defaultValue
  },
  write: data => fs.writeFileSync(source, serialize(data))
})

const readDb = adapter => adapter.read()
const writeDb = (adapter, data) => adapter.write(data)

module.exports = { file, readDb, writeDb }
