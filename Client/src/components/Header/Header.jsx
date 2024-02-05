import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import "./header.css"

function Header() {
  return (
    <>
      <section className="nav-section">
        <div className="nav-container">
        <div className="nav-app-logo">
          <img src="../../public/appIcons/appIcon.jpeg" alt="app logo" className='app-icon'/>
          <h1 className="appname1 ">Trash</h1>
          <h1 className="appname2 ">Codes</h1>
        </div>
        <div className="nav-link">
        <Nav className="me-auto">
            <NavLink to="" className={({isActive})=> `header-activeLink ${isActive ? "textcolor-purple" : "textcolor-blue"} `}>Home</NavLink>
            <NavLink to="register" className={({isActive})=> `header-activeLink ${isActive ? "textcolor-purple" : "textcolor-blue"} `}>Login/Register</NavLink>
            <NavLink to="about" className={({isActive})=> `header-activeLink ${isActive ? "textcolor-purple" : "textcolor-blue"} `}>About</NavLink>
            <NavLink to="contact" className={({isActive})=> `header-activeLink ${isActive ? "textcolor-purple" : "textcolor-blue"} `}>Contact</NavLink>
          </Nav>
          </div>
        </div>
      </section>
     
    </>
  );
}

export default Header;