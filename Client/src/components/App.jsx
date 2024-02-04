import React from 'react'
import Header from './Header'
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './footer';
import Register from './Register';

function App() {
  return (
    <>
      <Header />
      <Register />
      <Login />
      <Footer />
    </>
  );
}

export default App;
