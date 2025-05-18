import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String },
  category: { type: String },
  description: { type: String, required: true },
  applicationEmail: { type: String, required: true },
  closingDate: { type: Date },
  image: { type: String }, // store filename or URL of uploaded image
}, { timestamps: true });

export default mongoose.model("Job", JobSchema);
