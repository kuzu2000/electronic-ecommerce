import React, { useState, useEffect } from 'react';
import Rating from './Rating';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import PlaceholderImage from './../assets/placeholder-img.jpg';
import axios from 'axios';
import {
  useNavigate,
  useLocation,
  Link,
  useSearchParams,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/CartSlice';
import { useSelector } from 'react-redux';
import Loading from './Loading';

const ProductList = () => {
  const cart = useSelector((state) => state.cart);
  const [products, setProducts] = useState([]);
  const [sortValue, setSortValue] = useState('');
  const [productCount, setProductCount] = useState(0);
  const [currentPage, setcurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('');
  const [itemsPerPage] = useState(6);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const temp = location.search.split('=')[1] || 1;
  const [searchParams] = useSearchParams();
  const search = searchParams.get('searchQuery') || '';

  const cartExists = (id) => {
    const cartItem = cart.cart.find((c) => c._id === id);
    if (cartItem) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/products?page=${currentPage}&limit=${itemsPerPage}&sort=${sortValue}&category=${search ? '' : currentCategory}&searchQuery=${search}`
      );
      setProducts(res.data.products);
      setProductCount(res.data.productCount);
      setLoading(false);
    };
    fetchPosts();
  }, [sortValue, temp, currentPage, currentCategory, search]);

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await axios.get(
        'http://localhost:5000/api/products/category'
      );
      setCategories(res.data);
    };
    fetchCategory();
  }, []);

  const pages = [];
  for (let i = 1; i <= Math.ceil(productCount / itemsPerPage); i++) {
    pages.push(i);
  }

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
    navigate(`/products?page=${Number(event.target.id)}`);
  };

  const categoryChangeHandler = (category) => {
    setCurrentCategory(category);
    setcurrentPage(1);
    navigate('/products');
  };

console.log(categories)

  return (
    <div className="products-container">
      <aside id="product-1">
        <ul>
          <li
            className={'' === currentCategory ? 'active' : ''}
            onClick={() => categoryChangeHandler('')}
          >
            All Categories
          </li>
          {categories.map((category) => (
            <li
              key={category._id}
              className={category._id === currentCategory ? 'active' : ''}
              onClick={() => categoryChangeHandler(category._id)}
            >
              {category._id}
            </li>
          ))}
        </ul>
      </aside>
      <section id="product-2">
        <div className="product-filter">
          <select onChange={(e) => setSortValue(e.target.value)}>
            <option value="">Default</option>
            <option value="-final_price">Price - High to Low</option>
            <option value="final_price">Price - Low to High</option>
          </select>
          <p>
            Showing {itemsPerPage} of {productCount} result
          </p>
        </div>
        <main className="products">
          {loading ? (
            <Loading size={100} />
          ) : (
            <>
              {products?.length === 0 && <h1>No products found</h1>}
              {products?.map((product) => (
                <article className="product" key={product._id}>
                  <div className="img-inner">
                    <Link to={`/products/${product._id}`} className="link">
                      <LazyLoadImage
                        effect="blur"
                        className="product-image"
                        src={product.image}
                        alt={product.name}
                      />
                    </Link>
                    <div className="product-status">
                      {product.discount > 0 && (
                        <span className="product-discount">
                          -{product.discount}%
                        </span>
                      )}
                      {product.quantity === 0 && (
                        <span className="product-sold-out">Sold Out</span>
                      )}
                    </div>
                    {product.quantity === 0 ? (
                      <>
                        <button className="add-to-cart-already">
                          <i className="fas fa-shopping-cart"></i> Out of Stock
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className={
                            cartExists(product._id)
                              ? 'add-to-cart-already'
                              : 'add-to-cart'
                          }
                          onClick={() =>
                            dispatch(
                              addToCart({
                                _id: product._id,
                                name: product.name,
                                discount: product.discount,
                                final_price: product.final_price,
                                original_price: product.original_price,
                                image: product.image,
                                qty: product.quantity,
                                quantity: 1,
                              })
                            )
                          }
                        >
                          <i className="fas fa-shopping-cart"></i>{' '}
                          {cartExists(product._id) ? 'Added' : 'Add To Cart'}
                        </button>
                      </>
                    )}
                  </div>
                  <div className="text">
                    <span className="product-category">{product.category}</span>
                    <Link to={`/products/${product._id}`} className="link">
                      <div className="product-title">{product.name}</div>
                    </Link>
                    <Rating
                      rating={product.rating}
                      numReviews={product.numReviews}
                    />
                    <div className="product-price">
                      {product.discount ? (
                        <>
                          <span className="final-price">
                            €{product.final_price}
                          </span>{' '}
                          -{' '}
                          <span className="original-price">
                            €{product.original_price}
                          </span>
                        </>
                      ) : (
                        <span className="final-price">
                          €{product.final_price}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </>
          )}
        </main>
        {loading ? (
          ''
        ) : (
          <div className="product-pagination">
            <ul>
              {pages?.map((page) => (
                <li
                  id={page}
                  onClick={handleClick}
                  className={Number(temp) === page ? 'active' : null}
                  key={page}
                >
                  {page}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductList;
