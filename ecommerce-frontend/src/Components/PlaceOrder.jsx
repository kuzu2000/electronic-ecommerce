import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addOrderItem } from '../redux/api';
import { Link, useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/CartSlice';
import { clearOrder } from '../redux/OrderSlice';

const PlaceOrder = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const toPrice = (num) => Number(num.toFixed(2));
  let shippingFee = order.products.amount > 1000 ? toPrice(0) : toPrice(10);
  let tax = toPrice(0.15 * order.products.amount);
  const total = order.products.amount + shippingFee + tax;

  const handleOrder = (e) => {
    e.preventDefault();
    addOrderItem(
      dispatch,
      {
        orderItems: order.products.products,
        tax: tax,
        total: total,
        shippingFee: shippingFee,
        productsTotal: order.products.amount,
        address: order.products.address,
        city: order.products.city,
        postalCode: order.products.postalCode,
        country: order.products.country,
        user: order.products.userId,
      },
      navigate
    );
    dispatch(clearCart());
  };

  return (
      <div className="order-wrapper">
        <h2>Place Order</h2>
    <div className="order-container">
      <div className="order-container-col-1">
        <div className="order-info-container">
        <div className="order-info">
          <div className="order-name">
            <span>
              <i className="fas fa-user"></i>
            </span>
            <div className="order-user-info">
              <h3>Customer</h3>
              <p>{order.products.user}</p>
            </div>
          </div>
            <div className="order-name">
              <span>
                <i className="fas fa-map-marker-alt"></i>
              </span>
              <div className="order-user-info">
                <h3>Deliver to</h3>
                <p className="order-user-address">
                  <strong>Address:</strong> {order.products.address},{' '}
                  {order.products.city}, {order.products.country},{' '}
                  {order.products.postalCode}
                </p>
              </div>
            </div>
        </div>
        </div>
        <div className="cart-list" style={{marginTop: 20}}>
              {order.products?.products?.map((product) => (
                <div className="cart-item" key={product._id}>
                  <div className="cart-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="cart-info">
                    <div className="cart-item-name">
                      <Link className="link" to={`/products/${product._id}`}>
                        {product.name}
                      </Link>
                    </div>
                    <div className="cart-item-price">
                      Price: <strong>${product.final_price}</strong>{' '}
                    </div>
                    <div className="cart-item-quantity">
                    Quantity: <strong>{product.quantity}</strong>
                    </div>
                    <div className="cart-item-subtotal">
                      Subtotal: <strong>${product.quantity * product.final_price}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
      </div>
      <div className="order-total-container">
        <h2>Order Total</h2>
        <div className="cart-total">
          <h4>Products</h4>
          <span>€{order.products.amount}</span>
        </div>
        <div className="cart-total">
          <h4>Shipping Fee</h4>
          <span>€{shippingFee}</span>
        </div>
        <div className="cart-total">
          <h4>Tax</h4>
          <span>€{tax}</span>
        </div>
        <div className="cart-total">
          <h4>Total</h4>
          <span>€{total}</span>
        </div>
        <button onClick={handleOrder} className="checkout-btn">
          PLACE ORDER
        </button>
      </div>
    </div>
    </div>
  );
};

export default PlaceOrder;
