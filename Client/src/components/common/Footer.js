import React from "react";
import "../../assets/styles/Footer.css";
import { FaTwitter, FaFacebookF, FaInstagram,  } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section about">
          <h3>About</h3>
          <p>
            Our platform connects job seekers with employers and provides expert guidance on scholarships to help students achieve their academic and career goals.
          </p>
          <div className="social-icons">
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>

        {/* Employers Section */}
        <div className="footer-section">
          <h3>For Employers</h3>
          <ul>
            <li><a href="#">How It Works</a></li>
            <li><a href="#">Register</a></li>
            <li><a href="#">Post a Job</a></li>
            <li><a href="#">Find Candidates</a></li>
            <li><a href="#">Recruiting Services</a></li>
            <li><a href="#">Employer Blog</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>

        {/* Job Seekers Section */}
        <div className="footer-section">
          <h3>For Job Seekers</h3>
          <ul>
            <li><a href="#">Find Jobs</a></li>
            <li><a href="#">Upload Resume</a></li>
            <li><a href="#">Job Alerts</a></li>
            <li><a href="#">Career Advice</a></li>
            <li><a href="#">Interview Tips</a></li>
          </ul>
        </div>

        {/* Scholarships Section */}
        <div className="footer-section">
          <h3>Scholarships</h3>
          <ul>
            <li><a href="#">Available Scholarships</a></li>
            <li><a href="#">How to Apply</a></li>
            <li><a href="#">Expert Guidance</a></li>
            <li><a href="#">Success Stories</a></li>
          </ul>
        </div>
       </div>
       <div className="footer-bottom">
        <p>Copyright ©2025 All rights reserved | This Website is made with ❤️ by Akbar Ali</p>
      </div>
    </footer>
  );
};

export default Footer;
