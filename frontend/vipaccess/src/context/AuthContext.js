import { useEffect, createContext, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext()


export const AuthProvider = ({children}) => {


  let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)
  let [authTokens , setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
  let [loading, setLoading] = useState(true)

  let navigate = useNavigate()
  let loginUser = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', {
        username: e.target.username.value,
        password: e.target.password.value
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      let data = await response.data
  
      if (response.status === 200) {
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem('authTokens', JSON.stringify(data))
        navigate("/")
      } else {
        alert('Something went wrong!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong!');
    }
  };

  let logoutUser = () => {
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
    navigate('/login')
  }

  let updateToken = async () => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
            refresh: authTokens?.refresh
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = response.data;
        console.log('update token!')

        switch (response.status) {
            case 200:
                setAuthTokens(data);
                setUser(jwtDecode(data.access));
                localStorage.setItem('authTokens', JSON.stringify(data));
                break;
            case 400:
                console.error('Erro 400: O servidor não pôde processar a requisição.');
                logoutUser()                
                break;
            case 401:
                console.error('Erro 401: Não autorizado.');
                // Adicione aqui a lógica específica para tratamento do erro 401
                logoutUser(); // Por exemplo, redirecionar o usuário para a página de login
                break;
            default:
                console.error('Erro ao atualizar token: Código de status não tratado:', response.status);
                logoutUser(); // Por exemplo, logout do usuário em caso de erro
                break;
        }

        if (loading) {
            setLoading(false);
        }
    } catch (error) {
        console.error('Erro ao atualizar token:', error);
        logoutUser(); // Por exemplo, logout do usuário em caso de erro
    }
};
  

  let contextdata = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
  }

  useEffect(() => {

    if(loading) {
      updateToken()
    }

    let fourMinutes = 1000 * 60 * 4
    let interval = setInterval(() => {
      if(authTokens) {
        updateToken()
      }
    }, fourMinutes)
    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authTokens, loading])

  return(
    <AuthContext.Provider value={contextdata}>
      {loading ? null: children}
    </AuthContext.Provider>
  )
}

export default AuthContext;
