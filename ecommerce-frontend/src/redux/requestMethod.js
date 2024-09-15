import axios from 'axios';

const BASE_URL = 'https://electronic-ecommerce-api.vercel.app/api';

// Get 'persist:root' from localStorage
const persistRoot = localStorage.getItem('persist:root');


// Parse 'persist:root' if it exists
const user = persistRoot ? JSON.parse(persistRoot).user : null;


// Ensure 'user' is parsed and 'currentUser' exists
const currentUser = user ? JSON.parse(user).currentUser : null;


// Retrieve token from currentUser
const TOKEN = currentUser?.token;


// Axios instance for public requests (no auth token needed)
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

// Axios instance for authenticated requests (with token)
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${TOKEN}` },
});
