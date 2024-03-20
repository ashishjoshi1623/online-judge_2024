import React from 'react'

function Output(props) {
    let i = 1;
  return (
    <>
        {
            props.message.map( (value) => {
                const expected = value.split(' ');
                let bcolor;
                if(expected[2] == 'Success'){
                    bcolor = 'green';
                }
                else{
                   bcolor = 'red';
                }
                return(
                    <>
                    <p style={{color : 'white', backgroundColor : `${bcolor}`, maxWidth : '9vw',padding : '2px'}}> {value}</p>
                    </>
                )
            })
        }
    </>
  )
}

export default Output
