const mongoose = require('mongoose')
const Category = require('../category')
const db = require('../../config/mongoose')
const dummyCategory = require('../dummy/dummyCategory')

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
