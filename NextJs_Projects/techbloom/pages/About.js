import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { Cursor } from 'react-simple-typewriter';
import { AppContext } from './Context/AppContext';

const About = ({ darkMode }) => {
  const router = useRouter()
  const context = useContext(AppContext)
  const { name, email, _id, city, setEmail, state, pinCode, phone, address, fetchData, setUser } = context;  
  const phrases = ['Mobile Phones.', 'Laptops.', 'Bluetoothes.'];
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

  useEffect(() => {
    let myuser = JSON.parse(localStorage.getItem('myuser'))
    if (myuser) {
      setUser(myuser)
      setEmail(myuser.email)
      fetchData(myuser.token)
    } else {
      router.push("/")
      window.alert("Please create an account!!")
    }
  }, [])

  return (
    <>
      <section className={`${darkMode ? "dark:bg-gray-700 dark:text-white" : ""}`}>
        <div className={` mx-auto items-center justify-center`}>
          <div className="col-md-6 p-3 lg:px-72 lg:p-4">
            <div className="p-5 bg-purple-500 rounded-lg mx-auto items-center justify-center bg-body-tertiary border rounded-3">
              <h2 className="text-5xl text-center font-bold pb-4" style={{ fontFamily: 'Bree Serif, serif' }}>Welcome to TechBloom</h2>
              <h2 className="text-3xl text-center font-bold pb-4" style={{ fontFamily: 'Bree Serif, serif' }}>We sale gadgets like <span id="typewriter"></span><Cursor /></h2>
              <p className="pb-4 text-center text-xl" style={{ fontFamily: 'Bree Serif, serif' }}>
                Welcome to TechBloom – where innovation, style, and sophistication converge to purpleefine your digital experience. We are not just an e-commerce platform; we are a manifestation of the future, a commitment to bringing you cutting-edge electronic products at your fingertips.

                At TechBloom, we believe in pushing boundaries and setting new standards in the tech world. Our curated collection spans from state-of-the-art smartphones, empowering communication, to sleek laptops boosting productivity, and advanced Bluetooth devices enhancing connectivity – all designed to bring the future into your hands today.

                Why TechBloom?
                - Unmatched Quality: We meticulously select products from renowned brands, ensuring the highest standards of craftsmanship.
                - Pioneering Technology: Stay ahead of the curve with our collection featuring the latest advancements in the tech world.
                - Exceptional Service: Our commitment to customer satisfaction guarantees a seamless and enjoyable shopping experience.

                TechBloom is more than just an online store; it's a vibrant community of tech enthusiasts and trendsetters. Whether you're a seasoned tech guru or a casual user, our diverse collection caters to all.

                Embrace the Extraordinary: Why settle for ordinary when you can embrace the extraordinary? Join us at TechBloom and witness the fusion of technology and lifestyle. Our commitment is not just to sell products; it's to enhance your digital journey.

                Explore Your Digital Lifestyle: TechBloom is not just a destination; it's an exploration. Begin your journey today and discover the world of electronic marvels. Elevate your tech lifestyle with us!

                A Community of Tech Enthusiasts: TechBloom is more than a brand; it's a community where tech enthusiasts come together. Join us and be a part of the evolution.

                Elevate Your Tech Lifestyle: At TechBloom, our mission is to elevate your tech lifestyle. Our collection is carefully curated to cater to every tech need and desire.

                The Future Is Now: TechBloom invites you to explore the future of technology. Dive into a world where innovation knows no bounds.

                Begin Your Exploration: Embark on a journey of discovery and explore the world of electronic wonders at TechBloom. Your digital adventure starts here!
              </p>
              {/* <button className="bg-transparent border border-gray-500 py-2 px-4 rounded transition duration-300 hover:bg-gray-500 hover:text-white focus:outline-none" type="button">
              Explore Our Collection
            </button> */}
            </div>
          </div>
        </div>
        <div className={`mx-auto py-5 items-center justify-center`}>
          <div className="col-md-6 lg:px-72 p-3">
            <div className="p-5 bg-purple-400 rounded-lg mx-auto items-center justify-center bg-body-tertiary border rounded-3">
              <h2 className="text-5xl text-center font-bold pb-4" style={{ fontFamily: 'Bree Serif, serif' }}>About You</h2>
              <div className='justify-center py-4 space-y-5 m-auto items-center mx-auto text-center' style={{ fontFamily: 'Bree Serif, serif' }}>
                <h1 className='text-xl font-bold'>Name: {name}</h1>
                <h1 className='text-xl font-bold'>Id: {_id}</h1>
                <h1 className='text-xl font-bold'>Email: {email}</h1>
                <h1 className='text-xl font-bold'>Address: {address}</h1>
                <h1 className='text-xl font-bold'>City: {city}</h1>
                <h1 className='text-xl font-bold'>State: {state}</h1>
                <h1 className='text-xl font-bold'>PinCode: {pinCode}</h1>
                <h1 className='text-xl font-bold'>Phone: {phone}</h1>
              </div>
              <button onClick={() => router.push("/Account")} className="bg-transparent border border-gray-500 py-2 px-4 rounded transition duration-300 hover:bg-gray-500 hover:text-white focus:outline-none" type="button">
                Update Account
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;