import '@/styles/globals.css'
import Navbar from './Navbar'
import Footer from './Footer'
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import LoadingBar from 'react-top-loading-bar';
import AppWrapper from './Context/AppContext';

export default function App({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(false);
  const [cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0)
  const [progress, setProgress] = useState(false)
  const router = useRouter()
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(80)
    })
    router.events.on("routeChangeComplete", () => {
      setProgress(100)
    })
  }, [])

  useEffect(() => {
    try {
      if (localStorage.getItem('cart')) {
        setCart(JSON.parse(localStorage.getItem('cart')))
      }

    } catch (error) {
      localStorage.clear()
      console.log(error);
    }
  }, [])


  const saveCart = (myCart) => {
    localStorage.setItem('cart', JSON.stringify(myCart))
    let subt = 0
    let keys = Object.keys(myCart)
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty
    }
    setSubTotal(subt)
  }
  const addToCart = (itemCode, qty, price, name, ram, variant, sound_driver) => {
    let newCart = cart
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty += 1
    } else {
      newCart[itemCode] = { qty: 1, price, name, ram, variant, sound_driver }
    }
    setCart(newCart)
    saveCart(newCart)
  }
  const removeFromCart = (itemCode, qty, price, name, ram, variant, sound_driver) => {
    let newCart = cart
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty -= 1
    }
    if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode]
    }
    setCart(newCart)
    saveCart(newCart)
  }

  const clearCart = () => {
    setCart({})
    saveCart({})
  }

  const buyNow = (itemCode, qty, price, name, ram, variant, sound_driver) => {
    let newCart = { itemCode: { qty: 1, price, name, ram, variant, sound_driver } };
    setCart(newCart)
    saveCart(newCart)
    router.push('/Checkout')
  }

  useEffect(() => {
    // Retrieve the dark mode preference from localStorage on page load
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode) {
      setDarkMode(JSON.parse(storedDarkMode));
    }

    // Apply the 'dark' class to the html element when darkMode is true
    document.documentElement.classList.toggle('dark', darkMode);
  }, []);

  return (
    <>
      <AppWrapper darkMode={darkMode} setDarkMode={setDarkMode}>
        <LoadingBar color='#A020F0' progress={progress} onLoaderFinished={() => setProgress(0)} waitingTime={200} />
        <Navbar buyNow={buyNow} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} setDarkMode={setDarkMode} darkMode={darkMode} />
        <Component buyNow={buyNow} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} darkMode={darkMode} {...pageProps} />
        <Footer darkMode={darkMode} />
      </AppWrapper>
    </>
  )
}