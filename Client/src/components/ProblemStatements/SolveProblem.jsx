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

function SolveProblem() {
    const location = useLocation();
    const title = location.state; //Question title (unique)
    const [questionData,setQuestionData] = useState([]);
    const [language, setLanguage] = useState('cpp');
    const [output,setOutput] = useState('');
    const [code, setCode] = React.useState(
      `#include <iostream>
      using namespace std;
      int main() {
          cout << "Hello World!";
          return 0;
      }`
    );

    async function handleSubmit(){
      // console.log("Clicked");
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_PORT}/api/run`,{
          language : language,
          code : code,
          title : title
        })
        setOutput(response.data.output);
      } catch (error) {
        setOutput("Syntax Error")
      }
      
    }

    

    async function getQuestionDesc(){
    
        const response = await axios.get(`${import.meta.env.VITE_API_PORT}/api/description/${title}`);
        const responseData = JSON.parse(response.data);
            
        if(responseData.length > 0){
            setQuestionData(responseData);
        }
        console.log(questionData);
       
    }

    useEffect(() => {
        getQuestionDesc();
    }, [])


  return (
    <>
        <Header />
        <section className='solve'>
        <div className='leftDesc'>
        <Quesdesc data = {questionData} />
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
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => highlight(code, languages.js)}
              padding={20}
            />
        </div>
        <div className="codeSubmitBtnDiv">
          <button onClick={handleSubmit} className='px-3 codeSubmitBtn'>Run</button>
        </div>
        <div className="outputDiv">
          <h5 className='outputHeading'>Output</h5>
          <h4>{output}</h4>
          </div>
        </div>
        </section>
        <Footer />
    </>
  )
}

export default SolveProblem
