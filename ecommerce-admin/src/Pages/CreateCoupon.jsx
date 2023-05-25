import React, { useState } from 'react';
import Main from './Main';
import { useDispatch } from 'react-redux';
import { addCoupon } from '../redux/api';
import { useNavigate } from 'react-router-dom';
const CreateCoupon = () => {
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addCouponCode = (e) => {
    e.preventDefault();
    const value = { coupon, coupon_discount: discount };
    addCoupon(dispatch, value, navigate);
  };

  return (
    <Main>
      <div className="create-product-container">
        <h1>Create Coupon</h1>
        <form onSubmit={addCouponCode}>
          <input
            type="text"
            name="coupon"
            id="coupon"
            placeholder="Coupon Code"
            onChange={(e) => setCoupon(e.target.value)}
          />
          <input
            type="number"
            name="coupon_discount"
            id="coupon_discount"
            placeholder="Coupon Discount"
            onChange={(e) => setDiscount(e.target.value)}
          />
          <button type="submit">Create Coupon</button>
        </form>
      </div>
    </Main>
  );
};
export default CreateCoupon;
