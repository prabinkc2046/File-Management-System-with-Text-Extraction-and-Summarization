// AuthContext.js
import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        username: localStorage.getItem('username') || '',
        password: localStorage.getItem('password') || ''
    });

    const login = (username, password) => {
        setAuthState({ username, password });
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
    };

    const logout = () => {
        setAuthState({ username: '', password: '' });
        localStorage.removeItem('username');
        localStorage.removeItem('password');
    };

    const isLoggedIn = !!authState.username;

    return (
        <AuthContext.Provider value={{ authState, login, logout, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
