import React, { useState } from 'react';
import { useUser, useAuth } from "@clerk/clerk-react";
import axios from "axios";
import "../../assets/styles/Header.css";

const RecommendationsButton = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecommendations = async () => {
    if (!user) {
      alert("Please sign in to get recommendations.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const token = await getToken();
      const response = await axios.post(
        "http://localhost:5000/api/userinfo/recommendations",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Redirect to recommendations page with the data
      window.location.href = `/recommendations?data=${encodeURIComponent(JSON.stringify(response.data))}`;
    } catch (error) {
      let errorMessage = "Failed to fetch recommendations. Please try again later.";
      if (error.response?.status === 404) {
        errorMessage = "Recommendations endpoint not found. Please check the server configuration.";
      } else if (error.response?.status === 401) {
        errorMessage = "Authentication failed. Please sign in again.";
      } else if (error.response?.status === 500) {
        errorMessage = "Server error. Please try again later or contact support.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ai-recommendations-btn">
      <button 
        onClick={fetchRecommendations}
        disabled={isLoading}
        className={isLoading ? 'loading' : ''}
      >
        {isLoading ? 'Loading...' : 'Get Smart Career Recommendations'}
      </button>
    </div>
  );
};

export default RecommendationsButton; 