// src/components/LeftSidebar.js
import React from 'react';
import './style.css';
import LogoutButton from '../LogouButton/LogoutButton';

const LeftSidebar = () => (
  <nav className="left-sidebar">
    <ul>
      
      <div className="wrap">
        <div className="search">
            <input type="text" className="searchTerm" placeholder="Search Influencer" />
            <button type="submit" className="searchButton">
              <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
      
      <li><LogoutButton /></li>
    </ul>
  </nav>
);

export default LeftSidebar;
