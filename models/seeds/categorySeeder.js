const mongoose = require('mongoose')
const Category = require('../category')
const dummyCategory = require('../dummy/dummyCategory')

mongoose.connect('mongodb://localhost/expense-data', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb ERROR')
})

db.once('open', () =>{
  console.log('mongodb CONNECTED')
  Category.create(dummyCategory)
    .then(() => {
      console.log('data is generated successfully.')
      return db.close()
    })
    .then(() => {
      console.log('database connection is close.')
    })
    .catch(error => console.error(error))
  
})
