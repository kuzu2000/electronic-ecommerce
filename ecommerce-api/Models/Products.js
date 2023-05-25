const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    name: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
    category: {
      type: String,
      required: true,
    },
    original_price: { type: Number, required: true },
    final_price: { type: Number },
    discount: { type: Number, default: 0 },
    description: { type: String },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

ProductSchema.pre('save', function (next) {
  this.final_price =
    this.original_price - (this.discount / 100) * this.original_price;
  next();
});

ProductSchema.pre(/^find/, function (next) {
  this.populate('reviews.name', '-password -__v');

  next();
});

module.exports = mongoose.model('Product', ProductSchema);
