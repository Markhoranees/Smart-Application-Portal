import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = 'http://localhost:5000/api/admin'; // Update if different

// Async Thunk to fetch scholarships from the API
export const fetchScholarships = createAsyncThunk('scholarships/fetchScholarships', async () => {
  const response = await axios.get(`${API_URL}/getscholarships`); // Adjust the API URL accordingly
  return response.data.data;
});


export const scrapeScholarships = createAsyncThunk(
  'scholarships/scrapeScholarships',
  async () => {
    const response = await axios.get(`${API_URL}/scrape`); // Adjust API endpoint
    return response.data.data;
  }
);
const scholarshipsSlice = createSlice({
  name: 'scholarships',
  initialState: {
    scholarships: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchScholarships.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchScholarships.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.scholarships = action.payload;
      })
      .addCase(fetchScholarships.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(scrapeScholarships.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(scrapeScholarships.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.scholarships = action.payload;
      })
      .addCase(scrapeScholarships.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default scholarshipsSlice.reducer;
