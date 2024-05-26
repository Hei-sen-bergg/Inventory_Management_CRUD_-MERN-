import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h3>Stock Checker</h3>
      </div>
      <div className="navbar-links">
        <ul>
          <li><Link to="/categories" className="navbar-link">Categories</Link></li>
          <li><Link to="/admin/profile" className="navbar-link">Admin Profile</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
