import React from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate} from "react-router-dom";
import "../../assets/styles/Dashboard.css"; // Adjust path accordingly

const Dashboard = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  if (!isLoaded) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container container">
      <div className="dashboard-header mb-5">
        <h1>Admin Dashboard</h1>
        <p>Welcome, {user.firstName || user.fullName || "User"}</p>
      </div>

      <div className="dashboard-grid row g-4">
        {/* Jobs Posting Card */}
        <section className="dashboard-card col-md-4 p-4 shadow rounded">
          <h2>Jobs Posting</h2>
          <p>Manage job postings and view job listings.</p>
          <div className="card-actions d-flex gap-3 mt-4">
            <button
              className="btn btn-primary flex-grow-1"
              onClick={() => navigate("/postjob")}
            >
              Manage Jobs
            </button>
            <button 
            className="btn btn-outline-secondary flex-grow-1"
                    onClick={() => navigate("/dltjob")}>
              View Job List
            </button>
          </div>
        </section>

        {/* Scholarship Posting Card */}
        <section className="dashboard-card col-md-4 p-4 shadow rounded">
          <h2>Scholarship Posting</h2>
          <p>Create and manage scholarship opportunities.</p>
          <div className="card-actions d-flex gap-3 mt-4">
            <button className="btn btn-primary flex-grow-1">Manage Scholarships</button>
            <button className="btn btn-outline-secondary flex-grow-1">View Scholarship List</button>
          </div>
        </section>

        {/* Internship Posting Card */}
        <section className="dashboard-card col-md-4 p-4 shadow rounded">
          <h2>Internship Posting</h2>
          <p>Manage internship offers and applications.</p>
          <div className="card-actions d-flex gap-3 mt-4">
            <button className="btn btn-primary flex-grow-1">Manage Internships</button>
            <button className="btn btn-outline-secondary flex-grow-1">View Internship List</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
