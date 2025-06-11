import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../../assets/styles/PostJobForm.css";

const PostJobForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("company", data.company);
      formData.append("location", data.location || "");
      formData.append("onsite", data.onsite ? "true" : "false");
      formData.append("jobCategory", data.jobCategory); // changed here
      formData.append("skillsRequired", data.skillsRequired); // changed here
      formData.append("salary", data.salary || "");
      formData.append("experienceLevel", data.experienceLevel || ""); // added experienceLevel
      formData.append("description", data.description);
      formData.append("email", data.email);
      formData.append("closingDate", data.closingDate || "");

      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
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
      setPreviewImage(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
    <div className="container-fluid d-flex justify-content-center align-items-center py-5 post-job-container">
      <div className="post-job-form-container p-5 shadow-lg rounded-3 bg-white">
        <h2 className="form-title text-center mb-4">🚀 Post a New Job</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {successMsg && <div className="alert alert-success">{successMsg}</div>}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="job-form"
          encType="multipart/form-data"
        >
          {/* Job Title */}
          <div className="mb-3">
            <label className="form-label">
              Job Title <span className="required">*</span>
            </label>
            <input
              type="text"
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
              {...register("title", { required: "Job title is required" })}
              disabled={loading}
            />
            {errors.title && (
              <div className="invalid-feedback">{errors.title.message}</div>
            )}
          </div>

          {/* Company Name */}
          <div className="mb-3">
            <label className="form-label">
              Company Name <span className="required">*</span>
            </label>
            <input
              type="text"
              className={`form-control ${errors.company ? "is-invalid" : ""}`}
              {...register("company", { required: "Company name is required" })}
              disabled={loading}
            />
            {errors.company && (
              <div className="invalid-feedback">{errors.company.message}</div>
            )}
          </div>

          {/* Location */}
          <div className="mb-3">
            <label className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              {...register("location")}
              disabled={loading}
            />
          </div>

          {/* Onsite */}
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="onsiteCheck"
              {...register("onsite")}
              disabled={loading}
            />
            <label className="form-check-label" htmlFor="onsiteCheck">
              Onsite Job (Uncheck if Remote)
            </label>
          </div>

          {/* Job Category */}
          <div className="mb-3">
            <label className="form-label">
              Job Category <span className="required">*</span>
            </label>
            <select
              className={`form-select ${errors.jobCategory ? "is-invalid" : ""}`}
              {...register("jobCategory", { required: "Job category is required" })}
              disabled={loading}
            >
              <option value="">Select job category</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
            </select>
            {errors.jobCategory && (
              <div className="invalid-feedback">{errors.jobCategory.message}</div>
            )}
          </div>

          {/* Skills Required */}
          <div className="mb-3">
            <label className="form-label">
              Skills Required <span className="required">*</span>
            </label>
            <input
              type="text"
              className={`form-control ${errors.skillsRequired ? "is-invalid" : ""}`}
              {...register("skillsRequired", {
                required: "Skills are required",
              })}
              disabled={loading}
              placeholder="e.g., JavaScript, React, Node.js"
            />
            {errors.skillsRequired && (
              <div className="invalid-feedback">{errors.skillsRequired.message}</div>
            )}
          </div>

          {/* Experience Level */}
          <div className="mb-3">
            <label className="form-label">Experience Level</label>
            <select
              className="form-select"
              {...register("experienceLevel")}
              disabled={loading}
            >
              <option value="">Select experience level</option>
              <option value="entry-level">Entry-level</option>
              <option value="mid-level">Mid-level</option>
              <option value="senior-level">Senior-level</option>
            </select>
          </div>

          {/* Salary */}
          <div className="mb-3">
            <label className="form-label">Salary</label>
            <input
              type="text"
              className="form-control"
              {...register("salary")}
              disabled={loading}
              placeholder="e.g., $50,000 - $70,000"
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label">
              Description <span className="required">*</span>
            </label>
            <textarea
              className={`form-control ${errors.description ? "is-invalid" : ""}`}
              rows="5"
              {...register("description", { required: "Description is required" })}
              disabled={loading}
            ></textarea>
            {errors.description && (
              <div className="invalid-feedback">{errors.description.message}</div>
            )}
          </div>

          {/* Application Email */}
          <div className="mb-3">
            <label className="form-label">
              Application Email / URL <span className="required">*</span>
            </label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email", {
                required: "Valid email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              disabled={loading}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          {/* Closing Date */}
          <div className="mb-3">
            <label className="form-label">
              Closing Date <span className="required">*</span>
            </label>
            <input
              type="date"
              className={`form-control ${errors.closingDate ? "is-invalid" : ""}`}
              {...register("closingDate", { required: "Closing date is required" })}
              disabled={loading}
            />
            {errors.closingDate && (
              <div className="invalid-feedback">{errors.closingDate.message}</div>
            )}
          </div>

          {/* Upload Image */}
          <div className="mb-3">
            <label className="form-label">Upload Company Logo or Photo (optional)</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              {...register("image")}
              onChange={handleFileChange}
              disabled={loading}
            />
            {previewImage && (
              <div className="image-preview my-3">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="img-fluid rounded shadow"
                />
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Posting..." : "Submit Your Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJobForm;
