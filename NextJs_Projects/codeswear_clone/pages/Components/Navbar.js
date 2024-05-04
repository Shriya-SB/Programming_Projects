import Link from 'next/link'
import React, { useContext, useRef, useState } from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { BsMoonStarsFill } from "react-icons/bs";
import { IoHome } from "react-icons/io5";
import { useRouter } from 'next/router';
import { IoMenu, IoCloseCircle, IoSunnySharp } from "react-icons/io5";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { FaSearch } from 'react-icons/fa'
import AppContext from '../Context/AppContext';

const Navbar = ({ darkMode, setDarkMode, addToCart, removeFromCart, clearCart, subTotal, cart }) => {
    const router = useRouter()
    const navbarRef = useRef()
    const cartRef = useRef()
    const [dropDown, setDropDown] = useState(false)
    const context = useContext(AppContext);
    const { handleLogout } = context;

    const toggleNavbar = () => {
        if (navbarRef.current) {
            if (navbarRef.current.classList.contains("translate-x-full")) {
                navbarRef.current.classList.remove('translate-x-full')
                navbarRef.current.classList.add("translate-x-0")
            } else {
                navbarRef.current.classList.remove('translate-x-0')
                navbarRef.current.classList.add("translate-x-full")
            }
        }
    }

    const toggleBrightNess = () => {
        let newMode = !darkMode
        setDarkMode(newMode)
        localStorage.setItem('darkMode', newMode)
    }

    const toggleCart = () => {
        if (cartRef.current) {
            if (cartRef.current.classList.contains("translate-x-full")) {
                cartRef.current.classList.remove('translate-x-full')
                cartRef.current.classList.add("translate-x-0")
            } else {
                cartRef.current.classList.remove('translate-x-0')
                cartRef.current.classList.add("translate-x-full")
            }
        }
    }
    return (
        <>
            <header className={`flex headers shadow-lg z-10 top-0 sticky justify-between items-center lg:p-3 p-2 xl:space-y-0 lg:space-y-4 flex-col xl:flex-row ${darkMode ? "dark:bg-gray-900 dark:text-white" : "bg-gray-50"}`}>
                <Link href={`/`} className={`relative xl:left-0 left-0`}><img src="/logo.png" alt="logo" className={`w-[80vw] md:w-[30vw] sm:w-[64vw] md:max-w-none max-w-[80%] py-4 md:py-0 xs:py-0 2xl:w-[16.3vw] xl:w-[17.3vw]`} /></Link>
                <div className="Search space-x-1 flex mt-1 my-3 w-[80vw] lg:w-[55vw] xl:w-[25vw] 2xl:w-[34vw]">
                    <input type="text" className={`form-control relative flex-auto min-w-0 block mx-2  px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-pink-600 focus:outline-none font-[poppins] ${darkMode ? "dark:bg-gray-500 dark:text-black" : "bg-gray-100"}`} placeholder='Search your favourite design!!' />
                    <FaSearch className='bg-pink-600 hover:bg-pink-700 p-2 w-16 h-9 text-2xl rounded text-white cursor-pointer' />
                </div>
                <nav className="links hidden lg:flex">
                    <ul className='space-x-5 xl:mr-0 lg:mr-10 flex py-3'>
                        <li><Link className='text-xl font-[poppins] font-semibold cursor-pointer hover:border-b-2 py-1 hover:border-pink-500 hover:text-pink-500' href="/">Home</Link></li>
                        <li><Link className='text-xl font-[poppins] font-semibold cursor-pointer hover:border-b-2 py-1 hover:border-pink-500 hover:text-pink-500' href="/Components/Tshirts">TShirts</Link></li>
                        <li><Link className='text-xl font-[poppins] font-semibold cursor-pointer hover:border-b-2 py-1 hover:border-pink-500 hover:text-pink-500' href="/Components/Hoodies">Hoodies</Link></li>
                        <li><Link className='text-xl font-[poppins] font-semibold cursor-pointer hover:border-b-2 py-1 hover:border-pink-500 hover:text-pink-500' href="/Components/Mugs">Mugs</Link></li>
                        <li><Link className='text-xl font-[poppins] font-semibold cursor-pointer hover:border-b-2 py-1 hover:border-pink-500 hover:text-pink-500' href="/Components/Contact">Contact</Link></li>
                        <li><Link className='text-xl font-[poppins] font-semibold cursor-pointer hover:border-b-2 py-1 hover:border-pink-500 hover:text-pink-500' href="/Components/About">About</Link></li>
                    </ul>
                    <div className={`symbols lg:my-2 lg:mx-4 xl:my-0 hidden space-x-7 lg:flex xl:hidden`}>
                        <FaShoppingCart onClick={toggleCart} className='text-3xl cursor-pointer text-pink-600' />
                        <a onMouseOver={() => setDropDown(true)} onMouseLeave={() => setDropDown(false)}>
                            {dropDown && (
                                <>
                                    <div className='bg-pink-400 py-2 text-center justify-center border-2 border-gray-100 items-center rounded-md my-5 px-4 right-20 absolute'>
                                        {!localStorage.getItem('codeswear_token') ? <ul className='space-y-2 px-10'>
                                            <li className='my-1 font-[poppins] font-semibold text-lg text-black hover:text-gray-100 cursor-pointer'><Link href={`/Components/Login`}>Login</Link></li>
                                            <li className='my-1 font-[poppins] font-semibold text-lg text-black hover:text-gray-100 cursor-pointer'><Link href={`/Components/Signup`}>Signup</Link></li>
                                        </ul> : <ul className='space-y-2'>
                                            <li className='my-1 font-[poppins] font-semibold text-lg text-black hover:text-gray-100 cursor-pointer'><Link href={`Components/Account`}>Update Account</Link></li>
                                            <li className='my-1 font-[poppins] font-semibold text-lg text-black hover:text-gray-100 cursor-pointer'><Link href={`/`} onClick={handleLogout}>Logout</Link></li>
                                        </ul>}
                                    </div>
                                </>
                            )}
                            <RiAccountPinCircleFill className='text-3xl cursor-pointer text-pink-600' />
                        </a>
                        {darkMode ? <IoSunnySharp onClick={toggleBrightNess} className='text-4xl cursor-pointer -mt-1 text-pink-600' /> : <BsMoonStarsFill onClick={toggleBrightNess} className='text-3xl cursor-pointer text-pink-600' />}
                    </div>
                </nav>
                <div className='flex absolute right-3 md:right-6 top-7 md:top-4 sm:top-6 lg:hidden'>
                    <IoMenu onClick={toggleNavbar} className={`text-pink-600 sm:text-5xl text-4xl`} />
                </div>
                <nav ref={navbarRef} className={`resNav block transition-transform w-full absolute right-0 top-[9.2rem] sm:top-[6.9rem] py-1 ${darkMode ? "dark:bg-gray-500" : ""} transform translate-x-full lg:hidden`}>
                    <ul className='justify-center py-3 items-center mx-auto flex flex-col space-y-7'>
                        <li><Link className='text-2xl font-[poppins] font-semibold cursor-pointer hover:border-b-2 py-1 hover:border-pink-500 hover:text-pink-500' href="/">Home</Link></li>
                        <li><Link className='text-2xl font-[poppins] font-semibold cursor-pointer hover:border-b-2 py-1 hover:border-pink-500 hover:text-pink-500' href="/Components/Tshirts">TShirts</Link></li>
                        <li><Link className='text-2xl font-[poppins] font-semibold cursor-pointer hover:border-b-2 py-1 hover:border-pink-500 hover:text-pink-500' href="/Components/Hoodies">Hoodies</Link></li>
                        <li><Link className='text-2xl font-[poppins] font-semibold cursor-pointer hover:border-b-2 py-1 hover:border-pink-500 hover:text-pink-500' href="/Components/Mugs">Mugs</Link></li>
                        <li><Link className='text-2xl font-[poppins] font-semibold cursor-pointer hover:border-b-2 py-1 hover:border-pink-500 hover:text-pink-500' href="/Components/Contact">Contact</Link></li>
                        <li><Link className='text-2xl font-[poppins] font-semibold cursor-pointer hover:border-b-2 py-1 hover:border-pink-500 hover:text-pink-500' href="/Components/About">About</Link></li>
                    </ul>
                </nav>
                <div className={`cartRes absolute ${darkMode ? "dark:bg-gray-700 " : "bg-pink-100"} pink z-10 sm:w-full w-screen md:w-[50.9vw] lg:w-[40vw] xl:w-[34vw] h-screen right-0 top-0 lg:-top-[1rem] xl:top-0 transform ${Object.keys(cart).length !== 0 ? "translate-x-0" : "translate-x-full"} transition-transform`} ref={cartRef}>
                    <h1 className='lg:text-3xl text-3xl md:text-4xl text-center pt-3 ' style={{ fontFamily: "Bree Serif, serif" }}>Shopping Cart</h1>
                    <div className="close absolute right-3 top-3">
                        <IoCloseCircle className='xl:text-3xl text-2xl text-pink-600 cursor-pointer' onClick={toggleCart} />
                    </div>
                    <p className={`border-b-2 ${darkMode ? "border-white" : "border-black"} my-2`}></p>
                    <div className="items my-3 flex w-1/2 sm:w-2/4 md:w-3/4 lg:w-1/4 xl:w-full">
                        {Object.keys(cart).length === 0 && <div className='flex items-center my-5 justify-center'>
                            <h1 style={{ fontFamily: "Bree Serif, serif" }} className='font-semibold text-lg justify-center items-center mx-auto w-screen sm:w-screen lg:w-[37vw] xl:w-[29vw] md:w-[49.5vw] text-center'>
                                Your cart is empty! Please add something...
                            </h1>
                        </div>}
                        <div className={`flex flex-col relative`}>
                            {Object.keys(cart).map((k) => {
                                return <><li key={k} className='list-none'>
                                    <div className={`item flex mx-3`}>
                                        <div className={`font-semibold font-[poppins] flex items-center my-4 text-lg lg:text-md md:w-[40vw] sm:w-[60vw] w-[63vw] lg:w-[30vw] xl:w-[28vw]`}>{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
                                        <div className={`font-semibold flex items-center md:w-[90vw] sm:w-[60vw] w-[63vw] lg:w-[10vw] xl:w-[14vw]`}>
                                            <FaCircleMinus onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className={`text-pink-500 cursor-pointer text-xl mx-2 xl:mx-1`} />
                                            {cart[k].qty}
                                            <FaCirclePlus
                                                onClick={() => { addToCart(k, cart[k].qty, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }}
                                                className={`text-pink-500 cursor-pointer mx-2 text-xl`} />
                                        </div>
                                    </div>
                                </li>
                                </>
                            })}
                        </div>
                    </div>
                    <span className="font-bold px-5 text-lg md:px-5 pb-4">SubTotal: ₹{subTotal}</span>
                    <div className="buttons flex items-center justify-center">
                        <button disabled={Object.keys(cart).length === 0 ? true : false} onClick={() => router.push("/Checkout")} className='bg-pink-500 disabled:bg-pink-400 text-white rounded-md mx-2 px-6 py-1 hover:bg-pink-600 text-md sm:text-lg my-2 sm:w-1/3 w-1/2 lg:w-1/3'>Checkout</button>
                        <button disabled={Object.keys(cart).length === 0 ? true : false} className='bg-pink-500 disabled:bg-pink-400 text-white rounded-md mx-2 px-6 py-1 hover:bg-pink-700 text-md sm:text-lg my-2 sm:w-1/3 w-1/2 lg:w-1/3' onClick={() => clearCart()}>Clear Cart</button>
                    </div>
                </div>
                <div className={`symbols lg:my-3 xl:my-0 hidden space-x-7 xl:flex`}>
                    <FaShoppingCart onClick={toggleCart} className='text-3xl cursor-pointer text-pink-600' />
                    <a onMouseOver={() => setDropDown(true)} onMouseLeave={() => setDropDown(false)}>
                        {dropDown && (
                            <>
                                <div className='bg-pink-400 py-2 text-center justify-center border-2 border-gray-100 items-center rounded-md my-5 px-4 right-20 absolute'>
                                    {!localStorage.getItem('codeswear_token') ? <ul className='space-y-2 px-10'>
                                        <li className='my-1 font-[poppins] font-semibold text-lg text-black hover:text-gray-100 cursor-pointer'><Link href={`/Login`}>Login</Link></li>
                                        <li className='my-1 font-[poppins] font-semibold text-lg text-black hover:text-gray-100 cursor-pointer'><Link href={`/Signup`}>Signup</Link></li>
                                    </ul> : <ul className='space-y-2'>
                                        <li className='my-1 font-[poppins] font-semibold text-lg text-black hover:text-gray-100 cursor-pointer'><Link href={`/Account`}>Update Account</Link></li>
                                        <li className='my-1 font-[poppins] font-semibold text-lg text-black hover:text-gray-100 cursor-pointer'><Link href={`/`} onClick={handleLogout}>Logout</Link></li>
                                    </ul>}
                                </div>
                            </>
                        )}
                        <RiAccountPinCircleFill className='text-3xl cursor-pointer text-pink-600' />
                    </a>
                    {darkMode ? <IoSunnySharp onClick={toggleBrightNess} className='text-4xl cursor-pointer -mt-1 text-pink-600' /> : <BsMoonStarsFill onClick={toggleBrightNess} className='text-3xl cursor-pointer text-pink-600' />}
                </div>
                <div className={`fixed w-screen h-12 bottom-0 flex lg:hidden ${darkMode ? "dark:bg-gray-900" : "bg-gray-300"}`}>
                    <IoHome onClick={() => router.push('/')} className={`text-3xl relative -bottom-2 mx-auto box justify-center w-1/4 cursor-pointer ${darkMode ? "dark:text-pink-600" : "text-black"}`} />
                    <FaShoppingCart onClick={toggleCart} className={`text-3xl relative -bottom-2 mx-auto box justify-center w-1/4 cursor-pointer ${darkMode ? "dark:text-pink-600" : "text-black"}`} />
                    <a onMouseOver={() => setDropDown(true)} onMouseLeave={() => setDropDown(false)}>
                        {dropDown && (
                            <>
                                <div className='bg-pink-400 px-2 py-2 text-center justify-center border-2 border-gray-100 items-center rounded-md -top-24 absolute'>
                                    <ul className='space-y-2'>
                                        <li className='my-1 font-semibold text-lg text-black hover:text-gray-100 cursor-pointer'>Updated Account</li>
                                        <li className='my-1 font-semibold text-lg text-black hover:text-gray-100 cursor-pointer'>Logout</li>
                                    </ul>
                                </div>
                            </>
                        )}
                        {/* <RiAccountPinCircleFill className='text-3xl cursor-pointer text-pink-600' /> */}
                        <RiAccountPinCircleFill className={`text-3xl relative -bottom-2 box justify-center w-[20vw] cursor-pointer ${darkMode ? "dark:text-pink-600" : "text-black"}`} />
                    </a>
                    {darkMode ? <IoSunnySharp onClick={toggleBrightNess} className={`text-4xl relative -bottom-[0.35rem] mx-auto box justify-center w-1/4 cursor-pointer ${darkMode ? "dark:text-pink-600" : "text-black"}`} /> : <BsMoonStarsFill onClick={toggleBrightNess} className={`text-3xl relative -bottom-2 mx-auto box justify-center w-1/4 cursor-pointer ${darkMode ? "dark:text-pink-600" : "text-black"}`} />}
                </div>
            </header>
        </>
    )
}

export default Navbar