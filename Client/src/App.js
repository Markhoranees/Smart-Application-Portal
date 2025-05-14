import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import {  useAuth } from '@clerk/clerk-react';
import "bootstrap/dist/css/bootstrap.min.css";

// ✅ Components
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import JobList from "../src/components/jobs/Joblist.js";         // ✅ Corrected case
import JobDetail from "./components/jobs/JobDetail";
import PostJobForm from "./components/jobs/PostJobForm";
import DocumentUpload from "./components/documents/DocumentUpload";
import DocumentList from "./components/documents/DocumentList";
import { UserProfile } from '@clerk/clerk-react';
import SignIn from './components/auth/SignInForm.js';  // Correct case
import SignUp from './components/auth/SignUpForm.js';  // Correct case


// ✅ Protected Route Wrapper using Clerk's `useAuth` hook
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/signIn" />;
};

function App() {
  return (
    // Wrap your entire app with ClerkProvider for authentication context

      <Router>
        <>
          <Header />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/jobs" element={<JobList />} />
            <Route path="/jobs/:id" element={<JobDetail />} />

            {/* Protected Routes */}
            <Route
              path="/post-job"
              element={
                <ProtectedRoute>
                  <PostJobForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/documents"
              element={
                <ProtectedRoute>
                  <DocumentList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload-document"
              element={
                <ProtectedRoute>
                  <DocumentUpload />
                </ProtectedRoute>
              }
            />

            {/* Redirect Unknown Routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </>
      </Router>

  );
}

export default App;
