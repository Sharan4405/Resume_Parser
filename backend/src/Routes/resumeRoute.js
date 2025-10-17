import express from 'express';
import { parseResume } from '../Controllers/resumeController.js';
import upload from '../Middlewares/uploadMiddleware.js';

const router = express.Router();

// Define the endpoint for resume parsing
router.post("/parse-resume", upload.single('resume'), parseResume);

export default router;

