import React, { useState } from 'react';
import Main from './Main';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { useLocation, useNavigate } from 'react-router-dom';
import { app } from '../util/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { editProduct } from '../redux/api';
const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const productId = pathname.replace('/edit-product/', '');
  const product = useSelector((state) =>
    state.product?.products.find((product) => product._id === productId)
  );

  const { categories } = useSelector((state) => state.category);
  const [file, setFile] = useState(product.image);
  const [quantity, setQuantity] = useState(product.quantity);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.original_price);
  const [discount, setDiscount] = useState(product.discount);
  const [description, setDescription] = useState(product.description);
  const [categoryName, setCategoryName] = useState(product.category);
  const [imgUrl, setImgUrl] = useState(null);

  const editPost = (e) => {
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
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => {
            setImgUrl(url);
          })
          .catch((err) => {});
      }
    );
    editProduct(
      dispatch,
      productId,
      {
        name,
        quantity,
        discount,
        original_price: price,
        description,
        category: categoryName,
        image: file,
      },
    );
    navigate('/products')
  };

  const update = (e) => {
    e.preventDefault();
    const value = {
      name,
      quantity,
      discount,
      original_price: price,
      description,
      category: categoryName,
      image: file,
    };
    editProduct(dispatch, productId, value, navigate);
  };

  return (
    <Main>
      <div className="create-product-container">
        <h1>Edit Product</h1>
        <form onSubmit={update}>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            placeholder="Product Name"
            onChange={(e) => setName(e.target.value)}
          />
          <select
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          >
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
            value={price}
            placeholder="Product Price"
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="number"
            name="discount"
            id="discount"
            value={discount}
            placeholder="Product Discount"
            onChange={(e) => setDiscount(e.target.value)}
          />
          <input
            type="number"
            name="quantity"
            id="quantity"
            value={quantity}
            placeholder="Product Quantity"
            onChange={(e) => setQuantity(e.target.value)}
          />
          <textarea
            type="text"
            name="description"
            id="description"
            value={description}
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
          <button type="submit">Save</button>
        </form>
      </div>
    </Main>
  );
};
export default CreateProduct;
