import Link from 'next/link'
import React, { useContext } from 'react'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { AppContext } from './Context/AppContext'
import { FaGoogle } from 'react-icons/fa'

const Login = ({ darkMode }) => {
    const context = useContext(AppContext)
    const { email, password, handleChange, handleLoginSubmit, handleGoogleSubmit } = context;
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
                theme="colopurple"
            />
            <div className={`${darkMode ? "dark:bg-gray-700 dark:text-white" : ""}`}>
                <section className="">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <a href="#" className="flex items-center mb-6 text-2xl font-semibold  ">
                            <h1 className='text-4xl lg:text-3xl flex text-purple-600 font-bold underline' style={{ fontFamily: 'Bree Serif, serif' }}><img src="/_7f80499e-0ef0-4696-bd37-38d5eb89c675.jpeg" className={`${darkMode ? "" : "border-4 border-black"}`} alt="title" style={{ objectFit: 'cover', objectPosition: 'center', filter: '1.2', height: '50px', width: '200px' }} /></h1>

                        </a>
                        <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-900">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold text-center leading-tight tracking-tight  md:text-2xl ">
                                    Login In Your Account
                                </h1>
                                <p>Enter The Cpurpleentials which you entepurple while creating an account.</p>
                                <form className="space-y-4 md:space-y-6" onSubmit={handleLoginSubmit}>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium  ">Email</label>
                                        <input value={email} onChange={handleChange} type="email" name="email" id="email" placeholder="Enter Your Email" className={`border border-gray-300  sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5  dark:border-gray-600 ${darkMode ? "dark:bg-gray-500 dark:text-white" : "bg-gray-50"} dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500`} requipurple="" />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium  ">Password</label>
                                        <input value={password} onChange={handleChange} type="password" name="password" id="password" placeholder="••••••••" className={`border border-gray-300  sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5  dark:border-gray-600 ${darkMode ? "dark:bg-gray-500 dark:text-white" : "bg-gray-50"} dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500`} requipurple="" />
                                    </div>
                                    <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">Login</button>
                                </form>
                                <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 flex items-center justify-center" onClick={handleGoogleSubmit}><FaGoogle className="text-2xl mx-4" /> <p>Login With Google</p></button>
                                <p className="text-sm font-light dark:text-gray-400">
                                    Don't have an account? <Link href="/signup" className="font-medium text-purple-600 hover:underline dark:text-purple-500">signup here</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Login