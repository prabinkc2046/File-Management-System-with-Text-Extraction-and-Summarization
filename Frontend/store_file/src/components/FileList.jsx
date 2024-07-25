import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from './AuthContext';
import FileCard from './FileCard';
import './FileList.css';

const FileList = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const { authState } = useContext(AuthContext);

    const fetchFiles = async () => {
        setLoading(true);
        if (!authState.username || !authState.password) {
            toast.error("Please login to access this feature.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get('http://127.0.0.1:8000/v1/files', {
                headers: {
                    Authorization: `Basic ${btoa(`${authState.username}:${authState.password}`)}`
                }
            });
            setFiles(response.data.files);
        } catch (err) {
            if (err.response?.status === 401) {
                toast.error("Authentication failed. Please check your credentials.");
            } else {
                toast.error("Failed to fetch files. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="file-list-container">
            <ToastContainer />
            <button className="fetch-button" onClick={fetchFiles}>Fetch Files</button>
            {loading && <div className="spinner"></div>}
            <div className="file-list">
                {files.map(file => (
                    <FileCard 
                        key={file.fileid} 
                        file={file} 
                    />
                ))}
            </div>
        </div>
    );
};

export default FileList;
