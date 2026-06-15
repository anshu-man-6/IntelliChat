import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./utils/Databaseconn.js";
import chatRoute from "./routes/chat.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.use(cors());

// Routes
app.use("/api", chatRoute);


// Start server
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log("Database connected successfully");
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error("Database connection failed:", error);
  }
});