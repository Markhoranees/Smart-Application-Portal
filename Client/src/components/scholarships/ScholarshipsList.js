import React from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/ScholarshipList.css";

const ScholarshipsList = ({ scholarships = [] }) => {
  return (
    <section className="scholarships-list-section">
      <div className="container px-6 py-16 mx-auto">
        <h1 className="scholarships-header">
          Available Scholarships
        </h1>
        
        <div className="scholarships-grid">
          {scholarships.map((sch) => {
            const id = sch._id || sch.id;
            const imageSrc = sch.image?.startsWith("http")
              ? sch.image
              : `http://localhost:5000/uploads/${sch.image}`;

            return (
              <Link
                to={`/scholarships/${id}`}
                key={id}
                className="scholarship-card"
              >
                <div className="scholarship-image-container">
                  {sch.image ? (
                    <img
                      src={imageSrc}
                      alt={`${sch.provider || "Provider"} logo`}
                      className="scholarship-image"
                      loading="lazy"
                    />
                  ) : (
                    <span className="no-image-text">No Image</span>
                  )}
                </div>

                <div className="scholarship-details">
                  <h2 className="scholarship-title">
                    {sch.title || "No Title"}
                  </h2>
                  <p className="scholarship-provider">
                    {sch.provider || "Unknown Provider"}
                  </p>
                  <p className="scholarship-description">
                    {sch.description?.length > 120
                      ? sch.description.substring(0, 117) + "..."
                      : sch.description || "No description available."}
                  </p>
                  {sch.closingDate && (
                    <p className="scholarship-closing-date">
                      Closing Date:{" "}
                      {new Date(sch.closingDate).toLocaleDateString(undefined, {
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

export default ScholarshipsList;
