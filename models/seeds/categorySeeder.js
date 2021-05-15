const mongoose = require('mongoose')
const Category = require('../category')

mongoose.connect('mongodb://localhost/expense-data', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb ERROR')
})

db.once('open', () =>{
  console.log('mongodb CONNECTED')
  Category.create({
    category: 'family',
    image: 'fas fa-home'
  },
  {
    category: 'travel',
    image: 'fas fa-shuttle-van'
  },
  {
    category: 'entertainment',
    image: 'fas fa-grin-beam'
  },
  {
    category: 'food',
    image: 'fas fa-utensils'
  },
  {
    category: 'other',
    image: 'fas fa-pen'
  })
    .then(() => {
      console.log('data is generated successfully.')
      return db.close()
    })
    .then(() => {
      console.log('database connection is close.')
    })
    .catch(error => console.error(error))
  
})
