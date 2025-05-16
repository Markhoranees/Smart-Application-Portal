// src/api/jobs.js
const API_URL = "http://localhost:5000/api/jobs";  // adjust base URL

export const fetchJobs = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
};

export const createJob = async (jobData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(jobData),
  });
  if (!res.ok) throw new Error("Failed to create job");
  return res.json();
};

export const deleteJob = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete job");
  return res.json();
};
