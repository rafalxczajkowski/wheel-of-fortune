const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/', async (req, res) => {
  const users = await User.find({})
  res.status(200).json(users)
})

router.get('/:id', async (req, res) => {
  const { id: userId } = req.params
  try {
    const user = await User.findById(userId)
    if (!user) {
      throw `No user with id ${userId}`
    }
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(404).send('Not found')
  }
})

router.post('/', async (req, res) => {
  const newUser = await User.create(req.body)
  res.status(201).json(newUser)
})

router.delete('/:id', async (req, res) => {
  const { id: userId } = req.params
  const user = await User.findByIdAndDelete(userId)
  res.status(200).json(user)
})

module.exports = router
