import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import JobRoutes from './routes/JobRoutes.js';
import ScholarshipRoutes from './routes/ScholarshipRoutes.js';
import InternshipRoutes from './routes/InternshipRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import applyRoutes from './routes/apply.js';  // <-- Import apply route

import path from 'path';
import admin from './middlewares/admin.js';

dotenv.config();

const app = express();

(async () => {
  try {
    // Connect to DB before starting server to avoid accepting requests without DB
    await connectDB();
    console.log('Database connected successfully.');

    // Middleware
    app.use(cors({
      // optionally restrict origin in production
      methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
      credentials: true,
    }));
    app.use(express.json());

    // Serve static files from uploads folder
    app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

    // API Routes
    app.use('/api/jobs', JobRoutes);
    app.use('/api/scholarships', ScholarshipRoutes);
    app.use('/api/internships', InternshipRoutes);

    app.use('/api/apply', applyRoutes);   // <-- Apply route with multer upload

    app.use('/api/admin', admin, adminRoutes);

    // Base Route
    app.get('/', (req, res) => {
      res.send('Welcome to the Job Portal API');
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1); // Exit if DB connection or server setup fails
  }
})();
