import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../Slices/UserSlice'

function Profile() {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleLogout = () => {
        axios.post(`https://jobtrackerbackend-5ovy.onrender.com/user/logout`, { withCredentials: true })
            .then(() => console.log("User has logout"))
            .catch(() => console.log("error login user out"))
        dispatch(logoutUser())
        navigate('/')
    }

    const handleDeleteAccount = () => {
        axios.delete(`https://jobtrackerbackend-5ovy.onrender.com/user/delete`, { withCredentials: true })
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err.message))
        navigate('/')
    }


    const { user } = useSelector(state => state.user)


    return (
        <div className='container'>

            <div className=' h-full w-full flex flex-col items-center justify-center  mt-[100px] ' >
                <div className='flex'>
                    <FontAwesomeIcon className='text-[80px]' icon={faUserCircle} />
                </div>
                <div className='flex flex-col gap-8'>
                    <div className='mt-[100px] flex justify-between gap-20 items-center'>
                        <p className='font-semibold max-sm:text-[14px]'>Username</p>
                        <input disabled className='border-2 px-2 py-1' placeholder={user.username} />
                    </div>
                    <div className=' flex gap-20 items-center'>
                        <p className='font-semibold max-sm:text-[14px]'>Email Address</p>
                        <input disabled className='border-2 px-2 py-1' placeholder={user.email} />
                    </div>
                    <div className=' flex gap-20 justify-between items-center'>
                        <p className='font-semibold max-sm:text-[14px]'>Password</p>
                        <input disabled className='border-2 px-2 py-1' placeholder="*********" />
                    </div>

                </div>
                <div className='mt-[80px] flex  gap-8 px-2'>
                    <button onClick={handleLogout} className='bg-white border-red-600 border-2 font-semibold rounded-md text-red-600 w-[150px] py-1'>Logout</button>
                    <button onClick={handleDeleteAccount} className='bg-red-600 text-white w-[150px] rounded-md py-1'>Delete Account</button>
                </div>
                <div className='flex gap-2 mt-20'>
                    <p>Go back</p>
                    <Link to="/dashboard" className='text-indigo-600 font-semibold'>Home</Link>
                </div>

            </div>
        </div >
    )
}

export default Profile