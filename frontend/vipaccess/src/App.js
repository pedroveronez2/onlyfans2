import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home'
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import Header from './components/Header/Header';
import PrivateRoute from './utils/PrivateRoute'
import {AuthProvider} from './context/AuthContext'


function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />

        <Routes >
          <Route path="/" element={<PrivateRoute ><Home /></PrivateRoute>} exact />
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AuthProvider>


    </Router>
  );
}

export default App;
