// displaying question title and description

import React from 'react';
import './quesdesc.css'

function Quesdesc(props) {
  return (
    <>
        {
            props.data.map( (value) => {
                const{title,problemStatement} = value;

                return(
                    <>
                    <h1 className='problemTitle'>Ques : {title}</h1>
                    <p><pre className='qStatement'>{problemStatement}</pre></p>
                    </>
                )
            })
        }
    </>
  )
}

export default Quesdesc
