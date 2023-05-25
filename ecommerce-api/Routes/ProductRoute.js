const router = require('express').Router();
const Product = require('../Models/Products');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('../Middleware/verifyToken');
var ObjectId = require('mongodb').ObjectId;

router.get('/', async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 15;
  const skip = (page - 1) * limit;

  const category = req.query.category;
  const searchQuery = req.query.searchQuery;
  const name = new RegExp(searchQuery, 'i');
  let productCount;
  let pageCount;

  var products
  try{
  if (category) {
    products = await Product.find({
      category: {
        $in: [category],
      },
    }).skip(skip)
    .sort(req.query.sort)
    .limit(limit)
    .select('-__v');
    productCount = await Product.countDocuments({category});
    pageCount = Math.ceil(productCount / limit);
  } else if (searchQuery) {
    products = await Product.find({name: {$regex: name}}).skip(skip)
    .sort(req.query.sort)
    .limit(limit)
    .select('-__v')
    productCount = await Product.countDocuments({name});
    pageCount = Math.ceil(productCount / limit);
  } else {
    products = await Product.find()
      .skip(skip)
      .sort(req.query.sort)
      .limit(limit)
      .select('-__v');
      productCount = await Product.countDocuments({});
      pageCount = Math.ceil(productCount / limit);
  }
  

  res.status(200).json({ products, productCount, pageCount });
}
catch (error) {
  res.status(404).json({ message: error.message });
}
});

router.get('/category', async (req, res) => {
  const categories = await Product.aggregate([
    {
      $group: {
        _id: '$category',
        numCategory: { $sum: 1 },
      },
    },
    { $sort: { numCategory: -1 } },
  ]);
  res.status(200).json(categories);
});

router.get('/search', async (req, res) => {
  const searchQuery = req.query.searchQuery;
  try {
    const name = new RegExp(searchQuery, 'i');
    const products = await Product.find({ name: { $regex: name } });
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    'reviews.name',
    'username'
  );
  if (!product) return res.status(400).json({ message: 'No product found.' });
  res.status(200).json(product);
});

router.post('/', verifyTokenAndAdmin, async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

router.patch('/update/:id', verifyTokenAndAdmin, async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: false,
  });
  res.status(201).json(product);
});

router.delete('/delete/:id', verifyTokenAndAdmin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(201).json({ message: 'Product Deleted' });
});

router.post('/:id/reviews', verifyToken, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    if (
      product.reviews.find((x) => String(x.name._id) === String(req.user.id))
    ) {
      return res
        .status(400)
        .send({ message: 'You already submitted a review' });
    }
    const review = {
      name: req.user.id,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((a, c) => c.rating + a, 0) /
      product.reviews.length;
    let updatedProduct = await product.save();
    const populatedProduct = await updatedProduct.populate('reviews.name', {
      username: 1,
      email: 1,
    });
    res.status(201).json(populatedProduct);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

module.exports = router;
