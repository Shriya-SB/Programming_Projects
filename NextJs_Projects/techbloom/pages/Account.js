import React, { useContext, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from './Context/AppContext';
import { useRouter } from 'next/router';

const Account = ({ darkMode }) => {
    const context = useContext(AppContext)
    const { name, email, password, cpassword, npassword, address, phone, city, state, pinCode, setEmail, user, setUser, fetchData, handleChange, handleUpdatePasswordSubmit, handleUpdateUserSubmit } = context;
    const router = useRouter()

    useEffect(() => {
        let myuser = JSON.parse(localStorage.getItem("myuser"))
        if (myuser && myuser.token) {
            setUser(myuser)
            setEmail(myuser.email)
            fetchData(myuser.token)
        } else {
            router.push('/Login')
        }
    }, [])

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={darkMode ? "dark" : "light"}
            />
            <div className={`${darkMode ? "dark:text-white dark:bg-gray-700" : ""} sm:px-3 md:px-4 lg:px-5 xl:px-6 2xl:px-7`}>
                <h1 className="font-bold text-center text-3xl py-8">Update Account</h1>
                <h1 className='font-semibold my-3 text-md'>Instructions: If you have logged-in from google account it is recommended that don't update your details here!!</h1>
                <h1 className='font-semibold text-xl'>1. Normal Details</h1>
                <form onSubmit={handleUpdateUserSubmit} method="post">
                    <section>
                        <div className="mx-auto flex">
                            <div className="px-2 w-1/2">
                                <div className="mb-4">
                                    <label htmlFor="name" className="leading-7 text-sm ">Name</label>
                                    <input value={name} onChange={handleChange} type="text" id="name" name="name" className={`w-full  rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${darkMode ? "dark:bg-gray-500 dark:text-white" : ""}`} />
                                </div>
                            </div>
                            <div className="px-2 w-1/2">
                                <div className="mb-4">
                                    <label htmlFor="email" className="leading-7 text-sm ">Email (cannot be updated)</label>
                                    {user && user.value ? <input value={email} onChange={handleChange} type="email" id="email" name="email" className={`w-full  rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${darkMode ? "dark:bg-gray-500 dark:text-white" : ""}`} /> : <input value={email} type="email" readOnly id="email" name="email" className={`w-full  rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${darkMode ? "dark:bg-gray-500 dark:text-white" : ""}`} />}
                                </div>
                            </div>
                        </div>
                        <div className="px-2 w-full">
                            <div className="mb-4">
                                <div className="mb-4">
                                    <label htmlFor="Address" className="leading-7 text-sm ">Address</label>
                                    <textarea value={address} onChange={handleChange} cols={30} rows={3} type="text" id="address" name="address" className={`w-full  rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${darkMode ? "dark:bg-gray-500 dark:text-white" : ""}`} />
                                </div>
                            </div>
                        </div>
                        <div className="mx-auto flex">
                            <div className="px-2 w-1/2">
                                <div className="mb-4">
                                    <label htmlFor="PinCode" className="leading-7 text-sm ">PinCode</label>
                                    <input value={pinCode} onChange={handleChange} type="number" id="pinCode" name="pinCode" className={`w-full  rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${darkMode ? "dark:bg-gray-500 dark:text-white" : ""}`} />
                                </div>
                            </div>
                            <div className="px-2 w-1/2">
                                <div className="mb-4">
                                    <label htmlFor="phone" className="leading-7 text-sm ">Phone Number</label>
                                    <input value={phone} onChange={handleChange} type="number" id="phone" name="phone" className={`w-full  rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${darkMode ? "dark:bg-gray-500 dark:text-white" : ""}`} />
                                </div>
                            </div>
                        </div>
                        <div className="mx-auto flex">
                            <div className="px-2 w-1/2">
                                <div className="mb-4">
                                    <label htmlFor="City" className="leading-7 text-sm ">City</label>
                                    <input value={city} onChange={handleChange} type="text" id="city" name="city" className={`w-full  rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${darkMode ? "dark:bg-gray-500 dark:text-white" : ""}`} />
                                </div>
                            </div>
                            <div className="px-2 w-1/2">
                                <div className="mb-4">
                                    <label htmlFor="State" className="leading-7 text-sm ">State</label>
                                    <input value={state} onChange={handleChange} type="text" id="state" name="state" className={`w-full  rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${darkMode ? "dark:bg-gray-500 dark:text-white" : ""}`} />
                                </div>
                            </div>
                        </div>
                        <button className='px-7 bg-purple-600 mb-5 mx-4 py-1 rounded hover:bg-purple-700'>Submit</button>
                    </section>
                </form>
                <h1 className='font-semibold text-xl'>1. Update Password</h1>
                <form onSubmit={handleUpdatePasswordSubmit} method="post">
                    <section className='py-4 flex flex-col xl:flex-row xl:-mx-5'>
                        <div className="justify-center flex flex-col xl:flex-row items-center">
                            <div className="px-4 sm:w-screen sm:px-10 md:w-screen md:px-10 xl:w-[32.5vw] w-screen lg:w-screen ">
                                <div className="mb-4">
                                    <label htmlFor="password" className="leading-7 text-sm ">Password</label>
                                    <input placeholder='Password' value={password} onChange={handleChange} type="password" id="password" name="password" className={`w-full rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${darkMode ? "dark:bg-gray-500 dark:text-white" : ""}`} />
                                </div>
                            </div>
                            <div className="px-4 sm:w-screen sm:px-10 md:w-screen md:px-10 xl:w-[32.5vw] w-screen lg:w-screen ">
                                <div className="mb-4">
                                    <label htmlFor="npassword" className="leading-7 text-sm ">New Password</label>
                                    <input placeholder='New Password' value={npassword} onChange={handleChange} type="password" id="npassword" name="npassword" className={`w-full  rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${darkMode ? "dark:bg-gray-500 dark:text-white" : ""}`} />
                                </div>
                            </div>
                            <div className="px-4 sm:w-screen sm:px-10 md:w-screen md:px-10 xl:w-[32.5vw] w-screen lg:w-screen ">
                                <div className="mb-4">
                                    <label htmlFor="cpassword" className="leading-7 text-sm ">Confirm New Password</label>
                                    <input placeholder='Confirm Password' value={cpassword} onChange={handleChange} type="password" id="cpassword" name="cpassword" className={`w-full  rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${darkMode ? "dark:bg-gray-500 dark:text-white" : ""}`} />
                                </div>
                            </div>
                        </div>
                    </section>
                    <button className='px-7  my-3 py-1 bg-purple-600 mb-5 mx-5 rounded hover:bg-purple-700'>Submit</button>
                </form >
            </div>
        </>
    )
}

export default Account