import React, { useState } from "react";
import "../../public/login.css";
import axios from "axios";

export default function Login() {

  const [username,setUserName] = useState('');
  const [password,setPassword] = useState('');

  

  function submitForm(e){
    e.preventDefault();

    let userData = {
      username:username,
      password:password
    }

    // fetch("http://localhost:3000/api/login",{
    //   method:'post',
    //   headers:{
    //     "Content-Type":"application/json"
    //   },
    //   body:JSON.stringify(userData)
    // }).then(response=>response.json()).then(data=>{
    //   console.log(data)
    // })

    // console.log(username +" "+ password)
    // console.log("clicked");

    axios.post("http://localhost:3000/api/login",{
      username:username,
      password: password
    });

    console.log("clicked");
  }

  return (
    <div className="login-container">
      <form onSubmit={submitForm}>
        <div className="login">
        <div className="userdiv mb-4">
          <label>
            Username:<br />
            <input className="box-border mt-2" onChange={(e)=>setUserName(e.target.value)} type="text" placeholder=" Enter username" name="username" />
          </label>
          </div>
          <div className="passdiv mb-4">
          <label>
            Password: <br />
            <input className="box-border mt-2" onChange={(e)=>setPassword(e.target.value)} type="password" placeholder=" Enter your password" name="password" />
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
