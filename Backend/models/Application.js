import mongoose from "mongoose";

// Mongoose Schema for Application
const applicationSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Clerk user ID

  appliedForId: { type: String, required: true }, // ID of the job/internship/scholarship being applied to
  category: { type: String, enum: ['job', 'internship', 'scholarship'], required: true },

  fullName: { type: String, required: true },    // Applicant's full name
  email: { type: String, required: true },       // Applicant's email address
  phone: { type: String, required: true },       // Applicant's phone number
  address: { type: String },                      // Applicant's address (optional)

  education: {                                   // Nested education object
    level: { type: String, required: true },        // Education level (e.g., "BSc", "Master")
    field: { type: String, required: true },        // Field of study (e.g., "Computer Science")
    institution: { type: String, required: true },  // Name of the educational institution
    graduationYear: { type: String, required: true }, // Graduation year (stored as a number)
  },

  cvUrl: { type: String, required: true },          // File path or URL of uploaded CV (required)
  additionalDocsUrls: [{ type: String }],            // Array of paths or URLs for additional uploaded documents

  motivation: { type: String },                     // Applicant's motivation letter or statement (optional)
  workExperience: { type: String },                 // Work experience details (optional)
  financialStatus: { type: String },                // Financial status information (optional)

  status: {                                         // Application status with default value
    type: String,
    enum: ['pending', 'reviewed', 'accepted', 'rejected'],
    default: 'pending',
  },

  appliedAt: { type: Date, default: Date.now },    // Timestamp when application was submitted (defaults to now)
});

export default mongoose.model("Application", applicationSchema);
