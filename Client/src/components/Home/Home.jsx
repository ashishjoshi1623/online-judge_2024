import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import "./home.css"
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Home() {

  const location = useLocation();
  const data = location.state;
  console.log(data);

  return (
    <>
    <Header />
    <section className='home-section'>
      <div className="home-container">
        <h1 className="heading">Welcome to : <h1 className='home-Heading' style={{color : "#7dbeff"}}>Trash \n</h1> <h1 className='home-Heading' style={{color : "#c17eff"}}>Codes ;</h1></h1>
      </div>
    </section>

    <section className='home-Explore'>
     <div className="explore-container">
      <div className="explore-heading">
        <h3 style={{color : "#c17eff"}}>Get ready to explore !</h3> <br/>
        <h3 style={{color : "#10dde4"}}>The best version of programmer in you.</h3>
        </div>
        <div className="explore-icon">
        <NavLink to="/register">
        <button className="explore-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-mortarboard-fill" viewBox="0 0 16 16">
  <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917z"/>
  <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466z"/>
</svg> Explore
            </button>
        </NavLink>
            
        </div>

     </div>
    </section>
    <Footer />
    </>
  )
}

export default Home;
