// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import './style.css';
import axios from 'axios';

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        username_or_email: usernameOrEmail,
        password: password,
      });
  
      console.log(response.data);
  
      if (response.data.token) {
        const userData = response.data.user_data;
        setUser(userData);
        navigate('/home', { replace: true }); // Aqui está a alteração
      }
  
      setUsernameOrEmail('');
      setPassword('');
      setError('');
    } catch (error) {
      setError(error.response?.data.error || 'Erro desconhecido.');
    }
  };

  return (
    <div className="login-container"> 
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="form-label">
          Nome de Usuário ou Email:
          <input
            type="text"
            className="form-input"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
          />
        </label>
        <label className="form-label">
          Senha:
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" className="submit-button">Entrar</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
