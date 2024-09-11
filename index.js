
"use strict";
/* -------------------------------------------------------
    EXPRESS - Pizza API
------------------------------------------------------- */

/* ------------------------------------------------------- */

const express = require('express')
const app = express()
const {dbConnection, mongoose} = require('./src/configs/dbConnection')

// env variables
require('dotenv').config()
const PORT = process.env?.PORT || 8000

// async errors
require('express-async-errors')

//dbConnection
dbConnection()

// body parser
app.use(express.json())

// getModelList()
app.use(require('./src/middlewares/queryHandler'))

//home path
app.all('/', (req, res)=> {
    res.send({
        error: false,
        message: 'welcome to pizza api'
    })
})

//users
app.use('/users', require('./src/routes/userRouter'))
// tokens
app.use('/tokens', require('./src/routes/tokenRouter'))

// run server
app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT))
