import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../../assets/styles/PostJobForm.css"; // reuse the same or create a new CSS

const PostScholarshipForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showForm, setShowForm] = useState(true);

  const onSubmit = (data) => {
    console.log("Scholarship Posted:", data);
    alert("Scholarship successfully posted!");
    // TODO: Dispatch action or call API to save scholarship
  };

  return (
    <div className="page-container">
      <div className={`form-container ${showForm ? "fade-in" : "fade-out"}`}>
        <button className="close-btn" onClick={() => setShowForm(false)}>
          ✖
        </button>

        {showForm && (
          <form onSubmit={handleSubmit(onSubmit)} className="job-form">
            <h2>Post a New Scholarship</h2>

            <label>Scholarship Title</label>
            <input
              type="text"
              {...register("title", { required: true })}
              placeholder="Enter scholarship title"
            />
            {errors.title && <span className="error">Title is required</span>}

            <label>Provider Name</label>
            <input
              type="text"
              {...register("provider", { required: true })}
              placeholder="Enter provider or organization name"
            />
            {errors.provider && (
              <span className="error">Provider name is required</span>
            )}

            <label>Eligibility Criteria</label>
            <textarea
              {...register("eligibility", { required: true })}
              placeholder="Describe eligibility criteria"
            ></textarea>
            {errors.eligibility && (
              <span className="error">Eligibility criteria is required</span>
            )}

            <label>Scholarship Amount (optional)</label>
            <input
              type="number"
              {...register("amount")}
              placeholder="Enter amount"
              min="0"
            />

            <label>Application Link or Email</label>
            <input
              type="url"
              {...register("applicationLink", { required: true })}
              placeholder="Enter application URL"
            />
            {errors.applicationLink && (
              <span className="error">Valid application URL is required</span>
            )}

            <label>Deadline (optional)</label>
            <input type="date" {...register("deadline")} />

            <label>Description</label>
            <textarea
              {...register("description", { required: true })}
              placeholder="Describe scholarship details"
            ></textarea>
            {errors.description && (
              <span className="error">Description is required</span>
            )}

            <label>Upload Scholarship Document (optional)</label>
            <input type="file" {...register("document")} />

            <button type="submit" className="submit-btn">
              Submit Scholarship
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PostScholarshipForm;
