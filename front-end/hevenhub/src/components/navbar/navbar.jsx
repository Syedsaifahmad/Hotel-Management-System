import React from "react";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">HeavenHub</div>
      <div className="navbar-links">
        <button className="login-btn">Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
