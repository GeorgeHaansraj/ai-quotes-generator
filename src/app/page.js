/*"use client";

import { useState } from "react";

export default function Home() {
  const [quote, setQuote] = useState(""); // state untuk menyimpan quote
  const [loading, setLoading] = useState(false); //state untuk menyimpan status Loading

  const generateQuote = async () => {
    setLoading(true);
    setQuote("");

    try {
      const res = await fetch("/api/quote", { method: "POST" })
      const data = await res.json();
      setQuote(data.quote);
    } catch (error) {
      setQuote("Gagal mengambil quote.");
    }

    setLoading(false);
  };

  return(
    <main className= "min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4 text-center">AI Quotes Generator</h1>
      <p className="text-gray-400 mb-6 text-center">
        Get an AI-generated quote for your day ✨
      </p>
      <button
        onClick={generateQuote}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded-lg mb-6 disabled:opacity-50"
      >
        {loading ? "Loading..." : "Generate Quote"}
      </button>

      {quote && (
        <div className="text-center text-xl max-w-xl text-yellow-300 animate-fadeIn">
          {quote}
        </div>
      )}
    </main>
  );
}*/

"use client";

import { useState } from "react";

export default function Home() {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);

  const generateQuote = async () => {
    setLoading(true);
    setQuote("");

    const themes = [
    "discipline", "courage", "confidence", "heartbreak", "self-love", "hope", "wisdom", "adventure", "education", "perseverance", "dedication", "life", "down", "dream", "love", "heart mate", "solitude", "sports", "boxing/fighter", "catholic"
    ];
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    const prompt = `Give me ONLY a motivational quote about ${randomTheme} with its author, in this exact format: "<quote>" - <author>. Do NOT add any explanation or commentary.`;

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setQuote(data.quote);
    } catch (error) {
      console.error(error);
      setQuote("Gagal mengambil quote.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4 text-center">AI Quotes Generator</h1>
      <p className="text-gray-400 mb-6 text-center">
        Get an AI-generated quote for your day ✨
      </p>

      <button
        onClick={generateQuote}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded-lg mb-6 disabled:opacity-50"
      >
        {loading ? "Loading..." : "Generate Quote"}
      </button>

      {quote && (
        <div className="text-center text-xl max-w-xl text-yellow-300 animate-fadeIn">
          {quote}
        </div>
      )}
    </main>
  );
}
