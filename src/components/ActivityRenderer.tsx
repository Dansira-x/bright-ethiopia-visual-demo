import React, { useState } from "react";
import { ActivityBlock, Activity } from "../data/types";
import ActivityComponent from "./ActivityComponent";

const ActivityRenderer: React.FC<{ block: ActivityBlock }> = ({ block }) => {
  const [completedCount, setCompletedCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [results, setResults] = useState<{ label: string; correct: boolean }[]>([]);

  // Count each question separately (matching counts each pair)
  const totalQuestions = block.activities.reduce((sum, activity) => {
    if (activity.type === "matching") {
      return sum + (activity.pairs?.length || 0);
    }
    return sum + 1;
  }, 0);

  const handleAnswer = (isCorrect: boolean) => {
    setCompletedCount((prev) => prev + 1);
    if (isCorrect) setCorrectCount((prev) => prev + 1);
    setResults((prev) => [
      ...prev,
      { label: `Q${completedCount + 1}`, correct: isCorrect },
    ]);
  };

  const scorePercentage = finished
    ? Math.round((correctCount / totalQuestions) * 100)
    : 0;

  const getMessage = () => {
    if (scorePercentage >= 90) return "🌟 Excellent work! You really mastered this practice.";
    if (scorePercentage >= 80) return "👏 Great job! You’re well prepared for the quiz.";
    if (scorePercentage >= 70) return "👍 Good effort! A little more practice will make you perfect.";
    if (scorePercentage >= 50) return "💡 Keep trying! Review the hints and you’ll get stronger.";
    return "🚀 Don’t give up! Practice makes progress — try again and you’ll improve.";
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-purple-700">{block.title}</h3>

      {block.activities.map((activity: Activity) => (
        <ActivityComponent
          key={activity.id}
          activity={activity}
          onAnswer={handleAnswer}
          columnALabelStyle={block.columnALabelStyle}
          columnBLabelStyle={block.columnBLabelStyle}
        />
      ))}

      {/* Progress */}
      <div className="text-sm text-gray-600 text-center">
        {completedCount} of {totalQuestions} questions attempted
      </div>

      {/* Finish button */}
      {!finished && (
        <div className="text-center mt-4">
          <button
            onClick={() => setFinished(true)}
            disabled={completedCount < totalQuestions}
            className={`px-6 py-2 rounded text-white ${
              completedCount < totalQuestions
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Finish
          </button>
          {completedCount < totalQuestions && (
            <p className="text-xs text-gray-500 mt-1">
              Complete all questions to unlock results
            </p>
          )}
        </div>
      )}

      {/* Results + Answer Key */}
      {finished && (
        <div className="border rounded-lg p-6 bg-green-50 shadow-md space-y-4">
          {/* Score + feedback */}
          <h4 className="text-green-700 font-semibold text-lg text-center">
            🎉 Practice Completed!
          </h4>
          <p className="text-sm text-gray-700 text-center">
            You answered {correctCount} out of {totalQuestions} correctly.
          </p>
          <p className="text-sm font-medium text-indigo-700 text-center">
            Score: {scorePercentage}%
          </p>
          <p className="text-sm text-gray-800 text-center">{getMessage()}</p>

          {/* Per-question breakdown */}
          <div className="mt-4 space-y-1">
            {results.map((res, i) => (
              <p
                key={i}
                className={`text-sm ${
                  res.correct ? "text-green-700" : "text-red-600"
                }`}
              >
                {res.label}: {res.correct ? "Correct ✅" : "Wrong ❌"}
              </p>
            ))}
          </div>

          {/* ✅ Answer Key */}
          <div className="mt-6 border-t pt-4">
            <h5 className="text-md font-semibold text-gray-800 text-center">
              📖 Answer Key
            </h5>
            <div className="space-y-2 mt-2">
              {block.activities.map((activity) => {
                if (activity.type === "true_false") {
                  return (
                    <p key={activity.id} className="text-sm text-gray-700">
                      {activity.question} → {activity.answer ? "True" : "False"}
                    </p>
                  );
                }
                if (activity.type === "multiple_choice") {
                  return (
                    <p key={activity.id} className="text-sm text-gray-700">
                      {activity.question} → {activity.answer}
                    </p>
                  );
                }
                if (activity.type === "fill_blank") {
                  return (
                    <p key={activity.id} className="text-sm text-gray-700">
                      {activity.question.replace("___", activity.answer || "___")}
                    </p>
                  );
                }
                if (activity.type === "matching" && activity.pairs) {
                  return (
                    <div key={activity.id} className="text-sm text-gray-700">
                      <p className="font-medium">{activity.question}</p>
                      <ul className="list-disc list-inside space-y-1">
                        {activity.pairs.map((pair) => (
                          <li key={pair.left} className="flex items-center gap-2">
                            {/* Column A image if present */}
                            {pair.leftImage && (
                              <img
                                src={pair.leftImage}
                                alt={pair.left}
                                className="inline-block w-6 h-6"
                              />
                            )}
                            <span>{pair.left}</span>
                            <span>→</span>
                            {/* Column B image if present */}
                            {pair.rightImage && (
                              <img
                                src={pair.rightImage}
                                alt={pair.right}
                                className="inline-block w-6 h-6"
                              />
                            )}
                            <span>{pair.right}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityRenderer;
