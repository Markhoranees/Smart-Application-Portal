// routes/adminRoutes.js
import express from 'express';
import admin from '../middlewares/admin.js';
import { getAllJobs, createJob,  deleteJobById } from '../controllers/jobsController.js';
import { getAllInternships, createInternship,  deleteInternshipById } from '../controllers/internshipsController.js';
import { getAllScholarships, createScholarship, deleteScholarshipById } from '../controllers/scholarshipsController.js';

const router = express.Router();



// Jobs Routes
router.get('/jobs', admin, getAllJobs);
router.post('/jobs', admin, createJob);

router.delete('/jobs/:id', admin, deleteJobById);

// Internships Routes
router.get('/internships', admin, getAllInternships);
router.post('/internships', admin, createInternship);
router.delete('/internships/:id', admin, deleteInternshipById);

// Scholarships Routes
router.get('/scholarships', admin, getAllScholarships);
router.post('/scholarships', admin, createScholarship);
router.delete('/scholarships/:id', admin, deleteScholarshipById);

export default router;
