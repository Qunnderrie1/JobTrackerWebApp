import { faHome, faUserAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
function NavBar() {
    return (
        <div className=''>
            <nav className='bg-indigo-700 p-3 absolute left-0 h-[100vh] w-fit max-md:w-full max-md:bottom-0 max-md:h-fit '>
                <div className='container flex flex-col items-center justify-between z-0'>
                    <div className='mt-10 max-md:mt-2 max-md:flex flex flex-col gap-10 max-md:flex-row'>
                        <FontAwesomeIcon icon={faHome} className='text-white text-[20px] cursor-pointer' />
                        <Link to='/profile'>
                            <FontAwesomeIcon icon={faUserCircle} className='text-xl text-white' />
                        </Link>
                    </div>
                </div>

            </nav>

        </div>
    )
}

export default NavBar