const express = require('express')
const mongoose = require('mongoose')
const exphbs = require("express-handlebars")
const hbsHelper = require('handlebars-helpers')
const multihelpers = hbsHelper()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const Record = require('./models/record')
const Category = require('./models/category')

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
app.engine('hbs', exphbs({ helpers: multihelpers, defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

// set body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// set method-override
app.use(methodOverride('_method'))

// setting route
app.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ date: 'desc' })
    .then(records => res.render('index', { records }))
    .catch(error => console.error(error))
})
// set filter page
app.get('/filter', (req, res) => {
  const categorySelected = req.query.category
  return Record.find({
    category: { $regex: `${ categorySelected }` } 
  })
    .lean()
    .then(records => res.render('index', { records, categorySelected }))
    .catch(error => console.error(error))
})

// set add new page
app.get('/records/new', (req, res) => {
  res.render('new')
})

app.post('/records/new' ,(req, res) => {
  return Record.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(error => console.error(error))
})

// edit records
app.put('/records/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then((record) => {
      record = Object.assign(record, req.body)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
  
})

// delete records
app.delete('/records/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})
app.listen(port, () =>{
  console.log(`app is running on localhost:${port}`)
})



