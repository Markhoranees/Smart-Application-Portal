import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String ,required: true },
  onsite: { type: Boolean, default: false , required: true }, 
 
  category: { type: String,  enum: ["full-time", "part-time", "contract", ] },
skillsRequired: { type: [String], required: true },
  educationLevel: { type: String }, // e.g., Bachelor, Master
  educationField: { type: String }, // e.g., Computer Science, Engineering
  salary: { type: String ,required: true }, 
  experienceLevel: {
  type: String,
  enum: ["entry-level", "mid-level", "senior-level", "internship", "manager", "director"],
  default: "entry-level",
  required: true
},
  description: { type: String, required: true },
  email: { type: String, required: true },
  closingDate: { type: Date ,required: true },
  image: { type: String, required:true}, 
}, { timestamps: true });

export default mongoose.model("Job", JobSchema);

