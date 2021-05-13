const mongoose = require('mongoose')
const Record = require('../record')

mongoose.connect('mongodb://localhost/expense-data', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb ERROR')
})

db.once('open', () =>{
  console.log('mongodb CONNECTED')
  for (let i = 0; i < 10; i++) {
    Record.create({
      name:`expense-${i}`,
      category:'eat',
      date:`2021/05/${i}`,
      amount:`${i * 50}`,
    })
  }
  console.log('data is generated successfully.')
})
