import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact"; 
import Blogs from "./pages/Blogs";
import Loginfrom from "./pages/Loginfrom";
import Postjob from "./pages/Postjob";
import Joblist from "./components/Joblist";
import JobDetail from "./components/JobDetail";
import InternshipPage from "./pages/InternshipPage";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Scholarships from "./pages/Scholarships";
import Dashboard from "./pages/Admin/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />  
        <Route path="/about" element={<About/>} />  
        <Route path="/contact" element={<Contact/>} />  
        <Route path="/blog" element={<Blogs/>} />  
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/postjob" element={<Postjob/>} />  
        <Route path="/joblist" element={<Joblist/>} />  
        <Route path="/jobdetail" element={<JobDetail/>} />  
        <Route path="/enternships" element={<InternshipPage/>} />  
        <Route path="/scholarships" element={<Scholarships/>} />  
        <Route path="/admindashboard" element={<Dashboard/>} />  

      
      </Routes>
    </Router>
  );
}

export default App;
