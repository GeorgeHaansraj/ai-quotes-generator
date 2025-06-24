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