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
                const {id,title,difficulty} = curr;
                let diffClass;
                if(difficulty === 'easy') diffClass = 'green';
                else if(difficulty ==='medium') diffClass = 'orange';
                else if(difficulty === 'hard') diffClass ='red';
                function getDescription(){
                    navigate('/questions/description', {state : {title : title, user : props.user, userId : props.userId}})
                }


                return(
                    <>
                        <div className="quesListItem">
                            <p className='quesTitle' onClick={getDescription}>{title}</p> <p className='quesDiff' style={{color : `${diffClass}`}}>{difficulty}</p>
                        </div>
                        <hr />
                    </>
                )
            })
        }
    </>
  )
}

export default QuestionData
