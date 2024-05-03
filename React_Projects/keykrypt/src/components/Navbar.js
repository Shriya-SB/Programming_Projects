import React from 'react'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';

const Navbar = () => {
    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.removeItem('keykrypt')
        toast.success('User Logout Successfully!!', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        });
    }
    return (
        <>
            <header className="text-gray-600 border-b-2 border-gray-900 bg-teal-50 body-font font-[poppins]">
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
                <div className="container mx-auto flex flex-wrap p-2 px-7 flex-col lg:flex-row items-center">
                    <a className="flex order-first lg:order-none title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 lg:mb-0">
                        <img src="favicon.png" alt="Logo" className='rounded-full h-[5.2rem] w-[8rem]' />
                    </a>
                    <nav className="flex flex-wrap items-center text-base lg:ml-auto">
                        <a className="mr-5 text-xl hover:border-b-2 cursor-pointer hover:border-teal-600 hover:text-teal-600">Home</a>
                        <a className="mr-5 text-xl hover:border-b-2 cursor-pointer hover:border-teal-600 hover:text-teal-600">About</a>
                        <a className="mr-5 text-xl hover:border-b-2 cursor-pointer hover:border-teal-600 hover:text-teal-600">Contact</a>
                    </nav>
                    <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
                        {!localStorage.getItem('keykrypt') ? <Link to={"/login"}><button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 lg:mt-0">Login
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </button></Link> : <button onClick={() => handleLogout} className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 lg:mt-0">Logout
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </button>}
                    </div>
                </div>
            </header>
        </>
    )
}

export default Navbar