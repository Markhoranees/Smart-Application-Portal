// src/redux/jobsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = 'http://localhost:5000/api/admin'; // Update if different


// Async thunk to fetch jobs from the API
export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
  const response = await axios.get(`${API_URL}/jobs`);  // This assumes your API is hosted locally at '/api/jobs'
  return response.data.data;  // Adjust according to the response data format
});

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default jobsSlice.reducer;
