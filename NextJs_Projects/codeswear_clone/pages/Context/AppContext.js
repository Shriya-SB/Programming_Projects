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
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: darkMode ? "dark" : "light",

            });
            setTimeout(() => {
                router.push("/")
            }, 4000);

        }).catch((e) => {
            console.log("Error in signing of google..", e)
            toast.error('Some Error Occurred!!', {
                position: "top-center",
                autoClose: 4000,
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
            const m = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pinCode`)
            const n = await m.json()
            if (Object.keys(n).includes(value)) {
                setState(n[value][1])
                setCity(n[value][0])
            } else {
                setState('')
                setCity('')
            }
            setPinCode(value)
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
                autoClose: 4000,
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
            }, 4000);
        } else {
            toast.error('Some Error Occurred!!', {
                position: "top-center",
                autoClose: 4000,
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
                autoClose: 4000,
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
            }, 4000);
        } else {
            toast.error('Some Error Occurred!!', {
                position: "top-center",
                autoClose: 4000,
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
                autoClose: 4000,
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
                autoClose: 4000,
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
                autoClose: 4000,
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
                autoClose: 4000,
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
                autoClose: 4000,
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
                autoClose: 4000,
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
        e.preventDefault()
        if (pinCode.length === 6 || pinCode.length === 5) {
            let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pinCode`)
            let pinJson = await pins.json()
            if (Object.keys(pinJson).includes(pinCode)) {
                setPinCode('')
                setResult(<h4 className='text-lg text-green-500'>Yay! This pinCode is serviceable..</h4>)
                setTimeout(() => {
                    setResult('')
                }, 7000);
            } else {
                setResult(<h4 className='text-lg text-red-500'>Sorry! This pinCode is not serviceable..</h4>)
                setTimeout(() => {
                    setResult('')
                }, 7000);
            }
        }
    }

    return (
        <AppContext.Provider value={{ name, email ,result, password, cpassword, npassword, address, pinCode, city, state, phone, user, handleLoginSubmit, handleSigninSubmit, handleUpdatePasswordSubmit, handleUpdateUserSubmit, handleChange, setEmail, setUser, fetchData, handleContactSubmit, handleLogout, signInWithGoogle, checkPinCodeService }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;