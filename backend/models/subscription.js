const mongoose = require('mongoose')

const subscriptionSchema = new mongoose.Schema({
  firstname: {
    type: String,
    minLength: 2,
    required: true
  },
  lastname: {
    type: String,
    minLength: 2,
    required: true
  },
  email: {
    type: String,
    minLength: 2,
    required: true
  },
  password: {
    type: String,
    minLength: 2,
    required: true
  },
  purpose: {
    type: String,
    minLength: 2,
    required: true
  },
  plan: {
    type: String,
    minLength: 2,
    required: true
  },
  interval: {
    type: String,
    minLength: 2,
    required: true
  },
  payment_amount: {
    type: String,
    minLength: 2,
    required: true
  },
  payment_intent_id: String
})

subscriptionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Subscription', subscriptionSchema)