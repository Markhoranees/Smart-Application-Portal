import Job from "../models/Job.js";




export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Post a new job (with file upload handling)
export const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      category,
      description,
      email,
      skillsRequired,
      onsite,
      salary,
      closingDate,
      // Removed companyDetailsName, website, tagline, jobTags
    } = req.body;

    // Create new Job instance
    const newJob = new Job({
      title,
      company,
      location,
      category,
      description,
      email,
       skillsRequired,
      onsite,
      salary,
      closingDate: closingDate ? new Date(closingDate) : undefined,
      image: req.file ? req.file.filename : null,  // multer adds file info here
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a job by ID
export const deleteJobById = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
