import React from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/InternshipsList.css"; // Adjust path as necessary

const InternshipsList = ({ internships = [] }) => {
  return (
    <section className="internships-list-section">
      <div className="container px-6 py-16 mx-auto">
        <h1 className="internships-header">
          Available Internships
        </h1>
        <div className="internships-grid">
          {internships.map((intern) => {
            const id = intern._id || intern.id;
            const imageSrc = intern.image?.startsWith("http")
              ? intern.image
              : `http://localhost:5000/uploads/${intern.image}`;

            return (
              <Link
                to={`/internships/${id}`}
                key={id}
                className="internship-card"
              >
                <div className="internship-image-container">
                  {intern.image ? (
                    <img
                      src={imageSrc}
                      alt={`${intern.company || "Company"} logo`}
                      className="internship-image"
                      loading="lazy"
                    />
                  ) : (
                    <span className="no-image-text">No Image</span>
                  )}
                </div>

                <div className="internship-details">
                  <h2 className="internship-title">
                    {intern.title || "No Title"}
                  </h2>
                  <p className="internship-company">
                    {intern.company || "Unknown Company"}
                  </p>
                  <p className="internship-description">
                    {intern.description?.length > 120
                      ? intern.description.substring(0, 117) + "..."
                      : intern.description || "No description available."}
                  </p>
                  {intern.closingDate && (
                    <p className="internship-closing-date">
                      Closing Date:{" "}
                      {new Date(intern.closingDate).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InternshipsList;
