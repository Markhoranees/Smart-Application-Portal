import React from "react";
import { useParams } from "react-router-dom";
import "../assets/styles/JobDetail.css";
import Header from "./Header";
import Footer from "./Footer";

const JobDetail = () => {
  const { id } = useParams();

  // Static job data
  const job = {
    id: id || 1,
    title: "Frontend Developer",
    company: "Facebook, Inc.",
    location: "Western City, UK",
    type: "Full Time",
    salary: "$70,000 - $90,000 / year",
    description:
      "We are looking for a highly skilled Frontend Developer to join our team. You will be responsible for developing and maintaining web applications using React.js, HTML, CSS, and JavaScript.",
    eligibility: [
      "Bachelor’s degree in Computer Science or a related field",
      "2+ years of experience in Frontend Development",
      "Proficiency in React.js, JavaScript, and CSS",
      "Strong problem-solving skills and attention to detail",
    ],
    terms: [
      "This is a full-time remote position",
      "The company provides health insurance and annual bonuses",
      "Employees must adhere to the company's work ethics and security policies",
    ],
  };

  return (
    <>
      <Header />
      {/* Top Section with Background Image */}
      <section className="container-jobdetails">
        <div className="top-header">
          <h3 className="fade-in" > Job Details </h3>
        </div>
        </section>
        <div className="job-detail-container fade-in">
          <div className="job-header">
            <h1>{job.title}</h1>
            <p className="company">
              {job.company} - <span className="location">{job.location}</span>
            </p>
            <p className="job-type">{job.type}</p>
            <p className="salary">{job.salary}</p>
          </div>

          <div className="job-description">
            <h2>Job Description</h2>
            <p>{job.description}</p>
          </div>

          <div className="eligibility">
            <h2>Eligibility Criteria</h2>
            <ul>
              {job.eligibility.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="terms">
            <h2>Terms & Conditions</h2>
            <ul>
              {job.terms.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <button className="apply-btn hover-effect">Apply Now</button>
        </div>
 
      <Footer />
    </>
  );
};

export default JobDetail;
