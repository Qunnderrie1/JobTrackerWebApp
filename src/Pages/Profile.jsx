import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Profile() {

    const navigate = useNavigate();


    const handleLogout = () => {
        axios.post(`https://jobtrackerbackend-5ovy.onrender.com/user/logout`)
            .then(() => console.log("logging user out"))
            .catch(() => console.log("error login user out"))
        navigate('/')
    }

    const handleDeleteAccount = () => {
        axios.delete(`https://jobtrackerbackend-5ovy.onrender.com/user/delete`)
            .then(() => console.log("deleting user account"))
            .catch(() => console.log("error delete user account"))
        navigate('/')
    }


    const { user } = useSelector(state => state.user)


    return (
        <div className='container'>
            <div className=' h-full w-full flex flex-col items-center justify-center  mt-[100px] ' >
                <div className=''>
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
                <div className='mt-[80px] flex flex-col gap-8'>
                    <button onClick={handleLogout} className='bg-white border-red-600 border-2 font-semibold rounded-sm text-red-600 w-[200px] py-1'>Logout</button>
                    <button onClick={handleDeleteAccount} className='bg-red-600 text-white w-[200px] py-1'>Delete Account</button>
                </div>

            </div>
        </div >
    )
}

export default Profile