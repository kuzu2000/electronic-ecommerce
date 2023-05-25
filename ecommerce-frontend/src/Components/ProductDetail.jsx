import React, { useState, useEffect } from 'react';
import Rating from './Rating';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getProductDetails, addReviewRating } from '../redux/api';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { addToCart } from '../redux/CartSlice';
import RatingComponent from './RatingComponent';
const ProductDetail = () => {
  const product = useSelector((state) => state.product);
  const { products, isFetching, isError } = product;
  const user = useSelector((state) => state.user);
  let name = user.currentUser?.result?._id;

  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const productId = pathname.replace('/products/', '');
  const cartExists = useSelector((state) =>
    state.cart.cart.find((c) => c._id === productId)
  );
  useEffect(() => {
    getProductDetails(dispatch, productId);
  }, [dispatch, productId]);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setCount((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: products._id,
        name: products.name,
        discount: products.discount,
        final_price: products.final_price,
        original_price: products.original_price,
        qty: products.quantity,
        image: products.image,
        quantity: count,
      })
    );
  };

  return (
    <>
      <div className="product-detail">
        <div className="product-detail-image">
          <LazyLoadImage effect="blur" src={products.image} alt={products.name} />
        </div>
        <div className="product-detail-info">
          <div className="product-detail-title">{products.name}</div>
          <div className="product-detail-price">
            {products.discount ? (
              <>
                <span className="product-detail-final-price">
                  €{products.final_price}
                </span>{' '}
                -{' '}
                <span className="product-detail-original-price">
                  €{products.original_price}
                </span>
              </>
            ) : (
              <span className="product-detail-final-price">
                €{products.final_price}
              </span>
            )}
          </div>
          <Rating rating={products.rating} numReviews={products.numReviews} />
          <div className="product-detail-description">
            {products.description}
          </div>
          <div className="product-detail-category">
            Category: <span>{products.category}</span>
          </div>
          <div className="product-detail-action">
            <div className="product-detail-cart-quantity">
              <div className="product-detail-cart-quantity-control">
                <button
                  className="dec-button"
                  onClick={handleDecrement}
                  disabled={count === 1}
                >
                  -
                </button>
                <input
                  className="cart-box"
                  type="text"
                  value={count}
                  readOnly
                />
                <button
                  className="inc-button"
                  onClick={handleIncrement}
                  disabled={
                    products.quantity === count || products.quantity === 0
                  }
                >
                  +
                </button>
              </div>
              <p>
                {products.quantity <= 5
                  ? `Only ${products.quantity} items left`
                  : `${products.quantity} items`}
              </p>
            </div>
            <div className="product-detail-cart-main-actions">
              {products.quantity === 0 ? (
                <>
                  <button className="product-detail-addtocart-exists">
                    Out of Stock
                  </button>
                </>
              ) : (
                <>
                  <button
                    className={
                      cartExists
                        ? 'product-detail-addtocart-exists'
                        : 'product-detail-addtocart'
                    }
                    onClick={handleAddToCart}
                  >
                    {cartExists ? 'Already Added' : 'Add To Cart'}
                  </button>
                </>
              )}

              <button
                className="product-detail-wishlist"
                title="Add to wishlist"
              >
                <i className="far fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <h1 style={{ textAlign: 'center' }}>Reviews ({products.numReviews})</h1>
      <RatingComponent
        name={name}
        productId={products._id}
        rating={products.rating}
        numReviews={products.numReviews}
        reviews={products.reviews}
        error={isError}
      />
    </>
  );
};

export default ProductDetail;
