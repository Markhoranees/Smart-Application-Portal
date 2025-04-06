import React from 'react'
import '../assets/styles/Contact.css'; 
import subscribeImage from "../assets/image/subscribe.jpg"; 


const Subscribe = () => {
  return (
   <>
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
   </>
  )
}

export default Subscribe