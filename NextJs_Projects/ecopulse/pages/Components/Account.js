import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const Account = ({ darkMode }) => {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    npassword: '',
    cpassword: '',
    city: '',
    state: '',
    pinCode: '',
    address: '',
    phone: '',
    user: null
  });
  const router = useRouter();

  useEffect(() => {
    let myUser = JSON.parse(localStorage.getItem('ecopulse'));
    console.log(myUser);
    if (!myUser) {
      router.push("/Components/Login");
    } else {
      setCredentials(prevState => ({ ...prevState, email: myUser.email, user: myUser }));
      fetchData(myUser.token);
    }
  }, []);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setCredentials(prevState => ({ ...prevState, [name]: value }));

    if (name === "pinCode" && value.length === 6) {
      try {
        const req = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pinCode?pincode=${value}`);
        const res = await req.json();
        console.log(res);
        if (res.success) {
          if (res.data && res.data.length > 0) {
            setCredentials(prevState => ({
              ...prevState,
              state: res.data[0].state,
              city: res.data[0].district
            }));
          } else {
            setCredentials(prevState => ({ ...prevState, city: '', state: '' }));
          }
        } else {
          console.error('Error fetching pincode data:', res.statusText);
        }
      } catch (error) {
        console.error('Error fetching pincode data:', error);
      }
    }
  };

  const handleUpdateUserSubmit = async (e) => {
    e.preventDefault();
    console.log('Credentials before submit:', credentials); // Log the state before submission

    let data = {
      token: credentials.user,
      name: credentials.name,
      address: credentials.address,
      pinCode: credentials.pinCode,
      city: credentials.city,
      state: credentials.state,
      phone: credentials.phone
    };

    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const b = await a.json();
    if (b.success || b.status === 201) {
      toast.success('User credentials updated successfully!!', {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light"
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
        theme: darkMode ? "dark" : "light"
      });
    }
  };

  const handleUpdatePasswordSubmit = async (e) => {
    e.preventDefault();
    let data = {
      token: credentials.user,
      password: credentials.password,
      cpassword: credentials.cpassword,
      npassword: credentials.npassword
    };

    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const b = await a.json();
    if (b.success || b.status === 201) {
      toast.success('User password updated successfully!!', {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light"
      });
      setCredentials({ ...credentials, password: '', cpassword: '', npassword: '' });
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
  };

  const fetchData = async (token) => {
    let data = { token: token };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const b = await a.json();
    console.log(b);
    setCredentials(prevState => ({
      ...prevState,
      name: b.name || '',
      email: b.email || '',
      city: b.city || '',
      state: b.state || '',
      phone: b.phone || '',
      address: b.address || '',
      pinCode: b.pinCode || '',
      user: token
    }));
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"} // Ensure darkMode is correctly applied here
      />

      <div className={`container m-auto ${darkMode ? "dark:bg-gray-700 dark:text-white" : ""} pb-4 min-h-screen`}>
        <h1 className="text-center font-bold text-4xl py-6">Update Account</h1>
        <p className='text-lg font-semibold mx-2'>1. Normal Details</p>
        <form onSubmit={handleUpdateUserSubmit}>
          <div className="mx-auto flex">
            <div className="w-1/2 px-2">
              <div className="relative mb-4">
                <label htmlFor="name" className="leading-7 text-sm ">Name</label>
                <input value={credentials.name} onChange={handleChange} type="text" id="name" name="name" className={`w-full rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none ${darkMode ? "dark:text-white dark:bg-gray-500" : "text-black"} py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"`} />
              </div>
            </div>
            <div className="w-1/2 px-2">
              <div className="relative mb-4">
                <label htmlFor="email" className="leading-7 text-sm ">Email (cannot be updated)</label>
                {credentials.user && credentials.user.email ? <input value={credentials.email} onChange={handleChange} type="email" id="email" name="email" className={`w-full rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none ${darkMode ? "dark:text-white dark:bg-gray-500" : "text-black"} py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"`} /> : <input value={credentials.email} readOnly type="email" id="email" name="email" className={`w-full rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none ${darkMode ? "dark:text-white dark:bg-gray-500" : "text-black"} py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"`} />}
              </div>
            </div>
          </div>
          <div className="mx-auto">
            <div className="w-full px-2">
              <div className="relative mb-4">
                <label htmlFor="address" className="leading-7 text-sm ">Address</label>
                <textarea onChange={handleChange} value={credentials.address} id="address" rows={3} cols={30} name="address" className={`w-full rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none ${darkMode ? "dark:text-white dark:bg-gray-500" : "text-black"} py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out`} />
              </div>
            </div>
          </div>
          <div className="mx-auto flex">
            <div className="w-1/2 px-2">
              <div className="relative mb-4">
                <label htmlFor="pinCode" className="leading-7 text-sm ">PinCode</label>
                <input value={credentials.pinCode} onChange={handleChange} type="text" id="pinCode" name="pinCode" className={`w-full rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none ${darkMode ? "dark:text-white dark:bg-gray-500" : "text-black"} py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"`} />
              </div>
            </div>
            <div className="w-1/2 px-2">
              <div className="relative mb-4">
                <label htmlFor="city" className="leading-7 text-sm ">City</label>
                <input value={credentials.city} onChange={handleChange} type="text" id="city" name="city" className={`w-full rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none ${darkMode ? "dark:text-white dark:bg-gray-500" : "text-black"} py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"`} />
              </div>
            </div>
          </div>
          <div className="mx-auto flex">
            <div className="w-1/2 px-2">
              <div className="relative mb-4">
                <label htmlFor="state" className="leading-7 text-sm ">State</label>
                <input value={credentials.state} onChange={handleChange} type="text" id="state" name="state" className={`w-full rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none ${darkMode ? "dark:text-white dark:bg-gray-500" : "text-black"} py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"`} />
              </div>
            </div>
            <div className="w-1/2 px-2">
              <div className="relative mb-4">
                <label htmlFor="phone" className="leading-7 text-sm ">Phone Number</label>
                <input value={credentials.phone} onChange={handleChange} type="number" id="phone" name="phone" className={`w-full rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none ${darkMode ? "dark:text-white dark:bg-gray-500" : "text-black"} py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"`} />
              </div>
            </div>
          </div>
          <button type='submit' className='bg-green-500 cursor-pointer text-white hover:bg-green-600 px-6 py-1 text-center rounded mx-2'>Submit</button>
        </form>
        <p className="font-semibold my-4 text-lg mx-2">2. Update Password</p>
        <form onSubmit={handleUpdatePasswordSubmit}>
          <div className="mx-auto flex my-3">
            <div className="w-1/2 px-2">
              <div className="relative mb-4">
                <label htmlFor="password" className="leading-7 text-sm ">Password</label>
                <input value={credentials.password} onChange={handleChange} type="password" id="password" name="password" className={`w-full rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none ${darkMode ? "dark:text-white dark:bg-gray-500" : "text-black"} py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"`} />
              </div>
            </div>
            <div className="w-1/2 px-2">
              <div className="relative mb-4">
                <label htmlFor="npassword" className="leading-7 text-sm ">New Password</label>
                <input value={credentials.npassword} onChange={handleChange} type="password" id="npassword" name="npassword" className={`w-full rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none ${darkMode ? "dark:text-white dark:bg-gray-500" : "text-black"} py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"`} />
              </div>
            </div>
            <div className="w-1/2 px-2">
              <div className="relative mb-4">
                <label htmlFor="cpassword" className="leading-7 text-sm ">Confirm New Password</label>
                <input value={credentials.cpassword} onChange={handleChange} type="password" id="cpassword" name="cpassword" className={`w-full rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none ${darkMode ? "dark:text-white dark:bg-gray-500" : "text-black"} py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"`} />
              </div>
            </div>
          </div>
          <button type='submit' className='bg-green-500 cursor-pointer text-white hover:bg-green-600 px-6 py-1 text-center rounded mx-2'>Submit</button>
        </form>
      </div>
    </>
  )
}

export default Account
