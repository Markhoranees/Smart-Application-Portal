import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import jobsReducer from './features/auth/jobsSlice';
import scholarshipsReducer from './features/auth/scholarshipsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobsReducer,
    scholarships: scholarshipsReducer,

  },
});
