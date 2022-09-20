const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI, console.log('Connected to database'))

const indexRouter = require('./routes/index')

const app = express()

// app.set('views', path.join(__dirname, 'views'))
app.set('views', './views')
app.set('view engine', 'pug')

// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static('public'))

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)
