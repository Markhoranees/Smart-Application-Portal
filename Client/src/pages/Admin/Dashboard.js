// AdminDashboard.js
import React from 'react';
import { withUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Dashboard = ({ user }) => {
  const isAdmin = user && user.roles.includes('admin');  // Check if user has admin role

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {isAdmin ? (
        <div>
          <nav>
            <ul>
              <li><Link to="/admin/jobs">Manage Jobs</Link></li>
              <li><Link to="/admin/internships">Manage Internships</Link></li>
              <li><Link to="/admin/scholarships">Manage Scholarships</Link></li>
            </ul>
          </nav>
        </div>
      ) : (
        <p>You do not have access to the Admin Dashboard.</p>
      )}
    </div>
  );
};

export default withUser(Dashboard);
