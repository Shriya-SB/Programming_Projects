import React, { useContext } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AppContext from '../Context/AppContext'

const Contact = ({ darkMode }) => {
    const context = useContext(AppContext)
    const { name, email, address, pinCode, handleContactSubmit, city, state, phone, handleChange } = context;

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={darkMode ? "dark" : "light"}
            />
            <div className={`container min-h-screen pb-4 m-auto ${darkMode ? "dark:bg-gray-700 dark:text-white" : ""}`}>
                <h1 className="text-center font-bold text-4xl py-6">Contact Us</h1>
                <p className="text-center font-bold text-lg py-6">We will to contact you as soon as possible!</p>
                <form onSubmit={handleContactSubmit}>
                    <div className="mx-auto flex">
                        <div className="w-1/2 px-2">
                            <div className="relative mb-4">
                                <label htmlFor="name" className="leading-7 text-sm ">Name</label>
                                <input value={name} onChange={handleChange} type="text" id="name" name="name" className={`w-full rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none ${darkMode ? "dark:text-white dark:bg-gray-500" : "text-black"} py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"`} />
                            </div>
                        </div>
                        <div className="w-1/2 px-2">
                            <div className="relative mb-4">
                                <label htmlFor="email" className="leading-7 text-sm ">Email</label>
                                <input value={email} onChange={handleChange} type="email" id="email" name="email" className={`w-full rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none ${darkMode ? "dark:text-white dark:bg-gray-500" : "text-black"} py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"`} />
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto">
                        <div className="w-full px-2">
                            <div className="relative mb-4">
                                <label htmlFor="address" className="leading-7 text-sm ">Address</label>
                                <textarea value={address} onChange={handleChange} id="address" rows={3} cols={30} name="address" className={`w-full rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none ${darkMode ? "dark:text-white dark:bg-gray-500" : "text-black"} py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out`} />
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto flex">
                        <div className="w-1/2 px-2">
                            <div className="relative mb-4">
                                <label htmlFor="pinCode" className="leading-7 text-sm ">PinCode</label>
                                <input value={pinCode} onChange={handleChange} type="text" id="pinCode" name="pinCode" className={`w-full rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none ${darkMode ? "dark:text-white dark:bg-gray-500" : "text-black"} py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"`} />
                            </div>
                        </div>
                        <div className="w-1/2 px-2">
                            <div className="relative mb-4">
                                <label htmlFor="city" className="leading-7 text-sm ">City</label>
                                <input value={city} onChange={handleChange} type="text" id="city" name="city" className={`w-full rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none ${darkMode ? "dark:text-white dark:bg-gray-500" : "text-black"} py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"`} />
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto flex">
                        <div className="w-1/2 px-2">
                            <div className="relative mb-4">
                                <label htmlFor="state" className="leading-7 text-sm ">State</label>
                                <input value={state} onChange={handleChange} type="text" id="state" name="state" className={`w-full rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none ${darkMode ? "dark:text-white dark:bg-gray-500" : "text-black"} py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"`} />
                            </div>
                        </div>
                        <div className="w-1/2 px-2">
                            <div className="relative mb-4">
                                <label htmlFor="phone" className="leading-7 text-sm ">Phone Number</label>
                                <input value={phone} onChange={handleChange} type="number" id="phone" name="phone" className={`w-full rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none ${darkMode ? "dark:text-white dark:bg-gray-500" : "text-black"} py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"`} />
                            </div>
                        </div>
                    </div>
                    <button type='submit' className='bg-pink-500 cursor-pointer hover:bg-pink-600 px-6 py-1 text-center rounded mx-2'>Submit</button>
                </form>
            </div>
        </>
    )
}

export default Contact