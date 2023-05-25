const router = require('express').Router();
const Coupon = require('../Models/Coupons');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('../Middleware/verifyToken');

router.get('/', verifyTokenAndAdmin, async (req, res) => {
  const coupons = await Coupon.find({});
  res.status(200).json(coupons);
});

router.get('/:id', verifyTokenAndAdmin, async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);
  res.status(200).json(coupon);
});

router.post('/', verifyTokenAndAdmin, async (req, res) => {
  const findCoupon = await Coupon.findOne({ coupon: req.body.coupon });
  if (findCoupon)
    return res.status(400).json({ message: 'Coupon already exists' });
  const createCoupon = await Coupon.create(req.body);
  res.status(201).json(createCoupon);
});

module.exports = router;
