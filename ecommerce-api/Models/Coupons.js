const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema(
  {
    coupon: { type: String, required: true, unique: true },
    coupon_discount: { type: Number, required: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

const coupon = mongoose.model('Coupon', couponSchema);
module.exports = coupon;
