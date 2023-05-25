import React, { useState } from 'react';
import Main from './Main';
import { useDispatch } from 'react-redux';
import { addCategory } from '../redux/api';
import { useNavigate } from 'react-router-dom';
const CreateCategory = () => {
  const [category, setCategory] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addCategoryName = (e) => {
    e.preventDefault();
    addCategory(dispatch, { category_name: category }, navigate);
  };

  return (
    <Main>
      <div className="create-product-container">
        <h1>Create Category</h1>
        <form onSubmit={addCategoryName}>
          <input
            type="text"
            name="category_name"
            id="category"
            placeholder="Category Name"
            onChange={(e) => setCategory(e.target.value)}
          />
          <button type="submit">Create Category</button>
        </form>
      </div>
    </Main>
  );
};
export default CreateCategory;
