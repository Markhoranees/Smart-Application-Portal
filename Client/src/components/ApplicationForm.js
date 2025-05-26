import React, { useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { baseFields, educationFields, categorySpecificFields,} from "../constants/applicationFields";

const ApplicationForm = ({ category, appliedForId }) => {
  const { getToken } = useUser();
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState({ cvFile: null, additionalFiles: [] });

  const allFields = [
    ...baseFields,
    ...educationFields,
    ...(categorySpecificFields[category] || []),
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFiles((prev) => ({
      ...prev,
      [name]: name === "cvFile" ? files[0] : files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getToken();
    const form = new FormData();

    form.append("category", category);
    form.append("appliedForId", appliedForId);

    Object.entries(formData).forEach(([key, val]) => form.append(key, val));
    form.append("cvFile", files.cvFile);
    Array.from(files.additionalFiles).forEach((file) =>
      form.append("additionalFiles", file)
    );

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/applications/apply`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Application submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Application failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {allFields.map((field) =>
        field.type === "textarea" ? (
          <textarea
            key={field.name}
            name={field.name}
            placeholder={field.label}
            required={field.required}
            onChange={handleChange}
            className="textarea"
          />
        ) : (
          <input
            key={field.name}
            type={field.type}
            name={field.name}
            placeholder={field.label}
            required={field.required}
            onChange={handleChange}
            className="input"
          />
        )
      )}

      <input
        type="file"
        name="cvFile"
        required
        onChange={handleFileChange}
        className="file-input"
      />
      <input
        type="file"
        name="additionalFiles"
        multiple
        onChange={handleFileChange}
        className="file-input"
      />

      <button type="submit" className="btn btn-primary">
        Submit Application
      </button>
    </form>
  );
};

export default ApplicationForm;
