import React, { useEffect } from 'react';
import Main from './Main';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCoupons } from '../redux/couponSlice';
const Coupons = () => {
  const { coupons } = useSelector((state) => state.coupon);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCoupons());
  }, [dispatch]);
  return (
    <Main>
      <div className="products-container">
        <h1>Products</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>COUPON CODE</th>
              <th>DISCOUNT RATE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon._id}>
                <td>{coupon._id}</td>
                <td>{coupon.coupon}</td>
                <td>{coupon.coupon_discount}%</td>
                <td>
                  <button className="edit-btn">
                    <Link to={`/edit-product/${coupon._id}`}>EDIT</Link>
                  </button>
                  <button className="delete-btn">DELETE</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Main>
  );
};

export default Coupons;
