// src/components/Navigation.js
import React from 'react';
import './style.css'
import Logo from '../Logo/Logo';

const Navigation = () => (
  <nav className="right-navigation">
    <ul>
      <Logo />
      <li><a href="#home">Home</a></li>
      <li><a href="#explore">Explore</a></li>
      <li><a href="#notifications">Notifications</a></li>
      <li><a href="#messages">Messages</a></li>
      <li><a href="#profile">Profile</a></li>
      <li><a href="#settings">Settings</a></li>
      <li><a href="#help">Help</a></li>
    </ul>
  </nav>
);

export default Navigation;

