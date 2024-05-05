import { useRouter } from 'next/router'
import React, { useState, createContext, useRef } from 'react'
import { toast } from 'react-toastify'
export const AppContext = createContext(null)
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import app from '../../firebase.config'

export default function AppWrapper({ children, darkMode, setDarkMode }) {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [npassword, setNpassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [phone, setPhone] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [_id, setId] = useState("");
    const [user, setUser] = useState({ value: null });
    const [result, setResult] = useState(null);
    const [dropDown, setDropDown] = useState(false);
    const cartRef = useRef();
    const menuRef = useRef();
    const toggleCart = () => {
        if (cartRef.current) {
            if (cartRef.current.classList.contains('translate-x-full')) {
                cartRef.current.classList.remove("translate-x-full")
                cartRef.current.classList.add("translate-x-0")
            } else if (cartRef.current.classList.contains('translate-x-0')) {
                cartRef.current.classList.remove("translate-x-0")
                cartRef.current.classList.add("translate-x-full")
            }
        }
    }

    const toggleBrightness = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        // Save the dark mode preference to localStorage
        localStorage.setItem('darkMode', JSON.stringify(newMode));
    };


    const toggleNavbar = () => {
        if (menuRef.current) {
            if (menuRef.current.classList.contains("translate-x-full")) {
                menuRef.current.classList.remove("translate-x-full")
                menuRef.current.classList.add("translate-x-0")
            } else if (menuRef.current.classList.contains("translate-x-0")) {
                menuRef.current.classList.remove("translate-x-0")
                menuRef.current.classList.add("translate-x-full")
            }
        }
    }

    const handleRirectToSignUp = () => {
        router.push("/Signup")
    }

    const handleRirectToLogin = () => {
        router.push("/Login")
    }

    const handleRirectToAccount = () => {
        router.push("/Account")
    }

    const handleRirectToCheckout = () => {
        router.push("/Checkout")
    }

    const handleGoogleSubmit = (e) => {
        e.preventDefault();
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                console.log(user);
                const email = user.email
                console.log(email);
                localStorage.setItem("myuser", JSON.stringify({ token: token, email: email }))
                setTimeout(() => {
                    router.push('/')
                }, 2500)
                toast.success("User Logged-In Successfully!!", {
                    position: "top-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: darkMode ? "dark" : "light",
                })

            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.error(error)
            });

    }


    const handleChange = async (e) => {
        const { name, value } = e.target
        if (name === "name") {
            setName(value)
        } else if (name === "email") {
            setEmail(value)
        } else if (name === "address") {
            setAddress(value)
        } else if (name === "pinCode") {
            // Update the state immediately
            setPinCode(value);
            // Clear city and state if the pinCode input is not exactly 6 digits
            if (value.length !== 6) {
                setCity('');
                setState('');
                return; // Exit early if pinCode is not exactly 6 digits
            }
            else {
                // Fetch pincode data from the API
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pinCode?pincode=${value}`);
                    if (response.ok) {
                        const data = await response.json();
                        if (data.success && data.data && data.data.length > 0) {
                            // Autofill city and state if pinCode is valid
                            setState(data.data[0].state);
                            setCity(data.data[0].district);
                        } else {
                            // Reset city and state if pinCode is not found
                            setCity('');
                            setState('');
                            setResult(<h4 className='text-lg text-red-500'>Error checking pincode. Please try again later.</h4>);
                        }
                    } else {
                        console.error('Error fetching pincode data:', response.statusText);
                        setResult(<h4 className='text-lg text-red-500'>Error fetching pincode data. Please try again later.</h4>);
                    }
                } catch (error) {
                    console.error('Error fetching pincode data:', error);
                    setResult(<h4 className='text-lg text-red-500'>Error fetching pincode data. Please try again later.</h4>);
                }
            }
        } else if (name === "phone") {
            setPhone(value)
        } else if (name === "password") {
            setPassword(value)
        } else if (name === "city") {
            setCity(value)
        } else if (name === "state") {
            setState(value)
        } else if (name === "password") {
            setPassword(value)
        } else if (name === "npassword") {
            setNpassword(value)
        } else if (name === "cpassword") {
            setCpassword(value)
        }
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const ew = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        let result = await ew.json()
        if (result.success) {
            toast.success("User Logged-In Successfully!!", {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: darkMode ? "dark" : "light",
            })
            localStorage.setItem("myuser", JSON.stringify({ token: result.token, email: result.email }))
            setEmail("")
            setPassword("")
            setTimeout(() => {
                router.push('/')
            }, 2500);
        } else {
            toast.error("Some Error Occurred!!", {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: darkMode ? "dark" : "light",
            })

        }
    }

    const handleSigninSubmit = async (e) => {
        e.preventDefault();
        const r = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })

        let response = await r.json()
        if (response.success) {
            toast.success("Account Created Successfully!!", {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: darkMode ? "dark" : "light",
            })
            setName("")
            setEmail("")
            setPassword("")
            setTimeout(() => {
                router.push("/Login")
            }, 2500);
        } else {
            toast.error("Some Error Occurred!!", {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: darkMode ? "dark" : "light",
            })

        }
    }

    const handleUpdateUserSubmit = async (e) => {
        e.preventDefault();
        let data = { token: user.token, name, phone, city, state, pinCode, address }
        let p = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        let res = await p.json()
        if (res.success) {
            toast.success('User Updated Successfully!!', {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: darkMode ? "dark" : "light"
            });
            setName(res.name)
            setEmail(res.email)
            setCity(res.city)
            setPinCode(res.pinCode)
            setAddress(res.Address)
            setPhone(res.phone)
        } else {
            toast.error('Some Error Occurred!!', {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: darkMode ? "dark" : "light"
            });
        }
    }

    const handleUpdatePasswordSubmit = async (e) => {
        e.preventDefault();
        let data = { token: user.token, password, cpassword, npassword }
        let x = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        let res = await x.json()
        if (res.success) {
            toast.success('Password Updated Successfully!!', {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: darkMode ? "dark" : "light"
            });
            setPassword("")
            setNpassword("")
            setCpassword("")
        } else {
            toast.error('Error Updated Password!!', {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: darkMode ? "dark" : "light"
            });
        }
    }
    const fetchData = async (token) => {
        let data = { token: token }
        let c = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        let response = await c.json()
        if (response.success) {
            setName(response.name)
            setPhone(response.phone)
            setAddress(response.address)
            setPinCode(response.pinCode)
            setCity(response.city)
            setState(response.state)
            setId(response._id)
        }
    }

    const handleLogout = () => {
        toast.success('User Logout Successfully!!', {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: darkMode ? "dark" : "light"
        });
        localStorage.removeItem("myuser")
        setTimeout(() => {
            router.push("/Login")
        }, 2500);
    }

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ name, email, address, pinCode, city, state, phone })
        })
        let response = await a.json()
        if (response.success) {
            toast.success('User Data Sent Successfully!!', {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: darkMode ? "dark" : "light",
            });
            setName("")
            setEmail("")
            setAddress("")
            setPinCode("")
            setCity("")
            setState("")
            setPhone("")
        } else {
            toast.error('Some Error Occurred!!', {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: darkMode ? "dark" : "light",
            });
        }
    }

    const colorSelect = {
        red: "bg-red-600",
        purple: "bg-purple-500",
        yellow: "bg-yellow-500",
        black: "bg-black",
        white: "bg-white",
        blue: "bg-blue-500",
        brown: "bg-brown-500",
        gray: "bg-gray-500",
        green: "bg-green-500",
        pink: "bg-pink-500",
        silver: "bg-gray-500"
    };

    const handlePinCode = async (e) => {
        e.preventDefault()
        if (pinCode.length === 6) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pinCode?pincode=${pinCode}`);
                const pinJson = await response.json();
                if (pinJson.success) {
                    if (pinJson && Object.keys(pinJson).length > 0) {
                        setResult(<h4 className='text-lg text-green-500'>Yay! This pinCode is serviceable..</h4>);
                        setPinCode('')
                    } else {
                        setResult(<h4 className='text-lg text-red-500'>Sorry! This pinCode is not serviceable..</h4>);
                    }
                } else {
                    setResult(<h4 className='text-lg text-red-500'>Sorry! This pinCode is not serviceable..</h4>);
                }
            } catch (error) {
                setResult(<h4 className='text-lg text-red-500'>Sorry! This pinCode is not serviceable..</h4>);
            } finally {
                setTimeout(() => {
                    setResult('');
                }, 5000);
            }
        } else {
            setResult(<h4 className='text-lg text-red-500'>Sorry! This pinCode is not serviceable..</h4>);
        }
    }

    const handlePinCodeChange = (e) => {
        if (e.target.name === "pinCode")
            setPinCode(e.target.value)
    }

    return (
        <>
            <AppContext.Provider value={{ _id, name, result, email, cartRef, menuRef, dropDown, password, address, phone, cpassword, npassword, pinCode, city, state, colorSelect, user, setDropDown, handleGoogleSubmit, toggleBrightness, toggleCart, toggleNavbar, handleRirectToAccount, handleRirectToCheckout, handleRirectToLogin, handleRirectToSignUp, setUser, handlePinCode, handlePinCodeChange, setId, setEmail, handleChange, handleContactSubmit, handleLogout, handleLoginSubmit, handleSigninSubmit, handleUpdatePasswordSubmit, handleUpdateUserSubmit, fetchData }}>
                {children}
            </AppContext.Provider>
        </>
    )
}