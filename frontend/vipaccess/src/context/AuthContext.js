import { useEffect, createContext, useState } from "react";
import jwt_decode from 'jwt-decode'; 
import { useHistory } from 'react-router-dom'


const AuthContext = createContext()


export const AuthPrivader = ({children}) => {

  let [user, setUser] = useState(null)
  let [authTokens , setAuthTokens] = useState(null)

  const history = useHistory()

  let loginUser = async (e )=> {
      e.preventDefault()
      let response = await fetch('http://127.0.0.1:8000/api/token/', {
          method:'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
      })
      let data = await response.json()

      if(response.status === 200){
          setAuthTokens(data)
          setUser(jwt_decode(data.access))
          localStorage.setItem('authTokens', JSON.stringify(data))
          history.push('/')
      }else{
          alert('Something went wrong!')
      }
  }

  let contextdata = {}
  return(
    <AuthContext.Provider value={contextdata}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;
