import React from 'react'

function Output(props) {
    let i = 1;
  return (
    <>
    {
            props.testCases.map( (value) => {
                return(
                    <>
                    <p style={{color : 'black'}}>Test Case {i++} : {value}</p>
                    </>
                )
            })
    }
    <hr />
    {
            props.output.map( (value) => {
                return(
                    <>
                    <p style={{color : 'black'}}>your output  : {value} </p>
                    </>
                )
            })
        }
        <hr />
    {
            props.expectedOutput.map( (value) => {
                return(
                    <>
                    <p style={{color : 'black'}}>Expected Output : {value}</p>
                    </>
                )
            })
        }
        <hr />
        
        {
            props.message.map( (value) => {
                return(
                    <>
                    <p style={{color : 'black'}}> {value}</p>
                    </>
                )
            })
        }
        
        
    </>
  )
}

export default Output
