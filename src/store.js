import { configureStore } from '@reduxjs/toolkit'
import JobReducer from './Slices/JobSlice'
import UserReducer from './Slices/UserSlice.js'
export default configureStore({
    reducer: {
        currentJob: JobReducer,
        user: UserReducer
    },
})