// LoginForm.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { Link } from "react-router-dom"; // ✅ import Link
import "../assets/styles/Auth.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.email.includes("@")) {
      tempErrors.email = "Invalid email format!";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await dispatch(
        login({
          email: formData.email,
          password: formData.password,
        })
      );

      if (res.meta.requestStatus === "fulfilled") {
        const role = user?.role;

        if (role === "admin") {
          navigate("/admindashboard");
        } else if (role === "user") {
          navigate("/");
        } else if (role === "expert") {
          navigate("/expertdashboard");
        } 
      }
    } catch (err) {
      console.error("Login failed", err);
    }
  };
  console.log("user", user);
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-gradient" style={{ background: 'linear-gradient(to right, #6a11cb, #2575fc)' }}>
  <div className="bg-white p-5 rounded-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
    <h2 className="text-center mb-4">Job Portal Login</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <div className="text-danger mt-1">{errors.email}</div>}
      </div>

      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {error && <div className="text-danger mt-1">{error}</div>}
      </div>

      <div className="d-flex justify-content-end mb-3">
        <Link to="/forgot-password" className="text-decoration-none">Forgot Password?</Link>
      </div>

      <button type="submit" className="btn btn-primary w-100" disabled={loading} style={{ backgroundColor: '#6a11cb', borderColor: '#6a11cb' }}>
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="text-center mt-3">
        Don't have an account? <Link to="/signup" className="text-decoration-none" style={{ color: '#6a11cb' }}>Sign Up</Link>
      </p>
    </form>
  </div>
</div>

  );
};

export default LoginForm;
