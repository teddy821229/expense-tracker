// 設定外部引用套件
const express = require('express')
const exphbs = require("express-handlebars")
const hbsHelper = require('handlebars-helpers')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

// 設定自定義套件
const routes = require('./routes')
require('./config/mongoose')

// 設定自定義參數
const app = express()
const multihelpers = hbsHelper()
const PORT = process.env.PORT || 3000

// 設定靜態檔案
app.use(express.static('public'))

// set view engine
app.engine('hbs', exphbs({ helpers: multihelpers, defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

// set body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// set method-override
app.use(methodOverride('_method'))

// set routes 
app.use(routes)

// listening and start running
app.listen(PORT, () =>{
  console.log(`app is running on localhost:${PORT}`)
})



