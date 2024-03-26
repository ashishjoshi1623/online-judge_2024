import React, { useEffect, useState } from 'react'
import "./admin.css"
import Nav from 'react-bootstrap/Nav';
import { NavLink } from "react-router-dom"
import { useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import { addQuestionSchema } from '../../validation/QuestionSchema.jsx';
import axios from 'axios';
import QuestionList from './QuestionList.jsx';
import Loader from '../Loader/Loader.jsx';

export default function Admin() {

  const location = useLocation();
  const data = location.state;
  const loggedIn = data ? data.data.statusCode : null;
  const [isLoading, setIsLoading] = useState(false);

  //object to collect initial values
  const newQuestionData = {
    title : "",
    problemStatement : "",
    testCases : [],
    output : [],
    difficulty : "",
  } 

  const [questionData,setQuestionData] = useState([]);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues : newQuestionData,
    validationSchema : addQuestionSchema,

    onSubmit : async (values, action) => {
      setIsLoading(true);
      try {
        const questionResponse = await axios.post(`${import.meta.env.VITE_API_PORT}/api/question`, values);

        alert("Submission Successfull");

      } catch (error) {
        alert("Error: " + error);        
        console.log(error);
      } finally {
        setIsLoading(false);
        action.resetForm();
        window.location.reload();
      }
    }
  })
    
  // }
  async function fetchQuestionData(){
    setIsLoading(true);
    try {
      const Questions = await axios.post(`${import.meta.env.VITE_API_PORT}/api/allquestions`);
      const data = JSON.parse(Questions.data);
      if(data.length > 0){
        setQuestionData(data);
      }
      // console.log(data);
      
    } catch (error) {
      console.log(error);
    } finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchQuestionData()
  }, [])
  
  if(loggedIn){
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
        <NavLink to="/" className="admin-navLink textcolor-pink">TrashCodes</NavLink>
          <NavLink to="/adminlogin" className="admin-navLink textcolor-pink">Logout</NavLink>
          </Nav>
          </div>
        </div>
      </section>
      {isLoading && <Loader isLoading={isLoading} />}
    

    <section className="addQuestion">
      <div className="admin-container">
        <h1 style={{color : 'black'}} className=''>Welcome Admin!</h1>
        <h1 style={{color : 'black'}} className=''>Add Problems Below</h1>
            <form onSubmit={handleSubmit} className='addValue-container'>
            <div className="form-container">
              <label>
                <input type="text" 
                className="question-title input"
                placeholder='Add Title' 
                name='title'
                onChange={handleChange}  
                onBlur={handleBlur}
                value={values.title}
                required
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
                required
                ></textarea>
              </label>
              {errors.problemStatement && touched.problemStatement ? (
                        <p className="form-error">{errors.problemStatement}</p>
                      ) : null}
              <label>
              <p style={{color:'grey'}}>(For more than one testcase use ',' without extra space)</p>
                <input name="testCases" 
                type='text'
                className='question-title input'
                placeholder='Test Cases...'
                onChange={handleChange}  
                onBlur={handleBlur}
                value={values.testCases}
                required
                />
              </label>
              {errors.testCases && touched.testCases ? (
                        <p className="form-error">{errors.testCases}</p>
                      ) : null}
              <label>
              <p style={{color:'grey'}}>(For more than one output use ',' without extra space)</p>
                <input type='text'
                name="output" 
                className='question-title input'
                placeholder='Output...'
                onChange={handleChange}  
                onBlur={handleBlur}
                value={values.output}
                required
                />
              </label>
              {errors.output && touched.output ? (
                        <p className="form-error">{errors.output}</p>
                      ) : null}
              <label>
                <select className='selectDifi' name="difficulty" id="diff" onChange={handleChange} onBlur={handleBlur} value={values.difficulty} required>
                  <option value="">Select Difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </label>
              {errors.difficulty && touched.difficulty ? (
                        <p className="form-error">{errors.difficulty}</p>
                      ) : null}

              <label>
                <input className='admin-submit-btn' type="submit" value="Add"/>
              </label>
              </div>
            </form>
        
      </div>
      
    </section>

    <section className="questionSection">
        <h1 style={{color:'black'}} className=""> All Questions </h1>
        <QuestionList data={questionData} user={loggedIn}/>
    </section>
    </div>
  )
  }
  else{
    return(
        <h1 style={{color : 'black'}}>INVALID URL !!</h1>
    )
  }
}
