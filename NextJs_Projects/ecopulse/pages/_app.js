import "@/styles/globals.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { useEffect, useReducer } from "react";

const initialState = {
  darkMode: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DARK_MODE':
      return { ...state, darkMode: action.payload };
  }
}

export default function App({ Component, pageProps }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let mode = localStorage.getItem('darkMode');
    if (mode !== null) {
      dispatch({ type: 'SET_DARK_MODE', payload: JSON.parse(mode) });
      document.documentElement.classList.toggle('dark', JSON.parse(mode));
    }
  }, []);

  return <>
    <Navbar darkMode={state.darkMode} setDarkMode={(mode) => dispatch({ type: 'SET_DARK_MODE', payload: mode })} />
    <Component darkMode={state.darkMode} setDarkMode={(mode) => dispatch({ type: 'SET_DARK_MODE', payload: mode })} {...pageProps} />
    <Footer darkMode={state.darkMode} setDarkMode={(mode) => dispatch({ type: 'SET_DARK_MODE', payload: mode })} />
  </>
}
