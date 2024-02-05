import React from 'react';
import { useAuth } from '../../context/AuthContext';

const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();

  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
