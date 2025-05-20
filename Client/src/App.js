import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import { useAuth } from '@clerk/clerk-react';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import JobsDelete from "./components/jobs/JobsDelete.js";
// import JobDetail from "./components/jobs/JobDetail";
import { UserProfile } from '@clerk/clerk-react';
import SignIn from './components/auth/SignInForm.js';
import { SignUp } from "@clerk/clerk-react";
import Dashboard from "./pages/Admin/Dashboard";
import PostJobForm from "./components/jobs/PostJobForm.js";
import PostScholarshipForm from "./components/scholarships/PostScholarshipForm.js";  
import DeleteScholarships from "./components/scholarships/DeleteScholarships.js";
import PostInternshipForm from "./components/internship/PostInsternshipForm.js";
import DeleteInternships from "./components/internship/DeleteInternships.js";
import AdminRoute from "./components/AdminRoute.js";
import JobsPage from "./pages/JobsPage.js";
import ScholarshipsPage from './pages/ScholarshipsPage';
import InternshipsPage from './pages/InternshipsPage';


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
          {/* <Route path="/jobs/:id" element={<JobDetail />} /> */}
          <Route path='/jobs' element={<JobsPage />} />
 <Route path="/scholarships" element={<ScholarshipsPage />} />
  <Route path="/internships" element={<InternshipsPage />} />



            <Route path="/dltjob" element={<AdminRoute><JobsDelete /></AdminRoute>} />
          <Route path="/postjob" element={<AdminRoute><PostJobForm /></AdminRoute>} />
          <Route path="/postscholarship" element={<AdminRoute><PostScholarshipForm /></AdminRoute>} />
          <Route path="/dltscholarship" element={<AdminRoute><DeleteScholarships /></AdminRoute>} />
          <Route path="/postinternship" element={<AdminRoute><PostInternshipForm /> </AdminRoute>} />
          <Route path="/dltinternship" element={<AdminRoute><DeleteInternships /></AdminRoute>} />
           
                 <Route path="/admin"element={ <AdminRoute><Dashboard /></AdminRoute>}/>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
</div>
    </Router>
  );
}

export default App;
