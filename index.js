// npm i -s express body-parser cors consign
// npm i -s bcrypt-nodejs jwt-simple passport passport-jwt
// npm i moment
//npm i --save-dev nodemon

const express = require('express')
//inicia express
const app = express()
const db = require('./config/db')
const consign = require('consign')
let port = 3010

//O consign centralisa os modulo
//E disponibilisa para todo projeto  
consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.db = db

app.listen(port,() => {
    console.log(`API Tasks Run Sussects Port:${port}`)
})