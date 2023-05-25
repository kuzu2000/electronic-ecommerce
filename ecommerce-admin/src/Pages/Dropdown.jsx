import React, {useState} from 'react';
import { Link } from 'react-router-dom'
const Dropdown = () => {
    const [open, setOpen] = useState(false)
  return (
    <>
        <div className="sidebar-item" onClick={() => setOpen(!open)}>Products</div>
        <ul className={open ? 'sidebar-dropdown show' : 'sidebar-dropdown'}>
          <li><Link to="/products">Product List</Link></li>
          <li><Link to="/create-product">Create Product</Link></li>
        </ul>
        <div className="sidebar-item" onClick={() => setOpen(!open)}>Coupon</div>
        <ul className={open ? 'sidebar-dropdown show' : 'sidebar-dropdown'}>
          <li><Link to="/coupons">Coupon List</Link></li>
          <li><Link to="/create-product">Create Product</Link></li>
        </ul>
        </>
  );
};

export default Dropdown;
