import React, { useEffect, useState } from "react";
import ScholarshipsList from "../components/scholarships/ScholarshipsList";

const ScholarshipsPage = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/scholarships");
        if (!res.ok) throw new Error("Failed to fetch scholarships");
        const data = await res.json();
        setScholarships(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading scholarships...</p>;
  if (error) return <p className="text-center mt-5 text-danger">Error: {error}</p>;

  return <ScholarshipsList scholarships={scholarships} />;
};

export default ScholarshipsPage;
