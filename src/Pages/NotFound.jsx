import { faSadCry, faSadTear, faStop } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className='h-[100vh] flex gap-10 flex-col justify-center items-center'>
            <h1 className='text-[40px] font-bold'>Page Not Found</h1>
            <p >Go Back <Link to='/dashboard' className='text-indigo-600 font-semibold'>Home</Link></p>
        </div>
    )
}

export default NotFound