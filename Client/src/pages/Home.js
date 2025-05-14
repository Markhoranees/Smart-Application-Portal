import React from "react";
import Header from "../components/common/Header";
import HeroSection from "../components/HeroSection";
import JobFeatures from "../components/jobs/JobFeatures";
import Footer from "../components/common/Footer";

const Home = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <JobFeatures />
      <Footer />
    </>
  );
};

export default Home; // ✅ Correctly exporting the Home component
