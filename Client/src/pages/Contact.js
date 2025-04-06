import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import { Link } from "react-router-dom";
import '../assets/styles/Contact.css';  
import contactImage from "../assets/image/Contact.jpg"; 
import subscribeImage from "../assets/image/subscribe.jpg";  
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <>
      <Header />
      <HeroSection 
        showText={false}
        height="70vh"
        backgroundImage={contactImage}  
        breadcrumb={
          <nav>
            <Link to="/" className="breadcrumb-link">Home</Link> &gt;
            <span className="breadcrumb-active"> Contact</span>
          </nav>
        } 
      />  

      {/* Contact Section */}
      <div className="contact-container">
        <div className="contact-content">
          
          {/* Left Side - Contact Form */}
          <div className="contact-form">
            <h2>Get in Touch</h2>
            <form>
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea rows="4" placeholder="Your Message" required></textarea>
              </div>
              <button type="submit">Send Message</button>
            </form>
          </div>

          <div className="contact-image">
            <img src={contactImage} alt="Contact" />
          </div>

        </div>
      </div>

      {/* Subscribe Section */}
      <div className="subscribe-section" style={{ backgroundImage: `url(${subscribeImage})` }}>
        <div className="subscribe-content">
          <h2>Subscribe to our Newsletter</h2>
          <p>Stay updated with our latest news and special offers.</p>
          <div className="subscribe-form">
            <input type="email" placeholder="Enter email address" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
