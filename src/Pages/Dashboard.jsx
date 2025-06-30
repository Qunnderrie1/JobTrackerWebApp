import React, { useEffect, useState } from 'react'
import CustomCard from '../Components/CustomCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrashCan, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentJob } from '../Slices/JobSlice'
import { changeStatusColor } from '../Helper/changeStatusColor'
import { shortWord } from '../Helper/shortWord'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer'



function Dashboard() {

    const [openNewJobModal, setOpenNewJobModal] = useState(false);
    const [openUpdateJobModal, setOpenUpdateModal] = useState(false);
    const [jobs, setJobs] = useState([{}])
    const [appSearch, setAppSearch] = useState("")
    const [appSearchResults, setAppSearchResults] = useState([{}])

    const dispatch = useDispatch();


    const { job } = useSelector((state) => state.currentJob)
    const { user } = useSelector((state) => state.user)

    const [jobApp, setJobApp] = useState({
        jobTitle: "",
        companyName: "",
        location: "",
        link: "",
        dateApplied: "",
        status: ""
    })

    const [updateJob, setUpdateJob] = useState({
        jobTitle: "",
        companyName: "",
        location: "",
        link: "",
        dateApplied: "",
        status: ""
    })

    useEffect(() => {
        axios.get('https://jobtrackerbackend-5ovy.onrender.com/jobs')
            .then((res) => setJobs(res.data))
            .catch((err) => console.log(err))

    }, [jobs])


    // Handle new job method 
    const handleNewJob = () => {
        axios.post('https://jobtrackerbackend-5ovy.onrender.com/', {
            jobTitle: jobApp.jobTitle,
            companyName: jobApp.companyName,
            location: jobApp.location,
            link: jobApp.link,
            dateApplied: jobApp.dateApplied,
            status: jobApp.status,
        })
            .then((res) => setUpdateJob(res.data))
            .catch((err) => console.log(err))

        setJobApp({
            jobTitle: "",
            companyName: "",
            location: "",
            link: "",
            dateApplied: "",
            status: "",
        })
        setOpenNewJobModal(false)
    }


    // Handle save changes job method 
    const handleSaveChanges = () => {

        axios.put(`https://jobtrackerbackend-5ovy.onrender.com/jobs/${job}`, {
            jobTitle: updateJob.jobTitle,
            companyName: updateJob.companyName,
            link: updateJob.link,
            location: updateJob.location,
            dateApplied: updateJob.dateApplied,
            status: updateJob.status,
        })
            .then(() => console.log("job has been updated"))
            .catch(() => console.log("falied to update job"))

        setOpenUpdateModal(false)

    }

    // Handle update job method 
    const handleUpdateJob = (id) => {
        setOpenUpdateModal(true)
        axios.get(`https://jobtrackerbackend-5ovy.onrender.com/jobs/${id}`)
            .then((res) => setUpdateJob(res.data[0]))
            .catch((err) => console.log(err))
        dispatch(getCurrentJob(id))
    }

    // Delete Job Application
    const handleDeleteJob = (id) => {
        axios.delete(`https://jobtrackerbackend-5ovy.onrender.com/jobs/${id}`)
            .then(() => console.log("Job has been deleted"))
            .catch(() => console.log("failed to delete job"))

    }

    const handleSearch = (name) => {
        if (name == "jobTitle") {
            const i = jobs.filter((item) => item.jobTitle == appSearch)
            setAppSearchResults(i)
            console.log(i)
        }

        setAppSearch("")
    }

    return (
        <div className={openUpdateJobModal ? "overflow-hidden" : ""}>
            <nav className='bg-white w-full p-4 shadow-md  -z-1'>
                <div className='container flex items-center justify-between z-0'>
                    <div>
                        <p className='text-black font-semibold max-sm:text-[18px] text-2xl'>Job tracker</p>
                    </div>
                    <div>
                        {
                            /*
                            <button onClick={handleLogout} className='flex flex-row-reverse items-center gap-2'>
                                <p className='text-red-600 font-semibold'>Logout</p>
                                <FontAwesomeIcon className='text-1xl text-red-600' icon={faArrowRightToBracket} />
                            </button> 
                            */
                        }
                        <Link to='/jobtrackerapp/profile'>
                            <FontAwesomeIcon icon={faUserCircle} className='text-xl' />
                        </Link>
                    </div>
                </div>

            </nav>
            {/* New Job Modal */}
            <div className={openNewJobModal ? 'bg-black w-full h-full absolute top-0 left-0 bg-opacity-50 flex items-center justify-center max-sm:px-2  z-10' : 'hidden'}>
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
                    <button onClick={handleNewJob} className='bg-blue-600 w-full mt-14 py-2 text-white font-semibold text-[18px] rounded-lg'>Submit</button>

                </div>
            </div>


            {/* Update Job Modal */}
            <div className={openUpdateJobModal ? 'bg-black w-full h-[100vh] absolute left-0 bottom-0 bg-opacity-50 flex items-center justify-center max-sm:px-2 max-sm:bottom-0 max-sm:top-40  z-40' : 'hidden'}>
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
                    <button onClick={handleSaveChanges} className='bg-blue-600 w-full mt-14 py-2 text-white font-semibold text-[18px] rounded-lg'>Save Changes</button>

                </div>
            </div>

            {/*  Heading Container */}
            <div className='w-full h-fit flex  items-center justify-between pt-20 container '>
                <h1 className='text-slate-800 text-2xl font-bold text-left  max-sm:text-[14px]  '><span className='font-light'>Hello, </span>{user.username}</h1>
                <div>
                    <button disabled={jobs.length == 20 ? true : false} onClick={() => setOpenNewJobModal(true)} className={jobs.length == 20 ? 'text-white bg-blue-400 w-[150px] py-2 rounded-lg font-semibold' : 'text-white bg-blue-600 w-fit py-1 px-3 rounded-md max-sm: '}>Create New</button>
                </div>
            </div>


            {/* Cards Containers */}
            <div className='mt-[80px] justify-between flex gap-2 container w-full max-sm:justify-center max-sm:mt-[40px] max-sm:flex-wrap max-sm:w-full'>
                <CustomCard title="Applied" number={jobs.filter((item) => item.status == "Applied").length} color="bg-blue-600" />
                <CustomCard title="Interviewed" number={jobs.filter((item) => item.status == "Interviewed").length} color="bg-orange-600" />
                <CustomCard title="Offer" number={jobs.filter((item) => item.status == "Offer").length} color="bg-green-600" />
                <CustomCard title="Rejected" number={jobs.filter((item) => item.status == "Rejected").length} color="bg-red-600" />
            </div>

            {/* Filter Container */}
            <div className=''>
                <div className='mt-[40px] container py-2'>
                    <div className='bg-white h-[60px] shadow-sm flex justify-between items-center px-4 rounded-tr-lg rounded-tl-lg  '>
                        <div className='flex gap-8 '>
                            {/* Filter by job title */}
                            <div className='flex gap-2 w-full '>
                                <div className='flex items-center  gap-2'>
                                    <input onChange={(e) => setAppSearch(e.target.value)} value={appSearch} maxLength="20" className='form-control rounded-lg max-sm:w-full w-[500px]' placeholder='Search By Job Title' />
                                    <button onClick={() => handleSearch("jobTitle")} className="bg-blue-600 text-white w-[150px] py-2 rounded-lg">Search</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Jobs Container */}
                <div className=' container w-full'>
                    <div className=' h-[400px] overflow-y-auto bg-white '>
                        <table className='bg-white  w-full shadow-lg   '>
                            <thead className='  rounded-lg sticky overflow-hidden top-0  '>
                                <tr className=' border-b-2  rounded-full bg-white'>
                                    <td className='py-3 font-semibold text-gray-800 border-none  max-sm:px-4  '>
                                        <div className='flex justify-center items-center gap-2'>
                                            <p className=' font-semibold text-gray-600 border-none max-sm:text-[12px]'>Job Title</p>
                                        </div>
                                    </td>
                                    <td className='py-3 font-semibold text-gray-600 border-none  '>
                                        <div className='flex justify-center items-center gap-2'>
                                            <p className=' font-semibold text-gray-600 border-none max-sm:text-[12px]'>Company Name</p>

                                        </div>
                                    </td>
                                    <td className='py-3 font-semibold text-gray-600 border-none  '>
                                        <div className='flex justify-center items-center gap-2'>
                                            <p className=' font-semibold text-gray-600 border-none max-sm:text-[12px]'>Location</p>

                                        </div>
                                    </td>
                                    <td className='py-3 font-semibold text-gray-600 border-none  '>
                                        <div className='flex justify-center items-center gap-2'>
                                            <p className=' font-semibold text-gray-600 border-none max-sm:text-[12px]'>Application Date</p>

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
                                                <a className='text-blue-500' href={item.link}>{shortWord(item.link)}</a>

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
                    <div className='bg-white h-[50px] rounded-br-lg rounded-bl-lg w-full flex items-center justify-center relative   '>
                        {
                            jobs.length == 20 ? <p className='text-red-400'>You have reached the maxium jobs allowed</p> : <p></p>
                        }
                    </div>
                </div>
            </div>
            <Footer />

        </div >
    )
}

export default Dashboard