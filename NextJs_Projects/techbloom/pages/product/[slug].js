import mongoose from 'mongoose';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import Product from '../api/models/Product';
import { AppContext } from '../Context/AppContext';

const Post = ({ darkMode, product, buyNow, variants, addToCart }) => {
    const router = useRouter();
    const { slug } = router.query;
    const [ram, setRam] = useState(product.ram);
    const [color, setColor] = useState(product.color);
    const [storage, setStorage] = useState(product.storage)
    const [memory, setMemory] = useState(product.memory)
    const [display, setDisplay] = useState(product.display)
    const [webcam, setWebCam] = useState(product.webcamp)
    const [soundDriver, setSoundDriver] = useState(product.sound_driver)
    const first = useContext(AppContext)

    const { colorSelect, handlePinCode, handlePinCodeChange, result, pinCode } = first;

    useEffect(() => {
        if (!localStorage.getItem('myuser')) {
            router.push('/login')
        }
    }, [])


    const refreshColorAndRam = (newColor, newRam) => {
        setColor(newColor);
        setRam(newRam);
        setStorage(variants[newColor][newRam].storage); // Update storage directly
        setMemory(variants[newColor][newRam].memory); // Update storage directly
        setDisplay(variants[newColor][newRam].display); // Update storage directly
        setWebCam(variants[newColor][newRam].webcam); // Update storage directly
        setSoundDriver(variants[newColor][newRam].sound_driver); // Update storage directly

        if (variants && variants[newColor] && variants[newColor][newRam] && variants[newColor][newRam].slug) {
            const url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newColor][newRam].slug}`;
            router.replace(url);
        } else {
            console.error("Invalid variants structure or missing properties.");
            // Handle the error or provide a fallback URL
        }
    };


    return (
        <>
            <section className={`${darkMode ? "dark:bg-gray-700 dark:text-white" : "bg-gray-200"} font-[poppins] body-font overflow-hidden`}>
                <div className="container px-5 py-16 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img alt="ecommerce" className="xl:w-[30.9rem] xl:h-[70.7vh] md:w-full md:object-cover md:h-full h-96 w-full shadow-2xl lg:h-[69vh] lg:object-fill lg:w-[70vw] lg:mx-auto lg:my-10 object-center rounded" src={product.img} />
                        {/* {(product.category === "laptop") && (<img alt="ecommerce" className="xl:w-[24.6rem] lg:w-[24rem] lg:my-10 w-full h-96 shadow-2xl lg:h-[46vh] xl:h-[80vh] object-center rounded" src={product.img} />)} */}
                        {/* {(product.category === "phone") && (<img alt="ecommerce" className="xl:w-[24.6rem] lg:w-[24rem] lg:my-10 w-full h-96 shadow-2xl lg:h-[46vh] xl:h-[80vh] object-center rounded" src={product.img} />)} */}
                        <div className="lg:w-4/5 xl:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font tracking-widest">TechBloom.Com</h2>
                            {!(product.category === "bluetooth") && <h1 className="text-2xl sm:text-3xl title-font font-medium mb-1 m-1 w-[100vw]">{product.title}({color}/{ram})</h1>}
                            {(product.category === "bluetooth") && <h1 className="text-3xl title-font font-medium mb-1 m-1 w-[58vw]">{product.title}({soundDriver}/{color})</h1>}
                            <div className="flex mb-4">
                                <span className="flex items-center">
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-purple-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-purple-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-purple-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-purple-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-purple-500" viewBox="0 0 24 24">
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
                            <p className="leading-relaxed">{product.desc}</p>
                            <br />
                            <p className='text-lg font-semibold w-full'>Display: <strong>{display}</strong></p>
                            <br />
                            {(product.category === "bluetooth") && (<>
                                <p className='text-lg w-full font-semibold'>Sound Driver: <strong>{soundDriver}</strong></p>
                                <br />
                                <p className='text-lg w-full font-semibold'>Safety: <strong>Water Resistence</strong></p>
                                <br />
                                <p className='text-lg w-full font-semibold'>Voice <strong>Assistance</strong></p>
                                <br />
                            </>)}
                            <div className="space-y-10 mt-6 items-center pb-5  border-gray-100 mb-5">
                                <div className="flex  items-center">
                                    <span className="mr-3">Colors: </span>
                                    {Object.keys(variants).map((colorOfProduct) => (
                                        <>
                                            <button
                                                key={colorOfProduct}
                                                onClick={() => {
                                                    const firstAvailableRam = Object.keys(variants[colorOfProduct])[0];
                                                    refreshColorAndRam(colorOfProduct, firstAvailableRam);
                                                }}
                                                className={`border-2 ml-1 mx-2  ${color === colorOfProduct ? "border-white" : "border-gray-600"} ${colorSelect[colorOfProduct]} rounded-full w-6 h-6 focus:outline-none`}
                                            ></button>
                                            <p>{product.category === "laptops" ? "(Only black and gray laptops are available!)" : ""}</p>
                                        </>
                                    ))}

                                </div>
                                {!(product.category === "bluetooth") && (<>
                                    <p className='text-lg w-full font-semibold'>WebCam: <strong>{webcam}</strong></p>
                                    <div className="space-y-10 mt-6 items-center pb-5  border-gray-100 mb-5">
                                        <div className='flex flex-col xl:flex-row space-y-10 xl:space-y-0 xl:space-x-11' >
                                            <div className="flex  items-center">
                                                <span className="mr-3">Ram: </span>
                                                <div className="relative">
                                                    <div
                                                        value={ram}
                                                        onChange={(e) => refreshColorAndRam(color, e.target.value)}
                                                        className={`rounded border xl:w-28 w-56 text-center bg-gray-100 text-black appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 text-base pl-3 pr-10 ${darkMode ? "dark:bg-gray-500 dark:text-white" : "dark:bg-gray-100"
                                                            }`}
                                                    >
                                                        {Object.keys(variants[color]).map((variantRam) => (
                                                            <option key={variantRam} value={variantRam}>
                                                                {variantRam}
                                                            </option>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex  items-center">
                                                <span className="mr-3">Storage: </span>
                                                <div className="relative">
                                                    <div
                                                        value={storage}
                                                        onChange={(e) => refreshColorAndRam(color, ram, e.target.value)} // Pass the storage value
                                                        className={`rounded border xl:w-28 w-56 text-center bg-gray-100 text-black appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 text-base pl-3 pr-10 ${darkMode ? "dark:bg-gray-500 dark:text-white" : "dark:bg-gray-100"}`}
                                                    >
                                                        <option key={variants[color][ram].storage} value={variants[color][ram].storage}>
                                                            {variants[color][ram].storage}
                                                        </option>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex  items-center">
                                                <span className="mr-3">Memory: </span>
                                                <div className="relative">
                                                    <div
                                                        value={memory}
                                                        onChange={(e) => refreshColorAndRam(color, ram, e.target.value)} // Pass the storage value
                                                        className={`rounded border xl:w-28 w-56 text-center bg-gray-100 text-black appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 text-base pl-3 pr-10 ${darkMode ? "dark:bg-gray-500 dark:text-white" : "dark:bg-gray-100"}`}
                                                    >
                                                        <option key={variants[color][ram].memory} value={variants[color][ram].memory}>
                                                            {variants[color][ram].memory}
                                                        </option>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>)}
                                <div className="fields flex space-x-3">
                                    <div>
                                        <input
                                            value={pinCode}
                                            onChange={handlePinCodeChange}
                                            type="text"
                                            className={`${darkMode ? 'dark:bg-gray-500 dark:border-gray-300 dark:text-white' : 'border-gray-900'} focus:bg-white focus:text-black border-2 px-3 my-3 w-full md:w-52 lg:w-64 transition ease-in-out focus:bg-clip-border focus:border-purple-600 focus:outline-none h-10 py-3 rounded-full`}
                                            name='pinCode'
                                            id="pinCode"
                                            placeholder='Enter your pinCode..'
                                        />
                                    </div>
                                    <div>
                                        <button className='bg-purple-600 md:mx-2 my-3 w-full md:w-52 py-1 h-10 rounded-full text-white hover:bg-purple-700 px-3 sm:px-6' onClick={handlePinCode}>Check</button>
                                    </div>
                                </div>
                                <div className="result -top-10 md:-top-8 md:h-5 relative">
                                    <span className=''>{result}</span>
                                </div>
                                <div className="flex flex-col -top-10 relative lg:-top-10 md:flex-row">
                                    <span className="title-font font-medium text-2xl my-5 md:my-0">₹{product.price}</span>
                                    <div className='flex mx-auto w-full md:space-x-3 md:space-y-0 space-y-2 flex-col md:flex-row md:px-5'>
                                        <button onClick={() => addToCart(slug, product.availableQty, product.price, product.title, product.ram, product.color, product.sound_driver)} className="flex px-5 h-10 md:w-52 w-full justify-center items-center text-center text-white bg-purple-600 border-0 py-2  focus:outline-none hover:bg-purple-700 rounded-full">
                                            Add To Cart
                                        </button>
                                        <button onClick={() => buyNow(slug, product.availableQty, product.price, product.title, product.ram, product.color, product.sound_driver)} className="flex h-10 md:w-52 w-full px-5  justify-center items-center text-center text-white bg-purple-600 border-0 py-2  focus:outline-none hover:bg-purple-700 rounded-full">
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    );
};

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URL);
    }

    let product = await Product.findOne({ slug: context.query.slug, });
    let variants = await Product.find({ title: product.title, category: product.category });
    let colorRamSlug = {};

    for (let item of variants) {
        if (Object.keys(colorRamSlug).includes(item.color)) {
            colorRamSlug[item.color][item.ram] = { slug: item.slug, webcam: item.webcamp, storage: item.storage, memory: item.memory, display: item.display, sound_driver: item.sound_driver };
        } else {
            colorRamSlug[item.color] = {};
            colorRamSlug[item.color][item.ram] = { slug: item.slug, webcam: item.webcamp, storage: item.storage, memory: item.memory, display: item.display, sound_driver: item.sound_driver };
        }
    }


    return {
        props: { product: JSON.parse(JSON.stringify(product)), variants: JSON.parse(JSON.stringify(colorRamSlug)) },
    };
}

export default Post;