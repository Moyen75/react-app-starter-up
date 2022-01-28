import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import useAuth from '../context/useAuth';

const Login = () => {
    const [data, setData] = useState('')
    const { googleSignIn, facebookSignIn, user, emailSignIn } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const token = localStorage.getItem('userToken')

    useEffect(() => {
        fetch('http://localhost:3001/api/v1/person', {
            headers: {
                'authorization': `Bearer ${token}`
            }
        })
    }, []);


    // handle email sign in
    const handleSignInData = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newData = { ...data }
        newData[field] = value;
        setData(newData)
    }
    const handleSingIn = e => {
        e.preventDefault()
        console.log(data)
        emailSignIn(data.email, data.password, navigate)
    }


    console.log('This is user', user)
    // handle google sign in
    const handleGoogleSignIn = () => {
        googleSignIn(navigate, location)
    }

    // handle facebookSignIn
    const handleFacebookSignIn = () => {
        facebookSignIn(navigate, location)
    }
    return (
        <div>
            <button style={{ fontSize: '50px', color: 'red', margin: '0 auto' }} onClick={handleGoogleSignIn} >Google sign in</button>
            <button style={{ fontSize: '50px', color: 'red', margin: '0 auto' }} onClick={handleFacebookSignIn} >Google sign in</button>
        </div>
    );
};

export default Login;