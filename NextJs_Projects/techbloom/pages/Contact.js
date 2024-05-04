import React, { useContext, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from './Context/AppContext';
import { useRouter } from 'next/router';

const Contact = ({ darkMode }) => {
    const context = useContext(AppContext);
    const { name, pinCode, email, address, city, state, phone, handleChange, handleContactSubmit } = context;
    const router = useRouter();
    useEffect(() => {
        if (!localStorage.getItem('myuser')) {
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
            <div className={`${darkMode ? "dark:text-white dark:bg-gray-700" : ""}`}>
                <h1 className="font-bold text-center text-3xl py-8">Contact Us</h1>
                <form method="post" onSubmit={handleContactSubmit}>
                    <div className="mx-auto flex">
                        <div className="px-2 w-1/2">
                            <div className="mb-4">
                                <label htmlFor="name" className="leading-7 text-sm ">Name</label>
                                <input value={name} onChange={handleChange} type="text" id="name" name="name" className={`w-full  rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${darkMode ? "dark:bg-gray-500 dark:text-white" : ""}`} />
                            </div>
                        </div>
                        <div className="px-2 w-1/2">
                            <div className="mb-4">
                                <label htmlFor="email" className="leading-7 text-sm ">Email</label>
                                <input value={email} onChange={handleChange} type="email" id="email" name="email" className={`w-full  rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${darkMode ? "dark:bg-gray-500 dark:text-white" : ""}`} />
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

                    <button className='px-7 bg-purple-600 mb-5 mx-4 py-1 rounded-md hover:bg-purple-700'>Submit</button>
                </form>
            </div>
        </>
    )
}

export default Contact  