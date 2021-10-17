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
      { url: 'https://sgp-feedback-system.herokuapp.com/' }
    ]
  },
  components: {
    BearerAuth: {
      type: 'http',
      scheme: 'bearer'
    }
  },
  apis: ['./index.js', './routes/login.js', './routes/feedbackQue.js', './routes/newFeedback.js', './routes/university.js']
}

// middlewares
app.use(express.json())
app.use(cors())
app.use('/api', require('./routes/login'))
app.use('/api', require('./routes/feedbackQue'))
app.use('/api', require('./routes/newFeedback'))
app.use('/api', require('./routes/university'))
// app.use('/api', require('./routes/yearCourse'))
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
  res.json({ message: "Authorised" })
})
app.get('/test', (req, res) => {
  res.send(req.query)
})

app.listen(PORT, () => {
  console.log(`Server Started on port = ${PORT}`)
})