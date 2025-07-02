import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const setUser = createAsyncThunk(
  'signup/setUser',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`https://gameclick.onrender.com/path/auth/signin`, {
        username,
        email,
        password
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        return rejectWithValue("mail already registered");
      } else if (error.response && error.response.status === 408) {
        return rejectWithValue("username not available");
      }

      return rejectWithValue("Something went wrong. Please try again.");
    }
  }
);

export const signSlice = createSlice({
  name: 'signup',
  initialState: {
    haveAcc: false,
    loading: false,
    error: null
  },
  reducers: {
    setHaveAcc: (state) => {
      state.haveAcc = !state.haveAcc;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(setUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(setUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Signup failed";
      });
  }
});

export const { setHaveAcc } = signSlice.actions;
export default signSlice.reducer;
