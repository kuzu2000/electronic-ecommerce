import './App.css';
import Content from './Pages/Content';
import CreateProduct from './Pages/CreateProduct';
import Login from './Pages/Login';
import NavBar from './Pages/NavBar';
import EditProduct from './Pages/EditProduct'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from './Pages/Products';
import Coupons from './Pages/Coupons'
import CreateCoupon from './Pages/CreateCoupon';
import Categories from './Pages/Categories'
import CreateCategory from './Pages/CreateCategory';
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/coupons" element={<Coupons />} />
        <Route path="/create-coupon" element={<CreateCoupon />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/create-category" element={<CreateCategory />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
