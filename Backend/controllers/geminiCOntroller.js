import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import User from "../model/userModel.js"; // Assuming there's a User model for user details
import Job from "../model/jobModel.js"; // Assuming Job model for job listings
import Internship from "../model/internshipModel.js"; // Assuming Internship model for internship listings
import Scholarship from "../model/scholarshipModel.js"; // Assuming Scholarship model for scholarship listings

dotenv.config();
const GEMINI_API_KEY = AIzaSyBXI-s8XSwlkKZrqtGz06p-y20AlDTbQ9A;

export const getRecommendations = async (req, res) => {
  try {
    console.log("🔹 Request received for recommendations");

    const { userId } = req.user; // Assuming userId is available in the request session

    // Fetch user's CV and details from the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const cvFilePath = user.cvUrl; // Assuming cvUrl stores the file path to the user's CV
    if (!cvFilePath) {
      return res.status(400).json({ error: "CV is required for recommendations" });
    }

    // Read and encode the CV in base64
    const cvBase64 = fs.readFileSync(cvFilePath, "base64");

    // Gather user details for analysis
    const userDetails = {
      skills: user.skills,
      location: user.location,
      educationLevel: user.educationLevel,
      educationField: user.educationField,
      workExperience: user.workExperience,
      professionalSummary: user.professionalSummary,
    };

    // Call Gemini API for analyzing CV and user details
    const { data } = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              { text: `Analyze this CV and user profile to recommend suitable jobs, internships, and scholarships.` },
              { inline_data: { mime_type: "application/pdf", data: cvBase64 } },
              { text: `User Details: ${JSON.stringify(userDetails)}` },
            ],
          },
        ],
      }
    );

    const recommendations = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No recommendations found.";

    console.log("🔹 Recommendations:", recommendations);

    // Retrieve the list of all jobs, internships, and scholarships
    const jobs = await Job.find();
    const internships = await Internship.find();
    const scholarships = await Scholarship.find();

    // Filter the recommendations based on analysis
    const recommendedJobs = jobs.filter((job) => recommendations.includes(job.title));
    const recommendedInternships = internships.filter((internship) => recommendations.includes(internship.title));
    const recommendedScholarships = scholarships.filter((scholarship) => recommendations.includes(scholarship.title));

    res.status(200).json({
      message: "Recommendations generated successfully!",
      recommendedJobs,
      recommendedInternships,
      recommendedScholarships,
    });

  } catch (error) {
    console.error("❌ Error in generating recommendations:", error);
    res.status(500).json({ error: "Server error" });
  }
};
