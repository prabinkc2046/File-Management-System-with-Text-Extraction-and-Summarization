// LoginForm.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from './AuthContext';
import './login-form.css';
import axios from 'axios';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/login', {}, {
                auth: {
                    username,
                    password
                }
            });
            if (response.status === 201) {
                login(username, password);
                toast.success('Logged in successfully!', {
                    onClose: () => navigate('/upload'),
                });
            } else {
                throw new Error('Login failed');
            }
        } catch (err) {
            toast.error('Invalid credentials');
        }
    };

    return (
        <div className="login-form-container">
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar
                closeOnClick
                pauseOnHover
                draggable
            />
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
