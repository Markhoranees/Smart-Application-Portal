import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import JobFeatures from "../components/JobFeatures";
import RecentJobs from "../components/RecentJobs";
import StatsSection from "../components/StatsSection";
import RecentBlog from "../components/RecentBlog";
import HappyClients from "../components/HappyClients";
import Footer from "../components/Footer";
import HowItWorks from "../components/HowItWorks";

export const Home = () => {
  return (
    <>
      <Header />
      <HeroSection />
     <JobFeatures/>
     <HowItWorks/>
     <RecentJobs/>
     <StatsSection/>
     <RecentBlog/>
     <HappyClients/>
     <Footer/>
     
    </>
  );
};
