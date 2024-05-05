import React, { useState, createContext } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';
import app from '../firebase.config';
import { getAuth } from 'firebase/auth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
let AppContext = createContext('navneet');

export function AppWrapper({ darkMode, children }) {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [npassword, setNpassword] = useState("");
    const [result, setResult] = useState("")
    const [user, setUser] = useState({ value: null });

    const signInWithGoogle = () => {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential.accessToken;
            localStorage.setItem("codeswear_token", JSON.stringify({ token: token }))
            const user = result.user;
            console.log(user);
            toast.success('User logged-in successfully!!', {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: darkMode ? "dark" : "light",

            });
            setTimeout(() => {
                router.push("/")
            }, 2500);

        }).catch((e) => {
            console.log("Error in signing of google..", e)
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
        })
    }

    const handleLogout = () => {
        localStorage.removeItem('codeswear_token')
        router.push('/Components/Login')
    }

    const handleChange = async (e) => {
        const { name, value } = e.target
        if (name === "name") {
            setName(value)
        } else if (name === "email") {
            setEmail(value)
        } else if (name === "phone") {
            setPhone(value)
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
        } else if (name === "city") {
            setCity(value)
        } else if (name === "state") {
            setState(value)
        } else if (name === "password") {
            setPassword(value)
        } else if (name === "cpassword") {
            setCpassword(value)
        } else if (name === "npassword") {
            setNpassword(value)
        }
    }
    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        const a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        const res = await a.json()
        if (res.success || res.status === 201) {
            toast.success('User logged-in successfully!!', {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: darkMode ? "dark" : "light",

            });
            localStorage.setItem('codeswear_token', JSON.stringify({ token: res.token, email: res.email }))
            setEmail('')
            setPassword('')
            setTimeout(() => {
                router.push('/')
            }, 2500);
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
    const handleSigninSubmit = async (e) => {
        e.preventDefault()
        const a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })
        const res = await a.json()
        if (res.success || res.status === 201) {
            toast.success('Account Created Successfully!', {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: darkMode ? "dark" : "light",

            });
            setName('')
            setEmail('')
            setPassword('')
            setTimeout(() => {
                router.push('/Components/Login')
            }, 2500);
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

    const fetchData = async (token) => {
        let data = { token: token }
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const b = await a.json()
        console.log(b);
        setName(b.name)
        setPinCode(b.pinCode)
        setPhone(b.phone)
        setState(b.state)
        setCity(b.city)
        setAddress(b.address)
    }

    const handleUpdateUserSubmit = async (e) => {
        e.preventDefault()
        let data = { token: user.token, name, address, pinCode, city, state, phone }
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const b = await a.json()
        if (b.success || b.status === 201) {
            toast.success('User credentials updated successfully!!', {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: darkMode ? "dark" : "light",

            });
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

    const handleUpdatePasswordSubmit = async (e) => {
        e.preventDefault()
        let data = { token: user.token, password, cpassword, npassword }
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const b = await a.json()
        if (b.success || b.status === 201) {
            toast.success('User password updated successfully!!', {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: darkMode ? "dark" : "light",

            });
            setPassword('')
            setNpassword('')
            setCpassword('')
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

    const handleContactSubmit = async (e) => {
        e.preventDefault()
        const a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, address, pinCode, city, state, phone })
        })
        const response = await a.json()
        if (response.success || response.status === 201) {
            toast.success('User credentials sent successfully!!', {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: darkMode ? "dark" : "light",
            });
            setName('')
            setEmail('')
            setAddress('')
            setCity('')
            setPhone('')
            setPinCode('')
            setState('')
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

    const checkPinCodeService = async (e) => {
        e.preventDefault();
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
    };

    const handlePinCodeChange = (e) => {
        const { name, value } = e.target;
        if (name === "pinCode") {
            setPinCode(value)
        }
    }

    return (
        <AppContext.Provider value={{ name, email, result, password, cpassword, npassword, address, pinCode, city, state, phone, user, handleLoginSubmit, handlePinCodeChange, handleSigninSubmit, handleUpdatePasswordSubmit, handleUpdateUserSubmit, handleChange, setEmail, setUser, fetchData, handleContactSubmit, handleLogout, signInWithGoogle, checkPinCodeService }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;