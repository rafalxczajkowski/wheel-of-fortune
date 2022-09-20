const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('index', { title: 'My Title', message: 'Hello there!' })
})

module.exports = router
