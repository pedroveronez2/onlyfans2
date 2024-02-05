import React, { createContext, useContext, useState } from 'react';
import axios from "axios"
// Criando o contexto
const AuthContext = createContext();

// Um componente de provedor que envolve sua aplicação para fornecer o contexto
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = () => {
    axios.post('http://127.0.0.1:8000/api/login/', {name: "carlos", password: 'carlos12'})
    // Lógica de autenticação, por exemplo, fazer uma chamada API para verificar as credenciais
    // Aqui, estamos apenas definindo o usuário como autenticado
  };

  const logout = () => {
    // Lógica de logout, por exemplo, limpar o token de autenticação
    // Aqui, estamos apenas definindo o usuário como nulo
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Um gancho (hook) personalizado para facilitar o uso do contexto
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
