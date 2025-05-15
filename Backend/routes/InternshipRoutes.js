import express from "express";
import {getAllInternships,createInternship, deleteInternshipById} from "../controllers/internshipsController.js";

const router = express.Router();

router.get("/", getAllInternships);
router.post("/", createInternship);
router.delete("/:id", deleteInternshipById);

export default router;
