import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  companyName: { type: String, required: true },
  location: String,
   jobRole: [String],
  description: { type: String, required: true },
  applicationEmail: { type: String, required: true },
  closingDate: Date,
  companyDetailsName: { type: String, required: true },
  website: String,
  tagline: String,
  file: String, // for filename or file URL
}, { timestamps: true });

export default mongoose.model("Job", JobSchema);
