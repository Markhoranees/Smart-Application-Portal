import express from "express";
import upload from "../middlewares/upload.js";
import { createScholarship, getAllScholarships, getScholarshipById, deleteScholarshipById } from "../controllers/scholarshipsController.js";

const router = express.Router();

router.get("/", getAllScholarships);
router.post("/", upload.single("image"), createScholarship); // multer expects field 'image'
router.get("/:id", getScholarshipById);
router.delete("/:id", deleteScholarshipById);

export default router;
