const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const bcrypt = require('bcrypt');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('../Middleware/verifyToken');

router.post('/register', async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      username,
    });

    const token = jwt.sign(
      {
        username: result.username,
        email: result.email,
        id: result._id,
        isAdmin: result.isAdmin,
      },
      'secret',
      { expiresIn: '30d' }
    );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });

    console.log(error);
  }
});

//LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Wrong password' });

    const token = jwt.sign(
      {
        username: oldUser.username,
        email: oldUser.email,
        isAdmin: oldUser.isAdmin,
        id: oldUser._id,
      },
      'secret',
      { expiresIn: '30d' }
    );

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.patch('/:id', verifyTokenAndAuthorization, async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (user) {
    user.username = req.body.username;
  }

  if (req.body.password) {
    user.password = await bcrypt.hash(req.body.password, 12);
  }

  const updatedUser = await user.save({ validateBeforeSave: false });

  const created = {
    username: updatedUser.username,
    password: updatedUser.password,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    _id: updatedUser._id,
  };

  const token = jwt.sign(
    {
      username: updatedUser.username,
      password: updatedUser.password,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      id: updatedUser._id,
    },
    'secret',
    { expiresIn: '30d' }
  );

  res.status(201).json({ result: created, token });
});

module.exports = router;
