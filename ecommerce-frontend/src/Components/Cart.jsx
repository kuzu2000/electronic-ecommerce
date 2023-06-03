import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  calculateTotals,
  removeItem,
  increase,
  decrease,
} from '../redux/CartSlice';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cart, dispatch]);
  const navigate = useNavigate();

  const handleOrder = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <div className="cart-wrapper">
      {cart.cart?.length === 0 ? (
        <div className="no-items-cart">
          <i className="fas fa-shopping-cart"></i>
          <h2>No items found in cart</h2>
          <Link className="link" to="/products">
            <button className="no-item-btn">Shop Now</button>
          </Link>
        </div>
      ) : (
        <>
          <h2>SHOPPING CART</h2>
          <div className="cart-container">
            <div className="cart-list">
              {cart.cart?.map((c) => (
                <div className="cart-item" key={c._id}>
                  <div className="cart-image">
                    <img src={c.image} alt={c.name} />
                  </div>
                  <div className="cart-info">
                    <div className="cart-item-name">
                      <Link className="link" to={`/products/${c._id}`}>
                        {c.name}
                      </Link>
                    </div>
                    <div className="cart-item-price">
                      Price: <strong>${c.final_price}</strong>{' '}
                    </div>
                    <div className="cart-item-subtotal">
                      Subtotal: <strong>${c.quantity * c.final_price}</strong>
                    </div>
                    <div className="cart-item-action">
                      <div
                        className="cart-detail-quantity"
                        style={{ height: 40 }}
                      >
                        <button
                          className="dec-button"
                          onClick={() => dispatch(decrease(c._id))}
                          disabled={c.quantity === 1}
                        >
                          -
                        </button>
                        <input
                          className="cart-box"
                          type="text"
                          readOnly
                          value={c.quantity}
                          style={{ fontSize: 14 }}
                        />
                        <button
                          className="inc-button"
                          onClick={() => dispatch(increase(c._id))}
                          disabled={c.qty === c.quantity}
                        >
                          +
                        </button>
                      </div>
                      <div className="cart-delete-button">
                        <button onClick={() => dispatch(removeItem(c._id))}>
                          <i
                            className="fas fa-trash"
                          ></i>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-total-container">
              <h2>Cart Total</h2>
              <div className="cart-total">
                <h4>Total</h4>
                <span>€{cart.total}</span>
              </div>
              <button onClick={handleOrder} className="checkout-btn">
                <i className="fas fa-shopping-cart"></i> CHECKOUT
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
