// HomePage.js
import React from 'react';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="homepage-container">
            <div className="card welcome-card">
                <h2>Welcome to MyApp</h2>
                <p>MyApp allows you to store and manage your files efficiently.</p>
            </div>
            <div className="card login-card">
                <h2>Login</h2>
                <p>To get started, please log in with your credentials. If you don't have an account, contact the administrator to get access.</p>
            </div>
            <div className="card upload-card">
                <h2>Upload Files</h2>
                <p>After logging in, navigate to the "Upload" page using the navigation menu. Here, you can upload your files to the server.</p>
            </div>
            <div className="card view-card">
                <h2>View Files</h2>
                <p>To view the files you have uploaded, go to the "Files" page. You can see a list of your files and click on them for more details.</p>
            </div>
            <div className="card restrictions-card">
                <h2>Restrictions and Information</h2>
                <p>Please note that there are restrictions on the types of files that can be uploaded. Our LLM summarizes the content, which might be a bit slow. We use MongoDB as our database.</p>
            </div>
        </div>
    );
};

export default HomePage;
