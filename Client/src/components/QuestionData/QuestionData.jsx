import React from 'react'
import { useNavigate } from 'react-router-dom'
import './questiondata.css'

function QuestionData(props) {
    // console.log(props.data)
    const navigate = useNavigate();
    
  return (
    <>
        {
            props.data.map( (curr) => {
                const {id,title} = curr;
                function getDescription(){
                    navigate('/questions/description', {state : {title : title, user : props.user, userId : props.userId}})
                }


                return(
                    <>
                    <li className='quesNameListItem' key={id} onClick={getDescription} >{title}</li>
                    </>
                )
            })
        }
    </>
  )
}

export default QuestionData
