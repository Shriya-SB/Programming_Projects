import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class About extends Component {
  render() {
    const userName = localStorage.getItem('username');
    const userEmail = localStorage.getItem('useremail');
    const userID = localStorage.getItem('userID');
    const userDate = localStorage.getItem('userDate');
    let token = localStorage.getItem('token')
    return (
      <>
          {!token ? (
            <>
              <Link className="btn btn-primary btn-sm" to="/login">LogIn</Link>
              <Link className="btn btn-primary btn-sm" to="/signup">SignUp</Link>
            </>
          ) : (
            <>
              <div className="my-5 container user_creds">
                <div className="text-center p-5 mb-4 bg-body-tertiary rounded-3 rounded">
                  <div className="container-fluid py-5">
                    <h1 className="fw-bolder">About you:</h1>
                    <br /><h4>User Name: {userName}</h4>
                    <br /><h4>User Email: {userEmail}</h4>
                    <br /><h4>User ID: {userID}</h4>
                    <br /><h4>User Registration Date: {userDate}</h4>
                  </div>
                </div>
                <button className="btn btn-primary btn-lg my-5" type="button">Learn More</button>
              </div>
            </>
          )
          }
      </>
    )
  }
}