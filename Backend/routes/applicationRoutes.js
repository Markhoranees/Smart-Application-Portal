// --- backend/routes/applicationRoutes.js ---
import express from 'express';
import upload from '../middlewares/upload.js';
import Application from '../models/Application.js';
import { Job, Scholarship, Internship } from '../models/Opportunities.js';
import { requireAuth } from '../middlewares/requireAuth.js';

const router = express.Router();

const cpUpload = upload.fields([
  { name: 'cvFile', maxCount: 1 },
  { name: 'additionalFiles', maxCount: 5 },
]);

router.post('/apply', requireAuth, cpUpload,  async (req, res) => {
  try {
    const {
      fullName, email, phone, address,
      educationLevel, fieldOfStudy, institution, graduationYear,
      motivation, workExperience, financialStatus,
      category, appliedForId
    } = req.body;

    if (!req.files || !req.files.cvFile) {
      return res.status(400).json({ error: 'CV file is required.' });
    }

    const cvFilePath = req.files.cvFile[0].path;
    const additionalDocsUrls = (req.files.additionalFiles || []).map(file => file.path);

    let referenceDoc;
    switch (category) {
      case 'job':
        referenceDoc = await Job.findById(appliedForId);
        break;
      case 'scholarship':
        referenceDoc = await Scholarship.findById(appliedForId);
        break;
      case 'internship':
        referenceDoc = await Internship.findById(appliedForId);
        break;
      default:
        return res.status(400).json({ error: 'Invalid category type.' });
    }

    if (!referenceDoc) {
      return res.status(404).json({ error: 'Referenced opportunity not found.' });
    }

    const application = new Application({
      userId: req.user.id,
      fullName,
      email,
      phone,
      address,
      education: {
        level: educationLevel,
        field: fieldOfStudy,
        institution,
        graduationYear: Number(graduationYear),
      },
      cvUrl: cvFilePath,
      additionalDocsUrls,
      motivation,
      workExperience,
      financialStatus,
      category,
      appliedForId,
      appliedDetails: referenceDoc.toObject(),
    });

    await application.save();
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Application submission error:', error);
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

export default router;
