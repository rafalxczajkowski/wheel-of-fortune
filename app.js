require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
// const logger = require('morgan')
const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')
const wheelOptionRouter = require('./routes/wheeloptions')
const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI

mongoose
  .connect(MONGO_URI)
  .catch((error) =>
    console.log('Error while connecting to database: \n' + error)
  )

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
