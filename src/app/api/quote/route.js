/* Ini route.js untuk OpenAI

import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST() {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: "Berikan saya 1 kutipan motivasi hidup yang singkat dan menyentuh.",
      },
    ],
    max_tokens: 50,
  });

  const quote = response.choices[0].message.content;
  return Response.json({ quote });
}
*/

// Ini route.js untuk HuggingFace
/*export async function POST() {
  const huggingfaceToken = process.env.HUGGINGFACE_TOKEN_AI;

  console.log("ENV HUGGINGFACE_TOKEN_AI:", huggingfaceToken);

  const response = await fetch("https://api-inference.huggingface.co/models/bigscience/bloomz-560m", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${huggingfaceToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      inputs: "Berikan saya satu kutipan motivasi hidup yang singkat dan menyentuh.",
      parameters: {
        max_new_tokens: 50,
        temperature: 0.7,
      },
      options: { wait_for_model: true }
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error response from Hugging Face:", errorText);
    return Response.json({ quote: "Gagal mengambil kutipan dari Hugging Face." }, { status: 500 });
  }

  const data = await response.json();

  // Penanganan format respons
  let quote = "Kutipan tidak tersedia.";
  if (Array.isArray(data) && data[0]?.generated_text) {
    quote = data[0].generated_text;
  }

  return Response.json({ quote });
}
*/

// Ini route.js untuk Gemini
export async function POST(request) {
  try {
    const body = await request.json();
    const prompt = body.prompt || "Give me a motivational quote.";

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.9,
          topK: 40,
          topP: 0.95
        }
      })
    });

    const data = await res.json();
    console.log("API Response:", data);

    const quote = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return Response.json({ quote: quote || "Gagal mendapatkan kutipan dari Gemini." });

  } catch (error) {
    console.error("Gemini API Error:", error);
    return Response.json({ quote: "Gagal mengambil kutipan dari Gemini." }, { status: 500 });
  }
}
