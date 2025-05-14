// routes/adminRoutes.js
import express from 'express';
import adminMiddleware from '../middlewares/adminMiddleware.js';
import { getAllJobs, createJob, updateJob, deleteJob } from '../controllers/jobController.js';
import { getAllInternships, createInternship, updateInternship, deleteInternship } from '../controllers/internshipController.js';
import { getAllScholarships, createScholarship, updateScholarship, deleteScholarship } from '../controllers/scholarshipController.js';

const router = express.Router();

// Jobs Routes
router.get('/jobs', adminMiddleware, getAllJobs);
router.post('/jobs', adminMiddleware, createJob);
router.put('/jobs/:id', adminMiddleware, updateJob);
router.delete('/jobs/:id', adminMiddleware, deleteJob);

// Internships Routes
router.get('/internships', adminMiddleware, getAllInternships);
router.post('/internships', adminMiddleware, createInternship);
router.put('/internships/:id', adminMiddleware, updateInternship);
router.delete('/internships/:id', adminMiddleware, deleteInternship);

// Scholarships Routes
router.get('/scholarships', adminMiddleware, getAllScholarships);
router.post('/scholarships', adminMiddleware, createScholarship);
router.put('/scholarships/:id', adminMiddleware, updateScholarship);
router.delete('/scholarships/:id', adminMiddleware, deleteScholarship);

export default router;
