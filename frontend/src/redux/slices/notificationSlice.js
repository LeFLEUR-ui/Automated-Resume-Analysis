import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
  unreadCount: 0,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
      state.unreadCount = action.payload.filter(n => !n.read).length;
    },
    addNotification: (state, action) => {
      state.notifications = [action.payload, ...state.notifications];
      state.unreadCount += 1;
    },
    markAllRead: (state) => {
      state.notifications = state.notifications.map(n => ({ ...n, read: true }));
      state.unreadCount = 0;
    },
  },
});

export const { setNotifications, addNotification, markAllRead } = notificationSlice.actions;
export default notificationSlice.reducer;
