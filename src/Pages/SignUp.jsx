import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

function SignUp() {


    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")



    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { errorMsg } = useSelector((state) => state.user)

    const handleSubmit = (e) => {
        e.preventDefault();

    }


    // User Sign Method
    const handleSignUp = () => {
        if (!username && !password && !email) {
            return alert("Please enter in a value")
        }
        axios.post("https://jobtrackerbackend-5ovy.onrender.com/user/new", {
            username: username,
            password: password,
            email: email
        }).then((res) => {
            if (res.data) {
                navigate("/")
            }
        }
        ).catch(() => console.log("Failed to create user."))

    }

    return (
        <div className='flex '>
            <div className='container h-[100vh] bg-white flex items-center justify-center'>
                <form onSubmit={handleSubmit} className='w-[500px] h-fit pb-10 bg-white rounded-lg px-8  '>
                    <div className='mt-[20px] py-4'>
                        <p className='text-3xl  font-semibold text-center text-gray-700 '>Create an Account</p>
                    </div>
                    <div className='mt-[60px] flex flex-col gap-8'>
                        <input maxLength="20" onChange={(e) => setUsername(e.target.value)} value={username} className='form-control' placeholder='Username' />
                        <input maxLength="20" onChange={(e) => setEmail(e.target.value)} value={email} className='form-control' placeholder='Email Address' />
                        <input maxLength="8" type='password' onChange={(e) => setPassword(e.target.value)} value={password} className='form-control' placeholder='Password' />
                    </div>
                    <button onClick={handleSignUp} className='mt-14 bg-blue-600 w-full py-2 text-white font-semibold rounded-md'>Sign Up</button>

                    <div className='mt-7'>
                        <p className='text-[14px]'>Already have an account? <Link to='/' className='text-blue-600'>Login</Link></p>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default SignUp