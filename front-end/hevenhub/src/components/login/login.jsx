import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import { loginUser } from "../../services/user-service"; // Import the login function
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event, field) => {
    const actualValue = event.target.value;
    setLoginDetails({
      ...loginDetails,
      [field]: actualValue,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!loginDetails.email.trim() || !loginDetails.password.trim()) {
      toast.error("Both email and password are required!");
      return;
    }
    if (!emailRegex.test(loginDetails.email.trim())) {
      toast.error("Please enter a valid email address!");
      return;
    }

    // API Call for login
    setLoading(true);
    loginUser(loginDetails)
      .then((jwtTokenData) => {
        setLoading(false);
        localStorage.setItem("authToken", jwtTokenData.token); // Store the token
        toast.success("Login successful!");

        // Redirect to home page after successful login
        navigate("/home"); // Redirect without fetching hotels here
      })
      .catch((error) => {
        setLoading(false);
        toast.error(
          error.response?.data?.message || "Something went wrong. Please try again."
        );
      });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={loginDetails.email}
            onChange={(e) => handleChange(e, "email")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              value={loginDetails.password}
              onChange={(e) => handleChange(e, "password")}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>
        <p className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
