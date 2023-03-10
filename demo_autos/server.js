const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const dbConnection = require('./config/bd')
const { errorHandle } = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000

dbConnection()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/autos', require('./routes/autosRoutes'))
app.use(errorHandle)

app.listen(port, ( ) => console.log(`El servidor esta escuchando en el puerto: ${port}`.blue))