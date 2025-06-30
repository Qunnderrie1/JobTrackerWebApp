import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        isAuth: false,
        isLoading: false,
        errorMsg: false

    },

    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload
            state.isLoading = false
            state.isAuth = true
        },
        gettingCredentials: (state) => {
            state.isLoading = true

        },
        logoutUser: (state) => {
            state.user = {}
            state.errorMsg = false
            state.isLoading = false
            state.isAuth = false

        },
        loginFailed: (state) => {
            state.errorMsg = true
            state.isLoading = false
            state.isAuth = false


        }

    }
})


export const { loginUser, loginFailed, logoutUser, gettingCredentials } = userSlice.actions

export default userSlice.reducer

