import React, { useEffect, useState } from "react";
import { Spinner, Alert, Button } from "react-bootstrap";
import { fetchScholarships, deleteScholarship } from "../../api/scholarship"; // Adjust path
import { useNavigate } from "react-router-dom";
import "../../assets/styles/DeleteScholarships.css";

const DeleteScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const loadScholarships = async () => {
      try {
        const data = await fetchScholarships();
        setScholarships(data);
        console.log(data)
        setError(null);
      } catch {
        setError("Failed to load scholarships. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadScholarships();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this scholarship?")) return;

    try {
      setDeletingId(id);
      await deleteScholarship(id);
      setScholarships((prev) => prev.filter((sch) => sch._id !== id));
    } catch {
      alert("Failed to delete the scholarship. Try again.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading)
    return (
      <div className="scholarships-loading">
        <Spinner animation="border" variant="primary" />
        <p>Loading scholarships...</p>
      </div>
    );

  if (error)
    return (
      <Alert variant="danger" className="scholarships-error">
        {error}
      </Alert>
    );

  return (
    <div className="scholarships-list-portal container">
      <header className="scholarships-header">SCHOLARSHIPS LIST</header>

    
      <main className="scholarships-main">
        {scholarships.length === 0 ? (
          <p className="no-scholarships">No scholarships found.</p>
        ) : (
          scholarships.map((scholarship) => (
            <article key={scholarship._id} className="scholarship-card">
              <div className="scholarship-image-container">
                {scholarship.image ? (
                <img src={`http://localhost:5000/uploads/${scholarship.image}`} 
                    alt="..." 
                    className="scholarship-image"
                  />
                ) : (
                  <span className="no-image-text">No Image</span>
                )}
              </div>

              <div className="scholarship-details">
                <h2 className="scholarship-title">{scholarship.title || "NO TITLE"}</h2>
                <p className="scholarship-provider">{scholarship.provider || "Unknown Provider"}</p>

                {scholarship.closingDate && (
                  <p className="scholarship-closing-date">
                    Closing Date:{" "}
                    {new Date(scholarship.closingDate).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}

                <div className="scholarship-buttons">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(scholarship._id)}
                    disabled={deletingId === scholarship._id}
                    className="btn-delete"
                  >
                    {deletingId === scholarship._id ? "Deleting..." : "Delete"}
                  </Button>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => navigate(`/scholarship/${scholarship._id}`)}
                    className="btn-view"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </article>
          ))
        )}
      </main>
    </div>
  );
};

export default DeleteScholarships;
