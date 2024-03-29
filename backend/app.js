const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const subscriptionsRouter = require('./controllers/subscriptions')
const middleware = require('./utils/midddleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to MongoDB')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors({ origin: '*' }))
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/subscriptions', subscriptionsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app