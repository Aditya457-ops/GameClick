import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getLikePost = createAsyncThunk (
    
    'likepost/getLikePost',
    async(_, { getState }) => {
        const { login } = getState();
        const token = login.token;
        const response = await axios.get("https://gameclick.onrender.com/path/post/likeposts", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return response.data;
    }
) 

export const likePostSlice = createSlice({
    name: 'likepost',
    initialState: {
        likeposts: [],
        loading: false,
        error: ""
    },
    reducers: {
    
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLikePost.pending, (state) => {
                state.loading = true;
            })
            .addCase(getLikePost.fulfilled, (state, action) => {
                state.loading = false;
                state.likeposts = action.payload;
            })
            .addCase(getLikePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
    }
})

export const {} = likePostSlice.actions
export default likePostSlice.reducer