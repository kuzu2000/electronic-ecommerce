import { addOrder, isError, isLoading, getOrder , updateOrder } from './OrderSlice';
import {
  showError,
  startLoading,
  getProduct,
  reviewAction,
} from './productSlice';

import {
  registerPending,
  registerSuccess,
  registerFailure,
  loginSuccess,
  loginStart,
  loginFailure,
  updateUser,
} from './userSlice';
import { publicRequest, userRequest } from './requestMethod';

export const register = async (dispatch, user, navigate) => {
  dispatch(registerPending());
  try {
    const res = await publicRequest.post('/auth/register', user);
    dispatch(registerSuccess(res.data));
    navigate('/');
  } catch (error) {
    dispatch(registerFailure(error.response.data.message));
  }
};

export const login = async (dispatch, user, navigate) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('/auth/login', user);
    dispatch(loginSuccess(res.data));
    navigate('/');
  } catch (error) {
    dispatch(loginFailure(error.response.data.message));
  }
};

export const updateAccount = async (dispatch, id, value) => {
  dispatch(loginStart());
  try {
    const res = await userRequest.patch(`/auth/${id}`, value);
    dispatch(updateUser(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getProductDetails = async (dispatch, productId) => {
  dispatch(startLoading());
  try {
    const res = await publicRequest.get(`/products/${productId}`);
    dispatch(getProduct(res.data));
  } catch (error) {
    dispatch(showError());
  }
};

export const addReviewRating = async (dispatch, productId, value) => {
  dispatch(startLoading());
  try {
    const res = await userRequest.post(`/products/${productId}/reviews`, value);
    dispatch(reviewAction(res.data));
  } catch (error) {
    dispatch(showError());
  }
};

export const addOrderItem = async (dispatch, items, navigate) => {
  dispatch(isLoading());
  try {
    const res = await userRequest.post('/orders', items);
    dispatch(addOrder(res.data));
    navigate(`/orders/${res.data._id}`)
  } catch (error) {
    dispatch(isError());
  }
};

export const getOrderItem = async (dispatch, id) => {
  dispatch(isLoading());
  try {
    const res = await publicRequest.get(`/orders/${id}`);
    dispatch(getOrder(res.data));
  } catch (error) {
    dispatch(isError());
  }
};

export const updateOrderItem = async (dispatch, id) => {
  dispatch(isLoading());
  try {
    const res = await userRequest.post(`/orders/paid/${id}`);
    dispatch(updateOrder(res.data));
  } catch (error) {
    dispatch(isError());
  }
}

// export const addCouponFunction = async (dispatch, orderId, value) => {
//   dispatch(startLoading());
//   try {
//     const res = await userRequest.post(`/orders/coupon/${orderId}`, value);
//     dispatch(addCoupon(res.data));
//   } catch (error) {
//     dispatch(showError());
//   }
// };




