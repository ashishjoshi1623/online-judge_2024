// This Page renders the list of all available questions in our database

import React, { useEffect, useState } from 'react'
import QuestionData from '../QuestionData/QuestionData'
import axios from 'axios';
import Header from '../Header/Header.jsx'
import Footer from '../Footer/Footer.jsx'

function Questions() {

  const [questionData,setQuestionData] = useState([]);

  async function getQuestionData(){
    const response = await axios.post(`${import.meta.env.VITE_API_PORT}/api/allquestions`);
    const responseData = JSON.parse(response.data);
    // console.log(responseData);
    if(responseData.length > 0){
      setQuestionData(responseData);
    }
  }

  useEffect(()=>{
    getQuestionData();
  },[])

  return (
    <>
        <Header />
        {/* questionData has a template of displaying question title as a list */}
        <div>
        <QuestionData data = {questionData}/>
        </div>
        <Footer />
    </>
  )
}

export default Questions
