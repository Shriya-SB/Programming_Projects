import Link from 'next/link'
import React from 'react'

const Footer = ({ darkMode }) => {
  return (
    <>
      <footer className={`${darkMode ? "dark:bg-gray-900 dark:text-white" : "bg-gray-300"} relative w-screen bottom-0`}>
        <div className="container plocax-5 py-14 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <div className='logo hidden lg:flex text-center lg:text-left mx-20'>
              <img src="/logo1.jpg" className={`absolute ${darkMode ? "" : "border-4 border-black"} object-cover rounded-lg object-center h-[50px] w-[200px]`} alt="title"  />
            </div>
            <p className="mt-2 px-14 py-16 hidden absolute bottom-0 lg:bottom-auto flex-col lg:flex text-sm">Buy any kind of electronic products. <br /> Buy IPhones, Laptops, BlueToothes etc.</p>
            <div className='logo flex lg:hidden object-center mx-auto items-center justify-center text-center lg:text-left'>
              <img src="/logo1.jpg" className={`m-auto mx-auto right-auto left-auto h-12 md:h-16 md:w-60 w-52 ${darkMode ? "" : "border-4 border-black"} object-cover rounded-lg absolute object-center`} alt="title" style={{ filter: "contrast(3.5) brightness(1.5) blur(0px)" }} />
            </div>
          </div>
          <div className="flex-grow flex flex-wrap md:pl-20  md:mt-0 mt-10 md:text-left text-center">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium  tracking-widest text-xl mb-5">SHOP</h2>
              <nav className="list-none mb-10 space-y-4">
                <li>
                  <Link href={"/Mobile"} className=" dark:hover:text-purple-400">Mobile</Link>
                </li>
                <li>
                  <Link href={"/Laptop"} className=" dark:hover:text-purple-400">Laptops</Link>
                </li>
                <li>
                  <Link href={"/BlueTooth"} className=" dark:hover:text-purple-400">BlueToothes</Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium  tracking-widest text-xl mb-5">CUSTOMER SERVICES</h2>
              <nav className="list-none mb-10 space-y-4">
                <li>
                  <Link href={"/About"} className=" dark:hover:text-purple-400">About Us</Link>
                </li>
                <li>
                  <Link href={"/Contact"} className=" dark:hover:text-purple-400">Contact Us</Link>
                </li>
                <li>
                  <Link href={"/ReturnPolicy"} className=" dark:hover:text-purple-400">Return Policy</Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium  tracking-widest text-xl mb-5">POLICY</h2>
              <nav className="list-none mb-10 space-y-4">
                <li>
                  <Link href={"/Privacy"} className=" dark:hover:text-purple-400">Privacy Policy</Link>
                </li>
                <li>
                  <Link href={"/Terms"} className=" dark:hover:text-purple-400">Terms and Conditions</Link>
                </li>
              </nav>
            </div>
          </div>
        </div>
        <div>
          <div className={`${darkMode ? "dark:bg-gray-700" : "bg-gray-400"} container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row`}>
            <p className=" text-sm text-center sm:text-left">© 2024 TechBloom —
              <span rel="noopener noreferrer" className=" ml-1" target="_blank">All Rights Reserved</span>
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
              <a className="">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a className="ml-3 ">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a className="ml-3 ">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
              <a className="ml-3 ">
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                  <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                  <circle cx="4" cy="4" r="2" stroke="none"></circle>
                </svg>
              </a>
            </span>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer