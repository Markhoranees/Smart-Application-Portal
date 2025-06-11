// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  skills: { type: String },
  location: { type: String },
  educationLevel: { type: String },
  educationField: { type: String },
  workExperience: { type: String },
  professionalSummary: { type: String },
  cvUrl: { type: String },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
