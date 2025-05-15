import React from "react";
import "../assets/styles/About.css";


import aboutImage from "../assets/image/about.png";
import profileImage from "../assets/image/profile1.png";



const About = () => {
  return (
    <>
   

      <section className="about-section">
        <div className="container about-container">
          {/* Left Side - Image */}
          <div className="about-image">
            <img src={aboutImage} alt="About Us" />
          </div>

          {/* Right Side - Text */}
          <div className="about-content">
            <h2>About</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aspernatur
              atque perferendis, laudantium quod architecto velit ad officiis
              facere eveniet in fuga fugiat delectus rerum dolorum quos.
            </p>
            <ul className="about-list">
              <li>✔ Lorem ipsum dolor sit amet.</li>
              <li>✔ Dicta doloribus veniam impedit.</li>
              <li>✔ Quod, facilis cupiditate repellat.</li>
              <li>✔ Quae impedit id maxime fugiat.</li>
              <li>✔ Esse aut iste dolor. In.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="team-section">
      <div className="team-header">
            <h1 className="team-heading">Our Team</h1>
            <p className="team-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        <div className="container">
          <div className="team-members">
            {/* ✅ Only 3 team members */}
            <div className="team-member">
              <img src={profileImage} alt="Michelle Megan" />
              <h4>Michelle Megan</h4>
              <p>CEO, Co-founder</p>
            </div>
            <div className="team-member">
              <img src={profileImage} alt="Mike Stellar" />
              <h4>Mike Stellar</h4>
              <p>CTO, Co-founder</p>
            </div>
            <div className="team-member">
              <img src={profileImage} alt="Mike Stellar" />
              <h4>Mike Stellar</h4>
              <p>CTO, Co-founder</p>
            </div>
            <div className="team-member">
              <img src={profileImage} alt="Gregg White" />
              <h4>Gregg White</h4>
              <p>VP Producer</p>
            </div>
          </div>
        </div>
      </section>
       
 

  
    </>
  );
};

export default About;
