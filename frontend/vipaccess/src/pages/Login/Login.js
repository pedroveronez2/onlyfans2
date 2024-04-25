import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();


  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      login(usernameOrEmail, password)
      console.log(usernameOrEmail,password)
      // alert('Sucesso!')
    } catch (err) {
      setError('Erro ao fazer login. Verifique seu nome de usuário ou e-mail e senha.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Nome de usuário ou E-mail:
          <input
            type="text"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red ' }}>{error}</p>}
    </div>
  );
};

export default Login;
