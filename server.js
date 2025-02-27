require("dotenv").config();
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai"); // ✅ Correct way to import OpenAI SDK

const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Ensure this key is in your .env file
});

app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a sustainability expert." },
                { role: "user", content: userMessage }
            ],
        });

        res.json({ response: response.choices[0].message.content });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ response: "Error processing request." });
    }
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
