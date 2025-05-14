import React, { useState } from 'react';
import '../../assets/styles/DocumentList.css';

const DocumentList = () => {
  // Mock data - replace with actual data from API
  const [documents] = useState([
    { id: 1, name: 'Resume.pdf', type: 'Resume', uploadDate: '2024-03-15', status: 'Verified' },
    { id: 2, name: 'Cover_Letter.docx', type: 'Cover Letter', uploadDate: '2024-03-14', status: 'Pending' },
    { id: 3, name: 'Certificates.pdf', type: 'Certificates', uploadDate: '2024-03-13', status: 'Verified' },
  ]);

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'verified':
        return 'status-verified';
      case 'pending':
        return 'status-pending';
      default:
        return '';
    }
  };

  return (
    <div className="document-list-container">
      <h2>My Documents</h2>
      <div className="document-list">
        {documents.map((doc) => (
          <div key={doc.id} className="document-item">
            <div className="document-info">
              <h3>{doc.name}</h3>
              <p className="document-type">Type: {doc.type}</p>
              <p className="document-date">Uploaded: {doc.uploadDate}</p>
            </div>
            <div className="document-actions">
              <span className={`status-badge ${getStatusClass(doc.status)}`}>
                {doc.status}
              </span>
              <button className="view-button">View</button>
              <button className="delete-button">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentList; 