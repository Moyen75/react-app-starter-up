import React from 'react'
import { useLocation } from 'react-router'
import { Navigate } from 'react-router-dom'
import useAuth from '../context/useAuth'

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()
    let location = useLocation();
    const isAuth = localStorage.getItem('isLoggedIn')
    if (isAuth === 'loggedIn') {
        if (user.email) {
            return children;
        } else if (loading) {
            return;
        }
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
}

export default PrivateRoute;
