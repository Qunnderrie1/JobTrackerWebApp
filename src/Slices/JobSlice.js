import { createSlice } from "@reduxjs/toolkit";


export const jobSlice = createSlice({
    name: 'currentJob',
    initialState: {
        id: "",
        job: {}
    },

    reducers: {
        getCurrentJob: (state, action) => {
            state.job = action.payload
        }

    }
})


export const { getCurrentJob } = jobSlice.actions

export default jobSlice.reducer

