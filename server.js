const express = require('express')
const server = express()
const students = require('./students')
const grades = require('./grades')
const dbhandler = require('./dbhandler')
require('dotenv').config()
//dbhandler.student.sync()
//dbhandler.grade.sync()
server.use(express.json())
server.use(students)
server.use(grades)
const port = process.env.PORT
server.listen(port,()=>{console.log("a szerver fut a 3000 porton")})

module.exports = server