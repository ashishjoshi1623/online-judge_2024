import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import About from './components/About/About.jsx';
import Contact from './components/Contact/Contact.jsx';
import Admin from './components/Admin/Admin.jsx';
import AdminLogin from './components/Admin/AdminLogin.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route path='' element={<Home />}/>
      <Route path='register' element={<Register />}/>
      <Route path='about' element={<About />}/>
      <Route path='contact' element={<Contact />}/>
      <Route path='login' element={<Login />}/>
      <Route path='/adminlogin' element={<AdminLogin />}/>
      <Route path='/adminlogin/admin' element={<Admin />}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>,
)
