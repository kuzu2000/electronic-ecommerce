import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import './App.css';
import NavBar from './Components/NavBar';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import ProductsPage from './Pages/ProductsPage';
import ProductDetailPage from './Pages/ProductDetailPage';
import CartPage from './Pages/CartPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import ShippingPage from './Pages/ShippingPage';
import PlaceOrderPage from './Pages/PlaceOrderPage';
import OrderDetailPage from './Pages/OrderDetailPage';
import MyAccountPage from './Pages/MyAccountPage';
import MyOrdersPage from './Pages/MyOrdersPage';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const promise = loadStripe(
  'pk_test_51Ku0eaKNsPpoql9XEOvBDUwcx9sWFeNmMwnYt3maCcPbFzdSI6iskgLKbjWFNkDQnEqu2sOf2thralW3mr20Knc900KNjKQKsH'
);
function App() {
  const user = useSelector((state) => state.user);
  const { currentUser } = user;

  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <NavBar />
        <Routes>
          <Route exact path="/" element={<ProductsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/search" element={<ProductsPage />} />
          <Route exact path="/products/:id" element={<ProductDetailPage />} />
          <Route exact path="/cart" element={<CartPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route
            exact
            path="/shipping"
            element={
              currentUser && currentUser?.result ? (
                <ShippingPage />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            exact
            path="/place-order"
            element={
              currentUser && currentUser?.result ? (
                <PlaceOrderPage />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            exact
            path="/my-account"
            element={
              currentUser && currentUser?.result ? (
                <MyAccountPage />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            exact
            path="/orders"
            element={
              currentUser && currentUser?.result ? (
                <MyOrdersPage />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            exact
            path="/orders/:id"
            element={
              <Elements stripe={promise}>
                <OrderDetailPage />
              </Elements>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
