
"use strict";
/* -------------------------------------------------------
    EXPRESS - Pizza API
------------------------------------------------------- */

/*
    $ cp .env-sample .env
    $ npm init -y
    $ npm i express dotenv mongoose express-async-errors
    $ npm i morgan swagger-autogen swagger-ui-express redoc-express
    $ mkdir logs
    $ nodemon
*/

/* ------------------------------------------------------- */

const express = require('express')
const app = express()
const {dbConnection, mongoose} = require('./src/configs/dbConnection')

// env variables
require('dotenv').config()
const PORT = process.env?.PORT || 8000

// async errors
require("express-async-errors");

//dbConnection
dbConnection()

// body parser
app.use(express.json())

// Auhentication:
app.use(require("./src/middlewares/authentication"));

// getModelList()
app.use(require('./src/middlewares/queryHandler'))

//home path
app.all('/', (req, res)=> {
    res.send({
        error: false,
        message: 'welcome to pizza api'
    })
})

// routes/index.js:
app.use("/", require("./src/routes/"));

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// run server
app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT))
