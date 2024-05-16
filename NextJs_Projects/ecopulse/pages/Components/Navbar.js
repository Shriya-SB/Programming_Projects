import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { BsFillMoonStarsFill } from "react-icons/bs";
import { RiAccountPinCircleFill } from "react-icons/ri";

const Navbar = ({ darkMode, setDarkMode }) => {
    const [account, setAccount] = useState(false);
    const router = useRouter()

    const toggleBrightNess = () => {
        let newMode = !darkMode
        setDarkMode(newMode)
        localStorage.setItem('darkMode', newMode)
    }

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('ecopulse');
        router.push('/Components/Login')
    }

    return (
        <>
            <header className={`flex ${darkMode ? "bg-gray-900 text-white" : "bg-[#d7ead8]"} z-10 flex-col xl:flex-row justify-between items-center sticky top-0 p-2 px-3`}>
                <div className="logo">
                    <img src="/favicon.ico" alt="EcoPulse" className='h-[5rem] w-[5rem] mx-4 rounded-full animate-spin-slow' />


                </div>
                <nav>
                    <ul className='flex space-x-7'>
                        <li className='text-md sm:text-lg lg:text-xl font-[600] hover:text-[#4CAF50] hover:border-b-2 hover:border-[#4CAF50] cursor-pointer'><Link href={'/'}>Home</Link></li>
                        <li className='text-md sm:text-lg lg:text-xl font-[600] hover:text-[#4CAF50] hover:border-b-2 hover:border-[#4CAF50] cursor-pointer'><Link href={'/Components/About'}>About</Link></li>
                        <li className='text-md sm:text-lg lg:text-xl font-[600] hover:text-[#4CAF50] hover:border-b-2 hover:border-[#4CAF50] cursor-pointer'><Link href={'/Components/Climate'}>Climate_Change</Link></li>
                        <li className='text-md sm:text-lg lg:text-xl font-[600] hover:text-[#4CAF50] hover:border-b-2 hover:border-[#4CAF50] cursor-pointer'><Link href={'/Components/AirInfo'}>Air Quality</Link></li>
                        <li className='text-md sm:text-lg lg:text-xl font-[600] hover:text-[#4CAF50] hover:border-b-2 hover:border-[#4CAF50] cursor-pointer'><Link href={'/Components/AnimalSciFyFact'}>Animal_Sci-Fy_Fact</Link></li>
                    </ul>
                </nav>
                <div className="symbols flex mx-2 space-x-6">
                    <BsFillMoonStarsFill onClick={toggleBrightNess} className='text-3xl cursor-pointer text-[#47c44c]' />
                    <div onMouseOver={() => setAccount(true)} onMouseLeave={() => setAccount(false)} className='relative'>
                        {account && (
                            <>
                                <div className='absolute bg-[#4CAF50] right-4 top-4 w-[14vw] py-3 rounded-md'>
                                    {localStorage.getItem('ecopulse') ? <ul>
                                        <li className='text-lg text-center hover:text-green-300 cursor-pointer items-center justify-center'><Link href={`/Components/Account`}>Update Account</Link></li>
                                        <li className='text-lg text-center hover:text-green-300 cursor-pointer items-center justify-center' onClick={handleLogout}>Logout</li>
                                    </ul> : <ul>
                                        <li className='text-lg text-center hover:text-green-300 cursor-pointer items-center justify-center'><Link href={'/Components/Login'}>Login</Link></li>
                                        <li className='text-lg text-center hover:text-green-300 cursor-pointer items-center justify-center'><Link href={'/Components/Signup'}>Signup</Link></li>
                                    </ul>}
                                </div>
                            </>
                        )}
                        < RiAccountPinCircleFill className='text-3xl cursor-pointer text-[#47c044]' />
                    </div>
                </div>
            </header>
        </>
    )
}

export default Navbar
