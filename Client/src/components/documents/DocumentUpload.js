import React, { useState } from 'react';
import '../../assets/styles/DocumentUpload.css';

const DocumentUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadStatus('');
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file first');
      return;
    }

    // TODO: Implement actual file upload logic
    setUploadStatus('Uploading...');
    
    // Simulate upload
    setTimeout(() => {
      setUploadStatus('Upload successful!');
      setSelectedFile(null);
    }, 2000);
  };

  return (
    <div className="document-upload-container">
      <h2>Upload Documents</h2>
      <div className="upload-section">
        <input
          type="file"
          onChange={handleFileSelect}
          accept=".pdf,.doc,.docx"
          className="file-input"
        />
        <button 
          onClick={handleUpload}
          className="upload-button"
          disabled={!selectedFile}
        >
          Upload Document
        </button>
      </div>
      {uploadStatus && (
        <div className={`status-message ${uploadStatus.includes('successful') ? 'success' : ''}`}>
          {uploadStatus}
        </div>
      )}
      <div className="upload-info">
        <p>Supported file types: PDF, DOC, DOCX</p>
        <p>Maximum file size: 10MB</p>
      </div>
    </div>
  );
};

export default DocumentUpload; 