import React, {useState} from 'react';
import { Link } from 'react-router-dom'
const Sidebar = () => {
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [open3, setOpen3] = useState(false)
  return (
    <div className="sidebar">
      <div className="sidebar-items">
        <div className="sidebar-item">Dashboard</div>
        <div className="sidebar-item" onClick={() => setOpen(!open)}>Products</div>
        <ul className={open ? 'sidebar-dropdown show' : 'sidebar-dropdown'}>
          <li><Link to="/products">Product List</Link></li>
          <li><Link to="/create-product">Create Product</Link></li>
        </ul>
        <div className="sidebar-item" onClick={() => setOpen2(!open2)}>Coupon</div>
        <ul className={open2 ? 'sidebar-dropdown show' : 'sidebar-dropdown'}>
          <li><Link to="/coupons">Coupon List</Link></li>
          <li><Link to="/create-coupon">Create Coupon</Link></li>
        </ul>
        <div className="sidebar-item" onClick={() => setOpen3(!open3)}>Category</div>
        <ul className={open3 ? 'sidebar-dropdown show' : 'sidebar-dropdown'}>
          <li><Link to="/categories">Category List</Link></li>
          <li><Link to="/create-category">Create Category</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
