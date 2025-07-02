import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserPost = createAsyncThunk (
    

    'userpost/getUserPost',
    async(_, { getState }) => {
        const { login } = getState();
        const token = login.token;
        const response = await axios.get(`http://localhost:4000/path/post/myposts`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return response.data;
    }
) 

export const userPostSlice = createSlice({
    name: 'userpost',
    initialState: {
        userposts: [],
        loading: false,
        error: "",
        mode: "user"
    },
    reducers: {
        setMode: (state, action) => {
            state.mode = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserPost.fulfilled, (state, action) => {
                state.loading = false;
                state.userposts = action.payload;
            })
            .addCase(getUserPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
    }
})

export const { setMode } = userPostSlice.actions
export default userPostSlice.reducer