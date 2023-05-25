import React, { useEffect } from 'react';
import Main from './Main';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../redux/categorySlice';
const Categories = () => {
  const { categories } = useSelector((state) => state.category);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch, currentUser]);
  return (
    <Main>
      <div className="products-container">
        <h1>Categories</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>CATEGORY NAME</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>{category._id}</td>
                <td>{category.category_name}</td>
                <td>
                  <button className="edit-btn">
                    <Link to={`/edit-product/${category._id}`}>EDIT</Link>
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

export default Categories;
