import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

const Manager = () => {
    const [form, setForm] = useState({ username: '', webname: '', password: '' })
    const [PasswordArray, setPasswordArray] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('keykrypt'))
        if (user && user.token) {
            getPasswords()
        } else {
            navigate('/login')
        }
    }, [])

    // Update getPasswords function to ensure data is an array of objects before setting the state
    const getPasswords = async () => {
        try {
            let req = await fetch('/getpasswords');
            let res = await req.json();
            console.log(res);

            // Ensure res.result is an array of objects before setting the state
            if (Array.isArray(res.result) && res.result.every(entry => typeof entry === 'object')) {
                setPasswordArray(res.result);
            } else {
                console.error("Data received from server is not an array of objects:", res);
            }
        } catch (error) {
            console.error('Error fetching passwords:', error);
        }
    }



    const savePassword = async (e) => {
        try {
            e.preventDefault();
            const { id, ...formData } = form;

            if (id) {
                // Editing existing password
                const req = await fetch('/addpasswords', {
                    method: 'POST',
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify({ ...formData, id })
                });
                const res = await req.json();

                if (Array.isArray(res.result)) {
                    setPasswordArray(res.result);
                    setForm({ username: '', password: '', webname: '' });
                    toast.success('Password Edited Successfully!!', {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored"
                    });
                } else {
                    console.error("Data received from server is not an array:", res.result);
                }
            } else {
                // Adding new password
                const req = await fetch('/addpasswords', {
                    method: 'POST',
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify({ ...formData, id: uuidv4() })
                });
                const res = await req.json();

                if (Array.isArray(res.result)) {
                    setPasswordArray(res.result);
                    setForm({ username: '', password: '', webname: '' });
                    toast.success('Password Added Successfully!!', {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored"
                    });
                } else {
                    console.error("Data received from server is not an array:", res.result);
                }
            }
        } catch (error) {
            console.error('Error saving password:', error);
        }
    }

    const deletePassword = async (id) => {
        try {
            const req = await fetch('/deletepasswords', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ id })
            });
            const res = await req.json();
            if (Array.isArray(res.result)) {
                setPasswordArray(res.result); // Update PasswordArray directly with the new data
                toast.success('Password Deleted Successfully!!', {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                });
            } else {
                console.error("Data received from server is not an array:", res.result);
            }
            console.log(res);
        } catch (error) {
            console.error('Error deleting password:', error);
        }
    }


    const copyPassword = (item) => {
        navigator.clipboard.writeText(item)
        toast.success('Password Copied Successfully!!', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        });
    }

    const editPassword = async (id) => {
        try {
            // Delete the existing password from the database
            await deletePassword(id);

            // Find the password to edit and populate the form fields
            const passwordToEdit = PasswordArray.find(item => item.id === id);
            if (passwordToEdit) {
                setForm({ ...passwordToEdit });
            }
        } catch (error) {
            console.error('Error editing password:', error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div className="min-h-screen justify-center font-[poppins] items-center mx-auto bg-teal-50">
                <div className='justify-center items-center mx-auto py-4 text-center'>
                    <img src="/key.jpeg" alt="KeyKrypt" className='lg:h-[7rem] h-[4rem] rounded-full justify-center items-center mx-auto text-center w-[20rem]' />
                </div>
                <div className="container justify-center items-center m-auto">
                    <form onSubmit={savePassword} method="POST">
                        <div className="w-full justify-center mx-[8%] md:mx-[9%] items-center">
                            <input onChange={handleChange} value={form.username} type="text" name='username' placeholder='Enter Your Username...' className='border-2 focus:bg-gray-50 rounded-md focus:outline-none w-[84%] md:w-[81.9%] py-2 px-3 focus:border-teal-600 ' />
                        </div>
                        <div className="w-full flex my-3 mx-auto justify-center items-center">
                            <input onChange={handleChange} value={form.webname} type="text" name='webname' placeholder='Enter Your Webname...' className='border-2 focus:bg-gray-50 rounded-md focus:outline-none w-[61%] mx-1 py-2 px-3 focus:border-teal-600 ' />
                            <input onChange={handleChange} value={form.password} type="password" name='password' placeholder='Enter Your Password...' className='border-2 focus:bg-gray-50 rounded-md focus:outline-none w-[20%] mx-1 py-2 px-3 focus:border-teal-600 ' />
                        </div>
                        <div className=' lg:mx-[45%] my-3 lg:my-1 justify-center items-center'>
                            <button type="submit" className='py-2 flex w-48 text-white rounded-lg  mx-auto justify-center items-center bg-teal-500 hover:bg-teal-600 space-x-3'><p>Add Password</p><lord-icon
                                src="https://cdn.lordicon.com/jgnvfzqg.json"
                                trigger="click"
                                style={{ width: "25px", height: "25px" }}>
                            </lord-icon></button>
                        </div>
                        <h1 className="mx-1 md:mx-[10%] my-4 text-3xl">Your Passwords</h1>
                    </form>
                    {PasswordArray.length === 0 && <div className='text-3xl text-center font-bold my-5'>No passwords found!!</div>}
                    {PasswordArray.length !== 0 && <table className="table-auto mx-auto rounded-md overflow-hidden w-[80%] justify-center items-center my-10">
                        <thead className='bg-teal-400 '>
                            <tr>
                                <th className='text-2xl py-3 border'>Username</th>
                                <th className='text-2xl py-3 border'>Webname</th>
                                <th className='text-2xl py-3 border'>Passwords</th>
                            </tr>
                        </thead>
                        <tbody className='bg-teal-200 border'>
                            {PasswordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='text-center border text-xl py-1'>{item.username}</td>
                                    <td className='text-center border text-xl py-1'>{item.webname}</td>
                                    <td className='text-center border space-x-4 flex items-center text-2xl justify-center py-1'>
                                        <p>{"*".repeat(item.password.length)}</p>
                                        <span onClick={() => editPassword(item.id)}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/vzolctzz.json"
                                                trigger="click"
                                                style={{ width: "25px", height: "25px", cursor: 'pointer' }}>
                                            </lord-icon></span>
                                        <span onClick={() => deletePassword(item.id)}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="click"
                                                style={{ width: "25px", height: "25px", cursor: 'pointer' }}>
                                            </lord-icon></span>
                                        <span onClick={() => copyPassword(item.password)}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/wvdxdmpi.json"
                                                trigger="click"
                                                style={{ width: "25px", height: "25px", cursor: 'pointer' }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}

                        </tbody>

                    </table>}
                </div>
            </div >
        </>
    )
}

export default Manager