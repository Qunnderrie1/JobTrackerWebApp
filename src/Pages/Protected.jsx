import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Login from './Login'



function Protected() {

    const { isAuth } = useSelector(state => state.user)
    return isAuth ? <Outlet /> : <Login />
}


export default Protected