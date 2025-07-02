import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const setToken = createAsyncThunk(
  'login/setToken',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      
      const res = await axios.post("http://localhost:4000/path/auth/login", {
        username,
        password
      });
      return res.data;
    } catch (err) {
      if (err.response?.status === 401) {
        return rejectWithValue("User not found");
      } else if (err.response?.status === 402) {
        return rejectWithValue("Incorrect password");
      }
      return rejectWithValue("Something went wrong");
    }
  }
);

const logSlice = createSlice({
  name: 'login',
  initialState: {
    token: "",
    username: "",
    userId: "",
    logged: false,
    loading: false,
    error: null
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setLogged: (state) => {
      state.logged = true;
    },
    setState: (state) => {
      state.logged = false;
      state.username = "";
      state.token = "";
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(setToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setToken.fulfilled, (state, action) => {
        state.loading = false;
        state.logged = true;
        state.token = action.payload.token;
        state.userId = action.payload.user.id;
        state.error = null;
      })
      .addCase(setToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setLogged, setUsername, setState } = logSlice.actions;
export default logSlice.reducer;
