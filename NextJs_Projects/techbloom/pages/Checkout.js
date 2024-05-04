import React, { useContext, useEffect } from 'react'
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { AppContext } from './Context/AppContext';
import { useRouter } from 'next/router';

const Checkout = ({ darkMode, cart, addToCart, removeFromCart, subTotal }) => {
    const context = useContext(AppContext);
    const { handleChange, name, email, address, pinCode, city, state, phone } = context;
    const router = useRouter();
    useEffect(() => {
        if (!localStorage.getItem('myuser')) {
            router.push('/Login')
        }
    }, [])
    return (
        <>
            <div className={`container m-auto ${darkMode ? "dark:text-white dark:bg-gray-700" : ""}`}>
                <h1 className="font-bold text-center text-3xl py-8">Checkout</h1>
                <h1 className='font-semibold text-lg py-4 pb-4'>1. Delivery Details</h1>
                <div className="mx-auto flex">
                    <div className="px-2 w-1/2">
                        <div className="mb-4">
                            <label htmlFor="name" className="leading-7 text-sm ">Name</label>
                            <input onChange={handleChange} value={name} type="text" id="name" name="name" className={`w-full  rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${darkMode ? "dark:bg-gray-500 dark:text-white" : ""}`} />
                        </div>
                    </div>
                    <div className="px-2 w-1/2">
                        <div className="mb-4">
                            <label htmlFor="email" className="leading-7 text-sm ">Email</label>
                            <input onChange={handleChange} value={email} type="email" id="email" name="email" className={`w-full  rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${darkMode ? "dark:bg-gray-500 dark:text-white" : ""}`} />
                        </div>
                    </div>
                </div>
                <div className="px-2 w-full">
                    <div className="mb-4">
                        <div className="mb-4">
                            <label htmlFor="Address" className="leading-7 text-sm ">Address</label>
                            <textarea cols={30} rows={3} value={address} onChange={handleChange} type="text" id="address" name="address" className={`w-full  rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${darkMode ? "dark:bg-gray-500 dark:text-white" : ""}`} />
                        </div>
                    </div>
                </div>
                <div className="mx-auto flex">
                    <div className="px-2 w-1/2">
                        <div className="mb-4">
                            <label htmlFor="PinCode" className="leading-7 text-sm ">PinCode</label>
                            <input onChange={handleChange} value={pinCode} type="text" id="pinCode" name="pinCode" className={`w-full  rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${darkMode ? "dark:bg-gray-500 dark:text-white" : ""}`} />
                        </div>
                    </div>
                    <div className="px-2 w-1/2">
                        <div className="mb-4">
                            <label htmlFor="phone" className="leading-7 text-sm ">Phone Number</label>
                            <input onChange={handleChange} value={phone} type="number" id="phone" name="phone" className={`w-full  rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${darkMode ? "dark:bg-gray-500 dark:text-white" : ""}`} />
                        </div>
                    </div>
                </div>
                <div className="mx-auto flex">
                    <div className="px-2 w-1/2">
                        <div className="mb-4">
                            <label htmlFor="City" className="leading-7 text-sm ">City</label>
                            <input onChange={handleChange} value={city} type="text" id="city" name="city" className={`w-full  rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${darkMode ? "dark:bg-gray-500 dark:text-white" : ""}`} />
                        </div>
                    </div>
                    <div className="px-2 w-1/2">
                        <div className="mb-4">
                            <label htmlFor="State" className="leading-7 text-sm ">State</label>
                            <input onChange={handleChange} value={state} type="text" id="state" name="state" className={`w-full  rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${darkMode ? "dark:bg-gray-500 dark:text-white" : ""}`} />
                        </div>
                    </div>
                </div>
                <h1 className='font-semibold text-lg py-4 pb-4'>2. Review Cart</h1>

                <div
                    className={`flex lg:mx-10 mx-2  rounded-xl px-2 lg:px-20 flex-col ${darkMode ? 'dark:bg-gray-400' : 'bg-purple-300'
                        }`}
                >
                    <div className='relative w-full block'>
                        <p
                            style={{ fontFamily: 'Bree Serif, serif' }}
                            className='justify-center underline items-center my-2 text-3xl text-center mx-auto'
                        >
                            Shopping Cart
                        </p>
                    </div>
                    <div className='flex-grow overflow-y-auto'>
                        <div className='border-b border-gray-100'>

                            {Object.keys(cart).length === 0 && <div className='font-semibold text-sm lg:text-lg w-full text-center my-2'>Your Cart is Empty! Please add few items</div>}
                            {Object.keys(cart).map((k) => (
                                <div key={k} className='item w-full my-5 p-0 lg:p-4 '>
                                    <div className='flex w-full'>
                                        <div className='w-screen text-sm lg:text-xl font-semibold'>{cart[k].name}({cart[k].ram}/{cart[k].variant})</div>
                                        <div className='flex font-semibold items-center justify-center w-1/3 text-lg'>
                                            <button className='cursor-pointer'>
                                                <AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].ram, cart[k].variant) }} className='text-purple-600 text-xl' />
                                            </button>
                                            <span className='mx-2 text-sm'>{cart[k].qty}</span>
                                            <button className='cursor-pointer'>
                                                <AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].ram, cart[k].variant) }} className='text-purple-600 text-xl' />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="subt my-5 block w-full">
                            <span className='text-lg mx-3 font-semibold '>SubTotal = ₹{subTotal}</span>
                        </div>
                        {/* <div className="buttons flex items-center justify-center">
                            <button onClick={() => router.push("/Checkout")} className='mx-5 px-5 py-1 text-lg hover:bg-purple-700 rounded-md bg-purple-600'>Checkout</button>
                            <button onClick={() => clearCart()} className='mx-5 px-5 py-1 text-lg hover:bg-purple-700 rounded-md bg-purple-600'>Clear Cart</button>
                        </div> */}
                    </div>
                </div>
                {Object.keys(cart).length === 0 ? <button disabled={true} className='px-7 disabled:bg-purple-400 my-3 bg-purple-600 mb-5 mx-4 py-1 rounded-md hover:bg-purple-700'>Pay ₹{subTotal}</button> : <button className='px-7 my-3 bg-purple-600 mb-5 mx-4 py-1 rounded-md hover:bg-purple-700'>Pay ₹{subTotal}</button>}
            </div>
        </>
    )
}

export default Checkout  