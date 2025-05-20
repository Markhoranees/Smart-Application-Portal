import React, { useEffect, useState } from "react";
import InternshipsList from "../components/internship/InternshipsList";

const InternshipsPage = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/internships");
        if (!res.ok) throw new Error("Failed to fetch internships");
        const data = await res.json();
        setInternships(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading internships...</p>;
  if (error) return <p className="text-center mt-5 text-danger">Error: {error}</p>;

  return <InternshipsList internships={internships} />;
};

export default InternshipsPage;
