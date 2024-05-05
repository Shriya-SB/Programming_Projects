import Link from 'next/link'
import React, { useContext } from 'react'
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { BsMoonStarsFill } from "react-icons/bs";
import { IoHome, IoSearchSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import { AppContext } from './Context/AppContext';

const Navbar = ({ darkMode, cart, addToCart, removeFromCart, clearCart, subTotal }) => {
    const router = useRouter()
    const context = useContext(AppContext);
    const { handleLogout, cartRef, menuRef, dropDown, setDropDown, toggleBrightness, toggleNavbar, toggleCart, handleRirectToAccount, handleRirectToCheckout, handleRirectToLogin, handleRirectToSignUp } = context;

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
            <header className={`justify-between z-20 p-1 py-3 px-2 lg:items-center flex xl:flex-row flex-col top-0 sticky header ${darkMode ? "dark:bg-gray-900 dark:text-white" : "bg-gray-50"}`}>
                <div className='logo my-1 mx-auto xl:mx-0'>
                    <img src={"/logo1.jpg"} alt="Logo" className='xl:h-[3.3rem] sm:w-[39vw] lg:w-[30vw] lg:h-[4.3rem] sm:h-[5.5vh] md:w-[37vw] md:h-[4rem] w-[60vw] h-[14vw] rounded-md object-cover object-center xl:w-[16rem]' />
                </div>
                <GiHamburgerMenu onClick={toggleNavbar} className='lg:hidden text-3xl text-purple-600 absolute right-5 top-5' />
                <div className='flex searchBar my-2 mx-2 2xl:mr-5 space-x-2 justify-center'>
                    <input type="text" className={`transition ease-in-out px-2 focus:bg-white focus:outline-none font-sans focus:bg-clip-border xl:w-[20vw] 2xl:w-[28vw] ${darkMode ? "dark:bg-gray-500" : "bg-white"} xl:h-[2.6rem] w-[70vw] focus:border-purple-600 border-2 rounded-md `} placeholder='Search Your Favourite Gadget...' />
                    <FaSearch className='text-white bg-purple-600 rounded-md hover:bg-purple-700 w-[14vw] xl:w-[3.4rem] xl:h-[2.5rem] text-4xl p-2 sm:w-[3.5rem] cursor-pointer' />
                </div>
                <div className='parentOfNav flex flex-col lg:flex-row'>
                    <nav ref={menuRef} className={`lg:my-3 2xl:w-[37rem] flex lg:static absolute right-0 ${darkMode ? "lg:dark:bg-gray-900 bg-gray-500 dark:text-white" : "lg:bg-gray-50 bg-gray-200"} transition-transform lg:translate-x-0 lg:transition-none lg:transform-none transform translate-x-full lg:mx-0 lg:top-0 lg:justify-normal lg:items-start lg:text-start justify-center items-center text-center mx-auto space-x-0 lg:space-x-8 lg:space-y-0 top-32 py-3 lg:py-0 space-y-5 lg:mr-4 2xl:mr-0 w-screen lg:w-full`}>
                        <ul className='flex flex-col lg:flex-row lg:mx-4 2xl:mx-0 space-x-0 space-y-5 lg:space-y-0 lg:space-x-5'>
                            <li><Link className='cursor-pointer font-[poppins] text-xl hover:text-purple-600 hover:border-b-[3px] py-1 hover:border-purple-700' href={'/'}>Home</Link></li>
                            <li><Link className='cursor-pointer font-[poppins] text-xl hover:text-purple-600 hover:border-b-[3px] py-1 hover:border-purple-700' href={'/About'}>About</Link></li>
                            <li><Link className='cursor-pointer font-[poppins] text-xl hover:text-purple-600 hover:border-b-[3px] py-1 hover:border-purple-700' href={'/Contact'}>Contact</Link></li>
                            <li><Link className='cursor-pointer font-[poppins] text-xl hover:text-purple-600 hover:border-b-[3px] py-1 hover:border-purple-700' href={'/Mobile'}>Mobile</Link></li>
                            <li><Link className='cursor-pointer font-[poppins] text-xl hover:text-purple-600 hover:border-b-[3px] py-1 hover:border-purple-700' href={'/Laptop'}>Laptops</Link></li>
                            <li><Link className='cursor-pointer font-[poppins] text-xl hover:text-purple-600 hover:border-b-[3px] py-1 hover:border-purple-700' href={'/BlueTooth'}>Bluetoothes</Link></li>
                        </ul>
                    </nav>
                    <div ref={cartRef} className={`cart absolute right-0 h-screen top-0 ${Object.keys(cart).length !== 0 ? "translate-x-0" : "translate-x-full"} transition-transform transform z-20 w-screen md:w-[38.8vw] lg:w-[34vw] ${darkMode ? "dark:bg-gray-800 dark:text-white" : "bg-purple-100"}`}>
                        <h1 className='text-2xl md:text-3xl text-center my-3 xl:text-4xl' style={{ fontFamily: 'Bree Serif, serif' }}>Shopping Cart</h1>
                        <AiFillCloseCircle className='absolute cursor-pointer top-4 right-3 text-2xl text-purple-700' onClick={toggleCart} />
                        <p className={`border-b-2 w-full ${darkMode ? "dark:border-white" : "border-black"}`}></p>
                        {Object.keys(cart).length === 0 && <h1 className='mx-auto my-3 text-center text-2xl' style={{ fontFamily: 'Bree Serif, serif' }}>Your Cart is empty!!!</h1>}
                        <div className="items space-y-10">
                            {Object.keys(cart).map((k) => {
                                return <>
                                    <div className="mx-3 flex flex-col my-3 mb-3 font-[poppins]">
                                        <div className="item text-md" key={k}>{cart[k].name}({cart[k].ram}/{cart[k].variant})</div>
                                        <div className="signs space-x-2 flex flex-row absolute right-4">
                                            <AiFillMinusCircle className='text-2xl cursor-pointer text-purple-600 ' onClick={() => removeFromCart(k, cart[k].qty, cart[k].price, cart[k].name, cart[k].ram, cart[k].variant, cart[k].sound_driver)} /><h1 className='text-lg -mt-[2px]'>{cart[k].qty}</h1><AiFillPlusCircle className='text-2xl cursor-pointer text-purple-600 ' onClick={() => addToCart(k, cart[k].qty, cart[k].price, cart[k].name, cart[k].ram, cart[k].variant, cart[k].sound_driver)} />
                                        </div>
                                    </div>
                                </>
                            })}
                        </div>
                        <div className='mx-3 text-xl mt-12'>SubTotal: ₹{subTotal}</div>
                        <div className="buttons flex  space-x-4 items-center mx-10 my-7">
                            <button disabled={Object.keys(cart).length === 0 ? true : false} className='px-4 sm:px-7 disabled:bg-purple-300 text-lg text-white rounded-full py-2 bg-purple-500 hover:bg-purple-600' onClick={() => handleRirectToCheckout()}>Checkout</button>
                            <button disabled={Object.keys(cart).length === 0 ? true : false} className='px-4 sm:px-7 disabled:bg-purple-300 text-lg text-white rounded-full py-2 bg-purple-500 hover:bg-purple-600' onClick={() => clearCart()}>Clear</button>
                        </div>
                    </div>
                    <div className={`lg:my-1 h-14 lg:h-0 symbols py-2 ${darkMode ? "dark:bg-gray-900" : "bg-gray-300 lg:bg-gray-50"}  lg:w-auto lg:static -mx-[8px] lg:mx-4 2xl:mx-0 flex space-x-0 lg:space-x-7 w-screen fixed bottom-0`}>
                        <FaShoppingCart onClick={toggleCart} className={`text-3xl lg:text-3xl  w-1/2 lg:w-auto cursor-pointer ${darkMode ? "dark:text-purple-600" : "text-black"} lg:text-purple-600`} />
                        <IoHome className={`text-3xl w-1/2 lg:hidden lg:w-auto cursor-pointer ${darkMode ? "dark:text-purple-600" : "text-black"} lg:text-purple-600`} onClick={() => router.push('/')} />
                        <IoSearchSharp className={`text-4xl lg:text-3xl lg:hidden w-1/2 lg:w-auto cursor-pointer ${darkMode ? "dark:text-purple-600" : "text-black"} lg:text-purple-600`} />
                        <span onMouseOver={() => setDropDown(true)} onMouseLeave={() => setDropDown(false)} className='hidden lg:block'>
                            {dropDown && (
                                <>
                                    <div className='Account absolute rounded-md my-4 px-9 py-4 border-2 border-black -ml-32 bg-purple-100 text-black font-[poppins]'>
                                        <ul className='space-y-4 items-center justify-center text-center mx-auto'>
                                            {localStorage.getItem('myuser') ? <>
                                                <li className="cursor-pointer font-[poppins] hover:text-purple-700 text-lg" onClick={handleRirectToAccount}>Update Account</li>
                                                <li className="cursor-pointer font-[poppins] hover:text-purple-700 text-lg" onClick={handleLogout}>Logout</li>
                                            </> : <>
                                                <li className="cursor-pointer font-[poppins] hover:text-purple-700 text-lg" onClick={handleRirectToLogin}>Login</li>
                                                <li className="cursor-pointer font-[poppins] hover:text-purple-700 text-lg" onClick={handleRirectToSignUp}>Signup</li>

                                            </>}
                                        </ul>
                                    </div>
                                </>
                            )}
                            <RiAccountPinCircleFill className={`text-4xl lg:text-3xl hidden lg:block lg:w-auto cursor-pointer ${darkMode ? "dark:text-purple-600" : "text-black"} lg:text-purple-600`} />
                        </span>
                        <span onMouseOver={() => setDropDown(true)} onMouseLeave={() => setDropDown(false)} className='lg:hidden block'>
                            {dropDown && (
                                <>
                                    <div className="absolute bottom-[2.9rem] pl-[10px] pr-[10px] bg-purple-100 px-20 py-4 text-black w-[12rem] text-center right-[5rem] rounded-md font-[poppins]">
                                        <ul className='justify-center space-y-4 text-center items-center mx-auto'>
                                            {localStorage.getItem('myuser') ? <>
                                                <li className="cursor-pointer hover:text-purple-700 text-lg" onClick={handleRirectToAccount}>Update Account</li>
                                                <li className="cursor-pointer hover:text-purple-700 text-lg" onClick={handleLogout}>Logout</li>
                                            </> : <>
                                                <li className="cursor-pointer hover:text-purple-700 text-lg" onClick={handleRirectToLogin}>Login</li>
                                                <li className="cursor-pointer hover:text-purple-700 text-lg" onClick={handleRirectToSignUp}>Signup</li>

                                            </>}
                                        </ul>
                                    </div>
                                </>
                            )}
                            <RiAccountPinCircleFill className={`text-4xl lg:text-3xl lg:hidden block w-[20vw] cursor-pointer ${darkMode ? "dark:text-purple-600" : "text-black"} lg:text-purple-600`} />
                        </span>
                        <BsMoonStarsFill onClick={toggleBrightness} className={`text-3xl lg:text-3xl  w-1/2 lg:w-auto cursor-pointer ${darkMode ? "dark:text-purple-600" : "text-black"} lg:text-purple-600`} />
                    </div>

                </div>
            </header >
        </>
    )
}

export default Navbar