import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../../assets/styles/PostInternshipForm.css";

const PostInternshipForm = () => {
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
      formData.append("location", data.location || "");
      formData.append("category", data.category || "");
      formData.append("description", data.description);
      formData.append("applicationLink", data.applicationLink);
      formData.append("closingDate", data.closingDate);

      // Image is required
      if (!data.image || data.image.length === 0) {
        setError("Image upload is required");
        setLoading(false);
        return;
      }
      formData.append("image", data.image[0]);

      const response = await fetch("http://localhost:5000/api/internships", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errRes = await response.json();
        throw new Error(errRes.message || "Failed to post internship");
      }

      setSuccessMsg("Internship successfully posted!");
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
    <div className="post-internship-page">
      <div className="post-internship-form-container">
        <h2 className="form-title text-center mb-4">🚀 Post a New Internship</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {successMsg && <div className="alert alert-success">{successMsg}</div>}

        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="internship-form">

          <div className="form-group">
            <label>Title <span className="required">*</span></label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              disabled={loading}
              className={errors.title ? "input-error" : ""}
            />
            {errors.title && <p className="error-msg">{errors.title.message}</p>}
          </div>

          <div className="form-group">
            <label>Company <span className="required">*</span></label>
            <input
              type="text"
              {...register("company", { required: "Company is required" })}
              disabled={loading}
              className={errors.company ? "input-error" : ""}
            />
            {errors.company && <p className="error-msg">{errors.company.message}</p>}
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              {...register("location")}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select {...register("category")} disabled={loading}>
              <option value="">Select category</option>
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="Design">Design</option>
              <option value="Engineering">Engineering</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description <span className="required">*</span></label>
            <textarea
              rows="5"
              {...register("description", { required: "Description is required" })}
              disabled={loading}
              className={errors.description ? "input-error" : ""}
            ></textarea>
            {errors.description && <p className="error-msg">{errors.description.message}</p>}
          </div>

          <div className="form-group">
            <label>Application Link <span className="required">*</span></label>
            <input
              type="url"
              {...register("applicationLink", { required: "Application link is required" })}
              disabled={loading}
              className={errors.applicationLink ? "input-error" : ""}
            />
            {errors.applicationLink && <p className="error-msg">{errors.applicationLink.message}</p>}
          </div>

          <div className="form-group">
            <label>Closing Date <span className="required">*</span></label>
            <input
              type="date"
              {...register("closingDate", { required: "Closing date is required" })}
              disabled={loading}
              className={errors.closingDate ? "input-error" : ""}
            />
            {errors.closingDate && <p className="error-msg">{errors.closingDate.message}</p>}
          </div>

          <div className="form-group">
            <label>Upload Internship Image <span className="required">*</span></label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: "Image is required" })}
              onChange={handleFileChange}
              disabled={loading}
              className={errors.image ? "input-error" : ""}
            />
            {errors.image && <p className="error-msg">{errors.image.message}</p>}
            {previewImage && (
              <div className="image-preview">
                <img src={previewImage} alt="Preview" />
              </div>
            )}
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Posting..." : "Submit Internship"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostInternshipForm;
