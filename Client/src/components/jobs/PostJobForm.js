import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../../assets/styles/PostJobForm.css";

const PostJobForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showForm, setShowForm] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);

  const onSubmit = (data) => {
    console.log("Job Posted:", data);
    alert("Job successfully posted!");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <div className="page-container">
      <div className={`form-container ${showForm ? "fade-in" : "fade-out"}`}>
        <button className="close-btn" onClick={() => setShowForm(false)}>✖</button>
        {showForm && (
          <form onSubmit={handleSubmit(onSubmit)} className="job-form">
            <h2>Post a New Job</h2>

            <label>Job Title <span className="required">*</span></label>
            <input type="text" {...register("jobTitle", { required: true })} placeholder="Enter job title" />
            {errors.jobTitle && <span className="error">Job title is required</span>}

            <label>Company Name <span className="required">*</span></label>
            <input type="text" {...register("companyName", { required: true })} placeholder="Enter company name" />
            {errors.companyName && <span className="error">Company name is required</span>}

            <label>Location (optional)</label>
            <input type="text" {...register("location")} placeholder="City, Country" />

            <label>Category <span className="required">*</span></label>
            <select {...register("category", { required: true })}>
              <option value="">Select category</option>
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="Design">Design</option>
            </select>
            {errors.category && <span className="error">Category is required</span>}

            <label>Job Tags (optional)</label>
            <input type="text" {...register("jobTags")} placeholder="e.g., PHP, React" />

            <label>Description <span className="required">*</span></label>
            <textarea {...register("description", { required: true })} placeholder="Describe the job here..."></textarea>
            {errors.description && <span className="error">Description is required</span>}

            <label>Application Email / URL <span className="required">*</span></label>
            <input type="email" {...register("applicationEmail", { required: true })} placeholder="example@company.com" />
            {errors.applicationEmail && <span className="error">Valid email is required</span>}

            <label>Closing Date (optional)</label>
            <input type="date" {...register("closingDate")} />

            <h3>Company Details</h3>

            <label>Company Name <span className="required">*</span></label>
            <input type="text" {...register("companyDetailsName", { required: true })} placeholder="Official company name" />
            {errors.companyDetailsName && <span className="error">Company name is required</span>}

            <label>Website (optional)</label>
            <input type="url" {...register("website")} placeholder="https://www.companywebsite.com" />

            <label>Tagline (optional)</label>
            <input type="text" {...register("tagline")} placeholder="Short company slogan" />

            <label>Upload Company Logo or Photo (optional)</label>
            <input
              type="file"
              accept="image/*"
              {...register("file")}
              onChange={handleFileChange}
            />
            {previewImage && (
              <div className="image-preview">
                <img src={previewImage} alt="Preview" />
              </div>
            )}

            <button type="submit" className="submit-btn">Submit Your Job</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PostJobForm;
