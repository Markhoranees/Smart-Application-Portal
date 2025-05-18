import express from "express";
import { getAllJobs,getJobById, createJob, deleteJobById } from "../controllers/jobsController.js";
import upload from "../middlewares/upload.js";


const router = express.Router();

router.get("/", getAllJobs);
router.post("/", upload.single("image"), createJob);
router.delete("/:id", deleteJobById);
router.get("/:id", getJobById);
export default router;
