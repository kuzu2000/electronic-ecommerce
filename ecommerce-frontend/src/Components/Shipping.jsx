import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {addOrder} from '../redux/OrderSlice'
const Shipping = () => {
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState(0);
  const [country, setCountry] = useState('')
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const handleFocus = () => {
    setFocused(true);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
        addOrder({ city, address, country, postalCode, products: cart.cart, user: user.currentUser.result.username, userId: user.currentUser.result._id, amount: cart.total })
      );
      navigate('/place-order')
  };


  return (
    <div className="box">
      <h2>Shipping</h2>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <input
            type="city"
            name="city"
            id="city"
            value={city}
            onBlur={handleFocus}
            onChange={(e) => setCity(e.target.value)}
            focused={focused.toString()}
            autoFocus
            required
          />
          <label htmlFor="city">City</label>
        </div>
        <div className="form">
          <input
            type="address"
            name="address"
            id="address"
            value={address}
            onBlur={handleFocus}
            onChange={(e) => setAddress(e.target.value)}
            focused={focused.toString()}
            required
          />
          <label htmlFor="address">Address</label>
        </div>
        <div className="form">
          <input
            type="text"
            name="country"
            id="country"
            value={country}
            onBlur={handleFocus}
            onChange={(e) => setCountry(e.target.value)}
            focused={focused.toString()}
            autoFocus
            required
          />
          <label htmlFor="country">Country</label>
        </div>
        <div className="form">
          <input
            type="number"
            name="postalCode"
            id="postalCode"
            value={postalCode}
            onBlur={handleFocus}
            onChange={(e) => setPostalCode(e.target.value)}
            focused={focused.toString()}
            autoFocus
            required
          />
          <label htmlFor="postalCode">Postal Code</label>
        </div>
        <button type="submit">Continue</button>
      </form>
    </div>
  );
};

export default Shipping;