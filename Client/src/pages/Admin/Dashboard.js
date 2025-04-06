import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Scholarships from './Scholarships';
import Jobs from './Jobs';
import Internships from './Internships';
import { useDispatch, useSelector } from 'react-redux';
import { scrapeScholarships } from '../../features/auth/scholarshipsSlice';


const Dashboard = () => {
  const [activePage, setActivePage] = useState('dashboard'); 
  const dispatch = useDispatch();

  // Get scholarships state from Redux store
  const { scholarships, status, error } = useSelector((state) => state.scholarships);

  // Fetch scholarships when component mounts or scraping is triggered
  useEffect(() => {
    if (status === 'idle') {
      dispatch(scrapeScholarships());
    }
  }, [status, dispatch]);

  // Loading state
  if (status === 'loading') {
    return <div>Loading...</div>;
  }




  const handlePageChange = (page) => {
    setActivePage(page); // Update the active page based on button click
  };
  

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="sidebar bg-dark text-white p-4" style={{ width: '250px', height: '100vh' }}>
        <div className="text-center mb-4">
          {/* Admin Picture */}
          <img style={{width:"100px", height:"100px", borderRadius:"50%"}}
            src="https://cdn.pixabay.com/photo/2017/03/05/08/38/character-2117975_1280.png"
            alt="Admin"
            className="rounded-circle mb-3"
          />
          <h4>Admin Name</h4>
        </div>
        <div className="d-flex flex-column">
          {/* Sidebar Buttons */}
          <button className="btn btn-primary mb-3" onClick={() => handlePageChange('dashboard')}>
            Dashboard
          </button>
          <button className="btn btn-primary mb-3" onClick={() => handlePageChange('scholarships')}>
            Scholarships
          </button>
          <button className="btn btn-primary mb-3" onClick={() => handlePageChange('jobs')}>
            Jobs
          </button>
          <button className="btn btn-primary mb-3" onClick={() => handlePageChange('internships')}>
            Internships
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        {activePage === 'dashboard' && (
          <div>
            <button
        className="btn btn-primary mb-4"
        onClick={() => dispatch(scrapeScholarships())}
      >
        Scrape New Scholarships
      </button>
          </div>
        )}
        {activePage === 'scholarships' && <Scholarships />}
        {activePage === 'jobs' && <Jobs />}
        {activePage === 'internships' && <Internships />}
      </div>
    </div>
  );
};

export default Dashboard;
