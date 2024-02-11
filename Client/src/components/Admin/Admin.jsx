import React from 'react'
import "./admin.css"
import Nav from 'react-bootstrap/Nav';
import { NavLink } from "react-router-dom"
import { useLocation } from 'react-router-dom';

export default function Admin() {

  const location = useLocation();
  const data = location.state;

  try {
    if(data.data === `${import.meta.env.VITE_ADMIN}`){
  return (
    <div className="body">

    {/* navbar */}
    <section className="admin-nav-section">
        <div className="admin-nav-container">
        <div className="admin-nav-app-logo">
          <h1 className='admin-nav-heading'>TrashCodes Admin </h1>
        </div>
        <div className="nav-link">
        <Nav className="me-auto">
        <NavLink to="/" className={({isActive})=> `admin-navLink ${isActive ?  "textcolor-pink" :"textcolor-grey"} `}>TrashCodes</NavLink>
          <NavLink to="/admin" className={({isActive})=> `admin-navLink ${isActive ?  "textcolor-pink" :"textcolor-grey"} `}>Home</NavLink>
          </Nav>
          </div>
        </div>
      </section>
    <h1 className='admin-nav-heading welcome-text'>Welcome Admin!</h1>

    <section className="addQuestion">
      <div className="container">
        <h1 className="admin-nav-heading">Add+</h1>

        <div className="form-container">
            <form className='addValue-container'>
              <label>
                <input type="text" 
                className="question-title input"
                placeholder='Add Title' 
                name='title'  
                />
              </label>

              <label>
                <textarea name="problemDescription" 
                className='textArea'
                id="problemDescription1" 
                cols="300" 
                rows="1000"
                placeholder='Problem Statement...'
                ></textarea>
              </label>
              <label>
                <textarea name="testCases" 
                className='textArea'
                id="testCase1" 
                cols="300" 
                rows="500"
                placeholder='Test Cases...'
                ></textarea>
              </label>

              <label>
                <input className='admin-submit-btn' type="submit" value="Add"/>
              </label>
            </form>
        </div>
      </div>
      
    </section>
    </div>
  )
    }
  } catch (error) {
    console.log(error);
    return(
        <h1>INVALID URL !!</h1>
    )
  }

  
}
