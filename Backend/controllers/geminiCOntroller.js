import dotenv from "dotenv";
import fs from "fs";
import User from "../models/User.js";
import { generateRecommendations, getMatchingOpportunities } from "../services/recommendationService.js";

dotenv.config();

// Validate environment variables
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY is not set in environment variables");
  process.exit(1);
}

export const getRecommendations = async (req, res) => {
  try {
    console.log("🔹 Request received for recommendations");

    // Get user ID from Clerk session
    const userId = req.auth.userId;
    if (!userId) {
      console.error("❌ No user ID found in request");
      return res.status(401).json({ 
        error: "Authentication required",
        message: "Please sign in to get recommendations"
      });
    }

    console.log("👤 User ID:", userId);

    // Fetch user's details from the database using Clerk ID
    const user = await User.findOne({ userId: userId });
    if (!user) {
      console.error("❌ User not found in database");
      return res.status(404).json({ 
        error: "User not found",
        message: "User profile not found. Please complete your profile setup."
      });
    }

    console.log("✅ User found:", user.email);

    // Validate CV
    if (!user.cvUrl) {
      console.error("❌ No CV found for user");
      return res.status(400).json({ 
        error: "CV is required",
        message: "Please upload your CV first to get personalized recommendations"
      });
    }

    // Validate CV file exists
    if (!fs.existsSync(user.cvUrl)) {
      console.error("❌ CV file not found at path:", user.cvUrl);
      return res.status(400).json({ 
        error: "CV file not found",
        message: "Your CV file appears to be missing. Please upload it again."
      });
    }

    // Read and encode the CV in base64
    let cvBase64;
    try {
      cvBase64 = fs.readFileSync(user.cvUrl, "base64");
      console.log("✅ CV file read successfully");
    } catch (error) {
      console.error("❌ Error reading CV file:", error);
      return res.status(500).json({ 
        error: "Error processing CV file",
        message: "There was an error processing your CV. Please try uploading it again."
      });
    }

    // Gather user details for analysis
    const userDetails = {
      skills: user.skills || [],
      location: user.location || "",
      educationLevel: user.educationLevel || "",
      educationField: user.educationField || "",
      workExperience: user.workExperience || "",
      professionalSummary: user.professionalSummary || "",
    };

    console.log("📋 User details gathered:", userDetails);

    // Validate user details
    if (!userDetails.skills.length && !userDetails.professionalSummary) {
      console.error("❌ Insufficient user profile information");
      return res.status(400).json({
        error: "Insufficient profile information",
        message: "Please update your profile with skills and professional summary for better recommendations"
      });
    }

    try {
      // Generate recommendations using the service
      const parsedRecommendations = await generateRecommendations(user, userDetails, cvBase64);
      
      // Get matching opportunities
      const {
        recommendedJobs,
        recommendedInternships,
        recommendedScholarships,
        allJobs,
        allInternships,
        allScholarships
      } = await getMatchingOpportunities(parsedRecommendations);

      // If no recommendations found, return a helpful message
      if (!recommendedJobs.length && !recommendedInternships.length && !recommendedScholarships.length) {
        console.log("ℹ️ No exact matches found, returning sample recommendations");
        return res.status(200).json({
          message: "No exact matches found, but here are some opportunities you might be interested in",
          recommendedJobs: allJobs.slice(0, 3),
          recommendedInternships: allInternships.slice(0, 3),
          recommendedScholarships: allScholarships.slice(0, 3)
        });
      }

      console.log("✅ Sending recommendations response");
      res.status(200).json({
        message: "Recommendations generated successfully!",
        recommendedJobs,
        recommendedInternships,
        recommendedScholarships,
      });

    } catch (error) {
      console.error("❌ Error in generating recommendations:", error);
      console.error("🔍 Error stack:", error.stack);
      console.error("📝 Error details:", {
        name: error.name,
        message: error.message,
        code: error.code,
        response: error.response?.data
      });
      
      if (error.response?.status === 429) {
        return res.status(429).json({ 
          error: "Rate limit exceeded",
          message: "Too many requests. Please try again later."
        });
      }
      
      if (error.response?.status === 400) {
        return res.status(400).json({
          error: "Invalid request",
          message: "There was an error processing your request. Please check your CV and profile information."
        });
      }
      
      if (error.response?.status === 401) {
        return res.status(401).json({
          error: "API key error",
          message: "There was an error with the API configuration. Please contact support."
        });
      }
      
      res.status(500).json({ 
        error: "Server error",
        message: "An unexpected error occurred. Please try again later.",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }

  } catch (error) {
    console.error("❌ Error in generating recommendations:", error);
    console.error("🔍 Error stack:", error.stack);
    console.error("📝 Error details:", {
      name: error.name,
      message: error.message,
      code: error.code,
      response: error.response?.data
    });
    
    res.status(500).json({ 
      error: "Server error",
      message: "An unexpected error occurred. Please try again later.",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
