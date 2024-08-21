const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS for all origins
app.use(express.json());

app.post("/api/chatbot", async (req, res) => {
  const userMessage = req.body.message;
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: userMessage,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Extract the relevant part of the response
    const reply = response["data"]["candidates"][0]["content"]["parts"][0]["text"];
    res.json({ reply });

  } catch (error) {
    console.error(
      "Error communicating with the Google Gemini API:",
    );
    res.status(500).json({ error: "Failed to fetch response from API" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
