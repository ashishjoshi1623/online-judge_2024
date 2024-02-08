import React from "react";
import "./register.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { validateSchema } from "../../validation/index.jsx";

export default function Register() {

  //object to collect initial values
  const registerUserData = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues : registerUserData,
      validationSchema: validateSchema,
      onSubmit: async (values, action) => {
        const userData = {
          username : values.username,
          password : values.password,
          email : values.email,
          confirmPassword : values.confirmPassword
        }
        try {
            await axios.post("http://localhost:3000/api/register",{
            userData
          });
          
        } catch (error) {
          console.log("ERROR : " + error);
        }
        action.resetForm();
      },
    });



  return (
    <section className="register-section">
      <form onSubmit={ handleSubmit } >
        <div className="register-container">
        <img src="../../public/appIcons/appIcon.jpeg" alt="app-logo" height="70" width="80" />
          <div className="username-div input">
            <label>
              <input type="text" autoComplete="off" onChange={handleChange} name="username" placeholder="Username" value={values.username} onBlur={handleBlur} />
            </label>
            {errors.username && touched.username ? (
                      <p className="form-error">{errors.username}</p>
                    ) : null}
          </div>
          <div className="pass-div input">
            <label>
              <input type="password" autoComplete="off" onChange={handleChange} name="password" placeholder="Password" value={values.password} onBlur={handleBlur} />
            </label>
            {errors.password && touched.password ? (
                      <p className="form-error">{errors.password}</p>
                    ) : null}
          </div>
          <div className="confirm-pass-div input">
            <label>
              <input
                type="password"
                autoComplete="off"
                onChange={handleChange}
                name="confirmPassword"
                placeholder="Confirm password"
                value={values.confirmPassword}
                onBlur={handleBlur}
              />
            </label>
            {errors.confirmPassword && touched.confirmPassword ? (
                      <p className="form-error">{errors.confirmPassword}</p>
                    ) : null}
          </div>
          <div className="email-div input">
            <label>
              <input type="email" autoComplete="off" onChange={handleChange} name="email" placeholder="Email" value={values.email} onBlur={handleBlur} />
            </label>
            {errors.email && touched.email ? (
                      <p className="form-error">{errors.email}</p>
                    ) : null}
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
