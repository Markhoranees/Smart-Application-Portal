// src/api/jobs.js
const API_URL = "http://localhost:5000/api/jobs";  // adjust base URL

export const fetchJobs = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
};


export const fetchJobDetails = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch job details");
  return res.json();
};



export const createJob = async (jobData) => {
  // jobData should be FormData instance
  const res = await fetch(API_URL, {
    method: "POST",
    body: jobData, // send FormData directly, no JSON.stringify
  });
  if (!res.ok) throw new Error("Failed to create job");
  return res.json();
};

export const deleteJob = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete job");
  return res.json();
};
