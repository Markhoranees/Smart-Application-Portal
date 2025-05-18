import mongoose from "mongoose";

const InternshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String },
  category: { type: String },
  description: { type: String, required: true },
  applicationLink: { type: String, required: true },
  closingDate: { type: Date ,required: true},
  image: { type: String , required :true}, // filename or URL of uploaded image
}, { timestamps: true });

export default mongoose.model("Internship", InternshipSchema);
