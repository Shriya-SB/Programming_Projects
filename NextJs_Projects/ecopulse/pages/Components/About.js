import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Cursor } from 'react-simple-typewriter';

const About = ({ darkMode }) => {
  const router = useRouter()

  useEffect(() => {
    if (!localStorage.getItem('ecopulse')) {
      router.push("/Login")
    }
  }, [])

  const phrases = ['Environmental Protection.', 'Sustainability.', 'Wildlife Facts.', 'Climate Changes.'];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    const el = document.getElementById("typewriter");
    if (!el) {
      console.error("Element with id 'typewriter' not found.");
      return;
    }
    let timeout;

    const writeLoop = async () => {
      let sleepTime = 100;

      while (true) {
        let curWord = phrases[currentPhraseIndex];

        // Type out the word character by character
        for (let i = 0; i < curWord.length; i++) {
          el.innerText = curWord.substring(0, i + 1);
          await new Promise((resolve) => timeout = setTimeout(resolve, sleepTime));
        }

        // Pause after fully typing a word
        await new Promise((resolve) => timeout = setTimeout(resolve, sleepTime * 25));

        // Erase the word character by character
        for (let i = curWord.length; i > 0; i--) {
          el.innerText = curWord.substring(0, i - 1);
          await new Promise((resolve) => timeout = setTimeout(resolve, sleepTime));
        }

        // Pause after erasing a word
        await new Promise((resolve) => timeout = setTimeout(resolve, sleepTime * 5));

        // Move to the next phrase in the array
        setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      }
    };

    writeLoop();

    return () => clearTimeout(timeout);
  }, [currentPhraseIndex]);

  return (
    <>
      <main style={{ fontFamily: 'Bree Serif, serif' }}>
        <div className={`min-h-screen mx-auto ${darkMode ? "dark:bg-gray-800 dark:text-gray-100" : ""}`}>
          <section className="body-font">
            <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
              <img
                className="w-24 md:w-36 mb-10 object-cover object-center rounded"
                alt="hero"
                src="/favicon.ico"
              />
              <div className="text-center lg:w-2/3 w-full">
                <h1 className="title-font sm:text-4xl text-3xl mb-2 font-medium">
                  Welcome to <span>EcoPulse</span>
                </h1>
                <p className="text-xl leading-relaxed flex mb-2 mr-3 text-center justify-center items-center">
                  We Provide information about:
                  <div className='w-[16.9rem] flex ml-3'>
                    <h1 id="typewriter" className="text-pink-700 dark:text-pink-600 font-semibold"></h1><Cursor />
                  </div>
                </p>
                <p className="mb-8 leading-relaxed">
                  EcoPulse is more than just a website; it's a movement towards a greener, more sustainable future. We're dedicated to spreading awareness about environmental conservation, sustainability, and wildlife protection. Explore our platform to learn, engage, and take action for the betterment of our planet.
                </p>
                <div className="flex justify-center">
                  <button onClick={() => router.push('/Components/AnimalSciFyFact')} className="inline-flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none cursor-pointer hover:bg-pink-600 rounded text-lg">
                    Start Exploring
                  </button>
                </div>
              </div>
            </div>
          </section>
          <hr />
          <section className="flex mt-8 body-font mx-8 px-8">
            <div className="flex flex-col md:w-2/3">
              <h1 className="font-semibold my-2 text-3xl">About EcoPulse</h1>
              <p className="mb-2 leading-relaxed">
                EcoPulse is your go-to destination for all things related to environmental awareness and action. Our platform is designed to educate, inspire, and empower individuals and communities to make a positive impact on the planet.
              </p>
              <p className="mb-2 leading-relaxed">
                Through informative articles, resources, and interactive content, we aim to raise awareness about pressing environmental issues and provide practical solutions for sustainable living. From climate change and biodiversity loss to pollution and habitat destruction, we cover a wide range of topics to help you better understand the challenges facing our planet.
              </p>
              <p className="mb-2 leading-relaxed">
                But EcoPulse isn't just about raising awareness; it's about taking action. We offer opportunities for engagement, whether it's through volunteering, supporting conservation efforts, or advocating for policy change. Together, we can make a difference and create a healthier, more sustainable world for future generations.
              </p>
              <p className="mb-6 leading-relaxed">
                Join us on this journey towards a greener future. Together, we can make every pulse count.
              </p>
            </div>
            <div className="hidden md:flex w-1/3 mx-1">
              <img src="/e2.jpeg" className="object-contain rounded-md " />
            </div>
          </section>
          <section className={`${darkMode ? "dark:bg-gray-800 dark:text-gray-100" : ""}`}>
            <div className="container px-5 py-24 mx-auto">
              <h1 className="text-3xl font-medium title-font mb-12 text-center">Testimonials</h1>
              <div className="flex flex-wrap -m-4">
                <div className="p-4 md:w-1/2 w-full">
                  <div className="h-full bg-gray-400 p-8 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="block w-5 h-5  mb-4"
                      viewBox="0 0 975.036 975.036"
                    >
                      <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                    </svg>
                    <p className="leading-relaxed mb-6">
                      EcoPulse has been an invaluable resource for me as I strive to live a more sustainable lifestyle. The articles and guides on the site have helped me understand the importance of environmental conservation and provided practical tips for reducing my ecological footprint. I'm grateful for the work that EcoPulse is doing to raise awareness and inspire action for a healthier planet.
                    </p>
                    <a className="inline-flex items-center">
                      <span className="flex-grow flex flex-col pl-4">
                        <span className="title-font font-medium">Priya Singh</span>
                        <span className=" text-sm">COMMUNITY MEMBER</span>
                      </span>
                    </a>
                  </div>
                </div>
                <div className="p-4 md:w-1/2  w-full">
                  <div className="h-full bg-gray-400 p-8 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="block w-5 h-5  mb-4"
                      viewBox="0 0 975.036 975.036"
                    >
                      <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                    </svg>
                    <p className="leading-relaxed mb-6">
                      I've been following EcoPulse for a while now, and I'm continually impressed by the quality of their content. Whether it's the latest news on environmental issues or practical tips for living sustainably, EcoPulse always delivers informative and engaging content. I highly recommend this site to anyone interested in making a positive impact on the planet.
                    </p>
                    <a className="inline-flex items-center">
                      <span className="flex-grow flex flex-col pl-4">
                        <span className="title-font font-medium">Rahul Patel</span>
                        <span className=" text-sm">ENVIRONMENTALIST</span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default About;
