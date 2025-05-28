import mongoose from "mongoose";

const ScholarshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  provider: { type: String, required: true },
  educationLevel: { type: String },    // e.g., Bachelor, Master
  educationField: { type: String },
  eligibleCountries: { type: [String] }, // array of country names
  description: { type: String, required: true },
  applicationLink: { type: String, required: true },
  eligibility: { type: String, required: true },
    gpaRequirement: { type: Number },
  closingDate: { type: Date },
  image: { type: String }, // store filename or URL of uploaded image
}, { timestamps: true });

export default mongoose.model("Scholarship", ScholarshipSchema);
