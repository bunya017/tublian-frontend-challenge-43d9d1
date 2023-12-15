require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const STRIPE_KEY = process.env.STRIPE_KEY

module.exports = {
  MONGODB_URI,
  PORT,
  STRIPE_KEY
}