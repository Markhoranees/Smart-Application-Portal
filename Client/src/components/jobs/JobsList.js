import React from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/JobsList.css";

const JobsList = ({ jobs = [] }) => {
  return (
    <section className="jobs-list-section text-gray-800 body-font bg-white">
      <div className="container px-6 py-16 mx-auto">
        <h1 className="text-3xl font-bold mb-12 text-center text-blue-700 uppercase tracking-wide">
          Available Jobs
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {jobs.map((job) => {
            const id = job._id || job.id;
            const imageSrc = job.image?.startsWith("http")
              ? job.image
              : `http://localhost:5000/uploads/${job.image}`;

            return (
              <Link
                to={`/jobs/${id}`}
                key={id}
                className="job-card border border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
                style={{ height: '280px', maxWidth: '400px' }} // slightly taller for better layout
              >
                <div className="job-image-container flex items-center justify-center overflow-hidden bg-gray-100" style={{ height: '140px' }}>
                  {job.image ? (
                    <img
                      src={imageSrc}
                      alt={`${job.company || "Company"} logo`}
                      className="object-scale-down w-full h-full"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-gray-400 italic">No Image</span>
                  )}
                </div>

                <div className="job-details p-5 flex flex-col flex-grow">
                  <h2 className="job-title text-xl font-semibold mb-1 text-gray-900">
                    {job.title || "No Title"}
                  </h2>
                  <p className="job-company mb-1 text-gray-600 italic font-medium">
                    {job.company || "Unknown Company"}
                  </p>
                  <p className="job-location mb-1 text-gray-500 text-sm">
                    <strong>Location:</strong> {job.location || "N/A"}
                  </p>
                  <p className="job-category mb-3 text-gray-500 text-sm">
                    <strong>Category:</strong> {job.category || "N/A"}
                  </p>

                  <p className="job-description text-gray-700 flex-grow overflow-hidden line-clamp-3 mb-3">
                    {job.description || "No description available."}
                  </p>

                  {job.closingDate && (
                    <p className="job-closing-date text-sm font-semibold text-gray-600">
                      Closing Date:{" "}
                      {new Date(job.closingDate).toLocaleDateString(undefined, {
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

export default JobsList;
