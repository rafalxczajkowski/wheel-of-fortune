const express = require('express')
const router = express.Router()
const WheelOption = require('../models/WheelOption')

router.get('/', async (req, res) => {
  try {
    const wheelOptions = await WheelOption.find({
      createdBy: req.query.uid,
    })
    res.status(200).json(wheelOptions)
  } catch (error) {
    console.log(error.name, error.message)
    res.status(500).send('Invalid user ID')
  }
})

router.post('/', async (req, res) => {
  const newWheelOption = await WheelOption.create(req.body)
  res.status(201).json(newWheelOption)
})

router.patch('/:id', async (req, res) => {
  const { id: wheelOptionID } = req.params
  const wheelOption = await WheelOption.findByIdAndUpdate(
    wheelOptionID,
    req.body,
    { new: true, runValidators: true }
  )
  res.status(200).json(wheelOption)
})

router.delete('/:id', async (req, res) => {
  const { id: wheelOptionID } = req.params
  const wheelOption = await WheelOption.findByIdAndDelete(wheelOptionID)
  res.status(200).json(wheelOption)
})

module.exports = router
