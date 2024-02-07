import React from 'react'
import './contact.css'

function Contact() {
  return (
    <section className="contactUs">
    <form className="userQuery">
        <div className="container-contact">
            <textarea name="contactQuery" id="contact-Query" cols="30" rows="10" placeholder='Enter your query/suggestion here...'>
            </textarea>
            <input type="submit" className="submit-btn btn btn-primary" />
        </div>
        </form>
    </section>
  )
}

export default Contact