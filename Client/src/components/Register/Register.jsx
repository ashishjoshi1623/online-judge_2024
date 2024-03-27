import React, { useEffect, useState } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { validateSchema } from "../../validation/index.jsx";
import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
import Loader from "../Loader/Loader.jsx";

export default function Register() {

  //object to collect initial values
  const registerUserData = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

  let statusCode = 0;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik (
    {

      initialValues : registerUserData,
      validationSchema: validateSchema,

      onSubmit: async (values, action) => {
        setIsLoading(true);
        try {
           const registerResponse = await axios.post(`${import.meta.env.VITE_API_PORT}/api/register`,{
            values
          });
          console.log(registerResponse.data.statusCode);
          statusCode = registerResponse.data.statusCode;

        } catch (error) {

          console.log(error.response.data.statusCode);
          statusCode = error.response.data.statusCode;
          alert(error.response.data.message);

        } finally {
          setIsLoading(false);
        }
        // console.log(statusCode);

        if(statusCode === 200 || statusCode === 201 || statusCode === 409){
          alert("You can now login with your credentials")
          navigate("/login");
        } 
        action.resetForm();
      },
    });

    
     return (
      <>
      <Header page="register" user="User"/>
      {isLoading && <Loader isLoading={isLoading} />}
      <section className="register-section">
        <form onSubmit={ handleSubmit } >
          <div className="register-container">
          <img src="appIcons/appIcon.jpeg" 
          alt="app-logo" 
          height="70" 
          width="80" 
            className="app-logoo"
          />

            <div className="username-div input">
              <label>
                <input type="text" 
                autoComplete="off" 
                onChange={handleChange} 
                name="username" 
                placeholder="Username" 
                value={values.username} 
                onBlur={handleBlur} />
              </label>
              {errors.username && touched.username ? (
                        <p className="form-error">{errors.username}</p>
                      ) : null}
            </div>

            <div className="pass-div input">
              <label>
                <input type="password" 
                autoComplete="off" 
                onChange={handleChange} 
                name="password" 
                placeholder="Password" 
                value={values.password} 
                onBlur={handleBlur} />
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
                <input type="email" 
                autoComplete="off" 
                onChange={handleChange} 
                name="email" 
                placeholder="Email" 
                value={values.email} 
                onBlur={handleBlur} />
              </label>
              {errors.email && touched.email ? (
                        <p className="form-error">{errors.email}</p>
                      ) : null}
            </div>

            <div className="submit-button-div input">
              <input className="Register-btn" type="submit" value="Register" />
            </div>
            <div className="loginRouteContainer input">
            <p style={{color : 'black'}} className="loginINstruction">
              Already have an account? <Link to="/login" className="login-btnroute">Login</Link>
            </p>
            </div>
          </div>
        </form>
      </section>
      <Footer />
      </>
    );

}
