import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import "./header.css"

function Header(props) {
  return (
    <>
      <section className="nav-section">
        <div className="nav-container">
        <div className="nav-app-logo">
          <img src="appIcons/appIcon.jpeg" alt="app logo" className='app-icon'/>
          <h1 className="appname1 ">Trash</h1>
          <h1 className="appname2 ">Codes</h1>
        </div>
        <div className="nav-link">
        <Nav className="me-auto">
            <NavLink to="/" className={({isActive})=> `header-activeLink ${isActive ? "textcolor-purple" : "textcolor-blue"} `}>Home</NavLink>

            {props.page === "login" ? 
            <NavLink to="/login" className={({isActive})=> `header-activeLink ${isActive ? "textcolor-purple" : "textcolor-blue"} `}>LogIn</NavLink> : ""
            }

            {props.page === "register" ? 
            <NavLink to="/register" className={({isActive})=> `header-activeLink ${isActive ? "textcolor-purple" : "textcolor-blue"} `}>Register</NavLink> :" "
            }

            <NavLink to="/user" className={({isActive})=> `header-activeLink mx-2 ${isActive ? "textcolor-purple" : "textcolor-blue"} `}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
</svg> {props.user}
            </NavLink>

            {props.page === "problems" ? 
            <NavLink to="/" className={({isActive})=> `header-activeLink ${isActive ? "textcolor-purple" : "textcolor-blue"} `}>logout</NavLink> :" "
            }
          </Nav>
          </div>
        </div>
      </section>
     
    </>
  );
}

export default Header;