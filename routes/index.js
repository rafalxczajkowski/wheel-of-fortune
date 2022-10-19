const express = require('express')
const router = express.Router()
const WheelOption = require('../models/WheelOption')

router.get('/', async (req, res) => {
  res.render('index')
})

router.get('/api/v1/wheeloptions', async (req, res) => {
  const wheelOptions = await WheelOption.find({})
  res.status(200).json(wheelOptions)
})

router.post('/api/v1/wheeloptions', async (req, res) => {
  const newWheelOption = await WheelOption.create(req.body)
  res.status(201).json(newWheelOption)
})

router.patch('/api/v1/wheeloptions/:id', async (req, res) => {
  const { id: wheelOptionID } = req.params
  const wheelOption = await WheelOption.findByIdAndUpdate(
    wheelOptionID,
    req.body,
    { new: true, runValidators: true }
  )
  res.status(200).json(wheelOption)
})

router.delete('/api/v1/wheeloptions/:id', async (req, res) => {
  const { id: wheelOptionID } = req.params
  const wheelOption = await WheelOption.findByIdAndDelete(wheelOptionID)
  res.status(200).json(wheelOption)
})

module.exports = router
