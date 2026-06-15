import express from "express";
import { generateResponse } from "../APIcall.js";

const router = express.Router();

router.post("/test", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const response = await generateResponse(message);

    return res.status(200).json({
      reply: response,
    });

  } catch (err) {
    console.error("Route Error:", err);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

export default router;