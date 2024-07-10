import React from 'react';
import Home from './home/Home';
import About from './components/About';
import {Route,Routes} from "react-router-dom"
import Contact_us from './components/Contact_us';
import Signup_Jobseeker from './components/Signup_Jobseeker';
import Signup_Company from './components/Signup_Company';
import Login_Company from './components/Login_Company';
import Login_Jobseeker from './components/Login_Jobseeker';
import Login_Admin from './components/Login_Admin';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <>
    <div className="dark:bg-slate-900 dark:text-white">
    <Routes >
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact-us" element={<Contact_us/>}/>
        <Route path="/signup_jobseeker" element={<Signup_Jobseeker/>}/>
        <Route path="/signup_company" element={<Signup_Company/>}/>
        <Route path="/login_company" element={<Login_Company/>}/>
        <Route path="/login_jobseeker" element={<Login_Jobseeker/>}/>
        <Route path="/login_admin" element={<Login_Admin/>}/>
        
        
      </Routes>
      <Toaster />
    </div>
      

      
    </>
  );
}

export default App;
