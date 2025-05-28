import Application from "../models/Application.js";

// Function to handle application submission
export const submitApplication = async (req, res) => {
  try {
    // Destructure the fields from the request body
    const {
      fullName,
      email,
      phone,
      address,
      educationLevel,
      educationField,
      educationInstitution,
      educationGraduationYear,
      motivation,
      workExperience,
      financialStatus,
      category,
      appliedForId,
    } = req.body;

    // Ensure all required fields are present
    if (!educationLevel || !educationField || !educationInstitution || !educationGraduationYear) {
      return res.status(400).json({ error: "All education fields are required." });
    }

    // Ensure the graduation year is a valid number
    const graduationYear = Number(educationGraduationYear);
    if (isNaN(graduationYear)) {
      return res.status(400).json({ error: "Graduation Year must be a valid number." });
    }

    // Ensure CV file is provided
    if (!req.files || !req.files.cvFile || req.files.cvFile.length === 0) {
      return res.status(400).json({ error: "CV file is required." });
    }

    const cvFilePath = req.files.cvFile[0].path;
    const additionalDocsUrls = (req.files.additionalFiles || []).map((file) => file.path);

    // Create the education object
    const education = {
      level: educationLevel,
      field: educationField,
      institution: educationInstitution,
      graduationYear,
    };

    // Create a new application
    const application = new Application({
      userId: req.auth?.userId || req.auth?.user_id, // Clerk user ID
      fullName,
      email,
      phone,
      address,
      education,
      cvUrl: cvFilePath,
      additionalDocsUrls,
      motivation,
      workExperience,
      financialStatus,
      category,
      appliedForId,
    });

    // Save the application to the database
    await application.save();

    // Return success message
    res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

// Function to fetch user's applications
export const fetchUserApplications = async (req, res) => {
  try {
    const userId = req.auth?.userId || req.auth?.user_id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    // Fetch applications for the logged-in user, sorted by application date
    const applications = await Application.find({ userId }).sort({ appliedAt: -1 });
    res.json(applications);
  } catch (error) {
    console.error("Error fetching user applications:", error);
    res.status(500).json({ error: "Server error" });
  }
};
