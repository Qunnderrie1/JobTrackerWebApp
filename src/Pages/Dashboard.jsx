import React, { useEffect, useState } from 'react'
import CustomCard from '../Components/CustomCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDotCircle, faHandDots, faListDots, faPencil, faTrashCan, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentJob } from '../Slices/JobSlice'
import { changeStatusColor } from '../Helper/changeStatusColor'
import { shortWord } from '../Helper/shortWord'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer'
import NavBar from '../Components/NavBar'



function Dashboard() {

    const [openNewJobModal, setOpenNewJobModal] = useState(false);
    const [nonUserName, setNonUserName] = useState("Guest");
    const [openUpdateJobModal, setOpenUpdateModal] = useState(false);
    const [jobs, setJobs] = useState([{}])

    //  Dispatch function from job slices
    const dispatch = useDispatch();

    // get time
    const time = new Date().getHours();





    //  Get the current job id 
    const { job } = useSelector((state) => state.currentJob)
    // Get the login user info
    const { user } = useSelector((state) => state.user)
    // State managment for job applications
    const [jobApp, setJobApp] = useState({
        jobTitle: "",
        companyName: "",
        location: "",
        link: "",
        dateApplied: "",
        status: ""
    })
    // Update job state management
    const [updateJob, setUpdateJob] = useState({
        jobTitle: "",
        companyName: "",
        location: "",
        link: "",
        dateApplied: "",
        status: ""
    })

    // Get fetch all jobs & keep track of any changes
    useEffect(() => {
        axios.get('https://jobtrackerbackend-5ovy.onrender.com/jobs', { withCredentials: true })
            .then((res) => setJobs(res.data))
            .catch((error) => console.log('Failed to get user jobs ' + error.message))

    }, [jobs])


    // Create a new job function
    const handleNewJob = () => {
        axios.post('https://jobtrackerbackend-5ovy.onrender.com/jobs', {
            jobTitle: jobApp.jobTitle,
            companyName: jobApp.companyName,
            location: jobApp.location,
            link: jobApp.link,
            dateApplied: jobApp.dateApplied,
            status: jobApp.status,
        }, { withCredentials: true })
            .then((res) => setUpdateJob(res.data))
            .catch(() => console.error('Failed to create job.'))
        // Set job state managment back to empty state
        setJobApp({
            jobTitle: "",
            companyName: "",
            location: "",
            link: "",
            dateApplied: "",
            status: "",
        })
        // Close job modal
        setOpenNewJobModal(false)
    }


    // Update job function
    const handleSaveChanges = () => {

        axios.put(`https://jobtrackerbackend-5ovy.onrender.com/jobs/${job}`, {
            jobTitle: updateJob.jobTitle,
            companyName: updateJob.companyName,
            link: updateJob.link,
            location: updateJob.location,
            dateApplied: updateJob.dateApplied,
            status: updateJob.status,
        }, { withCredentials: true })
            .then(() => console.log("job has been updated"))
            .catch(() => console.log("falied to update job"))

        setOpenUpdateModal(false)

    }

    // Get selected job by user
    const handleUpdateJob = (id) => {
        setOpenUpdateModal(true)
        axios.get(`https://jobtrackerbackend-5ovy.onrender.com/jobs/${id}`, { withCredentials: true })
            .then((res) => setUpdateJob(res.data[0]))
            .catch((err) => console.log(err))
        dispatch(getCurrentJob(id))
    }

    // Delete job by Id function 
    const handleDeleteJob = (id) => {
        axios.delete(`https://jobtrackerbackend-5ovy.onrender.com/jobs/${id}`, { withCredentials: true })
            .then(() => console.log("Job has been deleted"))
            .catch(() => console.log("failed to delete job"))

    }


    return (
        <div className={openUpdateJobModal ? "overflow-hidden" : ""}>

            {/* New Job Modal */}
            <div className={openNewJobModal ? 'bg-black w-full h-[100vh] absolute top-0 left-0 bg-opacity-50 flex items-center justify-center max-sm:px-2  z-10' : 'hidden'}>
                <div className='bg-white w-[600px] h-fit pb-8 rounded-lg px-4 relative'>
                    <button onClick={() => setOpenNewJobModal(false)} className="btn btn-close absolute right-6 top-8"></button>
                    <p className='text-2xl text-left font-semibold mt-7'>Create A New Job</p>
                    <p className='text-left text-[14px] text-gray-600'>Fill out the information below to create a new job</p>

                    <div className='flex flex-col gap-4 pt-8'>
                        <div className='flex flex-col gap-1'>
                            <input maxLength="20" onChange={(e) => setJobApp(prev => ({ ...prev, jobTitle: e.target.value }))} value={jobApp.jobTitle} className='form-control ' placeholder='Job Title' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <input maxLength="20" onChange={(e) => setJobApp(prev => ({ ...prev, companyName: e.target.value }))} value={jobApp.companyName} className='form-control ' placeholder='Company Name' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <input maxLength="250" onChange={(e) => setJobApp(prev => ({ ...prev, link: e.target.value }))} value={jobApp.link} className='form-control ' placeholder='Application Link' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <select onChange={(e) => setJobApp(prev => ({ ...prev, location: e.target.value }))} value={jobApp.location} className='form-select '>
                                <option value="">Select Location</option>
                                <option value="Remote">Remote</option>
                                <option value="On-Site">On-Site</option>
                            </select>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <input maxLength="20" onChange={(e) => setJobApp(prev => ({ ...prev, dateApplied: e.target.value }))} value={jobApp.dateApplied} type='date' className='form-control ' placeholder='Date Applied' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <select onChange={(e) => setJobApp(prev => ({ ...prev, status: e.target.value }))} value={jobApp.status} className='form-select '>
                                <option value="">Choose job status</option>
                                <option value="Applied">Applied</option>
                                <option value="Interviewed">Interviewed</option>
                                <option value="Offer">Offer</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                    <button onClick={handleNewJob} className='bg-indigo-600 w-full mt-14 py-2 text-white font-semibold text-[18px] rounded-lg'>Submit</button>

                </div>
            </div>


            {/* Update Job Modal */}
            <div className={openUpdateJobModal ? 'bg-black w-full h-[100vh] absolut top-0 left-0 bottom-0 bg-opacity-50 flex items-center justify-center max-sm:px-2 max-sm:bottom-0 max-sm:top-40  z-40' : 'hidden'}>
                <div className='bg-white w-[600px] h-fit pb-8 rounded-lg px-4 relative'>
                    <button onClick={() => setOpenUpdateModal(false)} className="btn btn-close absolute right-6 top-8"></button>
                    <p className='text-2xl text-left font-semibold mt-7'>Update Job Application</p>
                    <p className='text-left text-[14px] text-gray-600'>Edit the details of your application and keep your progress up to date.</p>

                    <div className='flex flex-col gap-4 pt-14'>
                        <div className='flex flex-col gap-1'>
                            <input maxLength="20" onChange={(e) => setUpdateJob(prev => ({ ...prev, jobTitle: e.target.value }))} value={updateJob.jobTitle} className='form-control ' placeholder='Job Title' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <input maxLength="20" onChange={(e) => setUpdateJob(prev => ({ ...prev, companyName: e.target.value }))} value={updateJob.companyName} className='form-control ' placeholder='Company Name' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <input maxLength="50" onChange={(e) => setUpdateJob(prev => ({ ...prev, link: e.target.value }))} value={updateJob.link} className='form-control ' placeholder='Application Link' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <select onChange={(e) => setUpdateJob(prev => ({ ...prev, location: e.target.value }))} value={updateJob.location} className='form-select '>
                                <option value="">Select Location</option>
                                <option value="Remote">Remote</option>
                                <option value="On-Site">On-Site</option>
                            </select>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <input maxLength="20" onChange={(e) => setUpdateJob(prev => ({ ...prev, dateApplied: e.target.value }))} value={updateJob.dateApplied} type='date' className='form-control ' placeholder='Date Applied' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <select onChange={(e) => setUpdateJob(prev => ({ ...prev, status: e.target.value }))} value={updateJob.status} className='form-select '>
                                <option value="Applied">Applied</option>
                                <option value="Interviewed">Interviewed</option>
                                <option value="Offer">Offer</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                    <button onClick={handleSaveChanges} className='bg-indigo-600 w-full mt-14 py-2 text-white font-semibold text-[18px] rounded-lg'>Save Changes</button>

                </div>
            </div>

            {/*  Heading Section */}
            <div className='w-full bg-[#f4f4f4] h-fit flex  items-center justify-between  pt-10 pb-2  '>
                <div className='container flex justify-between'>
                    <div>
                        <h1 className='text-slate-800 text-2xl font-normal text-left  max-sm:text-[14px]'>Hello, <span className='font-semibold'>{user.username ? user.username : nonUserName}</span>!</h1>
                        <p className='text-left'>{time <= 11 ? "Good Morning" : "Good Afternoon"}!</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <Link to='/profile'>
                            <p className='border-2 border-indigo-600 flex justify-center items-center w-[50px] h-[50px] rounded-full bg-gray-200 text-gray-400 text-xl '>{user.username ? user.username.charAt(0) : "G"}</p>
                        </Link>
                    </div>
                </div>
            </div>




            {/* Cards Containers */}
            <div className='mt-[10px] justify-between flex gap-2 container w-full max-sm:justify-center max-sm:mt-[10px] max-sm:flex-wrap max-sm:w-full'>
                <CustomCard title="Applied" number={jobs.filter((item) => item.status == "Applied").length} color="bg-indigo-500" />
                <CustomCard title="Interviewed" number={jobs.filter((item) => item.status == "Interviewed").length} color="bg-orange-500" />
                <CustomCard title="Offer" number={jobs.filter((item) => item.status == "Offer").length} color="bg-green-500" />
                <CustomCard title="Rejected" number={jobs.filter((item) => item.status == "Rejected").length} color="bg-red-500" />
            </div>
            {/* Filter Container */}
            <div className=''>
                <div className='container'>
                    <button disabled={jobs.length == 20 ? true : false} onClick={() => setOpenNewJobModal(true)} className={jobs.length == 20 ? 'text-white bg-indigo-400 w-[150px] py-2 rounded-lg font-semibold' : 'text-white bg-indigo-600 w-fit py-1 px-3 rounded-md mt-10 flex self-end '}>+</button>

                </div>
                {/* Jobs Container */}
                <div className=' container w-full mt-[40px]'>
                    <div className=' h-[400px] overflow-y-auto bg-white '>
                        <table className='bg-white  w-full shadow-lg   '>
                            <thead className='  rounded-lg sticky overflow-hidden top-0  '>
                                <tr className=' border-b-2  rounded-full bg-white'>
                                    <td className='py-3 font-semibold text-gray-800 border-none  max-sm:px-2  '>
                                        <div className=' '>
                                            <p className=' font-semibold text-gray-600 border-none max-sm:text-[12px]'>Position</p>
                                        </div>
                                    </td>
                                    <td className='py-3 font-semibold text-gray-600 border-none  '>
                                        <div className='flex justify-center items-center gap-2'>
                                            <p className=' font-semibold text-gray-600 border-none max-sm:text-[12px]'>Company </p>

                                        </div>
                                    </td>
                                    <td className='py-3 font-semibold text-gray-600 border-none  max-sm:px-2 '>
                                        <div className='flex justify-center items-center gap-2'>
                                            <p className=' font-semibold text-gray-600 border-none max-sm:text-[12px]'>Location</p>

                                        </div>
                                    </td>
                                    <td className='py-3 font-semibold text-gray-600 border-none  '>
                                        <div className=''>
                                            <p className=' font-semibold text-gray-600 border-none max-sm:text-[12px]'>Date</p>
                                        </div>
                                    </td>
                                    <td className='py-3 font-semibold text-gray-600 border-none  '>
                                        <div className='flex justify-center items-center gap-2'>
                                            <p className=' font-semibold text-gray-600 border-none max-sm:text-[12px]'>Link</p>

                                        </div>
                                    </td>
                                    <td className='py-3 font-semibold text-gray-600 border-none  '>
                                        <div className='flex justify-center items-center gap-2'>
                                            <p className=' font-semibold text-gray-600 border-none max-sm:text-[12px]'>Status</p>

                                        </div>
                                    </td>
                                    <td className='py-3 font-semibold text-gray-600 border-none max-sm:text-[12px] '>Edit</td>
                                </tr>
                            </thead>
                            <tbody className=''>

                                {
                                    jobs ? jobs.map((item) => {
                                        return <tr className='border-b-2'>
                                            <td className='py-3 border-r-2 border-gray-100 font-normal max-sm:text-[14px] max-sm:px-4  '>
                                                {item.jobTitle}
                                            </td>
                                            <td className='border-gray-100  border-r-2 font-normal max-sm:text-[14px] max-sm:px-4 '>
                                                {item.companyName}
                                            </td>
                                            <td className='border-gray-100  border-r-2 font-normal max-sm:text-[14px] max-sm:px-4 '>
                                                {item.location}
                                            </td>
                                            <td className='border-gray-100  border-r-2 font-normal max-sm:text-[14px] max-sm:px-8 '>
                                                {item.dateApplied}
                                            </td>
                                            <td className='border-gray-100  border-r-2 font-normal max-sm:text-[14px] max-sm:px-4 '>
                                                <a className='text-blue-500' href={item.link}>View</a>

                                            </td>
                                            <td className='border-gray-100  border-r-2 font-normal max-sm:text-[14px] max-sm:px-4 '>
                                                <p>{changeStatusColor(item.status)}</p>
                                            </td>
                                            <td className='max-sm:px-4 '>
                                                <div className='flex justify-center gap-6'>
                                                    <button onClick={() => handleUpdateJob(item._id)}>
                                                        <FontAwesomeIcon className='text-blue-600' icon={faPencil} />
                                                    </button>
                                                    <button onClick={() => handleDeleteJob(item._id)}>
                                                        <FontAwesomeIcon className='text-red-600' icon={faTrashCan} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    }) : <p></p>
                                }


                            </tbody>

                        </table>
                    </div>
                    <div className='bg-white h-[40px] rounded-br-lg rounded-bl-lg w-full flex items-center justify-center relative   '>
                        {
                            jobs.length == 20 ? <p className='text-red-400'>You have reached the maxium jobs allowed</p> : <p></p>
                        }
                    </div>
                </div>
            </div>



        </div >
    )
}

export default Dashboard