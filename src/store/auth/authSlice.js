import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  isAuthenticated: false,
  role: null,
  token: null,
  email: null,
  userId: null
};

if (localStorage.getItem("access_token")) {
  initialState = JSON.parse(localStorage.getItem("userInfo")) 
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.email = action.payload.email;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.role = null;
      state.token = null;
      state.email = null;
      localStorage.removeItem("access_token")
      localStorage.removeItem("userInfo")
    },

  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
