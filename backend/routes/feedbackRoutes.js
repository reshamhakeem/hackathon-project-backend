import express from "express";
import Feedback from "../models/Feedback.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /feedback - public route
router.post("/", async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /feedbacks - protected route
router.get("/", verifyToken, async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
