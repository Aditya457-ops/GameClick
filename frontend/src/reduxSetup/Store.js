import { configureStore } from '@reduxjs/toolkit'
import logReducer from './Slices/logSlice'
import signReducer from './Slices/signSlice'
import feedReducer from './Slices/feedSlice'
import userPostReducer from './Slices/userPostSlice'
import likePostReducer from './Slices/likePostSlice'

const store =  configureStore({
  reducer: {
    login: logReducer,
    signup: signReducer,
    feed: feedReducer,
    userpost: userPostReducer,
    likepost: likePostReducer
  },
})

export default store