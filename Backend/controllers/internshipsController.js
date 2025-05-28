import Internship from "../models/Internship.js";

// Get all internships
export const getAllInternships = async (req, res) => {
  try {
    const internships = await Internship.find().sort({ createdAt: -1 });
    res.json(internships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get internship by ID
export const getInternshipById = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) return res.status(404).json({ message: "Internship not found" });
    res.json(internship);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new internship (with image upload)
export const createInternship = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      duration,
      educationLevel,
      educationField,
      remote,
      skillsRequired, // expect as comma separated string from frontend
      description,
      applicationLink,
      closingDate,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Convert skillsRequired from comma-separated string to array if it's a string
    let skillsArray = [];
    if (skillsRequired) {
      if (typeof skillsRequired === "string") {
        skillsArray = skillsRequired.split(",").map(skill => skill.trim()).filter(Boolean);
      } else if (Array.isArray(skillsRequired)) {
        skillsArray = skillsRequired;
      }
    }

    const newInternship = new Internship({
      title,
      company,
      location,
      duration,
      educationLevel,
      educationField,
      remote: remote === "true" || remote === true, // Convert string boolean to actual boolean
      skillsRequired: skillsArray,
      description,
      applicationLink,
      closingDate: closingDate ? new Date(closingDate) : undefined,
      image: req.file.filename,
    });

    const savedInternship = await newInternship.save();
    res.status(201).json(savedInternship);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an internship by ID
export const deleteInternshipById = async (req, res) => {
  try {
    await Internship.findByIdAndDelete(req.params.id);
    res.json({ message: "Internship deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
