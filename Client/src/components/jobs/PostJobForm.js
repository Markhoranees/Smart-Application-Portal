import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../../assets/styles/PostJobForm.css";
import HeroSection from "../../components/HeroSection"
const PostJobForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showForm, setShowForm] = useState(true);

  const onSubmit = (data) => {
    console.log("Job Posted:", data);
    alert("Job successfully posted!");
  };

  return (
    <>

    <HeroSection/>
       
    <div className="page-container">
    <div className={`form-container ${showForm ? "fade-in" : "fade-out"}`}>
      <button className="close-btn" onClick={() => setShowForm(false)}>✖</button>
      
      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="job-form">
          <h2>Post a New Job</h2>

          <label>Job Title</label>
          <input type="text" {...register("jobTitle", { required: true })} />
          {errors.jobTitle && <span className="error">Job title is required</span>}

          <label>Company Name</label>
          <input type="text" {...register("companyName", { required: true })} />
          {errors.companyName && <span className="error">Company name is required</span>}

          <label>Location (optional)</label>
          <input type="text" {...register("location")} />

          <label>Category</label>
          <select {...register("category")}>
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="Design">Design</option>
          </select>

          <label>Job Tags (optional)</label>
          <input type="text" {...register("jobTags")} placeholder="e.g., PHP, React" />

          <label>Description</label>
          <textarea {...register("description", { required: true })}></textarea>
          {errors.description && <span className="error">Description is required</span>}

          <label>Application Email / URL</label>
          <input type="email" {...register("applicationEmail", { required: true })} />
          {errors.applicationEmail && <span className="error">Valid email is required</span>}

          <label>Closing Date (optional)</label>
          <input type="date" {...register("closingDate")} />

          <h3>Company Details</h3>

          <label>Company Name</label>
          <input type="text" {...register("companyDetailsName", { required: true })} />
          {errors.companyDetailsName && <span className="error">Company name is required</span>}

          <label>Website (optional)</label>
          <input type="url" {...register("website")} />

          <label>Tagline (optional)</label>
          <input type="text" {...register("tagline")} />

          <label>Upload File</label>
          <input type="file" {...register("file")} />

          <button type="submit" className="submit-btn">Submit Your Job</button>
        </form>
      )}
    </div>
    </div>

    </>
  );
};

export default PostJobForm;
