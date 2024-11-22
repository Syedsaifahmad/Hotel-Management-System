import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./register.css";
import { registerUser } from "../../services/user-service";

const Register = () => {
  const [registrationDetails, setRegistrationDetails] = useState({
    email: "",
    mobile: "",
    username: "",
    password: "",
    type: "user" // Default user type
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event, field) => {
    const actualValue = event.target.value;
    setRegistrationDetails({
      ...registrationDetails,
      [field]: actualValue
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[6-9][0-9]{9}/;

    if (
      !registrationDetails.email.trim() ||
      !registrationDetails.mobile.trim() ||
      !registrationDetails.username.trim() ||
      !registrationDetails.password.trim()
    ) {
      toast.error("All fields are required!");
      return;
    }

    if (!emailRegex.test(registrationDetails.email.trim())) {
      toast.error("Please enter a valid email address!");
      return;
    }

    if (!mobileRegex.test(registrationDetails.mobile.trim())) {
      toast.error("Please enter a valid 10-digit mobile number!");
      return;
    }

    if (registrationDetails.password.trim().length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    // API Call
    setLoading(true);
    registerUser(registrationDetails)
      .then((response) => {
        setLoading(false);
        toast.success("Registration successful!");
        // Redirect to login page
        window.location.href = "/login";
      })
      .catch((error) => {
        setLoading(false);
        if (error.response && error.response.data) {
          toast.error(error.response.data.message || "Registration failed!");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      });
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={registrationDetails.email}
            onChange={(e) => handleChange(e, "email")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            id="mobile"
            placeholder="Enter your mobile number"
            value={registrationDetails.mobile}
            onChange={(e) => handleChange(e, "mobile")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={registrationDetails.username}
            onChange={(e) => handleChange(e, "username")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={registrationDetails.password}
            onChange={(e) => handleChange(e, "password")}
          />
        </div>
        <button type="submit" className="register-button" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        <p className="login-link">
          Already have an account? <a href="/login">Log In</a>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
