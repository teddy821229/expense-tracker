const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new' ,(req, res) => {
  return Record.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(error => console.error(error))
})

// edit records
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

module.exports = router