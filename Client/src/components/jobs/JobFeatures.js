import React from "react";
import "../../assets/styles/JobFeatures.css";

const jobFeatures = [
  {
    icon: "📝",
    title: "Search Millions of Jobs",
    description: "Find jobs from various industries that match your skills.",
  },
  {
    icon: "🔄",
    title: "Easy To Manage Jobs",
    description: "Manage job applications and track your progress easily.",
  },
  {
    icon: "📈",
    title: "Top Careers",
    description: "Explore high-growth career opportunities.",
  },
  {
    icon: "🎓",
    title: "Search Expert Candidates",
    description: "Find highly skilled professionals for your company.",
  },
  {
    icon: "📚",
    title: "Teaching & Education",
    description: "Discover teaching and academic job opportunities.",
  },
  {
    icon: "📢",
    title: "Sales & Communication",
    description: "Boost your career in sales and communication fields.",
  },
  {
    icon: "🎖️",
    title: "Scholarship Opportunities",
    description: "Find scholarships to support your educational journey.",
  },
  {
    icon: "👨‍🏫",
    title: "Provide the Experts",
    description: "Connect with industry experts for guidance and hiring.",
  },
];

const JobFeature = () => {
  return (
    <div className="job-feature-container">
      <h1 className="job-feature-title">Explore By Category</h1>
      <div className="job-feature-grid">
        {jobFeatures.map((feature, index) => (
          <div key={index} className="job-feature-card">
            <div className="job-feature-icon">{feature.icon}</div>
            <h5>{feature.title}</h5>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobFeature;
