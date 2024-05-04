import mongoose from 'mongoose'
import Link from 'next/link'
import React, { useEffect } from 'react'
import Product from '../api/models/Product'
import { useRouter } from 'next/router'

const Mugs = ({ darkMode, products }) => {
  const router = useRouter()
  
  useEffect(() => {
    if (!localStorage.getItem('codeswear_token')) {
        router.push("/Components/Login")
    }
}, [])

  let availbleColors = {
    red: 'bg-red-500',
    purple: 'bg-purple-500',
    blue: 'bg-blue-500',
    yellow: 'bg-yellow-500',
    green: 'bg-green-500',
    pink: 'bg-pink-500',
    black: 'bg-black',
    white: 'bg-white',
    gray: 'bg-gray-500'
  }
  return (
    <>
      <section className={`body-font min-h-screen ${darkMode ? "dark:bg-gray-700 dark:text-white" : ""}`}>
        <h1 className='text-4xl text-center py-5 font-bold'>Mugs for sale.</h1>
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {Object.keys(products).length === 0 && <h4 className='text-center justify-center items-center mx-auto text-3xl font-bold'>Sorry! Mugs are out of stock. New stock coming soon..</h4>}
            {Object.keys(products).map((item) => {
              return <>
                <Link key={products[item]._id} href={`/product/${products[item].slug}`} className='lg:w-1/4 mx-auto md:w-full p-4 w-full'>
                  <span className="block relative shadow-xl rounded overflow-hidden">
                    <img alt="ecommerce" className="w-full block " src={products[item].img} />
                  </span>
                  <div className="mt-4 space-y-2">
                    <h2 className=" title-font text-lg font-medium">{products[item].title}</h2>
                    <p>{products[item].desc}</p>
                    {products[item].color.map((colorOfTshirt) => {
                      return <>
                        <button key={colorOfTshirt} className={`border-2 mr-2 border-gray-300 ${availbleColors[colorOfTshirt]} rounded-full w-6 h-6 focus:outline-none`}></button>
                      </>
                    })}
                    <div className='flex'>
                      {products[item].size.map((sizeOfTshirt) => {
                        return <>
                          <div key={sizeOfTshirt} className="rounded border-2 w-[35px] mr-2 text-center items-center justify-center border-gray-300 flex flex-row">
                            {sizeOfTshirt}
                          </div>
                        </>
                      })}
                    </div>
                    <p className="mt-1">₹{products[item].price}</p>
                  </div>
                </Link>
              </>
            })}
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
  let products = await Product.find({ category: 'mug' })
  let mugs = {}
  for (let item of products) {
    if (item.title in mugs) {
      if (!mugs[item.title].color.includes(item.color) && item.availableQty > 0) {
        mugs[item.title].color.push(item.color)
      }
      if (!mugs[item.title].size.includes(item.size) && item.availableQty > 0) {
        mugs[item.title].size.push(item.size)
      }
    } else {
      mugs[item.title] = JSON.parse(JSON.stringify(item))
      mugs[item.title].color = [item.color]
      mugs[item.title].size = [item.size]
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(mugs)) }
  }
}

export default Mugs