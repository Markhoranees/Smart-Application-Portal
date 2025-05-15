import mongoose from "mongoose";

const InternshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  companyName: { type: String, required: true },
  location: String,
  duration: { type: String, required: true },
  applicationEmail: { type: String, required: true },
  deadline: Date,
  description: { type: String, required: true },
  document: String,
}, { timestamps: true });

export default mongoose.model("Internship", InternshipSchema);
