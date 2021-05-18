const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

// setting route
router.get('/', (req, res) => {
  let totalAmount = 0
  Record.find()
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      records.forEach(record => totalAmount += record.amount)
      Category.find()
        .lean()
        .then(categories => {
          records.forEach(record => {
            let categoryMatch = categories.find(category => category.category === record.category)
            record.categoryImage = categoryMatch.image
          })
          res.render('index', { records, totalAmount })
        })
    })
    .catch(error => console.error(error))
})
// set filter page
router.get('/filter', (req, res) => {
  const categorySelected = req.query.category
  let totalAmount = 0
  if (categorySelected === 'all') {
    return Record.find()
      .lean()
      .sort({ date: 'desc' })
      .then(() => res.redirect('/'))
      .catch(error => console.error(error))
  }

  return Record.find({
    category: { $regex: `${ categorySelected }` } 
  })
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      records.forEach(record => totalAmount += record.amount)
      Category.find()
        .lean()
        .then(categories => {
          records.forEach(record => {
            let categoryMatch = categories.find(category => category.category === record.category)
            record.categoryImage = categoryMatch.image
          })
          res.render('index', { records, categorySelected, totalAmount })
        })
      
    })
    .catch(error => console.error(error))
})

module.exports = router