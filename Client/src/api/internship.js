const API_URL = "http://localhost:5000/api/internships";  // Adjust base URL accordingly
export const fetchInternships = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch internships");
  return res.json();
};  
export const createInternship = async (internshipData) => {
  // internshipData should be a FormData instance (for file uploads)
  const res = await fetch(API_URL, {
    method: "POST",
    body: internshipData, // send as FormData, no JSON.stringify
  });
  if (!res.ok) throw new Error("Failed to create internship");
  return res.json();
};
export const deleteInternship = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete internship");
  return res.json();
};
export const fetchInternshipDetails = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch internship details");
  return res.json();
};

