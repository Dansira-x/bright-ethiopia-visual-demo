import React, { useState, useEffect } from "react";
import { Activity } from "../data/types";

interface Props {
  activity: Activity;
  onAnswer: (isCorrect: boolean) => void;
}

const ReorderActivity: React.FC<Props> = ({ activity, onAnswer }) => {
  const [currentOrder, setCurrentOrder] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  // Shuffle items on first load
  useEffect(() => {
    if (activity.items && activity.items.length > 0) {
      const shuffled = [...activity.items].sort(() => Math.random() - 0.5);
      setCurrentOrder(shuffled);
    } else {
      console.warn("ReorderActivity: No items found in activity", activity);
    }
  }, [activity.items]);

  const handleClick = (item: string, index: number) => {
    // Move clicked item to the end of the order
    const newOrder = [...currentOrder];
    newOrder.splice(index, 1);
    newOrder.push(item);
    setCurrentOrder(newOrder);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const isCorrect =
      JSON.stringify(currentOrder) === JSON.stringify(activity.correctOrder);
    console.log("Current order:", currentOrder);
    console.log("Correct order:", activity.correctOrder);
    onAnswer(isCorrect);
  };

  const renderItem = (item: string, index: number) => {
    if (activity.itemType === "image") {
      return (
        <button
          key={index}
          onClick={() => handleClick(item, index)}
          className="p-2 border rounded bg-white hover:bg-gray-100"
        >
          <img src={item} alt={`item-${index}`} className="w-16 h-16" />
        </button>
      );
    }
    return (
      <button
        key={index}
        onClick={() => handleClick(item, index)}
        className="px-3 py-2 border rounded bg-white hover:bg-gray-100"
      >
        {item}
      </button>
    );
  };

  return (
    <div className="space-y-4">
      <p className="font-medium text-gray-800">{activity.question}</p>

      {activity.hint && (
        <p className="text-sm text-gray-500">💡 Hint: {activity.hint}</p>
      )}

      <div className="flex flex-wrap gap-2">
        {currentOrder.length > 0 ? (
          currentOrder.map((item, index) => renderItem(item, index))
        ) : (
          <p className="text-red-500 text-sm">⚠️ No items to display</p>
        )}
      </div>

      {!submitted ? (
        <button
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      ) : (
        <p
          className={`mt-2 text-sm font-semibold ${
            JSON.stringify(currentOrder) === JSON.stringify(activity.correctOrder)
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {JSON.stringify(currentOrder) === JSON.stringify(activity.correctOrder)
            ? "✅ Correct!"
            : `❌ Wrong. Correct answer: ${activity.correctOrder?.join(" ")}`}
        </p>
      )}
    </div>
  );
};

export default ReorderActivity;
