const config = require('../utils/config')
const subscriptionsRouter = require('express').Router()
const Subscription = require('../models/subscription')
const stripe = require('stripe')(config.STRIPE_KEY)


const YOUR_DOMAIN = 'http://localhost:4000'

subscriptionsRouter.post('/create-checkout-session', async (req, res) => {
  const { body } = req
  const subscription = new Subscription({ ...body })
  const createdIntent = await stripe.paymentIntents.create({
    currency: 'usd',
    receipt_email: body.email,
    amount: body.payment_amount,
    metadata: {
      sub_id: subscription.id,
      customer_email: body.email,
      product_name: `${body.plan} plan`.toUpperCase()
    }
  })
  subscription.payment_intent_id = createdIntent.id
  const savedSubscription = await subscription.save()
  const retrievedIntent = await stripe.paymentIntents.retrieve(createdIntent.id)

  res.status(201).json({
    clientSecret: retrievedIntent.client_secret,
    subscription: savedSubscription
  })
})

subscriptionsRouter.get('/', async (req, res) => {
  const subscriptions = await Subscription.find({})
  res.json(subscriptions)
})

module.exports = subscriptionsRouter