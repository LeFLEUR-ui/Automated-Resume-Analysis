import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token');
const initialState = {
  user: token ? localStorage.getItem('saved_email') : null,
  role: token ? localStorage.getItem('role') : 'Guest',
  profileImageUrl: token ? localStorage.getItem('profile_image_url') : null,
  isAuthenticated: !!token,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, role, profileImageUrl } = action.payload;
      state.user = user;
      state.role = role;
      state.profileImageUrl = profileImageUrl;
      state.isAuthenticated = true;
      
      // Sync with localStorage
      localStorage.setItem('saved_email', user);
      localStorage.setItem('role', role);
      if (profileImageUrl) localStorage.setItem('profile_image_url', profileImageUrl);
    },
    logout: (state) => {
      state.user = null;
      state.role = 'Guest';
      state.profileImageUrl = null;
      state.isAuthenticated = false;
      
      localStorage.clear();
    },
    updateProfileImage: (state, action) => {
      state.profileImageUrl = action.payload;
      localStorage.setItem('profile_image_url', action.payload);
    }
  },
});

export const { setCredentials, logout, updateProfileImage } = authSlice.actions;
export default authSlice.reducer;
