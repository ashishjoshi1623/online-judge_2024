import React, { useState } from 'react';
import "./admin.css"
import Nav from 'react-bootstrap/Nav';
import { NavLink } from "react-router-dom"

function AdminLogin() {
    const [username,setUserame] = useState('');
    const [password,setPassword] = useState('');
    console.log(username, password);
  return (
    <>
    <div className="body">

    <section className="admin-nav-section">
        <div className="admin-nav-container">
        <div className="admin-nav-app-logo">
          <h1 className='admin-nav-heading'>TrashCodes Admin </h1>
        </div>
        <div className="nav-link">
        <Nav className="me-auto">
        <NavLink to="/" className="admin-navLink textcolor-pink">Go To TrashCodes</NavLink>
          </Nav>
          </div>
        </div>
      </section>
    <h1 className='admin-nav-heading welcome-text'>Welcome Admin!</h1>


        <section className="admin-login">
        <h1 className='admin-nav-heading'>Login</h1>
            <form>
                <div className="admin-formContainer">
                    <label>
                        <input type="text"
                        name='username'
                        placeholder='Enter username'
                        className='input'
                        onChange={(e) => setUserame(e.target.value)} 
                        required
                        />
                    </label>
                    <label>
                        <input type="password"
                        name='password'
                        placeholder='Enter password'
                        className='input'
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                        />
                    </label>
                    <input type="submit" className="admin-login-btn input" value="Login"/>
                </div>
            </form>
            
        </section>
        </div>
    </>
  )
}

export default AdminLogin
