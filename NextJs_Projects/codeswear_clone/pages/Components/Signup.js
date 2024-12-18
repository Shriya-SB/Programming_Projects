import Link from 'next/link'
import React, { useContext } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AppContext from '../Context/AppContext'

const Signup = ({ darkMode }) => {
    const context = useContext(AppContext)
    const { handleChange, name, email, password, handleSigninSubmit } = context;

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
            <div className={`min-h-screen flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 ${darkMode ? "dark:bg-gray-700 dark:text-white" : ""}`}>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto filter h-32 w-auto"
                        src="/codeswearcircle.png"
                        alt="codeswear"
                    />
                    <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight ">
                        Create an new account!!
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-0" onSubmit={handleSigninSubmit} method="POST">
                        <div>
                            {/* <label htmlFor="name" className="block text-sm font-medium leading-6 ">
                                Name
                            </label> */}
                            <div className="mt-0">
                                <input
                                    onChange={handleChange}
                                    value={name}
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    placeholder="Enter your name.."
                                    className={`block w-full rounded-md px-2 ${darkMode ? "dark:bg-gray-500 dark:text-white" : ""} border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6`}
                                />
                            </div>
                        </div>
                        <div>
                            {/* <label htmlFor="email" className="block text-sm font-medium leading-6 ">
                                Email address
                            </label> */}
                            <div className="mt-0">
                                <input
                                    onChange={handleChange}
                                    value={email}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder="Enter your email.."
                                    className={`block w-full rounded-md px-2 ${darkMode ? "dark:bg-gray-500 dark:text-white" : ""} border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6`}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                {/* <label htmlFor="password" className="block text-sm font-medium leading-6 ">
                                    Password
                                </label> */}
                            </div>
                            <div className="mt-0">
                                <input
                                    onChange={handleChange}
                                    value={password}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    placeholder="Enter your password.."
                                    className={`block w-full rounded-md px-2 ${darkMode ? "dark:bg-gray-500 dark:text-white" : ""} border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6`}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex my-4 w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm ">
                        Already have an account?{' '}
                        <Link href="/Components/Login" className="font-semibold leading-6 text-pink-600 hover:text-pink-500">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Signup