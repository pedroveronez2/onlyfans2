import React from 'react';
import { Navigate } from 'react-router-dom';
import './style.css';
import Navigation from '../../components/Navigation/Navigation';
import VIPPosts from '../../components/VIPPosts/VIPPosts';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import AddComment from '../../components/AddComment/AddComment';
import { useAuth } from '../../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  // Verifique se o usuário está autenticado
  if (!user) {
    // Se não estiver autenticado, redirecione para a página de login
    return <Navigate to="/login" />;
  }

  return (
    <div className="grid-container">
      <nav className="right-navigation"><Navigation /></nav>
      <main className="main-content">
        <AddComment userData={user} />
        <VIPPosts userData={user} />
      </main>
      <aside className="left-sidebar">
        <LeftSidebar />
      </aside>
    </div>
  );
};

export default Home;
