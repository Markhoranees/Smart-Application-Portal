// src/redux/jobsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = 'http://localhost:5000/api/admin'; // Update if different


// Async thunk to fetch jobs from the API
export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
  const response = await axios.get(`${API_URL}/jobscrape`);  // This assumes your API is hosted locally at '/api/jobs'
  return response.data.data;  // Adjust according to the response data format
});

export const fetchRozeeJobs = createAsyncThunk(
  'rozeeJobs/fetchRozeeJobs',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/jobscrape`);
      return response.data.data; // return jobs array
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.error || 'Failed to fetch jobs');
    }
  }
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    newJobs: [],
    jobs: [],
    status: 'idle',
    error: null,
    loading: false,
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
      })
      .addCase(fetchRozeeJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRozeeJobs.fulfilled, (state, action) => {
        state.newJobs = action.payload;
        state.loading = false;
      })
      .addCase(fetchRozeeJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default jobsSlice.reducer;
