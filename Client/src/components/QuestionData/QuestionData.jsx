import React from 'react'
import { NavLink } from "react-router-dom"

function QuestionData(props) {
    // console.log(props.data)
  return (
    <>
        {
            props.data.map( (curr) => {
                const {id,title} = curr;
                return(
                    <>
                    <li key={id} >{title}</li>
                    </>
                )
            })
        }
    </>
  )
}

export default QuestionData
