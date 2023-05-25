import {
  registerPending,
  registerSuccess,
  registerFailure,
  loginSuccess,
  loginStart,
  loginFailure,
} from './userSlice';
import {
  createProduct,
  showError,
  startLoading,
  deleteProduct,
  updateProduct,
} from './productSlice';
import { loading, error, createCoupon } from './couponSlice';
import {LOADING, ERROR, createCategory} from './categorySlice'
import { publicRequest, userRequest } from './requestMethod';

export const login = async (dispatch, user, navigate) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('/auth/login', user);
    dispatch(loginSuccess(res.data));
    navigate('/categories');
  } catch (error) {
    dispatch(loginFailure(error.response.data.message));
  }
};

export const addProduct = async (dispatch, values, navigate) => {
  dispatch(startLoading());
  try {
    const res = await userRequest.post('/products', values);
    dispatch(createProduct(res.data));
    navigate('/products');
  } catch (error) {
    dispatch(showError(error.response.data.message));
  }
};

export const editProduct = async (dispatch, id, values, navigate) => {
  dispatch(startLoading());
  try {
    const res = await userRequest.patch(`/products/update/${id}`, values);
    dispatch(updateProduct({_id: res.data._id, product: res.data}));
    navigate('/products')
    console.log(res.data._id)
  } catch {
    dispatch(showError());
  }
};

export const destroyProduct = async (dispatch, id, values, navigate) => {
  dispatch(startLoading());
  try {
    const res = await userRequest.delete(`/products/delete/${id}`, values);
    dispatch(deleteProduct(res.data));
    navigate('/products');
  } catch (error) {
    dispatch(showError(error.response.data.message));
  }
};

export const addCategory = async (dispatch, values, navigate) => {
  dispatch(LOADING());
  try {
    const res = await userRequest.post('/category', values);
    dispatch(createCategory(res.data));
    navigate('/categories');
  } catch (error) {
    dispatch(ERROR(error.response.data.message));
  }
};

export const addCoupon = async (dispatch, values, navigate) => {
  dispatch(loading());
  try {
    const res = await userRequest.post('/coupon', values);
    dispatch(createCoupon(res.data));
    navigate('/coupons');
  } catch (error) {
    dispatch(error(error.response.data.message));
  }
};
