/**
 * 오로지 서버와 mw 추가만이 목적
 */

const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const user = require('./api/user') // 생략하면 /user/index.js

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true }))

app.use('/users', user) // /user에 대해서 user router가 담당하도록 위임

module.exports = app