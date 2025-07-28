import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import feedbackRoutes from "./routes/feedbackRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Setup CORS properly to allow frontend domain
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://storied-bublanina-a3053c.netlify.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


app.use(express.json());

// Routes
app.use("/feedback", feedbackRoutes);
app.use("/admin", adminRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend is working");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log("DB Error:", err.message));
