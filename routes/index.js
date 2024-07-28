const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  console.log(req.get('host'))
  console.log(req.originalUrl)
  res.render('index')
})

module.exports = router
