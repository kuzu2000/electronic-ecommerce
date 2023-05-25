const router = require('express').Router();
const Product = require('../Models/Products');
const Order = require('../Models/Orders');
const Coupon = require('../Models/Coupons');
const {
  verifyTokenAndAuthorization,
  verifyToken,
} = require('../Middleware/verifyToken');
var ObjectId = require('mongodb').ObjectId;

router.get('/', async (req, res) => {
  const orders = await Order.find();
  res.status(200).json(orders);
});

router.get('/user', verifyToken, async (req, res) => {
  let id = req.user.id;
  let o_id = new ObjectId(id);
  const orders = await Order.find({ user: ObjectId(id) })
    .sort({
      createdAt: -1,
    })
    .populate('user', { username: 1, _id: 1, email: 1 });
  res.status(200).json(orders);
});

router.get('/:id', async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user');
  if (!order) return res.status(400).json({ message: 'No order found.' });
  res.status(200).json(order);
});

router.post('/', async (req, res) => {
  const order = await Order.create(req.body);
  res.status(201).json(order);
});

router.post('/paid/:id', async (req, res) => {
  const order = await Order.findById(req.params.id);

  order?.orderItems.forEach((item) => {
    Product.updateOne(
      { _id: item._id },
      { $inc: { quantity: -item.quantity } },
      (err, updatedData) => {}
    );
  });

  //   console.log(productCount)

  order.isPaid = true;

  const updateOrder = await order.save({ validateBeforeSave: false });
  const populatedOrder = await updateOrder.populate('user');

  res.status(201).json(populatedOrder);
});

router.post('/coupon/:id', verifyToken, async (req, res) => {
  const couponExists = await Coupon.findOne({ coupon: req.body.coupon });
  if (!couponExists)
    return res.status(400).json({ message: "Coupon doesn't exist" });

  if (couponExists.users.find((user) => String(user) === String(req.user.id))) {
    return res.status(400).send({ message: 'You have already used this coupon' });
  }
  couponExists.users.push(req.user.id);
  const orderDiscounted = await Order.findById(req.params.id)
  orderDiscounted.total = orderDiscounted.total - (couponExists.coupon_discount / 100) * orderDiscounted.total
  orderDiscounted.couponUsed = couponExists.coupon_discount
  await couponExists.save()
  await orderDiscounted.save()

  res.status(201).json(orderDiscounted)
});

module.exports = router;
