import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

function SignUp() {


    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")



    const navigate = useNavigate();

    const { errorMsg, isLoading } = useSelector((state) => state.user)

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
                    <p className='text-center font-semibold text-xl'>Create An Account</p>
                    <div className='mt-[60px] flex flex-col gap-8'>
                        <input maxLength="20" onChange={(e) => setUsername(e.target.value)} value={username} className='form-control' placeholder='Username' />
                        <input maxLength="20" onChange={(e) => setEmail(e.target.value)} value={email} className='form-control' placeholder='Email Address' />
                        <input maxLength="8" type='password' onChange={(e) => setPassword(e.target.value)} value={password} className='form-control' placeholder='Password' />
                    </div>
                    <button disabled={isLoading ? true : false} onClick={handleSignUp} className={isLoading ? 'mt-14 bg-indigo-500 w-full py-2 text-white font-semibold rounded-md' : 'mt-14 bg-indigo-600 w-full py-2 text-white font-semibold rounded-md'}>{isLoading ? "Please wait while your account is being created." : "Sign Up"}</button>
                    <div className='mt-7'>
                        <p className='text-[14px]'>Already have an account? <Link to='/' className='text-indigo-600 font-semibold'>Login</Link></p>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default SignUp