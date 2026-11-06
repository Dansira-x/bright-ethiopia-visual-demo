import React, { useState } from "react";
import { Quiz } from "../data/types";
import { motion, AnimatePresence } from "framer-motion";

export interface QuizProps {
  quiz: Quiz;
  onAnswer?: (isCorrect: boolean) => void;
}

const QuizComponent: React.FC<QuizProps> = ({ quiz, onAnswer }) => {
  const [userAnswer, setUserAnswer] = useState<unknown>(null);
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Matching state
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<
    { left: string; right: string; correct: boolean }[]
  >([]);

  // Show solutions toggle
  const [showSolutions, setShowSolutions] = useState(false);

  // Progress tracking
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);

  const handleAnswer = (value: unknown) => {
    if (!answered) {
      setUserAnswer(value);
      const isCorrect = JSON.stringify(value) === JSON.stringify(quiz.answer);
      setAnswered(true);
      setFeedback(isCorrect ? "✅ Correct!" : "❌ Wrong!");
      setTotalAnswered((prev) => prev + 1);
      if (isCorrect) setTotalCorrect((prev) => prev + 1);
      onAnswer?.(isCorrect);
    }
  };

  const handleMatch = (right: string) => {
    if (!selectedLeft) return;

    const correctPair = quiz.pairs?.find(
      (p) => p.left === selectedLeft && p.right === right
    );

    const newPair = {
      left: selectedLeft,
      right,
      correct: !!correctPair,
    };

    setMatchedPairs([...matchedPairs, newPair]);
    setSelectedLeft(null);

    setFeedback(newPair.correct ? "✅ Correct match!" : "❌ Wrong match!");
    setTotalAnswered((prev) => prev + 1);
    if (newPair.correct) setTotalCorrect((prev) => prev + 1);
    onAnswer?.(newPair.correct);

    // If all pairs attempted, enable "Show Solutions"
    if (matchedPairs.length + 1 === quiz.pairs?.length) {
      setShowSolutions(true);
    }
  };

  // Check if quiz is completed
  const isQuizCompleted =
    quiz.type === "matching"
      ? matchedPairs.length === quiz.pairs?.length
      : answered;

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white space-y-4">
      <p className="text-lg font-sans font-medium">{quiz.question}</p>

      {/* True or False */}
      {quiz.type === "true_false" && (
        <div className="space-y-4">
          <div className="flex gap-4">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => handleAnswer(true)}
            >
              True
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => handleAnswer(false)}
            >
              False
            </button>
          </div>

          <AnimatePresence>
            {answered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-3 p-3 border rounded bg-gray-50"
              >
                <p className="text-sm font-sans">
                  <span className="font-semibold">Correct Answer:</span>{" "}
                  {quiz.answer ? "True" : "False"}
                </p>
                {quiz.explanation && (
                  <p className="text-sm text-gray-700 mt-1">{quiz.explanation}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Multiple Choice with animations */}
      {quiz.type === "multiple_choice" && (
        <div className="grid grid-cols-2 gap-3">
          {quiz.options?.map((opt) => {
            const isSelected = userAnswer === opt;
            const isCorrect = opt === quiz.answer;

            return (
              <motion.button
                key={opt}
                whileTap={{ scale: 0.95 }}
                animate={
                  answered && isSelected
                    ? isCorrect
                      ? { scale: [1, 1.1, 1], transition: { duration: 0.3 } } // bounce
                      : { x: [0, -5, 5, -5, 5, 0], transition: { duration: 0.4 } } // shake
                    : {}
                }
                className={`px-4 py-2 rounded border ${
                  answered && isSelected
                    ? isCorrect
                      ? "bg-green-100 border-green-500"
                      : "bg-red-100 border-red-500"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => handleAnswer(opt)}
              >
                {opt}
              </motion.button>
            );
          })}
        </div>
      )}
      <AnimatePresence>
        {answered && quiz.type === "multiple_choice" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-3 p-3 border rounded bg-gray-50"
          >
            <p className="text-sm font-sans">
              <span className="font-semibold">Correct Answer:</span>{" "}
              {quiz.answer as string}
            </p>
            {quiz.explanation && (
              <p className="text-sm text-gray-700 mt-1">{quiz.explanation}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fill Blank */}
      {quiz.type === "fill_blank" && (
        <div>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 font-sans"
            placeholder="Type your answer"
            onBlur={(e) => handleAnswer(e.target.value.trim())}
          />
          <AnimatePresence>
            {answered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-3 p-3 border rounded bg-gray-50"
              >
                <p className="text-sm font-sans">
                  <span className="font-semibold">Correct Answer:</span>{" "}
                  {quiz.answer as string}
                </p>
                {quiz.explanation && (
                  <p className="text-sm text-gray-700 mt-1">{quiz.explanation}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Matching */}
      {quiz.type === "matching" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Left column */}
            <div className="space-y-2">
              {quiz.pairs?.map((pair) => {
                const matched = matchedPairs.find((mp) => mp.left === pair.left);
                return (
                  <button
                    key={pair.left}
                    disabled={!!matched}
                    className={`w-full px-4 py-2 rounded border ${
                      matched
                        ? matched.correct
                          ? "bg-green-100 border-green-500 cursor-not-allowed"
                          : "bg-red-100 border-red-500 cursor-not-allowed"
                        : selectedLeft === pair.left
                        ? "bg-blue-100 border-blue-500"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    onClick={() => setSelectedLeft(pair.left)}
                  >
                    {pair.left}
                  </button>
                );
              })}
            </div>

                        {/* Right column */}
            <div className="space-y-2">
              {quiz.pairs?.map((pair) => {
                const matched = matchedPairs.find((mp) => mp.right === pair.right);
                return (
                  <button
                    key={pair.right}
                    disabled={!!matched}
                    className={`w-full px-4 py-2 rounded border ${
                      matched
                        ? matched.correct
                          ? "bg-green-100 border-green-500 cursor-not-allowed"
                          : "bg-red-100 border-red-500 cursor-not-allowed"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    onClick={() => handleMatch(pair.right)}
                  >
                    {pair.right}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Final Summary Box */}
          <AnimatePresence>
            {matchedPairs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-3 border rounded bg-gray-50"
              >
                <p className="text-sm font-sans font-semibold mb-2">
                  Summary of your matches:
                </p>
                <ul className="space-y-1 text-sm font-sans">
                  {matchedPairs.map((mp, i) => (
                    <li
                      key={i}
                      className={`flex justify-between ${
                        mp.correct ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      <span>{mp.left}</span>
                      <span>→ {mp.right}</span>
                      <span>{mp.correct ? "✅ Correct" : "❌ Wrong"}</span>
                    </li>
                  ))}
                </ul>

                {/* Show Correct Solutions only after all pairs attempted */}
                {showSolutions && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-3 p-2 border rounded bg-white"
                  >
                    <p className="text-sm font-sans font-semibold mb-2">
                      Correct Solutions:
                    </p>
                    <ul className="space-y-1 text-sm font-sans text-green-700">
                      {quiz.pairs?.map((pair, i) => (
                        <li key={i} className="flex justify-between">
                          <span>{pair.left}</span>
                          <span>→ {pair.right}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Feedback */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 text-sm font-sans font-medium text-center text-gray-700"
          >
            {feedback}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Tracker (only once at the bottom) */}
      <div className="mt-6 p-3 border-t text-center text-sm font-sans text-gray-700">
        Overall Progress: {totalCorrect}/{totalAnswered} correct
      </div>

      {/* Final Quiz Completed Card */}
      <AnimatePresence>
        {isQuizCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mt-6 p-4 border rounded-lg bg-green-50 text-center"
          >
            <h3 className="text-lg font-bold text-green-700">🎉 Quiz Completed!</h3>
            <p className="text-sm mt-2">
              You answered <span className="font-semibold">{totalCorrect}</span> out
              of <span className="font-semibold">{totalAnswered}</span> correctly.
            </p>
            <p className="text-sm mt-1 text-gray-700">
              Score: {Math.round((totalCorrect / totalAnswered) * 100)}%
            </p>
            <p className="text-sm mt-2 text-green-600 font-medium">
              {Math.round((totalCorrect / totalAnswered) * 100) >= 70
                ? "Great job! Keep it up 🚀"
                : "Keep practicing, you’re improving every step 💡"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizComponent;
