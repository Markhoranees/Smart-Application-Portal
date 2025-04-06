import React from "react";
import { Link } from "react-router-dom"; 
import "../assets/styles/About.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import aboutImage from "../assets/image/about.png";
import profileImage from "../assets/image/profile1.png";
import JobFeature from "../components/JobFeatures";


const About = () => {
  return (
    <>
      <Header />
      <HeroSection
        showText={false}
        height="70vh"   backgroundImage={aboutImage} 
        breadcrumb={
          <nav>
            <Link to="/" className="breadcrumb-link">Home</Link> &gt;
            <span className="breadcrumb-active"> About</span>
          </nav>
        }
      />

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
       
       <JobFeature/>

      <Footer />
    </>
  );
};

export default About;
