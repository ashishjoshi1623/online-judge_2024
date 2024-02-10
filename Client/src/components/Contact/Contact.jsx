import React from 'react'
import './contact.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

function Contact() {
  return (
    <>
    <Header />
    <section className="contactUs">
    <form className="userQuery">
        <div className="container-contact">
            <textarea name="contactQuery" id="contact-Query" cols="30" rows="10" placeholder='Enter your query/suggestion here...'>
            </textarea>
            <input type="submit" className="contact-button" />
        </div>
        </form>
    </section>
    <Footer />
    </>
  )
}

export default Contact
