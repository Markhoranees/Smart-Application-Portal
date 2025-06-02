import Job from "../models/Job.js";
import Scholarship from "../models/Scholarship.js";
import Internship from "../models/Internship.js";

export const getRecommendations = async (req, res) => {
  try {
    const {
      educationLevel,
      educationField,
      location,
      skills,
      category,
      onsite,
      remote,
      gpaRequirement,
      eligibleCountry,
      duration,
    } = req.query;

    const skillsArray = skills
      ? skills.split(",").map((s) => s.trim().toLowerCase())
      : [];

    let jobFilter = {};
    let scholarshipFilter = {};
    let internshipFilter = {};

    if (category === "job" || !category) {
      jobFilter = {};
      if (location) jobFilter.location = new RegExp(location, "i");
      if (skillsArray.length) {
        jobFilter.skillsRequirement = {
          $regex: skillsArray.map((s) => `(?=.*${s})`).join(""),
          $options: "i",
        };
      }
      if (onsite !== undefined) jobFilter.onsite = onsite === "true";
      if (educationLevel) jobFilter.educationLevel = educationLevel;
      if (educationField) jobFilter.educationField = educationField;
    }

    if (category === "scholarship" || !category) {
      scholarshipFilter = {};
      if (educationLevel) scholarshipFilter.educationLevel = educationLevel;
      if (educationField) scholarshipFilter.educationField = educationField;
      if (gpaRequirement) scholarshipFilter.gpaRequirement = { $lte: Number(gpaRequirement) };
      if (eligibleCountry)
        scholarshipFilter.eligibleCountries = new RegExp(eligibleCountry, "i");
    }

    if (category === "internship" || !category) {
      internshipFilter = {};
      if (location) internshipFilter.location = new RegExp(location, "i");
      if (educationLevel) internshipFilter.educationLevel = educationLevel;
      if (educationField) internshipFilter.educationField = educationField;
      if (skillsArray.length) internshipFilter.skillsRequired = { $all: skillsArray };
      if (remote !== undefined) internshipFilter.remote = remote === "true";
      if (duration) internshipFilter.duration = new RegExp(duration, "i");
    }

    const jobs = category === "job" || !category ? await Job.find(jobFilter).limit(10) : [];
    const scholarships = category === "scholarship" || !category ? await Scholarship.find(scholarshipFilter).limit(10) : [];
    const internships = category === "internship" || !category ? await Internship.find(internshipFilter).limit(10) : [];

    res.json({ jobs, scholarships, internships });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({ error: "Server error" });
  }
};
