import React, { useEffect, useState } from "react";
import { Spinner, Alert, Button } from "react-bootstrap";
import { fetchInternships, deleteInternship } from "../../api/internship"; // Adjust path if needed
import { useNavigate } from "react-router-dom";
import "../../assets/styles/DeleteInternships.css";

const DeleteInternships = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadInternships = async () => {
      try {
        const data = await fetchInternships();
        setInternships(data);
        setError(null);
      } catch {
        setError("Failed to load internships. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadInternships();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this internship?")) return;

    try {
      setDeletingId(id);
      await deleteInternship(id);
      setInternships((prev) => prev.filter((internship) => internship._id !== id));
    } catch {
      alert("Failed to delete the internship. Try again.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading)
    return (
      <div className="internships-loading">
        <Spinner animation="border" variant="primary" />
        <p>Loading internships...</p>
      </div>
    );

  if (error)
    return (
      <Alert variant="danger" className="internships-error">
        {error}
      </Alert>
    );

  return (
    <div className="internships-list-portal container">
      <header className="internships-header">INTERNSHIPS LIST</header>

     
      <main className="internships-main">
        {internships.length === 0 ? (
          <p className="no-internships">No internships found.</p>
        ) : (
          internships.map((internship) => (
            <article key={internship._id} className="internship-card">
              <div className="internship-image-container">
                {internship.image ? (
              <img src={`http://localhost:5000/uploads/${internship.image}`} alt="..." 
                    className="internship-image"
                
                  />
                ) : (
                  <span className="no-image-text">No Image</span>
                )}
              </div>

              <div className="internship-details">
                <h2 className="internship-title">{internship.title || "NO TITLE"}</h2>
                <p className="internship-company">{internship.company || "Unknown Company"}</p>

                <p className="internship-location">
                  <strong>Location:</strong> {internship.location || "N/A"}
                </p>
                <p className="internship-category">
                  <strong>Category:</strong> {internship.category || "N/A"}
                </p>

                <p className="internship-description">{internship.description || "No description available."}</p>

                {internship.closingDate && (
                  <p className="internship-closing-date">
                    Closing Date:{" "}
                    {new Date(internship.closingDate).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}

                <div className="internship-buttons">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(internship._id)}
                    disabled={deletingId === internship._id}
                    className="btn-delete"
                  >
                    {deletingId === internship._id ? "Deleting..." : "Delete"}
                  </Button>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => navigate(`/internship/${internship._id}`)}
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

export default DeleteInternships;
