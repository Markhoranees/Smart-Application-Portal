import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../../assets/styles/PostScholarshipForm.css";

const PostScholarshipForm = () => {
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
      formData.append("provider", data.provider);
      formData.append("description", data.description);
      formData.append("applicationLink", data.applicationLink);
      formData.append("eligibility", data.eligibility);
      formData.append("closingDate", data.closingDate || "");

      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }

      const response = await fetch("http://localhost:5000/api/scholarships", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorRes = await response.json();
        throw new Error(errorRes.message || "Failed to post scholarship");
      }

      setSuccessMsg("Scholarship successfully posted!");
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
    <div className="container-fluid d-flex justify-content-center align-items-center py-5 post-scholarship-container">
      <div className="post-scholarship-form-container p-5 shadow-lg rounded-3 bg-white">
        <h2 className="form-title text-center mb-4">🎓 Post a New Scholarship</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {successMsg && <div className="alert alert-success">{successMsg}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="scholarship-form" encType="multipart/form-data">

          <div className="mb-3">
            <label className="form-label">Title <span className="required">*</span></label>
            <input
              type="text"
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
              {...register("title", { required: "Title is required" })}
              disabled={loading}
            />
            {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Provider <span className="required">*</span></label>
            <input
              type="text"
              className={`form-control ${errors.provider ? "is-invalid" : ""}`}
              {...register("provider", { required: "Provider is required" })}
              disabled={loading}
            />
            {errors.provider && <div className="invalid-feedback">{errors.provider.message}</div>}
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
            <label className="form-label">Application Link <span className="required">*</span></label>
            <input
              type="url"
              className={`form-control ${errors.applicationLink ? "is-invalid" : ""}`}
              {...register("applicationLink", { required: "Application link is required" })}
              disabled={loading}
            />
            {errors.applicationLink && <div className="invalid-feedback">{errors.applicationLink.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Eligibility <span className="required">*</span></label>
            <textarea
              className={`form-control ${errors.eligibility ? "is-invalid" : ""}`}
              rows="3"
              {...register("eligibility", { required: "Eligibility is required" })}
              disabled={loading}
              placeholder="Enter eligibility criteria, separated by commas"
            ></textarea>
            {errors.eligibility && <div className="invalid-feedback">{errors.eligibility.message}</div>}
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
            <label className="form-label">Upload Scholarship Image (optional)</label>
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
            {loading ? "Posting..." : "Submit Scholarship"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostScholarshipForm;
