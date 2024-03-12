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
    const [output,setOutput] = useState([]);
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
      }`
    );
    const [show, setShow] = useState(true);

    async function handleSubmit(){
      // console.log("Clicked");
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_PORT}/api/run`,{
          language : language,
          code : code,
          title : title, 
          user : user,
          userId : userId,
          questionId : questionData[0]._id,
          customInput : customInput
        })
        
        setOutput(response.data.output);
        setTestCases(response.data.testCases);
        setExpOutput(response.data.expectedOutput);
        setSuccessMessage(response.data.message);
        // console.log(output,testCases,expOutput,successMessage);
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
              <button className='mx-3 px-3 codeSubmitBtn' onClick={async() => setShow(!show)}>
                      {show ? "Show" : "Hide"} Submissions
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
                  className="customInput" 
                  placeholder='custom input'
                  onChange={(e) => setCustomInput(e.target.value)}
                  />
                </div>
                <div className="codeSubmitBtnDiv">
                  <button onClick={handleSubmit} className='px-3 codeSubmitBtn'>Run</button>
                </div>
                <div className="outputDiv">
                  <h5 className='outputHeading'>Output</h5>
                  <Output output={output} testCases = {testCases} expectedOutput = {expOutput} message = {successMessage}/>
                  </div>
            </div>
        </section>
        <Footer />
    </>
  )
}

export default SolveProblem
