const mongoose = require('mongoose')

const WheelOptionSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: [20, 'The name cannot be longer than 20 characters'],
  },
  color: String,
})

module.exports = mongoose.model('WheelOption', WheelOptionSchema)
