import React from 'react'
import './questionList.css';

function QuestionList(props) {
  return (
    <>
        {props.data.map((curr) => {
            const {_id,title} = curr;
            return(
                <div className="QuestionListContainer">
                <li key={_id} className="quesTitle">
                {title} 
                </li>
                <button className='editQuesBtn btn btn-dark px-3'>Edit</button>
                </div>
            )
        })}
    </>
  )
}

export default QuestionList