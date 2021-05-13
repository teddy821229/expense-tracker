const express = require('express')
const app = express()
const mongoose = require('mongoose')

// db connection
mongoose.connect('mongodb://localhost/expense-data', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb ERROR')
})

db.once('open', () =>{
  console.log('mongodb CONNECTED')
})


const port = 3000

app.get('/', (req, res) => {
  res.send('this is expense-tracker project initial.')
})

app.listen(port, () =>{
  console.log(`app is running on localhost:${port}`)
})

