import Scholarship from "../models/Scholarship.js";

export const getAllScholarships = async (req, res) => {
  try {
    const scholarships = await Scholarship.find().sort({ createdAt: -1 });
    res.json(scholarships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createScholarship = async (req, res) => {
  const scholarship = new Scholarship(req.body);
  try {
    const savedScholarship = await scholarship.save();
    res.status(201).json(savedScholarship);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteScholarshipById = async (req, res) => {
  try {
    await Scholarship.findByIdAndDelete(req.params.id);
    res.json({ message: "Scholarship deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
