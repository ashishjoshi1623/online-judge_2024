import React from "react";
import "./footer.css";
import { NavLink } from "react-router-dom";

export default function Footer() {
    const today = new Date();
    const year = today.getFullYear();


  return (
    <>
    <section className="footer-section">
      <div className="container">
        <footer className="py-3">
          <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item">
            <NavLink to="" className={({isActive})=> `header-activeLink ${isActive ? "textcolor-purple" : "textcolor-blue"} `}>Home</NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="register" className={({isActive})=> `footer-activeLink ${isActive ? "textcolor-purple" : "textcolor-blue"} `}>Login/Register</NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="about" className={({isActive})=> `footer-activeLink ${isActive ? "textcolor-purple" : "textcolor-blue"} `}>About</NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="contact" className={({isActive})=> `footer-activeLink ${isActive ? "textcolor-purple" : "textcolor-blue"} `}>Contact</NavLink>
            </li>
          </ul>
          <p className="text-center text-body-white" >© {year} TrashCodes</p>
        </footer>
      </div>
      </section>
    </>
  );
}
