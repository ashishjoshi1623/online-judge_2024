import React, { useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [username,setUserName] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const [email,setEmail] = useState('');

  // console.log(`${username} ${password} ${confirmPassword} ${email}`);

  async function submitRegisterForm(){
    if(password === confirmPassword)
    {
        const registerUserData = {
          username : username,
          password : password,
          email : email
        }
        
        try {
            await axios.post("http://localhost:3000/api/register",{
            registerUserData
          });
        } catch (error) {
          console.log("ERROR : " + error);
        }
    } else {
        alert("Password mismatch");
      }
  }



  return (
    <section className="register-section">
      <form onSubmit={submitRegisterForm}>
        <div className="register-container">
        <img src="../../public/appIcons/appIcon.jpeg" alt="app-logo" height="70" width="80" />
          <div className="username-div input">
            <label>
              <input type="text" onChange={(e)=>setUserName(e.target.value)} name="username" placeholder="Username" required />
            </label>
          </div>
          <div className="pass-div input">
            <label>
              <input type="password" onChange={(e)=>setPassword(e.target.value)} name="password" placeholder="Password" required />
            </label>
          </div>
          <div className="confirm-pass-div input">
            <label>
              <input
                type="password"
                onChange={(e)=>setConfirmPassword(e.target.value)}
                name="confirmPassword"
                placeholder="Confirm password"
                required
              />
            </label>
          </div>
          <div className="email-div input">
            <label>
              <input type="email" onChange={(e)=>setEmail(e.target.value)} name="email" placeholder="Email" required />
            </label>
          </div>
          <div className="submit-button-div input">
            <input className="Register-btn" type="submit" value="Register" />
          </div>
          <div className="loginRouteContainer input">
          <p className="loginINstruction">Already have an account?</p>
            <Link to="/login" className="login-btnroute">Login</Link>
          </div>
        </div>
      </form>
    </section>
  );
}
