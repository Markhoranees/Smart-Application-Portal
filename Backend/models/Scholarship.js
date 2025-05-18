import mongoose from "mongoose";

const ScholarshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  provider: { type: String, required: true },
  description: { type: String, required: true },
  applicationLink: { type: String, required: true },
  eligibility: { type: String, required: true },
  closingDate: { type: Date },
  image: { type: String }, // store filename or URL of uploaded image
}, { timestamps: true });

export default mongoose.model("Scholarship", ScholarshipSchema);
