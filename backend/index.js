import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

// ✅ Correct import paths based on your files
import feedbackRoutes from "./routes/feedbackRoutes.js";
import adminRoutes from "./routes/adminRoutes.js" 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Route setup
app.use("/feedback", feedbackRoutes);
app.use("/admin", adminRoutes)

// DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.log("DB Error:", err.message));


  app.get("/", (req, res) => {
  res.send("Backend is working");
});
