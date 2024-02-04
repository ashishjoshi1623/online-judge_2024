import React from "react";
import "../../public/footer.css";

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
              <a href="http://localhost:5173/" className="nav-link px-2 text-body-secondary">
                <p>Home</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-body-secondary">
                <p>Features</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-body-secondary">
                <p>About</p>
              </a>
            </li>
          </ul>
          <p className="text-center text-body-white" >© {year} Online-Judge</p>
        </footer>
      </div>
      </section>
    </>
  );
}
