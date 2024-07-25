import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import AuthContext from './AuthContext';
import './FileCard.css';

const FileCard = ({ file }) => {
    const [expanded, setExpanded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState('');
    const { authState } = useContext(AuthContext);

    const handleViewMore = async () => {
        if (expanded) {
            setExpanded(false);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(`http://127.0.0.1:8000/v1/files/${file.fileid}`, {
                headers: {
                    Authorization: `Basic ${btoa(`${authState.username}:${authState.password}`)}`
                }
            });
            setSummary(response.data.summary);
            setExpanded(true);
        } catch (err) {
            toast.error("Failed to fetch file details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`file-card ${expanded ? 'expanded' : ''}`}>
            <h3>{file.filename}</h3>
            {expanded && <p>{summary}</p>}
            <button className="view-more" onClick={handleViewMore}>
                {expanded ? 'Collapse' : 'View More'}
            </button>
            {loading && <div className="spinner"></div>}
        </div>
    );
};

export default FileCard;
