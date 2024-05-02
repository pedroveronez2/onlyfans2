import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children, ...rest}) => {
    const auth = true; 

    return auth ? children : <Navigate to="/login" />;
}


export default PrivateRoute