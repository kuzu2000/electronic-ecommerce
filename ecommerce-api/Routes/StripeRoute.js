const router = require('express').Router();
const stripe = require('stripe')(
  'sk_test_51Ku0eaKNsPpoql9XQjPrZHprA1NhJcqNm5COjb4DhHaZjE7CQLQJzWWTR2zwuufqiT45gh8AMiWen3ZbEomlTbDh00AN2v2hmf'
);
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('../Middleware/verifyToken');

router.post('/payment', verifyToken, async (req, res) => {
  const total = req.body.amount;
  const payment = await stripe.paymentIntents.create({
    amount: Math.round(total * 100),
    currency: 'usd',
    payment_method_types: ['card'],
  });
  res.status(201).json({
    clientSecret: payment.client_secret,
  });
});

module.exports = router;
