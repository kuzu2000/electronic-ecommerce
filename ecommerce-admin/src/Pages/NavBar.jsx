import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';
import { Link } from 'react-router-dom';
const NavBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <nav>
      <div className="navbar">
        <a href="" className="nav-brand">
          Dashboard
        </a>
        <ul className="nav-main">
          {user.currentUser?.result.isAdmin && (
            <>
              <li>Admin</li>
              <li onClick={() => dispatch(logout())}>Logout</li>{' '}
            </>
          )}
          {!user.currentUser?.result.isAdmin && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
