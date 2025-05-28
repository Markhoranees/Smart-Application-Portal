const API_URL = "http://localhost:5000/api/applications";

export const submitApplication = async (formData, token) => {
  const res = await fetch(`${API_URL}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to submit application");
  return res.json();
};

// export const fetchUserApplications = async (token) => {
//   const res = await fetch(`${API_URL}/user`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   if (!res.ok) throw new Error("Failed to fetch user applications");
//   return res.json();
// };
