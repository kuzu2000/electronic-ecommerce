import React, { useState } from 'react';
import Main from './Main';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { app } from '../util/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../redux/api';
import { useNavigate } from 'react-router-dom';
const CreateProduct = () => {
  const [file, setFile] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [description, setDescription] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const { categories } = useSelector((state) => state.category);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addPost = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => {
            console.log(url);
            const productInfo = {
              name,
              quantity,
              discount,
              original_price: price,
              description,
              category: categoryName,
              image: url,
            };
            addProduct(dispatch, productInfo, navigate);
          })
          .catch((err) => {});
      }
    );
  };

  return (
    <Main>
      <div className="create-product-container">
        <h1>Create Product</h1>
        <form onSubmit={addPost}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Product Name"
            onChange={(e) => setName(e.target.value)}
          />
          <select onChange={(e) => setCategoryName(e.target.value)}>
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.category_name}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="original_price"
            id="price"
            placeholder="Product Price"
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="number"
            name="discount"
            id="discount"
            placeholder="Product Discount"
            onChange={(e) => setDiscount(e.target.value)}
          />
          <input
            type="number"
            name="quantity"
            id="quantity"
            placeholder="Product Quantity"
            onChange={(e) => setQuantity(e.target.value)}
          />
          <textarea
            type="text"
            name="description"
            id="description"
            placeholder="Product Description"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <input
            type="file"
            name="image"
            id="image"
            placeholder="Product Name"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button type="submit">Create Product</button>
        </form>
      </div>
    </Main>
  );
};
export default CreateProduct;
