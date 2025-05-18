import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../../assets/styles/PostJobForm.css";

const PostJobForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
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
      formData.append("category", data.category);
      formData.append("description", data.description);
      formData.append("applicationEmail", data.applicationEmail);
      formData.append("closingDate", data.closingDate || ""); // Add closingDate

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

        <form onSubmit={handleSubmit(onSubmit)} className="job-form" encType="multipart/form-data">

          <div className="mb-3">
            <label className="form-label">Job Title <span className="required">*</span></label>
            <input
              type="text"
              className={`form-control ${errors.jobTitle ? "is-invalid" : ""}`}
              {...register("title", { required: "Job title is required" })}
              disabled={loading}
            />
            {errors.jobTitle && <div className="invalid-feedback">{errors.jobTitle.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Company Name <span className="required">*</span></label>
            <input
              type="text"
              className={`form-control ${errors.companyName ? "is-invalid" : ""}`}
              {...register("company", { required: "Company name is required" })}
              disabled={loading}
            />
            {errors.companyName && <div className="invalid-feedback">{errors.companyName.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Category <span className="required">*</span></label>
            <select
              className={`form-select ${errors.category ? "is-invalid" : ""}`}
              {...register("category", { required: "Category is required" })}
              disabled={loading}
            >
              <option value="">Select category</option>
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="Design">Design</option>
            </select>
            {errors.category && <div className="invalid-feedback">{errors.category.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Description <span className="required">*</span></label>
            <textarea
              className={`form-control ${errors.description ? "is-invalid" : ""}`}
              rows="5"
              {...register("description", { required: "Description is required" })}
              disabled={loading}
            ></textarea>
            {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Application Email / URL <span className="required">*</span></label>
            <input
              type="email"
              className={`form-control ${errors.applicationEmail ? "is-invalid" : ""}`}
              {...register("applicationEmail", {
                required: "Valid email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              disabled={loading}
            />
            {errors.applicationEmail && <div className="invalid-feedback">{errors.applicationEmail.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Closing Date <span className="required">*</span></label>
            <input
              type="date"
              className={`form-control ${errors.closingDate ? "is-invalid" : ""}`}
              {...register("closingDate", { required: "Closing date is required" })}
              disabled={loading}
            />
            {errors.closingDate && <div className="invalid-feedback">{errors.closingDate.message}</div>}
          </div>

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
                <img src={previewImage} alt="Preview" className="img-fluid rounded shadow" />
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
