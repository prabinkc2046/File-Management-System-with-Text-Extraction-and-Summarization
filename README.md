# File Management System with Text Extraction and Summarization

## Overview
This project showcases a full-stack solution designed for efficient file management, including file upload, text extraction, and summarization capabilities. Leveraging FastAPI for the backend and React for the frontend, this application provides a robust, user-friendly interface and powerful data processing features.

## Technical Highlights

### Backend (FastAPI)
- **File Upload API:** A secure and scalable endpoint to manage file uploads, ensuring only permitted formats (.docx, .pptx, .pdf) are processed. Includes authentication to safeguard access.
- **Authentication:** Implements Basic Authentication for secure access control.
- **Text Extraction:** Utilizes specialized libraries to extract text from various document formats:
  - `pdfplumber` for PDF files
  - `python-docx` for DOCX files
  - `python-pptx` for PowerPoint presentations
- **Text Summarization:** Integrates with a Large Language Model (LLM) to analyze and summarize extracted text, delivering concise and actionable insights.
- **MongoDB Integration:** Uses MongoDB to store metadata and summaries, facilitating efficient data management and retrieval.

### Frontend (React)
- **User Interface:** Features a modern and visually appealing design with 3D card effects and smooth transitions, enhancing user interaction and engagement.
- **File Upload Form:** Provides an intuitive interface for file uploads with real-time feedback and progress indicators. Includes error handling and user notifications.
- **File List Management:** Displays files in a grid layout with expandable cards. The UI is designed for seamless navigation, incorporating wave-like hover effects and smooth transitions.
- **Authentication and Navigation:** Manages user authentication through context, allowing dynamic navigation and access control. Adapts the navigation menu based on the user's login status.

## Achievements
- **Efficient File Handling:** Supports multiple file formats with rigorous validation and processing, ensuring only valid documents are accepted and processed.
- **Advanced Text Analysis:** Combines text extraction and summarization to provide valuable insights from document contents, enhancing the usability and functionality of the application.
- **Seamless User Experience:** Offers a polished, user-centric interface with responsive design, real-time feedback, and engaging animations, ensuring a smooth and enjoyable user experience.
- **Secure and Scalable:** Implements secure authentication mechanisms and leverages MongoDB for scalable, reliable data storage and management.

## Technologies Used
- **Backend:** FastAPI, MongoDB, Text Extraction Libraries (pdfplumber, python-docx, python-pptx), Large Language Model (LLM)
- **Frontend:** React, Axios, CSS (for styling and animations), react-toastify (for notifications)

---

This project demonstrates a comprehensive and efficient file management system that leverages modern technologies to deliver advanced text analysis and a seamless user experience.
