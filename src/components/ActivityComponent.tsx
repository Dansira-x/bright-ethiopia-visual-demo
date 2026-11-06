import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity } from "../data/types";
import ReorderActivity from "./ReorderActivity"; // 👈 import your new component

interface ActivityProps {
  activity: Activity;
  onAnswer?: (isCorrect: boolean) => void;
  columnALabelStyle?: "numeric" | "amharic";
  columnBLabelStyle?: "letters" | "none" | "amharic";
}

// helper arrays
const amharicNumbers = ["፩", "፪", "፫", "፬", "፭", "፮", "፯", "፰", "፱", "፲"];
const amharicLetters = ["ሀ", "ለ", "ሐ", "መ", "ሠ", "ረ", "ሰ", "ሸ", "ቀ", "በ"];

interface MatchedPair {
  left: string;
  right: string;
  correct: boolean;
}

const ActivityComponent: React.FC<ActivityProps> = ({
  activity,
  onAnswer,
  columnALabelStyle = "numeric",
  columnBLabelStyle = "letters",
}) => {
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [userAnswer, setUserAnswer] = useState<any>(null);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<MatchedPair[]>([]);

  const handleAnswer = (value: any) => {
    if (!answered) {
      setUserAnswer(value);
      const isCorrect = JSON.stringify(value) === JSON.stringify(activity.answer);
      setAnswered(true);
      setFeedback(isCorrect ? "✅ Correct!" : "❌ Try again!");
      onAnswer?.(isCorrect);
    }
  };

  const handleMatch = (right: string) => {
    if (!selectedLeft) return;

    let isCorrect = false;
    if (activity.matchingAnswer) {
      isCorrect = activity.matchingAnswer[selectedLeft] === right;
    } else {
      const correctPair = activity.pairs?.find(
        (p) => p.left === selectedLeft && p.right === right
      );
      isCorrect = !!correctPair;
    }

    const newPair: MatchedPair = { left: selectedLeft, right, correct: isCorrect };
    setMatchedPairs((prev) => [...prev, newPair]);

    setSelectedLeft(null);
    setFeedback(
      isCorrect
        ? "✅ Correct match!"
        : `❌ Wrong match! Correct answer: ${selectedLeft} → ${
            activity.matchingAnswer?.[selectedLeft] || "?"
          }`
    );
    setAnswered(true);

    onAnswer?.(isCorrect);
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white space-y-4">
      {/* Question */}
      <p className="text-lg font-sans font-medium text-gray-800">
        {activity.question}
      </p>

      {/* True/False */}
      {activity.type === "true_false" && (
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded ${
              userAnswer === true ? "bg-blue-100 border border-blue-500" : "bg-gray-100"
            }`}
            onClick={() => handleAnswer(true)}
          >
            True
          </button>
          <button
            className={`px-4 py-2 rounded ${
              userAnswer === false ? "bg-blue-100 border border-blue-500" : "bg-gray-100"
            }`}
            onClick={() => handleAnswer(false)}
          >
            False
          </button>
        </div>
      )}

      {/* Multiple Choice */}
      {activity.type === "multiple_choice" && (
        <div className="grid grid-cols-2 gap-3">
          {activity.options?.map((opt) => (
            <button
              key={opt}
              className={`px-4 py-2 rounded border ${
                userAnswer === opt
                  ? "bg-blue-100 border-blue-500"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => handleAnswer(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {/* Fill Blank */}
      {activity.type === "fill_blank" && (
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          placeholder="Type your answer"
          onBlur={(e) => handleAnswer(e.target.value.trim())}
        />
      )}

      {/* Matching */}
      {activity.type === "matching" && (
        <div className="grid grid-cols-2 gap-6">
          {/* Column A */}
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-700">Column A</h4>
            {activity.pairs?.map((pair, index) => {
              const label =
                columnALabelStyle === "amharic"
                  ? amharicNumbers[index] || `${index + 1}`
                  : `${index + 1}`;
              return (
                <button
                  key={pair.left}
                  className={`w-full px-4 py-2 rounded border text-left ${
                    selectedLeft === pair.left
                      ? "bg-blue-100 border-blue-500"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedLeft(pair.left)}
                >
                  {label}.{" "}
                  {pair.leftImage && (
                    <img
                      src={pair.leftImage}
                      alt={pair.left}
                      className="inline-block w-6 h-6 mr-2"
                    />
                  )}
                  {pair.left}
                </button>
              );
            })}
          </div>

          {/* Column B */}
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-700">Column B</h4>
            {activity.pairs?.map((pair, index) => {
              const matched = matchedPairs.find((mp) => mp.right === pair.right);
              const bgClass = matched
                ? matched.correct
                  ? "bg-green-100 border-green-500"
                  : "bg-red-100 border-red-500"
                : "bg-gray-100 hover:bg-gray-200";

              let label = "";
              if (columnBLabelStyle === "letters") {
                label = String.fromCharCode(65 + index);
              } else if (columnBLabelStyle === "amharic") {
                label = amharicLetters[index] || "";
              }

              return (
                <button
                  key={pair.right}
                  className={`w-full px-4 py-2 rounded border text-left ${bgClass}`}
                  onClick={() => handleMatch(pair.right)}
                  disabled={!!matched}
                >
                  {label ? `${label}. ` : ""}
                  {pair.rightImage && (
                    <img
                      src={pair.rightImage}
                      alt={pair.right}
                      className="inline-block w-16 h-16 mr-2"
                    />
                  )}
                  {pair.right}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Reorder */}
      {activity.type === "reorder" && (
        <ReorderActivity activity={activity} onAnswer={onAnswer ?? (() => {})} />
      )}

      {/* Feedback */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
       cd      animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 text-sm text-center font-medium text-gray-700"
          >
            {feedback}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint */}
      {activity.hint && !answered && activity.type !== "reorder" && (
        <p className="text-xs text-blue-600 mt-2">💡 Hint: {activity.hint}</p>
      )}
    </div>
  );
};

export default ActivityComponent;
