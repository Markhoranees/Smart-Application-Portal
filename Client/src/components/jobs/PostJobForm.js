import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../../assets/styles/PostJobForm.css";

const PostJobForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  // const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      // Prepare form data for multipart/form-data (for file upload)
      const formData = new FormData();
      for (const key in data) {
        if (key === "file" && data[key]?.length > 0) {
          formData.append(key, data[key][0]); // file input is an array
        } else {
          formData.append(key, data[key]);
        }
      }

      const response = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorRes = await response.json();
        throw new Error(errorRes.message || "Failed to post job");
      }

      setSuccessMsg("Job successfully posted!");
      reset();
      // setPreviewImage(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setPreviewImage(URL.createObjectURL(file));
  //   } else {
  //     setPreviewImage(null);
  //   }
  // };

  return (
    <div className="page-container">
      <div className="form-container fade-in">
        <form onSubmit={handleSubmit(onSubmit)} className="job-form" encType="multipart/form-data">
          <h2>Post a New Job</h2>

          {error && <p className="error">{error}</p>}
          {successMsg && <p className="success">{successMsg}</p>}

          <label>Job Title <span className="required">*</span></label>
          <input
            type="text"
            {...register("jobTitle", { required: "Job title is required" })}
            placeholder="Enter job title"
            disabled={loading}
          />
          {errors.jobTitle && <span className="error">{errors.jobTitle.message}</span>}

          <label>Company Name <span className="required">*</span></label>
          <input
            type="text"
            {...register("companyName", { required: "Company name is required" })}
            placeholder="Enter company name"
            disabled={loading}
          />
          {errors.companyName && <span className="error">{errors.companyName.message}</span>}

          <label>Location (optional)</label>
          <input
            type="text"
            {...register("location")}
            placeholder="City, Country"
            disabled={loading}
          />

          <label>Category <span className="required">*</span></label>
          <select
            {...register("category", { required: "Category is required" })}
            disabled={loading}
          >
            <option value="">Select category</option>
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="Design">Design</option>
          </select>
          {errors.category && <span className="error">{errors.category.message}</span>}

          <label>Job Tags (optional)</label>
          <input
            type="text"
            {...register("jobTags")}
            placeholder="e.g., PHP, React"
            disabled={loading}
          />

          <label>Description <span className="required">*</span></label>
          <textarea
            {...register("description", { required: "Description is required" })}
            placeholder="Describe the job here..."
            disabled={loading}
          />
          {errors.description && <span className="error">{errors.description.message}</span>}

          <label>Application Email / URL <span className="required">*</span></label>
          <input
            type="email"
            {...register("applicationEmail", {
              required: "Valid email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address"
              }
            })}
            placeholder="example@company.com"
            disabled={loading}
          />
          {errors.applicationEmail && <span className="error">{errors.applicationEmail.message}</span>}

          <label>Closing Date (optional)</label>
          <input
            type="date"
            {...register("closingDate")}
            disabled={loading}
          />

          <h3>Company Details</h3>

          <label>Company Name <span className="required">*</span></label>
          <input
            type="text"
            {...register("companyDetailsName", { required: "Company name is required" })}
            placeholder="Official company name"
            disabled={loading}
          />
          {errors.companyDetailsName && <span className="error">{errors.companyDetailsName.message}</span>}

          <label>Website (optional)</label>
          <input
            type="url"
            {...register("website")}
            placeholder="https://www.companywebsite.com"
            disabled={loading}
          />

          <label>Tagline (optional)</label>
          <input
            type="text"
            {...register("tagline")}
            placeholder="Short company slogan"
            disabled={loading}
          />

          {/* <label>Upload Company Logo or Photo (optional)</label>
          <input
            type="file"
            accept="image/*"
            {...register("file")}
            onChange={handleFileChange}
            disabled={loading}
          />
          {previewImage && (
            <div className="image-preview">
              <img src={previewImage} alt="Preview" />
            </div>
          )} */}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Posting..." : "Submit Your Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJobForm;
