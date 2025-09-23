import axios from 'axios';
import { 
  loginBegin, 
  loginSuccess, 
  loginFailure, 
  signupBegin, 
  signupSuccess, 
  signupFailure, 
  logout as logoutAction 
} from '../slices/authSlice';

const BASE_API_URL = 'http://localhost:3000';

const storeAuthData = (user, token) => {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
};

export const login = (credentials) => {
  return async (dispatch) => {
    dispatch(loginBegin());
    try {
      const response = await axios.post(
        `${BASE_API_URL}/login`,
        JSON.stringify(credentials),
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { user, token } = response.data;
      storeAuthData(user, token);
      dispatch(loginSuccess({ user, token }));
      return { type: 'login/loginSuccess', data: response.data };

    } catch (error) {
      const errorMessages = error.response?.data?.errors || ['Login failed'];
      dispatch(loginFailure({ error: errorMessages }));
      return { type: 'login/loginFailure', error: errorMessages };
    }
  };
};

export const signup = (data) => {
  return async (dispatch) => {
    dispatch(signupBegin());
    try {
      const response = await axios.post(
        `${BASE_API_URL}/signup`,
        JSON.stringify(data),
        { headers: { 'Content-Type': 'application/json' } }
      );
      dispatch(signupSuccess());
      return { type: 'signup/signupSuccess', data: response.data };
    } catch (error) {
      const errorMessages = error.response?.data?.errors || ['Signup failed'];
      dispatch(signupFailure({ error: errorMessages }));
      return { type: 'signup/signupFailure', error: errorMessages };
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    dispatch(logoutAction());
  };
};
