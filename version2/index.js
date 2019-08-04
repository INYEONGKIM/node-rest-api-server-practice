const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const user = require('./api/user')

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true }))

app.use('/users', user)

module.exports = app