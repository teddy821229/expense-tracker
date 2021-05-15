const mongoose = require('mongoose')
const Record = require('../record')
const dummyRecord = require('../dummy/dummyRecord')

mongoose.connect('mongodb://localhost/expense-data', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb ERROR')
})

db.once('open', () => {
  console.log('mongodb CONNECTED')
  Record.create(dummyRecord)
    .then(() => {
      console.log('data is generated successfully.')
      db.close()
    })
    .then(() => {
      console.log('database connection is closed.')
    })
    .catch(error => console.error(error))
})
