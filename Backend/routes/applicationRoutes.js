import express from "express";
import {
  submitApplication,
  fetchUserApplications,
} from "../controllers/applicationController.js";
import { requireAuth } from "@clerk/express";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post(
  "/",
  requireAuth(),
  upload.fields([
    { name: "cvFile", maxCount: 1 },
    { name: "additionalFiles", maxCount: 5 },
  ]),
  submitApplication
);

router.get("/user", requireAuth(), fetchUserApplications);

export default router;
