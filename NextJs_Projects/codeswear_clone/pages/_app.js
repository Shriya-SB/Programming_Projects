import '@/styles/globals.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { useEffect, useReducer, useMemo } from 'react';
import { useRouter } from 'next/router';
import { AppWrapper } from './Context/AppContext';
import LoadingBar from 'react-top-loading-bar';

// Define initial state
const initialState = {
  darkMode: false,
  cart: {},
  progress: 0,
};

// Define reducer function to manage state transitions
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DARK_MODE':
      return { ...state, darkMode: action.payload };
    case 'SET_CART':
      return { ...state, cart: action.payload };
    case 'SET_PROGRESS':
      return { ...state, progress: action.payload };
    default:
      return state;
  }
};

export default function App({ Component, pageProps }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      dispatch({ type: 'SET_PROGRESS', payload: 80 });
    });
    router.events.on('routeChangeComplete', () => {
      dispatch({ type: 'SET_PROGRESS', payload: 100 });
    });
  }, []);

  useEffect(() => {
    let mode = localStorage.getItem('darkMode');
    if (mode !== null) {
      dispatch({ type: 'SET_DARK_MODE', payload: JSON.parse(mode) });
      document.documentElement.classList.toggle('dark', JSON.parse(mode));
    }
  }, []);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('CodeSwear_Cart');
      if (storedCart !== null) {
        dispatch({ type: 'SET_CART', payload: JSON.parse(storedCart) });
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
    }
  }, []);

  // Memoize subtotal calculation
  const subTotal = useMemo(() => {
    let total = 0;
    Object.values(state.cart).forEach((item) => {
      total += item.qty * item.price;
    });
    return total;
  }, [state.cart]);

  const saveCart = (myCart) => {
    localStorage.setItem('CodeSwear_Cart', JSON.stringify(myCart));
    dispatch({ type: 'SET_CART', payload: myCart });
  };

  const addToCart = (itemCode, qty, name, price, size, variant) => {
    const updatedCart = { ...state.cart };
    if (itemCode in updatedCart) {
      updatedCart[itemCode].qty += 1;
    } else {
      updatedCart[itemCode] = { qty, name, price, size, variant };
    }
    saveCart(updatedCart);
  };

  const removeFromCart = (itemCode, qty, name, price, size, variant) => {
    const updatedCart = { ...state.cart };
    if (itemCode in updatedCart) {
      updatedCart[itemCode].qty -= 1;
      if (updatedCart[itemCode].qty <= 0) {
        delete updatedCart[itemCode];
      }
      saveCart(updatedCart);
    }
  };

  const buyNow = (itemCode, qty, name, price, size, variant) => {
    const newCart = { [itemCode]: { qty, name, price, size, variant } };
    saveCart(newCart);
    router.push('/Checkout');
  };

  const clearCart = () => {
    saveCart({});
  };

  return (
    <AppWrapper darkMode={state.darkMode}>
      <LoadingBar
        color="#E95ECD"
        progress={state.progress}
        onLoaderFinished={() => dispatch({ type: 'SET_PROGRESS', payload: 0 })}
        waitingTime={400}
      />
      <Navbar
        buyNow={buyNow}
        cart={state.cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        subTotal={subTotal}
        clearCart={clearCart}
        darkMode={state.darkMode}
        setDarkMode={(mode) => dispatch({ type: 'SET_DARK_MODE', payload: mode })}
      />
      <Component
        buyNow={buyNow}
        cart={state.cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        subTotal={subTotal}
        clearCart={clearCart}
        darkMode={state.darkMode}
        setDarkMode={(mode) => dispatch({ type: 'SET_DARK_MODE', payload: mode })}
        {...pageProps}
      />
      <Footer darkMode={state.darkMode} setDarkMode={(mode) => dispatch({ type: 'SET_DARK_MODE', payload: mode })} />
    </AppWrapper>
  );
}