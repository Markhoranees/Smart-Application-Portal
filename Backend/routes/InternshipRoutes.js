import express from "express";
import {getAllInternships,createInternship, deleteInternshipById,getInternshipById} from "../controllers/internshipsController.js";
import upload from "../middlewares/upload.js";


const router = express.Router();

router.get("/", getAllInternships);
router.post("/", upload.single("image"), createInternship);
router.delete("/:id", deleteInternshipById);
router.get("/:id", getInternshipById);


export default router;
