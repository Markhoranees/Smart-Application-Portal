import axios from "axios";
import fs from "fs";
import Job from "../models/Job.js";
import Internship from "../models/Internship.js";
import Scholarship from "../models/Scholarship.js";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export const generateRecommendations = async (user, userDetails, cvBase64) => {
  try {
    console.log("🤖 Calling Gemini API...");
    console.log("📝 Request payload:", {
      userDetails,
      cvSize: cvBase64.length,
      hasSkills: userDetails.skills.length > 0,
      hasSummary: !!userDetails.professionalSummary
    });

    const { data } = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              { 
                text: `Analyze this CV and user profile to recommend suitable jobs, internships, and scholarships.
                Focus on matching the user's skills, education, and experience with available opportunities.
                Consider the user's location and education level when making recommendations.
                
                IMPORTANT: Return ONLY a valid JSON object without any markdown formatting or code blocks.
                The response should be a direct JSON object in this exact format:
                {
                  "jobTitles": ["title1", "title2"],
                  "internshipTitles": ["title1", "title2"],
                  "scholarshipTitles": ["title1", "title2"]
                }
                
                Do not include any markdown syntax, code blocks, or additional text.`
              },
              { inline_data: { mime_type: "application/pdf", data: cvBase64 } },
              { text: `User Details: ${JSON.stringify(userDetails)}` },
            ],
          },
        ],
      }
    );

    console.log("✅ Gemini API response received");
    console.log("📝 Response data:", {
      hasCandidates: !!data?.candidates,
      candidateCount: data?.candidates?.length,
      hasContent: !!data?.candidates?.[0]?.content,
      hasParts: !!data?.candidates?.[0]?.content?.parts,
      partsCount: data?.candidates?.[0]?.content?.parts?.length
    });

    const recommendations = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!recommendations) {
      throw new Error("No recommendations generated from Gemini API");
    }

    // Clean the recommendations string by removing any markdown or extra text
    const cleanedRecommendations = recommendations
      .replace(/```json\n?/g, '')  // Remove opening ```json
      .replace(/```\n?/g, '')      // Remove closing ```
      .replace(/^[^{]*/, '')       // Remove any text before the first {
      .replace(/[^}]*$/, '')       // Remove any text after the last }
      .trim();                     // Remove any extra whitespace

    // Parse recommendations from Gemini API response
    let parsedRecommendations;
    try {
      parsedRecommendations = JSON.parse(cleanedRecommendations);
      if (!parsedRecommendations.jobTitles || !parsedRecommendations.internshipTitles || !parsedRecommendations.scholarshipTitles) {
        throw new Error("Invalid recommendations structure");
      }
      console.log("✅ Recommendations parsed successfully:", {
        jobCount: parsedRecommendations.jobTitles?.length || 0,
        internshipCount: parsedRecommendations.internshipTitles?.length || 0,
        scholarshipCount: parsedRecommendations.scholarshipTitles?.length || 0
      });
    } catch (error) {
      console.error("❌ Error parsing recommendations:", error);
      console.error("📝 Raw recommendations:", cleanedRecommendations);
      throw new Error("Invalid recommendations format from Gemini API");
    }

    return parsedRecommendations;
  } catch (error) {
    console.error("❌ Gemini API error:", error.message);
    console.error("🔍 Error details:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers
    });
    throw error;
  }
};

export const getMatchingOpportunities = async (parsedRecommendations) => {
  try {
    console.log("🔍 Fetching opportunities from database...");
    let jobs, internships, scholarships;
    try {
      [jobs, internships, scholarships] = await Promise.all([
        Job.find(),
        Internship.find(),
        Scholarship.find()
      ]);
      console.log(`📊 Found ${jobs.length} jobs, ${internships.length} internships, ${scholarships.length} scholarships`);
    } catch (error) {
      console.error("❌ Database error:", error);
      throw new Error("Failed to fetch opportunities from database");
    }

    // Filter recommendations based on titles
    const recommendedJobs = jobs.filter(job => 
      parsedRecommendations.jobTitles?.includes(job.title)
    );
    const recommendedInternships = internships.filter(internship => 
      parsedRecommendations.internshipTitles?.includes(internship.title)
    );
    const recommendedScholarships = scholarships.filter(scholarship => 
      parsedRecommendations.scholarshipTitles?.includes(scholarship.title)
    );

    console.log(`📊 Filtered to ${recommendedJobs.length} jobs, ${recommendedInternships.length} internships, ${recommendedScholarships.length} scholarships`);

    return {
      recommendedJobs,
      recommendedInternships,
      recommendedScholarships,
      allJobs: jobs,
      allInternships: internships,
      allScholarships: scholarships
    };
  } catch (error) {
    console.error("❌ Error in getting matching opportunities:", error);
    throw error;
  }
}; 