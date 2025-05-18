import React, { useState } from 'react';
import { Link } from 'react-scroll'; // For smooth scrolling
import '../styles/Navbar.css';
import account from '../assets/account_icon.png';

const Navbar = ({ accountWindowHandle }) => {

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>Progressive Thought Forum</h1>
        <Link to="about-us" smooth={true} duration={500} className="navbar-link">عن المنتدى</Link>
        <Link to="articles" smooth={true} duration={500} className="navbar-link">اخر المقالات</Link>
        <Link to="footer" smooth={true} duration={500} className="navbar-link">تواصل معنا</Link>
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
