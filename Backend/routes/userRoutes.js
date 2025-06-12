// routes/userRoutes.js
import express from 'express';
import { requireAuth } from '@clerk/express';  // Clerk's authentication middleware
import upload from '../middlewares/upload.js';  // Multer config for file uploads
import { updateUserDetails, uploadCv, getUserDetails } from '../controllers/userController.js';
import { getRecommendations } from '../controllers/geminiController.js';

const router = express.Router();

// Route to fetch user details
router.get('/profile', requireAuth(), getUserDetails);

// Route to update user details
router.put('/update-profile', requireAuth(), updateUserDetails);

// Route to upload CV
router.post('/upload-cv', requireAuth(), upload.single('cvFile'), uploadCv);

// Route for AI recommendations
router.post('/recommendations', requireAuth(), getRecommendations);

export default router;
