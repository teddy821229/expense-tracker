const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/expense-data'

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb ERROR')
})

db.once('open', () =>{
  console.log('mongodb CONNECTED')
})

module.exports = db