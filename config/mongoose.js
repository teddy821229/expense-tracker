const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/expense-data', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb ERROR')
})

db.once('open', () =>{
  console.log('mongodb CONNECTED')
})

module.exports = db