import React, { useState } from 'react';
import { Link } from 'react-scroll'; // For smooth scrolling
import '../styles/Navbar.css';

const Navbar = ({ onSearch }) => {

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>Progressive Thought Forum</h1>
        <Link to="about-us" smooth={true} duration={500} className="navbar-link">About Us</Link>
        <Link to="articles" smooth={true} duration={500} className="navbar-link">Latest Articles</Link>
        <Link to="footer" smooth={true} duration={500} className="navbar-link">Contact Us</Link>
      </div>
      <div className="navbar-right">
        <div className="user-icon">
          <img src="assets/user-icon.png"/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
