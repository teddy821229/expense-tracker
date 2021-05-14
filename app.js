const express = require('express')
const mongoose = require('mongoose')
const exphbs = require("express-handlebars")
const Record = require('./models/record')

const app = express()
const port = 3000

// db connection
mongoose.connect('mongodb://localhost/expense-data', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb ERROR')
})

db.once('open', () =>{
  console.log('mongodb CONNECTED')
})
// 設定靜態檔案
app.use(express.static('public'))
// set view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
// setting route
app.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ date: 'desc' })
    .then((records) => res.render('index', { records }))
    .catch(error => console.error(error))
})



app.listen(port, () =>{
  console.log(`app is running on localhost:${port}`)
})

