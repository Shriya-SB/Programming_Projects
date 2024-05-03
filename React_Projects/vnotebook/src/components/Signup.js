// In this code we will create an signup component which will create an new users and register them in my mongodb.
import React, { useState } from 'react';

const Signup = (props) => {
  // Create an state to define the elements of signup.
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '' });
  // Create an onChange to access input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  // In this submit function we will write the logic of submitting.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Make sure the page shouldn't reload
    const { name, email, password } = credentials; //Use destructuring.
    try {
      // Connect with my API..
      const res = await fetch(`createuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      const json = await res.json();
      const { showAlert } = props; //Display the alert to user.
      // Save the details except the password
      localStorage.setItem('token', json.authtoken);
      localStorage.setItem('username', json.user.name);
      localStorage.setItem('useremail', json.user.email);
      localStorage.setItem('userDate', json.user.date);
      localStorage.setItem('userID', json.user._id);
      showAlert('User account created successfully!!', 'success'); //Display alert
      setCredentials({ name: '', email: '', password: '' });
      window.location.href = '/';
    } catch (error) { //Show other errors which are not related to it but critical.
      console.log(error);
    }
  };

  return (
    <>
    {/* Add html to it. */}
      <form method="POST" onSubmit={handleSubmit}>
        <h1 className="text-center">Sign Up</h1>
        <p className="text-center">We are here to keep your data secure.</p>
        <div className="container">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              name="name"
              onChange={handleChange}
              value={credentials.name}
              type="text"
              className="form-control"
              id="name"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              name="email"
              onChange={handleChange}
              value={credentials.email}
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              name="password"
              onChange={handleChange}
              value={credentials.password}
              type="password"
              className="form-control"
              id="password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Signup
          </button>
        </div>
      </form>
    </>
  );
};

export default Signup;