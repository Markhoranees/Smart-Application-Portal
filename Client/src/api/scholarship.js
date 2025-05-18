const API_URL = "http://localhost:5000/api/scholarships";  // Adjust base URL accordingly

export const fetchScholarships = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch scholarships");
  return res.json();
};

export const createScholarship = async (scholarshipData) => {
  // scholarshipData should be a FormData instance (for file uploads)
  const res = await fetch(API_URL, {
    method: "POST",
    body: scholarshipData, // send as FormData, no JSON.stringify
  });
  if (!res.ok) throw new Error("Failed to create scholarship");
  return console.log(res.json());
};



export const deleteScholarship = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete scholarship");
  return res.json();
};
