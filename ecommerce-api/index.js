const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ProductRoute = require('./Routes/ProductRoute');
const OrderRoute = require('./Routes/OrderRoute');
const UserRoute = require('./Routes/UserRoute');
const StripeRoute = require('./Routes/StripeRoute')
const CouponRoute = require('./Routes/CouponRoute')
const CategoryRoute = require('./Routes/CategoryRoute')
const app = express();

app.use(express.json());
app.use(cors())

app.use('/api/products', ProductRoute);
app.use('/api/orders', OrderRoute);
app.use('/api/auth', UserRoute);
app.use("/api/checkout", StripeRoute);
app.use("/api/coupon", CouponRoute);
app.use('/api/category', CategoryRoute)

mongoose.set('strictQuery', false);

mongoose
  .connect(
    'mongodb+srv://ecommerce:ecommerce@cluster0.clqhhti.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('Database is running'))
  .catch((err) => console.log(err));

app.listen(5000, () => {
  console.log('The server is running on port 5000');
});
