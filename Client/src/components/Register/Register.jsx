import React from "react";
import "./register.css";

export default function Register() {
  return (
    <section className="register-section">
      <form>
        <div className="register-container">
        <img src="../../public/appIcons/appIcon.jpeg" alt="app-logo" height="70" width="80" />
          <div className="username-div input">
            <label>
              <input type="text" name="username" placeholder="Username" required />
            </label>
          </div>
          <div className="pass-div input">
            <label>
              <input type="password" name="password" placeholder="Password" required />
            </label>
          </div>
          <div className="confirm-pass-div input">
            <label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                required
              />
            </label>
          </div>
          <div className="email-div input">
            <label>
              <input type="email" name="email" placeholder="Email" required />
            </label>
          </div>
          <div className="submit-button-div input">
            <input className="Register-btn" type="submit" value="Register" />
          </div>
        </div>
      </form>
    </section>
  );
}
