import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   appliedForId: { type: mongoose.Schema.Types.ObjectId, required: true },

  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String },

  education: {
    level: { type: String, required: true },
    field: { type: String, required: true },
    institution: { type: String, required: true },
    graduationYear: { type: Number, required: true },
  },

  cvUrl: { type: String, required: true },
  additionalDocsUrls: [{ type: String }],

  motivation: { type: String },
  workExperience: { type: String },
  financialStatus: { type: String },

  status: { type: String, enum: ['pending', 'reviewed', 'accepted', 'rejected'], default: 'pending' },
  appliedAt: { type: Date, default: Date.now },
});


const Application = mongoose.model('Application', applicationSchema);
export default Application;
