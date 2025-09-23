import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: [],
  signupSuccess: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginBegin(state) {
      state.loading = true;
      state.error = null;
      state.signupSuccess = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      state.signupSuccess = null;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },

    signupBegin(state) {
      state.loading = true;
      state.error = null;
      state.signupSuccess = null;
    },
    signupSuccess(state) {
      state.loading = false;
      state.signupSuccess = true;
      state.error = null;
    },
    signupFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
      state.signupSuccess = false;
    },

    logout(state) {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = [];
      state.signupSuccess = null;
    },
  },
});

export const {
  loginBegin,
  loginSuccess,
  loginFailure,
  signupBegin,
  signupSuccess,
  signupFailure,
  logout,
} = authSlice.actions;

export const isAuthenticated = (state) => !!state.auth.token;

export default authSlice.reducer;
