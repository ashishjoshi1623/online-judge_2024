import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from "../Header/Header.jsx";
import Footer from '../Footer/Footer.jsx';
import Quesdesc from './Quesdesc.jsx';
import './solveproblem.css'

function SolveProblem() {
    const location = useLocation();
    const title = location.state;
    // console.log(location.state);
    const [questionData,setQuestionData] = useState([]);

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
          <h1>Code Editor In Progress</h1>
        </div>
        </section>
        <Footer />
    </>
  )
}

export default SolveProblem
