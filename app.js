const express = require('express')
// const logger = require('morgan')
const mongoose = require('mongoose')
const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')
const wheelOptionRouter = require('./routes/wheeloptions')
require('dotenv').config()
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URI, console.log('Connected to database'))

const app = express()

app.set('views', './views')
app.set('view engine', 'pug')

// app.use(logger('dev'))
app.use(express.static('public'))
app.use(express.json())
app.use('/', indexRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/wheeloptions', wheelOptionRouter)

app.listen(PORT, console.log(`Server is listening on port ${PORT}`))
