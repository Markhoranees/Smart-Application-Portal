import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import jobsReducer from './features/auth/jobsSlice';
import scholarshipsReducer from './features/auth/scholarshipsSlice';
import internshipsReducer from './features/auth/internshipsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobsReducer,
    scholarships: scholarshipsReducer,
    internships: internshipsReducer,

  },
});
