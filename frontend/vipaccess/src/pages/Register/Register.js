import React, { useState } from 'react';
import axios from 'axios';
import './style.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = 'http://127.0.0.1:8000/api/register/';

    try {
      // Verifica se as senhas coincidem
      if (formData.password !== formData.confirmPassword) {
        console.error('As senhas não coincidem.');
        return;
      }

      // Faz a chamada à API usando Axios
      const response = await axios.post(apiUrl, {
        username: formData.name,
        email: formData.email,
        password: formData.password,
      });

      console.log('Usuário registrado com sucesso:', response.data);

      // Limpa o formulário após o registro
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Erro ao registrar o usuário:', error.message);
    }
  };

  return (
    <div className="registration-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <label>
          Nome:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Senha:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Confirmar Senha:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <button type="submit" className="submit-button">
          Registrar
        </button>
      </form>
      <a href='/login'>Login</a>
    </div>
  );
};

export default Register;
