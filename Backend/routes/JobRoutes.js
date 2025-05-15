import express from "express";
import { getAllJobs, createJob, deleteJobById } from "../controllers/jobsController.js";

const router = express.Router();

router.get("/", getAllJobs);
router.post("/", createJob);
router.delete("/:id", deleteJobById);

export default router;
