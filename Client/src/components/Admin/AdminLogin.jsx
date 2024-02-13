import React, { useState } from 'react';
import "./admin.css"
import Nav from 'react-bootstrap/Nav';
import { NavLink, useNavigate } from "react-router-dom"
import axios from 'axios';

function AdminLogin() {
    const [username,setUserame] = useState('');
    const [password,setPassword] = useState('');
    const [errorMessage,setErrorMessage] = useState('');
    // console.log(username, password);

    const navigate = useNavigate();

    async function submitAdmin(e){
      e.preventDefault(); //prevent page from default behaviour of reloding
      try {
        const adminResponse = await axios.post(`${import.meta.env.VITE_API_PORT}/api/adminlogin` , {
          username : username,
          password : password
        })

        if(adminResponse.status === 200){
          navigate("/adminlogin/admin",{state : {data : adminResponse.data}})
        }
        console.log(adminResponse.data.message);
        setErrorMessage(adminResponse.data.message);
      } catch (error) {
        console.log("ERROR :" + error);
        setErrorMessage(error.response.data.message);
      }
  }

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
            <form onSubmit={submitAdmin}>
                <div className="admin-formContainer">
                    <label>
                        <input type="text"
                        name='username'
                        placeholder='Enter username'
                        className='admin-input'
                        onChange={(e) => setUserame(e.target.value)} 
                        required
                        />
                    </label>
                    <label>
                        <input type="password"
                        name='password'
                        placeholder='Enter password'
                        className='admin-input'
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                        />
                    </label>
                    {errorMessage ? (<p className="loginErrorMessage">{errorMessage}</p>) : null}
                    <input type="submit" className="admin-login-btn admin-input" value="Login"/>
                </div>
            </form>
            
        </section>
        </div>
    </>
  )
}

export default AdminLogin
