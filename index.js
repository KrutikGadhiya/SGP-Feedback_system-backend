const express = require('express')
const cors = require('cors')
const DBConnection = require('./connection/connection')
const requireLogin = require('./middleware/requireLogin')
const app = express()
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

require('dotenv').config()
const PORT = process.env.PORT || 5000
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Feedback System APIs',
      version: '1.0.0'
    },
    servers: [
      { url: 'http://localhost:5000/' },
      { url: 'https://sgp-feedback-system/' }
    ]
  },
  apis: ['./index.js', './routes/login.js']
}

// middlewares
app.use(express.json())
app.use(cors())
app.use(require('./routes/login'))
const swaggerSpec = swaggerJSDoc(options)
app.use('/apis', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

/**
 * @swagger
 * /:
 *  get:
 *      summary: Server Status
 *      description: API for checking Server Status
 *      responses:
 *          200:
 *              description: Server is running
 */

app.get('/', (req, res) => {
  res.send({ status: "Server UP and Running" })
})

app.post('/test', requireLogin, (req, res) => {
  console.log(req.body)
  console.log(req.user)
})

app.listen(PORT, () => {
  console.log(`Server Started on port = ${PORT}`)
})