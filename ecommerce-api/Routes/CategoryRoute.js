const router = require('express').Router();
const Category = require('../Models/Categories');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('../Middleware/verifyToken');

router.get('/', async (req, res) => {
  const categories = await Category.find({}).select('-__v');
  res.status(200).json(categories);
});

router.post('/', verifyTokenAndAdmin, async (req, res) => {
  const findCategory = await Category.findOne({
    category_name: req.body.category_name,
  });
  if (findCategory)
    return res.status(400).json({ message: 'Category already exists' });
  const createCategory = await Category.create(req.body);
  res.status(201).json(createCategory);
});

module.exports = router;
