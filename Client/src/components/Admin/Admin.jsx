import React, { useEffect, useState } from 'react'
import "./admin.css"
import Nav from 'react-bootstrap/Nav';
import { NavLink } from "react-router-dom"
import { useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import { addQuestionSchema } from '../../validation/QuestionSchema.jsx';
import axios from 'axios';
import QuestionData from '../QuestionData/QuestionData.jsx';

export default function Admin() {

  const location = useLocation();
  const data = location.state;

  //object to collect initial values
  const newQuestionData = {
    title : "",
    problemStatement : "",
    testCases : [],
    output : [],
  } 

  const [questionData,setQuestionData] = useState([]);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues : newQuestionData,
    validationSchema : addQuestionSchema,

    onSubmit : async (values, action) => {
      try {
        const questionResponse = await axios.post(`${import.meta.env.VITE_API_PORT}/api/question`, values);

        console.log(questionResponse);

      } catch (error) {
        console.log(error);
      }
      action.resetForm();
    }
  })
    
  // }
  async function fetchQuestionData(){
    try {
      const Questions = await axios.post(`${import.meta.env.VITE_API_PORT}/api/allquestions`);
      const data = JSON.parse(Questions.data);
      if(data.length > 0){
        setQuestionData(data);
      }
      console.log(data);
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchQuestionData()
  }, [])
  
  if(data.data.statusCode === 200){
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
          <NavLink to="/adminlogin/admin" className={({isActive})=> `admin-navLink ${isActive ?  "textcolor-pink" :"textcolor-grey"} `}>Home</NavLink>
          <NavLink to="/adminlogin" className={({isActive})=> `admin-navLink ${isActive ?  "textcolor-pink" :"textcolor-grey"} `}>Logout</NavLink>
          </Nav>
          </div>
        </div>
      </section>
    <h1 className='admin-nav-heading welcome-text'>Welcome Admin!</h1>

    <section className="addQuestion">
      <div className="admin-container">
        

        <div className="form-container">
            <form onSubmit={handleSubmit} className='addValue-container'>
              <label>
                <input type="text" 
                className="question-title input"
                placeholder='Add Title' 
                name='title'
                onChange={handleChange}  
                onBlur={handleBlur}
                value={values.title}
                />
              </label>
              {errors.title && touched.title ? (
                        <p className="form-error">{errors.title}</p>
                      ) : null}

              <label>
                <textarea name="problemStatement" 
                className='textArea'
                id="problemDescription1" 
                cols="80" 
                rows="1000"
                placeholder='Problem Statement...'
                onChange={handleChange}  
                onBlur={handleBlur}
                value={values.problemStatement}
                ></textarea>
              </label>
              {errors.problemStatement && touched.problemStatement ? (
                        <p className="form-error">{errors.problemStatement}</p>
                      ) : null}
              <label>
                <input name="testCases" 
                type='text'
                className='question-title input'
                placeholder='Test Cases...'
                onChange={handleChange}  
                onBlur={handleBlur}
                value={values.testCases}
                />
              </label>
              {errors.testCases && touched.testCases ? (
                        <p className="form-error">{errors.testCases}</p>
                      ) : null}
              <label>
                <input type='text'
                name="output" 
                className='question-title input'
                placeholder='Output...'
                onChange={handleChange}  
                onBlur={handleBlur}
                value={values.output}
                />
              </label>
              {errors.output && touched.output ? (
                        <p className="form-error">{errors.output}</p>
                      ) : null}

              <label>
                <input className='admin-submit-btn' type="submit" value="Add"/>
              </label>
            </form>
        </div>
        
      </div>
      
    </section>

    <section className="questionSection">
        <h1 className="admin-nav-heading"> All Questions </h1>
      <ul className="QuestionList">
      <QuestionData data = {questionData} />
      </ul>
    </section>
    </div>
  )
  }
  else{
    return(
        <h1>INVALID URL !!</h1>
    )
  }
}
