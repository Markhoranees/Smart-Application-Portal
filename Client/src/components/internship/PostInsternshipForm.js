import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../../assets/styles/PostJobForm.css"; // reuse the same or create a new CSS

const PostInternshipForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showForm, setShowForm] = useState(true);

  const onSubmit = (data) => {
    console.log("Internship Posted:", data);
    alert("Internship successfully posted!");
    // TODO: Dispatch action or call API to save internship
  };

  return (
    <div className="page-container">
      <div className={`form-container ${showForm ? "fade-in" : "fade-out"}`}>
        <button className="close-btn" onClick={() => setShowForm(false)}>
          ✖
        </button>

        {showForm && (
          <form onSubmit={handleSubmit(onSubmit)} className="job-form">
            <h2>Post a New Internship</h2>

            <label>Internship Title</label>
            <input
              type="text"
              {...register("title", { required: true })}
              placeholder="Enter internship title"
            />
            {errors.title && <span className="error">Title is required</span>}

            <label>Company Name</label>
            <input
              type="text"
              {...register("companyName", { required: true })}
              placeholder="Enter company name"
            />
            {errors.companyName && (
              <span className="error">Company name is required</span>
            )}

            <label>Location (optional)</label>
            <input
              type="text"
              {...register("location")}
              placeholder="Enter location"
            />

            <label>Internship Duration</label>
            <input
              type="text"
              {...register("duration", { required: true })}
              placeholder="e.g., 3 months, 6 weeks"
            />
            {errors.duration && (
              <span className="error">Duration is required</span>
            )}

            <label>Application Email or URL</label>
            <input
              type="email"
              {...register("applicationEmail", { required: true })}
              placeholder="Enter application email"
            />
            {errors.applicationEmail && (
              <span className="error">Valid email is required</span>
            )}

            <label>Deadline (optional)</label>
            <input type="date" {...register("deadline")} />

            <label>Description</label>
            <textarea
              {...register("description", { required: true })}
              placeholder="Describe internship details"
            ></textarea>
            {errors.description && (
              <span className="error">Description is required</span>
            )}

            <label>Upload Internship Document (optional)</label>
            <input type="file" {...register("document")} />

            <button type="submit" className="submit-btn">
              Submit Internship
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PostInternshipForm;
