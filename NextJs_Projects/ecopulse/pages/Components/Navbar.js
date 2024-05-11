import React from 'react'

const Navbar = () => {
    return (
        <>
            <header className='flex bg-[#d7ead8] flex-col xl:flex-row justify-between items-center sticky top-0 p-4 '>
                <div className="logo">Logo</div>
                <nav>
                    <ul className='flex space-x-7'>
                        <li className='text-md sm:text-lg hover:text-[#4CAF50] hover:border-b-2 hover:border-[#4CAF50] cursor-pointer'>Home</li>
                        <li className='text-md sm:text-lg hover:text-[#4CAF50] hover:border-b-2 hover:border-[#4CAF50] cursor-pointer'>About</li>
                        <li className='text-md sm:text-lg hover:text-[#4CAF50] hover:border-b-2 hover:border-[#4CAF50] cursor-pointer'>Animal_Endangered_Species</li>
                        <li className='text-md sm:text-lg hover:text-[#4CAF50] hover:border-b-2 hover:border-[#4CAF50] cursor-pointer'>Air Quality</li>
                        <li className='text-md sm:text-lg hover:text-[#4CAF50] hover:border-b-2 hover:border-[#4CAF50] cursor-pointer'>Animal_Sci-Fy_Fact</li>
                    </ul>
                </nav>
                <div className="symbols">Symbols</div>
            </header>
        </>
    )
}

export default Navbar
