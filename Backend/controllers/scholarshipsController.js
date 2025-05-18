import Scholarship from "../models/Scholarship.js";

// Get all scholarships
export const getAllScholarships = async (req, res) => {
  try {
    const scholarships = await Scholarship.find().sort({ createdAt: -1 });
    res.json(scholarships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a scholarship by ID
export const getScholarshipById = async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);
    if (!scholarship) {
      return res.status(404).json({ message: "Scholarship not found" });
    }
    res.json(scholarship);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createScholarship = async (req, res) => {
  try {
    const { title, provider, description, applicationLink, eligibility, closingDate } = req.body;

    const newScholarship = new Scholarship({
      title,
      provider,
      description,
      applicationLink,
      eligibility,
      closingDate: closingDate ? new Date(closingDate) : undefined,
      image: req.file ? req.file.filename : null, // multer adds the file info here
    });

    const savedScholarship = await newScholarship.save();
    res.status(201).json(savedScholarship);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Delete a scholarship by ID
export const deleteScholarshipById = async (req, res) => {
  try {
    await Scholarship.findByIdAndDelete(req.params.id);
    res.json({ message: "Scholarship deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
