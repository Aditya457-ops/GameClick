import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getFeed = createAsyncThunk (
    'feed/getFeed',
    async(_, { getState }) => {
        const { login } = getState();
        const token = login.token;
        const response = await axios.get(`https://gameclick.onrender.com/path/post/allpost`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data;
        
    }
) 


export const feedSlice = createSlice({
    name: 'feed',
    initialState: {
        posts: [],
        loading: false,
        error: "",
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFeed.pending, (state) => {
                state.loading = true;
            })
            .addCase(getFeed.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(getFeed.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
    }
})

export const {} = feedSlice.actions 
export default feedSlice.reducer