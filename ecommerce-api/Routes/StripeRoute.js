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
  console.log('Total amount:', total); // Debugging line
  
  // Validate the amount
  if (!total || isNaN(total)) {
    return res.status(400).json({ message: 'Invalid amount' });
  }

  try {
    const payment = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // Convert to smallest currency unit (cents for USD)
      currency: 'usd',
      payment_method_types: ['card'],
    });
    
    res.status(201).json({
      clientSecret: payment.client_secret,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
