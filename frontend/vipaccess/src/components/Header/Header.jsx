import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../../context/AuthContext'

const Header = () => {
  let {user, logoutUser} = useContext(AuthContext)
  return (
  <>
    <ul>
        <li>
            <Link to={'/'}>Home</Link>
        </li>

        {
          user ? (
            <li>
              <button onClick={logoutUser}>Logout</button>
            </li>
          ) : (
            <li>
              <Link to={'/login'}>Login</Link>
            </li>
          )
        }
        
    </ul>
    {user && <h1>Hello {user.username}</h1>}
  </>

    
  )
}

export default Header