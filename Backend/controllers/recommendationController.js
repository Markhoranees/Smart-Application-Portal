import Job from "../models/Job.js";
import Scholarship from "../models/Scholarship.js";
import Internship from "../models/Internship.js";



export const getRecommendations = async (req, res) => {
  try {
    const {
      category,
      location,
      skills,
      onsite,
      jobCategory,
      educationLevel,
      educationField,
      remote,
      gpaRequirement,
      eligibleCountries,
      duration,
    } = req.query;

    if (!category) {
      return res.status(400).json({ error: "Category parameter is required." });
    }



    // Declare filters upfront to avoid "not defined" errors
    let jobFilter = {};
    let internshipFilter = {};
    let scholarshipFilter = {};

    // Normalize skills array
    const skillsArray = skills
      ? skills.split(",").map((s) => s.trim().toLowerCase())
      : [];

console.log("Received query params:", req.query);
console.log("Built jobFilter:", jobFilter);


    // Prepare result container
    let result = {
      jobs: [],
      internships: [],
      scholarships: [],
    };

    if (category === "job") {
      if (location) jobFilter.location = new RegExp(location, "i");
      if (jobCategory) jobFilter.jobCategory = jobCategory;
      if (onsite !== undefined) jobFilter.onsite = onsite === "true";
      if (educationLevel) jobFilter.educationLevel = educationLevel;
      if (educationField) jobFilter.educationField = educationField;
      if (skillsArray.length) {
        jobFilter.skills = { $all: skillsArray };
      }

      result.jobs = await Job.find(jobFilter).limit(20);
    }
    else if (category === "internship") {
      if (location) internshipFilter.location = new RegExp(location, "i");
      if (educationLevel) internshipFilter.educationLevel = educationLevel;
      if (educationField) internshipFilter.educationField = educationField;
      if (skillsArray.length) internshipFilter.skills = { $all: skillsArray };
      if (remote !== undefined) internshipFilter.remote = remote === "true";
      if (duration) internshipFilter.duration = new RegExp(duration, "i");

      result.internships = await Internship.find(internshipFilter).limit(20);
    }
    else if (category === "scholarship") {
      if (educationLevel) scholarshipFilter.educationLevel = educationLevel;
      if (educationField) scholarshipFilter.educationField = educationField;
      if (gpaRequirement) scholarshipFilter.gpaRequirement = { $lte: Number(gpaRequirement) };
      if (eligibleCountries) scholarshipFilter.eligibleCountries = new RegExp(eligibleCountries, "i");

      result.scholarships = await Scholarship.find(scholarshipFilter).limit(20);
    }
    else {
      return res.status(400).json({ error: "Invalid category value." });
    }

    return res.json(result);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({ error: "Server error" });
  }
};


