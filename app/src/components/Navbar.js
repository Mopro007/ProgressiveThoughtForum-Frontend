import React, { useState } from 'react';
import { Link } from 'react-scroll';
import '../styles/Navbar.css';
import logo from '../assets/Logo.png'; // Import your logo image
import { FaBars, FaTimes } from 'react-icons/fa'; // For  menu icon

const Navbar = ({accountWindowHandle}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Progressive Thought Forum Logo" className="logo" />
      </div>

      {/*  Menu Button */}
      <div className="menu-icon" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/*  Navigation */}
        {isMenuOpen && (
      <div className={"links active"}>
        <Link
          to="about-us"
          smooth={true}
          duration={500}
          className="navbar-link"
          onClick={toggleMenu}
        >
          عن المنتدى
        </Link>
        <Link
          to="articles"
          smooth={true}
          duration={500}
          className="navbar-link"
          onClick={toggleMenu}
        >
          اخر المقالات
        </Link>
        <Link
          to="footer"
          smooth={true}
          duration={500}
          className="navbar-link"
          onClick={toggleMenu}
          key="footer-link"
        >
          تواصل معنا
        </Link>
        {/* The account info and controls (Login/Logout/Signup/Publish Article) */}
        <button className='navbar-link' onClick={() => {accountWindowHandle()}}>
           معلومات الحساب
        </button>
      </div>
    )}
    </nav>
  );
};

export default Navbar;