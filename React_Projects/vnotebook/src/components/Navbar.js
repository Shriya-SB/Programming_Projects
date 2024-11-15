import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Navbar = (props) => {
  const { showAlert } = props;
  const token = JSON.parse(localStorage.getItem('vnotebook'))
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('vnotebook');
    showAlert("User Logged-Out successfully!!", 'success');
    navigate("/login");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">VNotebook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">AboutMe</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
            </ul>
            {!token.token ?
              (
                <form className="d-flex" role="search">
                  <Link to="/login" className='btn btn-sm btn-primary'>Login</Link>
                  <Link to="/signup" className='btn btn-sm btn-primary mx-3'>Signup</Link>
                </form>
              )
              :
              (<button className='btn btn-sm btn-primary' onClick={handleLogout}>Logout</button>)}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar;