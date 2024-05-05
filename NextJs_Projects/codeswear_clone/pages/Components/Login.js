import Link from 'next/link'
import React, { useContext, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AppContext from '../Context/AppContext'
import { getAuth } from 'firebase/auth'
import app from '../firebase.config'
import { FcGoogle } from "react-icons/fc";

const Login = ({ darkMode }) => {
    const context = useContext(AppContext);
    const { email, password, handleChange, signInWithGoogle, handleLoginSubmit, setUser } = context;

    useEffect(() => {
        const auth = getAuth(app);
        const unsubscibe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
        })

        return () => unsubscibe();
    }, [])

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
            <div className={`flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 ${darkMode ? "dark:bg-gray-700 dark:text-white" : ""}`}>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto filter h-32 w-auto"
                        src="/codeswearcircle.png"
                        alt="codeswear"
                    />
                    <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight ">
                        Log in to your account
                    </h2>
                    <h2 className="mt-5 w-[31vw] items-center justify-center text-center -mx-7 text-md font-semibold leading-9 tracking-tight ">
                        Enter the credentials which you entered while creating an account!
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-0" onSubmit={handleLoginSubmit} method="POST">
                        <div>
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
                                Login
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-pink-600 hover:text-pink-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                    </form>
                    <button
                        type="submit"
                        className="flex my-4 w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                        onClick={() => signInWithGoogle()}
                    >
                        <FcGoogle className='text-xl mr-3 my-1' />
                        Signin With Google
                    </button>
                    <p className="mt-1 text-sm ">
                        Don't have an account?{' '}
                        <Link href="/Components/Signup" className="font-semibold leading-6 text-pink-600 hover:text-pink-500">
                            Signup
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Login