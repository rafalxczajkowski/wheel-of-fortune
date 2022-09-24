const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('index', { title: 'Wheel of Fortune', message: 'Hello there!' })
})

router.post('/', (req, res) => {
  res.send('Post method noticed')
})

module.exports = router
