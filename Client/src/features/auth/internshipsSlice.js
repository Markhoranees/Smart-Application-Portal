// src/features/internships/internshipsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = 'http://localhost:5000/api/admin'; // Update if different

// Define an asynchronous action to fetch internships
export const fetchInternships = createAsyncThunk(
  'internships/fetchInternships',
  async () => {
    const response = await axios.get(`${API_URL}/internships`); 
    return response.data.data;
  }
);

const internshipsSlice = createSlice({
  name: 'internships',
  initialState: {
    internships: [],
    status: 'idle', // 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInternships.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInternships.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.internships = action.payload;
      })
      .addCase(fetchInternships.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default internshipsSlice.reducer;
