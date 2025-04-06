import React from "react";
import "../assets/styles/InternshipPage.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Subscribe from "../components/Subscribe";


import graphicImg from "../assets/image/graphics.png";
import chatbotImg from "../assets/image/chatbot.png";
import backendImg from "../assets/image/backend_developer.png";
import frontendImg from "../assets/image/frontend.png";
import appImg from "../assets/image/mobile-app.png";
import otherImg from "../assets/image/internships1.png";

const internships = [
  { title: "Graphic Design", img: graphicImg }, 
  { title: "Chatbot Development", img: chatbotImg },
  { title: "Backend Development", img: backendImg },
  { title: "Frontend Internship", img: frontendImg },
  { title: "App Development", img: appImg },
  { title: "Other Internships", img: otherImg },
];


const InternshipPage = () => {
  return (
    <div>
     <Header/>
      {/* First Section */}
      <section className="internship-section">
        <div className="content">
          <h1 className="title">Unlock Your Future</h1>
          <p className="description">
            Discover world-class internships and gain hands-on experience with top industry leaders.
          </p>
          <button className="btn get-started">Get Started</button>
        </div>
        <div className="cta">
          <button className="btn find-internship">Find Your Dream Internship Today!</button>
        </div>
      </section>

      {/* Second Section */}
      <section className="internship-categories">
        <h2 className="section-title">Explore Internship Categories</h2>
        <p className="section-description">
          Choose from a wide range of internship opportunities and kickstart your professional journey.
        </p>
        <div className="categories">
          {internships.map((internship, index) => (
            <div className="card" key={index}>
            <img src={internship.img} alt={internship.title} className="card-img" />
              <div className="card-content">
                <h3>{internship.title}</h3>
                <button className="btn apply-btn">Apply Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Subscribe/>
      <Footer/>
    </div>
  );
};

export default InternshipPage;
