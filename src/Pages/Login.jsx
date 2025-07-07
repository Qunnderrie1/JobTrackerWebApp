import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { loginFailed, loginUser, logoutUser, gettingCredentials } from '../Slices/UserSlice.js'

function Login() {


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")



    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { errorMsg } = useSelector((state) => state.user)

    const handleSubmit = (e) => {
        e.preventDefault();

    }


    const handleLogin = () => {

        console.log("Loggin user....")

        if (!email && !password) {
            return alert("Please enter in a value")
        }
        axios.post("https://jobtrackerbackend-5ovy.onrender.com/user/login", {
            email: email,
            password: password
        }, { withCredentials: true }).then((res) => {
            // Loading user credentials
            dispatch(gettingCredentials())
            if (res.data) {
                // Login user in
                dispatch(loginUser(res.data))
                navigate('/dashboard')
                console.log(res.data)

            }


        }
            // If login failed
        ).catch(() => console.log(dispatch(loginFailed())))

    }

    return (
        <div className='flex bg-white login '>
            <img />
            <div className='container h-[100vh] flex items-center justify-center'>
                <form onSubmit={handleSubmit} className='w-[500px] h-fit pb-10 bg-white rounded-lg  px-8 '>
                    <div className=' py-4'>
                        <div className='flex flex-col py-[20px]'>
                            <div className='flex justify-center h-fit gap-2 '>
                                <div className='bg-indigo-600 w-[6px] h-[40px] rounded-full'></div>
                                <div className='bg-indigo-600 w-[6px] h-[30px] rounded-full'></div>
                                <div className='bg-indigo-600 w-[6px] h-[20px] rounded-full'></div>

                            </div>
                            <div>
                                <p className='font-bold text-2xl  text-indigo-900'>JobTracker</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className='text-3xl  font-semibold text-center text-gray-700 mt-[20px] '>Welcome!</p>
                        <p className='text-center font-normal text-gray-700 text-[14px] '>Sign in to your account.</p>
                    </div>

                    {
                        errorMsg ? <div className='mt-4'>
                            <p className='text-red-900 bg-red-200 py-2 text-[12px]'>Username or Password was incorrect, please try again.</p>
                        </div> : <p></p>
                    }

                    <div className='mt-[60px] flex flex-col gap-8'>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} className='form-control' placeholder='Email Address' />
                        <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} className='form-control' placeholder='Password' />
                    </div>
                    <button onClick={handleLogin} className='mt-14 bg-indigo-600 w-full py-2 text-white font-semibold rounded-md'>Login</button>

                    <div className='mt-7'>
                        <p className='text-[14px]'>Don't have an account? <Link to='https://jobtrackerwebapp.onrender.com/signup' className='text-indigo-600 font-semibold'>Sign Up</Link></p>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Login