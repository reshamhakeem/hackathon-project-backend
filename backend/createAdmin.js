import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Admin from "./models/Admin.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const hashedPassword = await bcrypt.hash("admin123", 10); 

    const newAdmin = new Admin({
      username: "admin",
      password: hashedPassword,
    });

    await newAdmin.save();
    console.log("Admin created successfully");
    process.exit();
  })
  .catch((err) => {
    console.error("Error:", err.message);
    process.exit();
  });
