import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { getOrderItem, updateOrderItem } from '../redux/api';
import { Link, useLocation } from 'react-router-dom';
import { userRequest } from '../redux/requestMethod';

const OrderDetail = () => {
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const orderId = pathname.replace('/orders/', '');
  const elements = useElements();
  const stripe = useStripe();

  useEffect(() => {
    getOrderItem(dispatch, orderId);
  }, [dispatch, orderId, success]);

  useEffect(() => {
    const makeRequest = async () => {
      const res = await userRequest.post('/checkout/payment', {
        amount: order.products?.total,
      });
      setClientSecret(res.data.clientSecret);
    };
    makeRequest();
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          type: 'card',
          card: elements.getElement(CardElement),
        },
      })
      .then((result) => {
        updateOrderItem(dispatch, orderId);
        setLoading(false);
      })
      .catch((err) => console.warn(err));
  };

  const handleCoupon = async (e) => {
    e.preventDefault();
    try {
      await userRequest.post(`/orders/coupon/${orderId}`, { coupon });
      setSuccess('Coupon applied');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        border: '1px solid black',
        iconColor: 'slateblue',
        color: '#000',
        fontSize: '16px',
        '::placeholder': {
          color: '#000',
        },
        fontSmoothing: 'antialiased',
      },
      invalid: {
        color: '#fa755a',
        fontSize: '16px',
      },
    },
  };

  return (
      <div className="order-detail-wrapper">
        <h2>Order Detail</h2>
    <div className="order-detail-container">   
      <div className="order-detail-container-col-1">
          <div className="order-info">
            <div className="order-name">
              <span>
                <i className="fas fa-user"></i>
              </span>
              <div className="order-user-info">
                <h3>Customer</h3>
                <p>{order.products?.user.username}</p>
                <p>{order.products?.user.email}</p>
              </div>
            </div>
            <div className="order-name">
              <span>
                <i className="fas fa-map-marker-alt"></i>
              </span>
              <div className="order-user-info">
                <h3>Deliver to</h3>
                <p className="order-user-address">
                  <strong>Address:</strong> {order.products?.address},{' '}
                  {order.products?.city}, {order.products?.country},{' '}
                  {order.products?.postalCode}
                </p>
              </div>
            </div>
          </div>
        <div className="order-status">
        <p
              className={
                order.products?.isPaid
                  ? 'order-is-paid paid'
                  : 'order-is-paid'
              }
            >
              {' '}
              {order.products?.isPaid ? 'Paid' : 'Not Paid'}{' '}
            </p>
            <p
              className={
                order.products?.isDelivered
                  ? 'order-is-delivered delivered'
                  : 'order-is-delivered'
              }
            >
              {' '}
              {order.products?.isDelivered ? 'Delivered' : 'Not Delivered'}{' '}
            </p>
          </div>
          <div className="cart-list" style={{marginTop: 20}}>
              {order.products?.orderItems?.map((product) => (
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
      <div className="order-detail-total-container">
        <h2>Order Total</h2>
        <div className="cart-total">
          <h4>Products</h4>
          <span>€{order.products?.productsTotal}</span>
        </div>
        <div className="cart-total">
          <h4>Shipping Fee</h4>
          <span>€{order.products?.shippingFee}</span>
        </div>
        <div className="cart-total">
          <h4>Tax</h4>
          <span>€{order.products?.tax}</span>
        </div>
        {order.products?.couponUsed > 1 && (
          <div className="cart-total">
            <h4>Coupon Discount (-{order.products?.couponUsed}%)</h4>
            <span>
              $
              {Math.floor(
                (order.products?.couponUsed / 100) * order.products?.total
              )}
            </span>
          </div>
        )}
        <div className="cart-total">
          <h4>Total</h4>
          <span>€{order.products?.total?.toFixed(2)}</span>
        </div>
        {!order.products?.couponUsed && (
          <div className="coupon-field">
            {success && <span className="coupon-success">{success}</span>}
            {error && <span className="coupon-error">{error}</span>}
            <h4>Have a coupon?</h4>
            <form onSubmit={handleCoupon}>
              <input
                name="coupon"
                onChange={(e) => setCoupon(e.target.value)}
                type="text"
                placeholder="COUPON CODE"
              />
              <button>Apply</button>
            </form>
          </div>
        )}
        <CardElement options={cardElementOptions} />
        {order.products?.isPaid ? (
          <button style={{ marginTop: 10 }} className="checkout-btn-paid">
            ALREADY PAID
          </button>
        ) : loading ? (
          'Loading...'
        ) : (
          <button
            style={{ marginTop: 10 }}
            className="checkout-btn"
            onClick={handlePayment}
          >
            Pay Now
          </button>
        )}
      </div>
    </div>
    </div>
  );
};

export default OrderDetail;
