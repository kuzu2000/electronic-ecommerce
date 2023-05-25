import React, { useEffect, useState } from 'react';
import Main from './Main';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../redux/productSlice';
import { publicRequest } from '../redux/requestMethod';
const Products = () => {
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log(products);
  return (
    <Main>
      <div className="products-container">
        <h1>Products</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>IMAGE</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
              <th>DISCOUNT</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    width="50"
                    height="50"
                  />
                </td>
                <td>
                  <div style={{fontWeight: 600}}>{product.name}</div>
                  <div style={{fontSize: 14}}>{product.category?.category_name}</div>
                </td>
                <td>${product.final_price}</td>
                <td>{product.quantity}</td>
                <td>{product.discount}</td>
                <td>
                  <button className="edit-btn">
                    <Link to={`/edit-product/${product._id}`}>EDIT</Link>
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

export default Products;
