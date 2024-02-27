import React, { useState } from 'react'
import axios from 'axios';

function Submission(props) {

    const [submissionCode, setSubmissionCode] = useState('No Submission Yet');

  async function getSubmission(questionId,userId){
    try {
            const response = await axios.post(`${import.meta.env.VITE_API_PORT}/api/submission`,{
            userId : userId,
            questionId : questionId
        })
        const responseData = await JSON.parse(response.data);
        // console.log(responseData[0].lastSubmission);
        setSubmissionCode(responseData[0].lastSubmission);
        // console.log(submissionCode);
    } catch (error) {
        console.log("No record found");
    }
    
  }  


  return (
    <div
      style={{ visibility: props.status ? "visible" : "hidden" }}
      className="box"
    >
    {
        props.questionData.map( (val) => {
            const {_id} = val;
            getSubmission(_id,props.userId);
            return(
                <>
                    <pre className='submissionText'>{submissionCode}</pre>
                </>
            )
        })
    }
    </div>
  )
}

export default Submission
