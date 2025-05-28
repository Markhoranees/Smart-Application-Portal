import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String  },
  // category can be "full-time", "part-time", "contract", etc.
  category: { type: String,  enum: ["full-time", "part-time", "contract", ] },
  skillsRequired: { type: String, required: true },
  salary: { type: String }, // optional, can be a string or number
  description: { type: String, required: true },


  email: { type: String, required: true },

  closingDate: { type: Date },
  image: { type: String }, // store filename or URL of uploaded image
}, { timestamps: true });

export default mongoose.model("Job", JobSchema);
