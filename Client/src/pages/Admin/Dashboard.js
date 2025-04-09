import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Scholarships from './Scholarships';
import Jobs from './Jobs';
import Internships from './Internships';
import { useDispatch, useSelector } from 'react-redux';
import { scrapeScholarships } from '../../features/auth/scholarshipsSlice';
import { fetchRozeeJobs } from '../../features/auth/jobsSlice';
import profileImage from "../../assets/image/myprofile.jpg";


// Header Component
const Header = () => {
  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark text-white">
      <div className="container-fluid">
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                <i className="bi bi-bell"></i>
                <span className="badge bg-danger">3</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><a className="dropdown-item" href="#">Notification 1</a></li>
                <li><a className="dropdown-item" href="#">Notification 2</a></li>
                <li><a className="dropdown-item" href="#">Notification 3</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                <img 
                src={profileImage}  
                alt="Profile" 
                  className="rounded-circle" 
                  width="30" 
                  height="30"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

// StatsCard Component
const StatsCard = ({ icon, title, value, description }) => {
  return (
    <div className="card h-100">
      <div className="card-body text-center">
        <div className="mb-3">
          <i className={`bi bi-${icon} fs-1 text-white`}></i>
        </div>
        <h3 className="card-title text-white">{value}</h3>
        <p className="card-text fw-bold text-white">{title}</p>
        <p className="text-muted text-white">{description}</p>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="footer py-3 bg-dark text-white">
      <div className="container">
        <div className="text-center">
          <span>© {new Date().getFullYear()} Admin Dashboard. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const { scholarships, status: scholarshipStatus } = useSelector((state) => state.scholarships);
  const { jobs, newJobs } = useSelector((state) => state.jobs);
  const { internships } = useSelector((state) => state.internships);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('scholarships');

  useEffect(() => {
    if (scholarshipStatus === 'idle') {
      dispatch(scrapeScholarships());
    }
  }, [scholarshipStatus, dispatch]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleFetchJobs = () => {
    dispatch(fetchRozeeJobs());
  };

  console.log("newJobs", newJobs)

  // Sidebar Component
  const Sidebar = ({ onLogout }) => {
    return (
      <div className="sidebar bg-dark text-white d-flex flex-column flex-shrink-0 p-3" style={{width: '280px', minHeight: '100vh'}}>
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <span className="fs-4">Admin Panel</span>
        </a>
        <hr className="text-white" />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <a href="#" className="nav-link text-white" aria-current="page">
              <i className="bi bi-speedometer2 me-2"></i>
              Dashboard
            </a>
          </li>
          {['scholarships', 'jobs', 'internships'].map(section => (
            <li key={section}>
              <a
                href="#"
                className={`nav-link ${activeSection === section ? 'bg-primary text-white' : 'text-white'}`}
                onClick={() => setActiveSection(section)}
                onMouseEnter={(e) => e.target.classList.add('bg-secondary')}
                onMouseLeave={(e) => {
                  if (activeSection !== section) e.target.classList.remove('bg-secondary');
                }}
              >
                <i className={`bi bi-${section === 'scholarships' ? 'award' : section === 'jobs' ? 'briefcase' : 'people'} me-2`}></i>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            </li>
          ))}
        </ul>
        <hr className="text-white" />
        <div className="dropdown">
          <a 
            href="#" 
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" 
            id="dropdownUser1" 
            data-bs-toggle="dropdown"
          >
            <img 
              src="https://via.placeholder.com/32" 
              alt="Profile" 
              width="32" 
              height="32" 
              className="rounded-circle me-2" 
            />
            <strong>Admin</strong>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            <li><a className="dropdown-item" href="#">Settings</a></li>
            <li><a className="dropdown-item" href="#">Profile</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#" onClick={onLogout}>Sign out</a></li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="d-flex flex-column flex-lg-row">
      {/* Sidebar - hidden on mobile by default */}
      <div className={`d-none d-lg-flex ${sidebarCollapsed ? 'd-flex' : ''}`}>
        <Sidebar onLogout={handleLogout} />
      </div>
      
      <div className="flex-grow-1 d-flex flex-column min-vh-100">
        <Header />
        
        {/* Mobile sidebar toggle button */}
        <button 
          className="btn btn-dark d-lg-none m-2 align-self-start" 
          onClick={toggleSidebar}
          style={{width: '40px'}}
        >
          <i className="bi bi-list"></i>
        </button>
        
        {/* Mobile sidebar overlay */}
        {sidebarCollapsed && (
          <div 
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 z-index-1"
            onClick={toggleSidebar}
            style={{zIndex: 1040}}
          ></div>
        )}
        
        {/* Mobile sidebar */}
        {sidebarCollapsed && (
          <div 
            className="position-fixed top-0 start-0 h-100 bg-dark text-white z-index-2 p-3"
            style={{width: '280px', zIndex: 1050}}
          >
            <Sidebar onLogout={handleLogout} />
          </div>
        )}

        <main className="main p-3 p-lg-4 flex-grow-1">
          <div className="container-fluid">
            <h2 className="mb-4 text-dark">Admin Dashboard</h2>
            
            {/* Stats Cards - responsive grid */}
            <div className="row g-3 mb-4">
              <div className="col-12 col-sm-6 col-lg-3">
                <StatsCard 
                  icon="award" 
                  title="Scholarships" 
                  value={scholarships.length} 
                  description="Available scholarships" 
                />
              </div>
              <div className="col-12 col-sm-6 col-lg-3">
                <StatsCard 
                  icon="briefcase" 
                  title="Jobs" 
                  value={jobs.length} 
                  description="Available positions" 
                />
              </div>
              <div className="col-12 col-sm-6 col-lg-3">
                <StatsCard 
                  icon="person-workspace" 
                  title="Internships" 
                  value={internships.length} 
                  description="Current opportunities" 
                />
              </div>
              <div className="col-12 col-sm-6 col-lg-3">
                <StatsCard 
                  icon="arrow-repeat" 
                  title="Last Scraped" 
                  value="Now" 
                  description="Data freshness" 
                />
              </div>
            </div>
            
            {/* Scrape Button */}
            <div className="row mb-4">
              <div className="col-12">
                <button 
                  className="btn btn-primary me-2"
                  onClick={() => dispatch(scrapeScholarships())}
                  disabled={scholarshipStatus === 'loading'}
                >
                  {scholarshipStatus === 'loading' ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Scraping...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-arrow-repeat me-2"></i>
                      Scrape New Data
                    </>
                  )}
                </button>
                <button className="btn btn-success me-2" onClick={handleFetchJobs}
                >
                  <i className="bi bi-code-slash me-2"></i>
                  Scripting
                </button>
                <button className="btn btn-info">
                  <i className="bi bi-person-lines-fill me-2"></i>
                  Add My Detail
                </button>
              </div>
            </div>

            <p className="mt-3 fw-bold text-dark">
              I am a student of Computer Science at the University of Engineering and Technology, Mardan. I am a Full Stack Developer.
            </p>
            
            {/* Content Sections - now conditionally rendered */}
            <div className="row">
              <div className="col-12">
                {activeSection === 'scholarships' && (
                  <div className="card mb-4">
                    <div className="card-body">
                      <Scholarships />
                    </div>
                  </div>
                )}
                {activeSection === 'jobs' && (
                  <div className="card mb-4">
                    <div className="card-body">
                      <Jobs />
                    </div>
                  </div>
                )}
                {activeSection === 'internships' && (
                  <div className="card mb-4">
                    <div className="card-body">
                      <Internships />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
