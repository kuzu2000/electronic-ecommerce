import React, { useState, useRef, useEffect } from 'react';
import Logo from './../assets/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/userSlice';
const NavBar = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const auth = user.currentUser?.result?._id;
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const btnRef = useRef();

  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
    navigate('/login');
  };

  const searchProducts = async () => {
    if (search.trim()) {
      navigate(`/products/search?searchQuery=${search}`);
    } else {
      navigate('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchProducts();
    }
  };

  useEffect(() => {
    const closePopUp = (e) => {
      if (e.path[0] !== btnRef.current) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', closePopUp);

    return () => document.body.removeEventListener('click', closePopUp);
  }, []);

  return (
    <nav>
      <div className="navbar">
        <Link to="/" className="link">
          <img src={Logo} alt="Home" width="80" height="80" />
        </Link>
        <div className={searchOpen ? 'search-input open' : 'search-input'}>
          <input
            type="text"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            onKeyDown={handleKeyPress}
          />
          <i className="fas fa-search"></i>
        </div>
        <div className="nav-split">
          <div
            className="search-menu"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <i className="fas fa-search"></i>
          </div>
          <div className="dropdown">

              <i className="fas fa-user"   ref={btnRef}
              onClick={() => setOpen(!open)}></i>
            <div
              className={!open ? 'dropdown-content none' : 'dropdown-content'}
            >
              {auth ? (
                <>
                  <Link to="/my-account" className="slide link">
                    My Account
                  </Link>
                  <Link to="/orders" className="slide link">
                    My Orders
                  </Link>
                  <a
                    style={{ cursor: 'pointer' }}
                    className="slide link"
                    onClick={handleLogout}
                  >
                    Logout
                  </a>
                </>
              ) : (
                <>
                  <Link to="/login" className="slide link">
                    Login
                  </Link>
                  <Link to="/register" className="slide link">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="nav-item">
            <Link to="/cart" className="link">
              <i className="fas fa-shopping-bag"></i>
              {cart.cart?.length >= 1 && (
                <span className="count">{cart.cart?.length}</span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
