import React from "react";
import "../../public/login.css";

export default function Login() {
  return (
    <div className="login-container">
      <form action="/login" method="post">
        <div className="login">
        <div className="userdiv mb-4">
          <label>
            Username:<br />
            <input className="box-border mt-2" type="text" placeholder=" Enter username" />
          </label>
          </div>
          <div className="passdiv mb-4">
          <label>
            Password: <br />
            <input className="box-border mt-2" type="password" placeholder=" Enter your password" />
          </label>
          </div>
          <div className="loginButton">
          <input className="btn btn-primary" type="button" value="Login" />
        </div>
        </div>
      </form>
    </div>
  );
}
