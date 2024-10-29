import React, { useState } from 'react';
import apiService from '../../Services/Services'; 
const Login = () => {
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');

    const handleLoginChange = (e) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        });
    };
   
        const handleLoginSubmit = async (e) => {
            e.preventDefault();
            try {
                const data = await apiService.post('/auth/login', loginForm);
                setMessage(data.message || 'Login successful');
            } catch (error) {
                setMessage(error.message || 'An error occurred during login');
            }
        };        


    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                />
                <button type="submit">Login</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
