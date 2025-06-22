export default function Home() {
  return(
    <main className= "min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4 text-center">AI Quotes Generator</h1>
      <p className="text-gray-400 mb-6 text-center">
        Get an AI-generated quote for your day ✨
      </p>
      <button className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded-lg mb-6">
        Generate Quote
      </button>
      <div className="text-center text-xl max-w-xl">
        “Believe you can and you're halfway there.”
      </div>
    </main>
  );
}