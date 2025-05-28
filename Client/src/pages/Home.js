import React from "react";
import HeroSection from "../components/HeroSection";
import JobFeatures from "../components/jobs/JobFeatures";
import RecommendationLanding from "../components/RecommendationLanding";

const Home = () => {
  return (
    <>
  
      <HeroSection />
      <RecommendationLanding/>
      <JobFeatures />
     
    </>
  );
};

export default Home; 
