import React, { useContext } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';
import './navigation.css'; // Import the CSS file

const Navigation = () => {
    const { isLoggedIn, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="logo">
                        <NavLink to="/" end>MyApp</NavLink>
                    </div>
                    <ul className="nav-links">
                        <li>
                            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
                        </li>
                        {isLoggedIn && (
                            <>
                                <li>
                                    <NavLink to="/upload" className={({ isActive }) => (isActive ? 'active' : '')}>Upload</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/files" className={({ isActive }) => (isActive ? 'active' : '')}>Files</NavLink>
                                </li>
                                <li>
                                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        )}
                        {!isLoggedIn && (
                            <li>
                                <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>Login</NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
            <Outlet />
        </>
    );
};

export default Navigation;
