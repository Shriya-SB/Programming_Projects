import React, { useState, useEffect } from 'react';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';
import Head from 'next/head';

export default function Home({ darkMode }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      image: '/_deb61d40-9920-40d6-9a05-0c92f4a6f133.jpeg',
      caption: 'First slide label',
      content: 'Some representative placeholder content for the first slide.',
    },
    {
      image: 'https://images.westend61.de/0001536216pw/smiling-man-looking-at-smart-phone-while-standing-at-doorframe-SBOF03279.jpg',
      caption: 'Second slide label',
      content: 'Some representative placeholder content for the second slide.',
    },
    {
      image: 'https://pbs.twimg.com/media/FvcrA3VWcAAj7gg?format=jpg&name=900x900',
      caption: 'Third slide label',
      content: 'Some representative placeholder content for the third slide.',
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (activeIndex + 1) % slides.length;
      setActiveIndex(nextIndex);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [activeIndex, slides.length]);

  return (
    <>
      <Head>
        <link rel="favicon" href="/favicon.ico" type="image/x-icon" />
        <title>TechBloom</title>
      </Head>
      <main className={`h-screen ${darkMode ? 'dark:bg-gray-700 dark:text-white' : 'bg-gray-100'}`}>
        <div className="relative h-[90vh]">
          <div className="carousel-inner relative h-full">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`carousel-item absolute w-full h-full ${index === activeIndex
                  ? 'opacity-100'
                  : 'opacity-0 transition-opacity duration-500 ease-in-out transform scale-95'
                  }`}
              >
                <img src={slide.image} className="w-full h-full object-center mx-auto" alt={`Slide ${index + 1}`} />
                <div className="carousel-caption absolute mx-auto text-center right-[350px] transform -translate-x-1/2 -translate-y-1/2 bottom-0 bottom text-white">
                  <h5 className="text-2xl font-bold">{slide.caption}</h5>
                  <p>{slide.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="carousel-indicators absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`w-4 h-4 rounded-full ${index === activeIndex ? 'bg-gray-100' : 'bg-gray-300'
                  } hover:bg-gray-300 focus:outline-none focus:bg-gray-300`}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>

          <button
            className="carousel-control-prev absolute top-1/2 left-2 transform -translate-y-1/2 focus:outline-none"
            type="button"
            onClick={() => setActiveIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length)}
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">
              <IoIosArrowDropleftCircle className="text-4xl font-bold" />
            </span>
          </button>

          <button
            className="carousel-control-next absolute top-1/2 right-2 transform -translate-y-1/2 focus:outline-none"
            type="button"
            onClick={() => setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length)}
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">
              <IoIosArrowDroprightCircle className="text-3xl font-bold" />
            </span>
          </button>
        </div>
      </main>
      {/* <div className={`${darkMode ? "dark:bg-gray-700 dark:text-white" : ""}`}>
        
      </div> */}
      <section className={`pb-10 body-font ${darkMode ? "dark:bg-gray-700 dark:text-white" : ""}`}>
        <div className="container px-5 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 ">Pitchfork Kickstarter Taxidermy</h1>
            <p className="lg:w-1/2 w-full leading-relaxed ">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table.</p>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-purple-100 text-purple-500 mb-4">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <h2 className="text-lg  font-medium title-font mb-2">Shooting Stars</h2>
                <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-purple-100 text-purple-500 mb-4">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                    <circle cx="6" cy="6" r="3"></circle>
                    <circle cx="6" cy="18" r="3"></circle>
                    <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                  </svg>
                </div>
                <h2 className="text-lg  font-medium title-font mb-2">The Catalyzer</h2>
                <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-purple-100 text-purple-500 mb-4">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h2 className="text-lg  font-medium title-font mb-2">Neptune</h2>
                <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-purple-100 text-purple-500 mb-4">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"></path>
                  </svg>
                </div>
                <h2 className="text-lg  font-medium title-font mb-2">Melanchole</h2>
                <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-purple-100 text-purple-500 mb-4">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                  </svg>
                </div>
                <h2 className="text-lg  font-medium title-font mb-2">Bunker</h2>
                <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-purple-100 text-purple-500 mb-4">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h2 className="text-lg  font-medium title-font mb-2">Ramona Falls</h2>
                <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
              </div>
            </div>
          </div>
          <button className="flex mx-auto mt-16 bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg">Button</button>
        </div>
      </section>
    </>
  );
}