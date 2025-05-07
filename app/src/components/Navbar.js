import React, { useState } from 'react';
import { Link } from 'react-scroll'; // For smooth scrolling
import '../styles/Navbar.css';
import account from '../assets/account_icon.png';

const Navbar = ({ accountWindowHandle }) => {

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
            <img src={account} onClick={() => accountWindowHandle()} className="user-image" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
