import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import { useAuth } from '@clerk/clerk-react';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import JobsDelete from "./components/jobs/JobsDelete.js";
import JobDetail from "./components/jobs/JobDetail";
import { UserProfile } from '@clerk/clerk-react';
import SignIn from './components/auth/SignInForm.js';
import { SignUp } from "@clerk/clerk-react";
import Dashboard from "./pages/Admin/Dashboard";
import PostJobForm from "./components/jobs/PostJobForm.js"
import PostScholarshipForm from "./components/scholarships/PostScholarshipForm.js"  
import DeleteScholarships from "./components/scholarships/DeleteScholarships.js"


// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated } = useAuth();
//   return isAuthenticated ? children : <Navigate to="/signin" />;
// };

function App() {
  return (
    <Router>
      <div className="main-content">
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/dltjob" element={<JobsDelete />} />
          <Route path="/postjob" element={<PostJobForm />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/postscholarship" element={<PostScholarshipForm />} />
          <Route path="/dltscholarship" element={<DeleteScholarships />} />
           
                    <Route path="/admin" element={  <Dashboard />  }/>

          {/* Protected Routes */}
          {/* <Route
            path="/post-job"
            element={
              <ProtectedRoute>
                <PostJobForm />
              </ProtectedRoute>
            }
          /> */}

      


          {/* Redirect Unknown Routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
</div>
    </Router>
  );
}

export default App;
