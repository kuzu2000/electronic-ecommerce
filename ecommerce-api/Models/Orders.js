const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    user: { type: String, ref: 'User', required: true },
    isPaid: { type: Boolean, default: false },
    isDelivered: { type: Boolean, default: false },
    orderItems: [
      {
        name: { type: String },
        quantity: { type: Number },
        final_price: { type: Number },
        image: {type: String},
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
      },
    ],
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: Number, required: true },
    shippingFee: { type: Number, required: true },
    productsTotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    couponUsed: { type: Number, default: 0 },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
