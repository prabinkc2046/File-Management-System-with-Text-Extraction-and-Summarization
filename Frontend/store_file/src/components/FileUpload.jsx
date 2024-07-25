import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './FileUpload.css'; // Import the updated CSS file

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            toast.error("Please select a file.");
            return;
        }

        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');

        if (!username || !password) {
            toast.error("Please log in first.");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://127.0.0.1:8000/v1/files', formData, {
                headers: {
                    'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success(response.data.message);
            setFile(null); // Clear the file input after successful upload
        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error("Unauthorized access. Check your credentials.");
            } else if (error.response && error.response.status === 400) {
                toast.error("Invalid file type. Only .docx, .pptx, and .pdf files are allowed.");
            } else if (error.response && error.response.status === 409) {
                toast.error("File already exists.");
            } else {
                toast.error("Failed to upload file. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="file-upload-container">
            <ToastContainer />
            <div className="file-upload-form">
                <h2>Upload a File</h2>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload} disabled={loading}>
                    {loading ? <div className="spinner"></div> : 'Upload'}
                </button>
            </div>
        </div>
    );
};

export default FileUpload;
