const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')
const indexRouter = require('./routes/index')

require('dotenv').config()

mongoose.connect(process.env.MONGO_URI, console.log('Connected to database'))

const app = express()

app.set('views', './views')
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.static('public'))
app.use(express.json())
app.use('/', indexRouter)

app.listen(process.env.PORT || 3000, console.log(`Server is listening...`))
