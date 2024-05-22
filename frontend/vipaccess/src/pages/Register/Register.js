import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Chame a função de registro do contexto passando os dados do formulário
    registerUser(formData);
    // Limpar o formulário após o envio
    setFormData({ username: '', password: '', email: '' });
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='username'
          placeholder='Enter Username'
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type='password'
          name='password'
          placeholder='Enter password'
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type='email'
          name='email'
          placeholder='Enter email'
          value={formData.email}
          onChange={handleChange}
        />
        <input type='submit' value='Register' />
      </form>
    </div>
  );
};

export default Register;
