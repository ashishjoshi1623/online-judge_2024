import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Link } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [username,setUserName] = useState('');
  const [password,setPassword] = useState('');
  const [errorMessage,setErrorMessage] = useState('');

  

  async function submitLoginForm(e){
    e.preventDefault();

    let loginUserData = {
      username:username,
      password:password
    }

    try 
    {
        const loginResponse = await axios.post("http://localhost:3000/api/login",{
        loginUserData
      });
      console.log(loginResponse);
      if(loginResponse.data.statusCode === 201){
        navigate("/questions",{ state : loginResponse.data })
      }
     
      console.log(loginResponse.data);
      setErrorMessage(loginResponse.data.message)
      

    } catch (error) {
      console.log(error.response.data);
      setErrorMessage(error.response.data.message) ;
      console.log("ERROR : " + error);
    }
  }

  return (
    <>
    <Header page="login" user="User"/>
    <div className="login-container">
      <form onSubmit={submitLoginForm}>
        <div className="login">
        <img src="../../public/appIcons/appIcon.jpeg" 
        className="my-4 app-logoo"
          alt="app-logo" 
          height="70" 
          width="80" />
        <div className="userdiv mb-4">
          <label className="label">
            <input className="mt-2 logininput" 
            onChange={(e)=>setUserName(e.target.value)} 
            type="text" 
            placeholder=" Enter username" 
            name="username" 
            required />
          </label>
          </div>
          <div className="passdiv mb-4">
          <label className="label">
            <input className="mt-2 logininput" 
            onChange={(e)=>setPassword(e.target.value)} 
            type="password" 
            placeholder=" Enter your password" 
            name="password" 
            required />
          </label>
          {errorMessage ? (
              <p className="loginErrorMessage">{errorMessage}</p>
            ) : null}
          </div>
          <div className="loginButton">
          <input className="login-button" type="submit" value="Login" />
        </div>
        <div className="loginRouteContainer input">
            <p style={{color: 'black'}} className="loginINstruction">New User? <Link to="/register" className="login-btnroute">Register</Link>
            </p>
              
            </div>
        </div>
      </form>
    </div>
    <Footer />
    </>
  ); 
}


