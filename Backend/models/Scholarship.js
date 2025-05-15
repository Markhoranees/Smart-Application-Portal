import mongoose from "mongoose";

const ScholarshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  provider: { type: String, required: true },
  eligibility: { type: String, required: true },
  amount: Number,
  applicationLink: { type: String, required: true },
  deadline: Date,
  description: { type: String, required: true },
  document: String,
}, { timestamps: true });

export default mongoose.model("Scholarship", ScholarshipSchema);
