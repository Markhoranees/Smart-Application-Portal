import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import profileImage from "../assets/image/myprofile.jpg";


// Header Component (Reusable)
const Header = () => {
  return (
    
    <header className="navbar navbar-expand-lg navbar-dark bg-primary text-white">
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

// StatsCard Component (Modified for User Dashboard)
const StatsCard = ({ icon, title, value, description, color = 'bg-primary' }) => {
  return (
    <div className={`card h-100 ${color}`}>
      <div className="card-body text-center">
        <div className="mb-3">
          <i className={`bi bi-${icon} fs-1 text-white`}></i>
        </div>
        <h3 className="card-title text-white">{value}</h3>
        <p className="card-text fw-bold text-white">{title}</p>
        <p className="text-white">{description}</p>
      </div>
    </div>
  );
};

// Footer Component (Reusable)
const Footer = () => {
  return (
    <footer className="footer py-3 bg-dark text-white">
      <div className="container">
        <div className="text-center">
          <span>© {new Date().getFullYear()} User Dashboard. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

// Application Card Component
const ApplicationCard = ({ type, title, status, date, organization }) => {
  const getStatusColor = () => {
    switch(status.toLowerCase()) {
      case 'pending': return 'warning';
      case 'approved': return 'success';
      case 'rejected': return 'danger';
      default: return 'info';
    }
  };

  const getTypeIcon = () => {
    switch(type.toLowerCase()) {
      case 'job': return 'briefcase';
      case 'internship': return 'person-workspace';
      case 'scholarship': return 'award';
      default: return 'file-earmark';
    }
  };

  return (
  
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div>
            <h5 className="card-title">
              <i className={`bi bi-${getTypeIcon()} me-2 text-${getStatusColor()}`}></i>
              {title}
            </h5>
            <p className="card-text text-muted">{organization}</p>
          </div>
          <div className="text-end">
            <span className={`badge bg-${getStatusColor()}`}>{status}</span>
            <p className="text-muted small mt-1">{new Date(date).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  const [applications, setApplications] = useState([]);

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    const mockApplications = [
      {
        id: 1,
        type: 'job',
        title: 'Frontend Developer',
        status: 'Pending',
        date: '2023-05-15',
        organization: 'Tech Solutions Inc.'
      },
      {
        id: 2,
        type: 'internship',
        title: 'Summer Internship Program',
        status: 'Approved',
        date: '2023-04-20',
        organization: 'Innovate Labs'
      },
      {
        id: 3,
        type: 'scholarship',
        title: 'Merit Scholarship',
        status: 'Rejected',
        date: '2023-03-10',
        organization: 'Education Foundation'
      },
      {
        id: 4,
        type: 'job',
        title: 'Backend Engineer',
        status: 'Pending',
        date: '2023-05-01',
        organization: 'Data Systems Co.'
      }
    ];
    setApplications(mockApplications);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const pendingApplications = applications.filter(app => app.status === 'Pending').length;
  const approvedApplications = applications.filter(app => app.status === 'Approved').length;
  const rejectedApplications = applications.filter(app => app.status === 'Rejected').length;

  // Sidebar Component (Modified for User Dashboard)
  const Sidebar = ({ onLogout }) => {
    return (
      <div className="sidebar bg-dark text-white d-flex flex-column flex-shrink-0 p-3" style={{width: '280px', minHeight: '100vh'}}>
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <span className="fs-4">User Dashboard</span>
        </a>
        <hr className="text-white" />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <a
              href="#"
              className={`nav-link ${activeSection === 'profile' ? 'bg-primary text-white' : 'text-white'}`}
              onClick={() => setActiveSection('profile')}
            >
              <i className="bi bi-person me-2"></i>
              My Profile
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`nav-link ${activeSection === 'applications' ? 'bg-primary text-white' : 'text-white'}`}
              onClick={() => setActiveSection('applications')}
            >
              <i className="bi bi-file-earmark-text me-2"></i>
              My Applications
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`nav-link ${activeSection === 'opportunities' ? 'bg-primary text-white' : 'text-white'}`}
              onClick={() => setActiveSection('opportunities')}
            >
              <i className="bi bi-search me-2"></i>
              Browse Opportunities
            </a>
          </li>
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
            <strong>{user?.name || 'User'}</strong>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            <li><a className="dropdown-item" href="#" onClick={() => setActiveSection('profile')}>Profile</a></li>
            <li><a className="dropdown-item" href="#">Settings</a></li>
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
            <h2 className="mb-4 text-dark">Welcome, {user?.name || 'User'}!</h2>
            
            {/* Stats Cards - responsive grid */}
            <div className="row g-3 mb-4">
              <div className="col-12 col-sm-6 col-lg-3">
                <StatsCard 
                  icon="file-earmark-text" 
                  title="Total Applications" 
                  value={applications.length} 
                  description="All your submissions"
                  color="bg-primary"
                />
              </div>
              <div className="col-12 col-sm-6 col-lg-3">
                <StatsCard 
                  icon="hourglass" 
                  title="Pending" 
                  value={pendingApplications} 
                  description="Applications in review"
                  color="bg-warning"
                />
              </div>
              <div className="col-12 col-sm-6 col-lg-3">
                <StatsCard 
                  icon="check-circle" 
                  title="Approved" 
                  value={approvedApplications} 
                  description="Successful applications"
                  color="bg-success"
                />
              </div>
              <div className="col-12 col-sm-6 col-lg-3">
                <StatsCard 
                  icon="x-circle" 
                  title="Rejected" 
                  value={rejectedApplications} 
                  description="Unsuccessful applications"
                  color="bg-danger"
                />
              </div>
            </div>
            
            {/* Content Sections */}
            <div className="row">
              <div className="col-12">
                {activeSection === 'profile' && (
                  <div className="card mb-4">
                    <div className="card-body">
                      <h4 className="card-title mb-4 text-white">My Profile</h4>
                      <div className="row">
                        <div className="col-md-4 text-center mb-4">
                          <img 
                            src={profileImage}
                            alt="Profile" 
                            className="rounded-circle mb-3" 
                            width="150" 
                            height="150"
                          />
                          <h5>{user?.name || 'John Doe'}</h5>
                          <p className="text-white">{user?.email || 'akbaraliuetm136@gmail.com'}</p>
                          <button className="btn btn-outline-primary btn-sm">
                            <i className="bi bi-pencil me-1 text-white"></i> Edit Profile
                          </button>
                        </div>
                        <div className="col-md-8 text-white">
                          <div className="row mb-3">
                            <div className="col-md-6 text-white">
                              <h6 className='text-white'> Full Name</h6>
                              <p>{user?.name || 'Akbar Ali'}</p>
                            </div>
                            <div className="col-md-6 text-white">
                              <h6>Email</h6>
                              <p>{user?.email || 'akbaraliuetm136@gmail.com'}</p>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-md-6">
                              <h6>Phone</h6>
                              <p>{user?.phone || '+1234567890'}</p>
                            </div>
                            <div className="col-md-6">
                              <h6>Education</h6>
                              <p>Bachelor's in Computer Science</p>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-12">
                              <h6>About Me</h6>
                              <p>
                                I am a passionate developer with experience in React, Node.js, and MongoDB. 
                                Currently looking for new opportunities to grow my skills and contribute to meaningful projects.
                              </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12">
                              <h6>Skills</h6>
                              <div className="d-flex flex-wrap gap-2">
                                {['JavaScript', 'React', 'Node.js', 'MongoDB', 'HTML', 'CSS', 'Git'].map(skill => (
                                  <span key={skill} className="badge bg-primary">{skill}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeSection === 'applications' && (
                  <div className="card mb-4">
                    <div className="card-body">
                      <h4 className="card-title mb-4">My Applications</h4>
                      {applications.length === 0 ? (
                        <div className="text-center py-4">
                          <i className="bi bi-file-earmark-text fs-1 text-muted mb-3"></i>
                          <h5>No applications yet</h5>
                          <p className="text-muted">You haven't applied to any opportunities yet.</p>
                          <button 
                            className="btn btn-primary"
                            onClick={() => setActiveSection('opportunities')}
                          >
                            Browse Opportunities
                          </button>
                        </div>
                      ) : (
                        <div className="table-responsive">
                          <table className="table table-hover">
                            <thead>
                              <tr>
                                <th>Type</th>
                                <th>Title</th>
                                <th>Organization</th>
                                <th>Date Applied</th>
                                <th>Status</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {applications.map(app => (
                                <tr key={app.id}>
                                  <td>
                                    <span className={`badge bg-${app.type === 'job' ? 'info' : app.type === 'internship' ? 'warning' : 'success'}`}>
                                      {app.type}
                                    </span>
                                  </td>
                                  <td>{app.title}</td>
                                  <td>{app.organization}</td>
                                  <td>{new Date(app.date).toLocaleDateString()}</td>
                                  <td>
                                    <span className={`badge bg-${app.status === 'Pending' ? 'warning' : app.status === 'Approved' ? 'success' : 'danger'}`}>
                                      {app.status}
                                    </span>
                                  </td>
                                  <td>
                                    <button className="btn btn-sm btn-outline-primary me-2">
                                      <i className="bi bi-eye"></i> View
                                    </button>
                                    <button className="btn btn-sm btn-outline-danger">
                                      <i className="bi bi-trash"></i> Withdraw
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {activeSection === 'opportunities' && (
                  <div className="card mb-4">
                    <div className="card-body">
                      <h4 className="card-title mb-4">Browse Opportunities</h4>
                      <div className="row">
                        <div className="col-md-4 mb-4 text-white">
                          <div className="card h-100 border border-white">
                            <div className="card-body text-center">
                              <i className="bi bi-briefcase fs-1 text-primary mb-3"></i>
                              <h5 className='text-white'>Jobs</h5>
                              <p className="text-white">Find your dream job</p>
                              <button className="btn btn-outline-primary">
                                Browse Jobs
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 mb-4 ">
                          <div className="card h-100 text-white border border-white">
                            <div className="card-body text-center">
                              <i className="bi bi-person-workspace fs-1 text-warning mb-3"></i>
                              <h5 className='text-white'>Internships</h5>
                              <p className="">Gain valuable experience</p>
                              <button className="btn btn-outline-warning">
                                Browse Internships
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 mb-4">
                          <div className="card h-100 text-white border border-white">
                            <div className="card-body text-center">
                              <i className="bi bi-award fs-1 text-success mb-3"></i>
                              <h5>Scholarships</h5>
                              <p className="">Fund your education</p>
                              <button className="btn btn-outline-success">
                                Browse Scholarships
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
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

export default UserDashboard;   