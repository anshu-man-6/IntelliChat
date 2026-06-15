import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const invokeUrl =
  "https://integrate.api.nvidia.com/v1/chat/completions";

export async function generateResponse(prompt) {
  try {
    if (!prompt || typeof prompt !== "string") {
      throw new Error("Prompt must be a non-empty string");
    }

    const payload = {
      model: "nvidia/llama-3.3-nemotron-super-49b-v1.5",

      messages: [
        {
          role: "system",
          content: `
You are SigmaGPT.

Rules:
- Use normal markdown formatting.
- Never use LaTeX notation.
- Use code blocks only for code.
- Use bullet points when needed.
- Keep answers clean, concise, and readable.
`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],

      max_tokens: 3047,
    };

    const response = await axios.post(
      invokeUrl,
      payload,
      {
        headers: {
          Authorization: process.env.NVIDIA_API_KEY,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const reply =
      response.data?.choices?.[0]?.message?.content ||
      "No response generated.";

    console.log("AI Reply:", reply);

    return reply;
  } catch (error) {
    console.error("NVIDIA API Error:");

    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }

    throw error;
  }
}