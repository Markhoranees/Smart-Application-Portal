import React from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/Dashboard.css";

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
        {/* Jobs Card */}
        <section className="dashboard-card col-md-4 p-4 shadow rounded text-center">
          <h2>Jobs</h2>
          <div className="card-actions d-flex flex-column gap-3 mt-4">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/postjob")}
            >
              Post Job
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={() => navigate("/dltjob")}
            >
              Delete Listed Jobs
            </button>
          </div>
        </section>

        {/* Scholarships Card */}
        <section className="dashboard-card col-md-4 p-4 shadow rounded text-center">
          <h2>Scholarships</h2>
          <div className="card-actions d-flex flex-column gap-3 mt-4">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/postscholarship")}
            >
              Post Scholarship
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={() => navigate("/dltscholarship")}
            >
              Delete Listed Scholarships
            </button>
          </div>
        </section>

        {/* Internships Card */}
        <section className="dashboard-card col-md-4 p-4 shadow rounded text-center">
          <h2>Internships</h2>
          <div className="card-actions d-flex flex-column gap-3 mt-4">


<button
  className="btn btn-primary flex-grow-1"
  onClick={() => navigate("/postscholarship")}
>
  Post Internship
</button>
<button
  className="btn btn-outline-secondary flex-grow-1"
  onClick={() => navigate("/dlscholarship")}
>
  Delete Listed Internships
</button>

          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
