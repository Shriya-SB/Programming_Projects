import mongoose from 'mongoose'
import React, { useEffect } from 'react'
import Product from './api/models/Product'
import Link from 'next/link';
import { useRouter } from 'next/router';

const Mobile = ({ darkMode, products }) => {
    let availableColor = {
        'blue': 'bg-blue-500',
        'green': 'bg-green-500',
        'yellow': 'bg-yellow-500',
        'purple': 'bg-purple-500',
        'orange': 'bg-orange-500',
        'purple': 'bg-purple-500',
        'red': "bg-red-500",
        'silver': "bg-gray-500",
        'white': "bg-white",
        'black': "bg-black",
    }

    const router = useRouter();
    useEffect(() => {
        if (!localStorage.getItem('myuser')) {
            router.push('/Login')
        }
    }, [])

    return (
        <>
            <div className={`${darkMode ? "dark:text-white dark:bg-gray-700" : "bg-gray-100"} flex-col lg:flex-row flex justify-center items-center`}>
                <div className='mx-auto text-center lg:absolute lg:top-20'>
                    <h1 className="text-5xl py-5 font-bold">Mobile For Sale</h1>
                </div>
                {Object.keys(products).length === 0 && <><br /><div className='justify-center items-center font-bold text-3xl my-52'>Sorry, products are out of stock. New stock coming soon!!</div></>}
                {Object.keys(products).map((item) => (
                    <>
                        <Link passHref={true} href={`/product/${products[item].slug}`} key={products[item]._id} className='flex mx-auto'>
                            <div className="container px-5 p-16 m-10 mx-auto">
                                <div className="flex flex-wrap -m-4">
                                    <div className="shadow-2xl  mx-auto p-4 w-96">
                                        <span className=" relative rounded overflow-hidden">
                                            <img alt="ecommerce" className={`mx-auto object-center`} src={`${products[item].img}`} />
                                        </span>
                                        <div className="mt-4">
                                            <h2 className="py-2 title-font text-lg font-medium">{products[item].title}</h2>
                                            Colors: {products[item].color.map((colorOfPhone) => (
                                                <>
                                                    <button className={`border-2 mx-2 border-gray-300 ${availableColor[colorOfPhone]} rounded-full w-6 h-6 focus:outline-none`}></button>
                                                </>
                                            ))}
                                            <br />
                                            Ram: {products[item].ram.map((ramOfPhone) => (
                                                <>
                                                    <span className='pr-3'>{ramOfPhone}</span>
                                                </>
                                            ))}
                                            <br />
                                            Storage: {products[item].storage.map((storageOfPhone) => (
                                                <>
                                                    <span className='pr-3'>{storageOfPhone}</span>
                                                </>
                                            ))}
                                            <br />
                                            Memory: {products[item].memory.map((memoryOfPhone) => (
                                                <>
                                                    <span className='pr-3'>{memoryOfPhone}</span>
                                                </>
                                            ))}
                                            <p className="mt-1">Price: ₹{products[item].price}</p>
                                            {/* <p className="mt-1">₹{products[item].slug}</p> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </>
                ))}
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URL)
    }
    let products = await Product.find({ category: 'phone' })
    const mobile = {}
    for (let item of products) {
        if (item.title in mobile) {
            if (!mobile[item.title].color.includes(item.color) && item.availableQty > 0) {
                mobile[item.title].color.push(item.color)
            }
            if (!mobile[item.title].ram.includes(item.ram) && item.availableQty > 0) {
                mobile[item.title].ram.push(item.ram)
            }
            if (!mobile[item.title].storage.includes(item.storage) && item.availableQty > 0) {
                mobile[item.title].storage.push(item.storage)
            }
            if (!mobile[item.title].memory.includes(item.memory) && item.availableQty > 0) {
                mobile[item.title].memory.push(item.memory)
            }
        } else {
            mobile[item.title] = JSON.parse(JSON.stringify(item))
            if (item.availableQty >= 0) {
                mobile[item.title].color = [item.color]
                mobile[item.title].ram = [item.ram]
                mobile[item.title].storage = [item.storage]
                mobile[item.title].memory = [item.memory]
            }
        }
    }
    return {
        props: { products: JSON.parse(JSON.stringify(mobile)) }
    }
}

export default Mobile