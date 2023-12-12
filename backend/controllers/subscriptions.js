const subscriptionsRouter = require('express').Router()
const Subscription = require('../models/subscription')
const stripe = require('stripe')('sk_test_51OK3eXEklrH6MmXorllq4ooK6TYnfY8mc8QCpVW6u1lxPJUUfF5qYJq3NkZKG7GFxKVlidksRLY2NwQJPFT9q9Yt00UwnCRUpC')


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