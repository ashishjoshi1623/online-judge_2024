import React from 'react'
import './contact.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import axios from 'axios'
import { useState } from 'react'

function Contact() {

  const [contactQuery, setContactQuery] = useState('');
  const [personalEmail,setPersonalEmail] = useState('');
  const [error,setError] = useState('');
  // console.log(personalEmail);

  async function submitContact(e){
    e.preventDefault();
    try {
      const contactResponse = await axios.post(`${import.meta.env.VITE_API_PORT}/api/contactquery`,{
        contactQuery : contactQuery,
        personalEmail : personalEmail
      })
      // console.log(contactResponse.response);
    } catch (error) {
      console.log(error.response.status);
      if(error.response.status === 404){
        setError("Please fill required details");
      }
      
    }
  }

  return (
    <>
    <Header user = 'User'/> 
    <section onSubmit={submitContact} className="contactUs">
    <form className="userQuery">
        <div className="container-contact">
          <textarea 
            name="contactQuery" 
            id="contact-Query" 
            cols="30" 
            rows="10" 
            placeholder='Enter your query/suggestion here...'
            onChange={(e) => setContactQuery(e.target.value)}
            >
            </textarea>
           
            <input 
            type="email" 
            className="contactEmail mb-3" 
            placeholder='Your personal email '
            onChange={(e) => setPersonalEmail(e.target.value)}
            />
             {error ? <p style={{color : 'red'}}>{error}</p> : null}
            <input type="submit" className="contact-button"/>
        </div>
        </form>
    </section>
    <Footer />
    </>
  )
}

export default Contact
