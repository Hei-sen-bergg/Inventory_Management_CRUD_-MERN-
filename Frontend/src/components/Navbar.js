import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({admin}) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h3 className='title'>Upstocks</h3>
      </div>
      <div className="navbar-links">
        <ul>
          <li><Link to="/home" className="navbar-link">Categories</Link></li>
          <li><Link to="/admin/profile" className="navbar-link">My profile</Link></li>
          <li><Link to="/" className="navbar-link">Logout</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
