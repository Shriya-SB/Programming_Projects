import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import Product from '../api/models/Product'
import mongoose from 'mongoose'
import AppContext from '../Context/AppContext'

const Post = ({ addToCart, darkMode, buyNow, variants, product }) => {
    const router = useRouter()
    const { slug } = router.query
    const [color, setColor] = useState(product.color)
    const [size, setSize] = useState(product.size)
    const context = useContext(AppContext)
    const { pinCode, handleChange, checkPinCodeService, result } = context;

    const availableColors = {
        red: 'bg-red-500',
        yellow: 'bg-yellow-500',
        blue: 'bg-blue-500',
        purple: 'bg-purple-500',
        green: 'bg-green-500',
        white: 'bg-white',
        black: 'bg-black',
        gray: 'bg-gray-500',
        pink: 'bg-pink-500',
    }


    const refreshVariants = (newColor, newSize) => {
        setSize(newSize);
        setColor(newColor);

        const variant = variants[newColor]?.[newSize];
        if (variant && variant.slug) {
            router.push(`${process.env.NEXT_PUBLIC_HOST}/product/${variant.slug}`);
        } else {
            console.error(`Invalid variant data for color: ${newColor}, size: ${newSize}`);
        }
    }

    return (
        <>
            <section className={`body-font min-h-screen font-[poppins] overflow-hidden ${darkMode ? "dark:bg-gray-700 dark:text-white" : ""}`}>
                <div className="container px-5 py-16 mx-auto">
                    <div className=" mx-auto flex flex-wrap">
                        <img alt="ecommerce" className="w-full lg:w-1/2  lg:h-auto shadow-2xl rounded" src={product.img} />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font  tracking-widest">Codeswear.com</h2>
                            <h1 className=" text-3xl title-font font-medium mb-1">{product.title}({product.size}/{product.color})</h1>
                            <div className="flex mb-4">
                                <span className="flex items-center">
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <span className=" ml-3">4 Reviews</span>
                                </span>
                                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                    <a className="">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                        </svg>
                                    </a>
                                    <a className="">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                        </svg>
                                    </a>
                                    <a className="">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                        </svg>
                                    </a>
                                </span>
                            </div>
                            <p className="leading-relaxed xl:w-[45vw] w-[80.5vw]">{product.desc}</p>
                            <div className=" mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                <div className="flex">
                                    <span className="mr-3">Colors</span>
                                    {Object.keys(variants).map((colorKey) => {
                                        return Object.keys(variants[colorKey]).includes(size) && (
                                            <button
                                                key={colorKey}
                                                onClick={() => refreshVariants(colorKey, size)}
                                                className={`border-2 ml-2 ${availableColors[colorKey]} rounded-full w-6 h-6 focus:outline-none ${color === colorKey ? `${darkMode ? 'dark:border-white' : "border-black"}` : `${darkMode ? "dark:border-black" : "border-white"}`}`}
                                            ></button>
                                        )
                                    })}
                                </div>
                                <div className="flex mt-10 items-center">
                                    <span className="mr-3">Size's</span>
                                    <div className="relative">
                                        <span
                                        // className={`rounded border appearance-none border-gray-300 p-4 py-1 md:py-2 focus:outline-none focus:ring-2 ${darkMode ? "dark:bg-gray-500 dark:text-white" : ""} focus:ring-pink-200 focus:border-pink-500 w-20 text-base pr-5`}
                                        >
                                            {Object.keys(variants[color]).map((sizeKey) => {
                                                return <><button className={`rounded mx-2 appearance-none border-gray-300 p-2  focus:outline-none focus:ring-2 border-2 ${size === sizeKey ? 'border-pink-500' : `${darkMode ? "dark:border-gray-100" : "border-gray-500 "}`} focus:ring-pink-200 focus:border-pink-500 w-10 text-base`} onClick={(e) => refreshVariants(color, e.target.value)} key={sizeKey} value={sizeKey}>
                                                    {sizeKey}
                                                </button></>
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col lg:flex-col xl:flex-row md:flex-row">
                                <span className="title-font font-medium text-2xl ">₹{product.price}</span>
                                <button className="flex md:ml-10 mx-1 text-white my-2 xl:my-0 text-center items-center justify-center bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded-full" onClick={() => addToCart(slug, 1, product.title, product.price, size, color)}>Add To Cart</button>
                                <button className="flex md:ml-10 mx-1 text-white my-2 xl:my-0 text-center items-center justify-center bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded-full" onClick={() => buyNow(slug, 1, product.title, product.price, size, color)}>Buy Now</button>

                            </div>
                            <div className="flex my-5 flex-col lg:flex-col xl:flex-row md:flex-row">
                                <input placeholder='Enter Your PinCode..' value={pinCode} onChange={handleChange} type="text" className={`border-2 rounded-full py-2 my-4 px-2 mx-2 ${darkMode ? "dark:bg-gray-500 dark:text-white dark:border-white" : "dark:text-black dark:border-black"}`} id="pinCode" name="pinCode" />
                                <button className='bg-pink-500 hover:bg-pink-600 text-white py-2 my-4 rounded-full px-6 mx-2 focus:outline-none' onClick={checkPinCodeService}>Check Serviceability</button>
                            </div>
                            <div className="result h-10">
                                {result}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGODB_URL)
    }
    let product = await Product.findOne({ slug: context.query.slug })
    let variants = await Product.find({ category: product.category, title: product.title })
    let colorSizeSlug = {}
    for (let item of variants) {
        if (Object.keys(colorSizeSlug).includes(item.color)) {
            colorSizeSlug[item.color][item.size] = { slug: item.slug }
        } else {
            colorSizeSlug[item.color] = {}
            colorSizeSlug[item.color][item.size] = { slug: item.slug }
        }
    }
    return {
        props: { product: JSON.parse(JSON.stringify(product)), variants: JSON.parse(JSON.stringify(colorSizeSlug)) }
    }
}

export default Post