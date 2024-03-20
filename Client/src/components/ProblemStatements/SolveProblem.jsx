import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from "../Header/Header.jsx";
import Footer from '../Footer/Footer.jsx';
import Quesdesc from './Quesdesc.jsx';
import './solveproblem.css'
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another
import Output from './Output.jsx';
import Submission from './Submission.jsx';

function SolveProblem() {
    const location = useLocation();
    const title = location.state.title; //Question title (unique)
    const user = location.state.user; //username
    const userId = location.state.userId; //username
    const [questionData,setQuestionData] = useState([]);
    const [language, setLanguage] = useState('cpp');
    const [output,setOutput] = useState('');
    const [testCases,setTestCases] = useState([]);
    const [expOutput,setExpOutput] = useState([]); //expected output
    const [successMessage,setSuccessMessage] = useState([]);
    const [customInput,setCustomInput] = useState('');
    const [code, setCode] = React.useState(
      `#include <iostream>
      using namespace std;
      int main() {
          cout << "Hello World!";
          return 0;
      }
      
      
      
      
      
      
      `
    );
    const [show, setShow] = useState(true);

    async function handleSubmit(){
      // console.log("Clicked");
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_PORT}/api/submit`,{
          language : language,
          code : code,
          title : title, 
          user : user,
          userId : userId,
          questionId : questionData[0]._id
        })
        
        // setOutput(response.data.output);
        // setTestCases(response.data.testCases);
        // setExpOutput(response.data.expectedOutput);
        setSuccessMessage(response.data.message);
        setOutput('');
        // console.log(output,testCases,expOutput,successMessage);
      } catch (error) {
        setOutput("Syntax Error")
      }
      
    }
    async function handleRun(){
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_PORT}/api/run`,{
          language : language,
          code : code,
          customInput : customInput
        })
        
        setSuccessMessage([]);
        if(customInput === '') {
          setOutput('Invalid Input');
        }
        else{
          setOutput(response.data.output);
        }
        console.log(output);
      } catch (error) {
        setOutput("Syntax Error")
      }
      
    }

    

    async function getQuestionDesc(){
    
        const response = await axios.get(`${import.meta.env.VITE_API_PORT}/api/description/${title}`);
        const responseData = await JSON.parse(response.data);
            
        if(responseData.length > 0){
            setQuestionData(responseData);
        }
        // console.log(questionData[0]); //'65cb0b1fac1ef2dbf291e3a6'
       
    }

    useEffect(() => {
        getQuestionDesc();
    }, [])


  return (
    <>
        <Header page="problems" user={user}/>
        <section className='solve'>

            <div className='leftDesc'>
                <Quesdesc data = {questionData} />
              <button className='mx-3 px-3 showBtn' onClick={async() => setShow(!show)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="25" fill="currentColor" class="bi bi-clock-history" viewBox="0 2 20 16">
  <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"/>
  <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"/>
  <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"/>
</svg>{show ? " Show" : " Hide"} Submissions
                    </button>
                <Submission status={show} userId={userId} questionData = {questionData}/>
            </div>

            <div className="codeEditor">
                  <div className="languageSelector">
                    <select onChange={e => {setLanguage(e.target.value)}} className='langOption' name="languageSelection" id="languageSelection" >
                      <option value="cpp">C++</option>
                      <option value="java">Java</option>
                      <option value="py">Python</option>
                    </select>
                  </div>
                  <div className="editordiv">
                    <Editor
                    className='Editor'
                      value={code}
                      onValueChange={code => setCode(code)}
                      highlight={code => highlight(code, languages.js)}
                      padding={20}
                    />
                </div>
                <div className="customInputContainer">
                  <input 
                  type="text" 
                  style={{border: 'none'}}
                  className="customInput" 
                  placeholder='custom input'
                  onChange={(e) => setCustomInput(e.target.value)}
                  />
                </div>
                <div className="codeSubmitBtnDiv">
                  <button onClick={handleRun} className='px-3 mx-2 codeRunBtn'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="25" fill="currentColor" class="bi bi-play-fill" viewBox="5 0 10 16">
  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
</svg> Run</button>
                  <button onClick={handleSubmit} className='px-3 codeSubmitBtn'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="25" fill="currentColor" class="bi bi-upload" viewBox="0 2 22 16">
  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
  <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
</svg> Submit</button>
                </div>
                <div className="outputDiv">
                  <h5 className='outputHeading'>Output</h5>
                  <Output message = {successMessage}/>
                  <p style={{color : 'black'}}>{output}</p>
                  </div>
            </div>
        </section>
        <Footer />
    </>
  )
}

export default SolveProblem
