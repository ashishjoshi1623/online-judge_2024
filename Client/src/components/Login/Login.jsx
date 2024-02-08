import React, { useState } from "react";
import "./login.css";
import axios from "axios";

export default function Login() {

  const [username,setUserName] = useState('');
  const [password,setPassword] = useState('');

  

  async function submitLoginForm(e){
    e.preventDefault();

    let loginUserData = {
      username:username,
      password:password
    }

    try {
      const loginResponse = await axios.post("http://localhost:3000/api/login",{
      loginUserData
    });
    console.log(loginResponse);
    } catch (error) {
      console.log("ERROR : " + error);
    }

    

    console.log("clicked");
  }

  return (
    <div className="login-container">
      <form onSubmit={submitLoginForm}>
        <div className="login">
        <div className="userdiv mb-4">
          <label>
            Username:<br />
            <input className="box-border mt-2" onChange={(e)=>setUserName(e.target.value)} type="text" placeholder=" Enter username" name="username" required />
          </label>
          </div>
          <div className="passdiv mb-4">
          <label>
            Password: <br />
            <input className="box-border mt-2" onChange={(e)=>setPassword(e.target.value)} type="password" placeholder=" Enter your password" name="password" required />
          </label>
          </div>
          <div className="loginButton">
          <input className="btn btn-primary" type="submit" value="Login" />
        </div>
        </div>
      </form>
    </div>
  );
}
