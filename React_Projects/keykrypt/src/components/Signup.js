import React, { useState } from "react";
import { app } from "../firebase.config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const SignupForm = () => {
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '' })
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password, name } = credentials; // Destructure name, email and password from credentials
        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, email, password, { displayName: name })
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                toast.success('User created successfully!!', {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                });
                setTimeout(() => {
                    navigate('/login')
                }, 4000);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                toast.error('Some Error Occurred!!', {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                });
            });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value })
    }

    return (
        <>
            <section className="bg-gray-50">
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold ">
                        <img className="w-8 h-8 mr-2" src="/key.jpeg" alt="logo" />
                        KeyKrypt
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
                                Create your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" method="POST" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium">Name</label>
                                    <input onChange={handleChange} value={credentials.name} type="text" name="name" id="name" className="bg-gray-50 border-2 border-gray-300 focus:outline-none sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-teal-500 dark:focus:border-teal-500" placeholder="Enter Your Name" required />

                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</label>
                                    <input onChange={handleChange} value={credentials.email} type="email" name="email" id="email" className="bg-gray-50 border-2 border-gray-300 focus:outline-none sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-teal-500 dark:focus:border-teal-500" placeholder="name@company.com" required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                                    <input onChange={handleChange} value={credentials.password} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border-2 border-gray-300 focus:outline-none sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-teal-500 dark:focus:border-teal-500" required />
                                </div>
                                <button type="submit" className="w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">Sign up</button>
                                <p className="text-sm font-light text-gray-500">
                                    Already have an account? <Link to="/login" className="font-medium text-teal-600 hover:underline dark:text-teal-500">Log in here</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SignupForm;