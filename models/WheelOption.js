const mongoose = require('mongoose')

const WheelOptionSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: [20, 'The name cannot be longer than 20 characters'],
  },
  color: String,
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

module.exports = mongoose.model('WheelOption', WheelOptionSchema)
