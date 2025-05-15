import express from "express";
import { getAllScholarships, createScholarship, deleteScholarshipById } from "../controllers/scholarshipsController.js";


const router = express.Router();

router.get("/", getAllScholarships);
router.post("/", createScholarship);
router.delete("/:id", deleteScholarshipById);



export default router;













