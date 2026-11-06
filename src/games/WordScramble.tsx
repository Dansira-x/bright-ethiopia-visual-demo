import React, { useState } from "react";

const words = ["cat","apple","car","book","school","game","teacher","education", "science", "history", "culture", "future", "mathematics", "technology", "innovation","mathematics", "technology", "innovation"];

function shuffle(word: string) {
  return word.split("").sort(() => Math.random() - 0.5).join("");
}

const WordScramble: React.FC = () => {
  const [word, setWord] = useState(words[Math.floor(Math.random() * words.length)]);
  const [scrambled, setScrambled] = useState(shuffle(word));
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");

  function checkGuess() {
    if (guess.trim().toLowerCase() === word.toLowerCase()) {
      setMessage("🎉 Correct! You nailed it!");
    } else {
      setMessage("❌ Oops! Try again!");
    }
  }

  function nextWord() {
    const next = words[Math.floor(Math.random() * words.length)];
    setWord(next);
    setScrambled(shuffle(next));
    setGuess("");
    setMessage("");
  }

  // Add letter to guess when clicked
  function addLetter(letter: string) {
    setGuess((prev) => prev + letter);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 via-pink-300 to-yellow-300 animate-gradient-x">
      
      {/* Game Card */}
      <div className="p-10 bg-white rounded-3xl shadow-2xl w-full max-w-2xl text-center transform hover:scale-105 transition-transform duration-300 border-4 border-transparent bg-clip-padding backdrop-blur-xl">
        
        {/* Title */}
        <h2 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text drop-shadow-lg animate-pulse">
          ✨ Word Scramble ✨
        </h2>

        {/* Scrambled Word */}
        <p className="mb-6 text-xl font-semibold text-gray-700">
          Unscramble this word (click letters or type):
        </p>
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {scrambled.split("").map((letter, idx) => (
            <button
              key={idx}
              onClick={() => addLetter(letter)}
              className="bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 text-white font-extrabold px-3 py-2 rounded-lg shadow-lg text-lg transform hover:scale-125 transition-all duration-300 border border-white"
              style={{ textShadow: "0 0 6px rgba(255,255,255,0.9)" }}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Input + Submit */}
        <div className="flex justify-center gap-3 mb-4">
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Your guess..."
            className="border-2 border-purple-400 rounded-xl px-4 py-2 w-64 text-center focus:outline-none focus:ring-4 focus:ring-pink-400 shadow-inner text-lg"
          />
          <button
            onClick={checkGuess}
            className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-2 rounded-xl font-bold shadow-md hover:scale-110 transition-transform duration-300"
          >
            ✅ Submit
          </button>
        </div>

        {/* Feedback Message */}
        {message && (
          <p className="mt-4 text-lg font-bold animate-bounce text-purple-600">
            {message}
          </p>
        )}

        {/* Next Word Button */}
        <button
          onClick={nextWord}
          className="mt-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-10 py-3 rounded-xl font-bold shadow-lg hover:scale-110 transition-transform duration-300"
        >
          🔄 Next Word
        </button>
      </div>
    </div>
  );
};

export default WordScramble;
