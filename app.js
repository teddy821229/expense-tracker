const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require("express-handlebars")

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

app.get('/', (req, res) => {
  res.render('index')
})



app.listen(port, () =>{
  console.log(`app is running on localhost:${port}`)
})

