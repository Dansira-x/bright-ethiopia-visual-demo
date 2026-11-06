import React, { useState } from "react";
import { Trophy, Flame, RefreshCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Question = {
  id: number;
  text: string;
  image?: string;
  options: string[];
  correct: string;
};

type GradeLevel =
  | "Grade 1"
  | "Grade 2"
  | "Grade 3"
  | "Grade 4"
  | "Grade 5"
  | "Grade 6"
  | "Grade 7"
  | "Grade 8"
  | "Grade 9"
  | "Grade 10"
  | "Grade 11"
  | "Grade 12";

const gradeQuestions: Record<GradeLevel, Question[]> = {
  "Grade 1": [
    { id: 1, text: "3 ፣ 6 ፣ ___ ፣ 12 ፣ 15 ፣ ___", options: ["10 እና 17", "8 እና 18", "6 እና 10", "9 እና 18"], correct: "9 እና 18" },
    { id: 2, text: "'39'ይህ ቁጥር በፊደል ሲፃፍ?", options: ["ስልሳ ሶስት", "ሰላሳ ሰባት", "ሰላሳ ዘጠኝ", "ዘጠና ሶስት"], correct: "ሰላሳ ዘጠኝ" },
    { id: 3, text: "በካርቶኑ ውስጥ ስንት ብርቱካኖች አሉ?", image: "/lesson-image/game/maths/maths-1.png", options: ["10", "18", "12", "15"], correct: "12" },
    { id: 4, text: "የአፕሎቹ ብዛት ስንት ነው: 🍎🍎🍎🍎", options: ["4", "5", "3", "6"], correct: "4" },
    { id: 5, text: "የጎደለው ቁጥር ስንት ነው?", image: "/lesson-image/game/maths/maths-2.png", options: ["8", "10", "11", "5"], correct: "8" },
    { id: 6, text: "የሚከተሉት ቁጥሮች ሲደመሩ ስንት ይሆናል 6 + 1 ", options: ["6", "7", "8"], correct: "7" },
    { id: 7, text: "ከሁለቱ ቁጥሮች የቱ ይበልጣል: 5 ወይም 8?", options: ["5", "8"], correct: "8" },
    { id: 8, text: "10 − 2 ስንት ይሆናል?", options: ["7", "8", "9", "6"], correct: "8" },
    { id: 9, text: "በምስሉ ላይ ስንት ዶሮዎች አሉ?", image: "/lesson-image/game/maths/maths-3.png", options: ["7", "8", "6", "5"], correct: "6" },
    { id: 10, text: "'19'ይህ ቁጥር በፊደል ሲፃፍ?", options: ["ዘጠና ሶስት", "ሃያ ሶስት", "ሃያ ዘጠኝ", "አስራ ዘጠኝ"], correct: "አስራ ዘጠኝ" },
    { id: 11, text: "3 + 4 ስንት ይሆናል?", options: ["6", "7", "8", "9"], correct: "7" },
  ],

  "Grade 2": [
    { id: 1, text: "What is 12 − 5?", options: ["6", "7", "8"], correct: "7" },
    { id: 2, text: "What is 3 × 4?", options: ["10", "11", "12"], correct: "12" },
    { id: 3, text: "Which number is even?", options: ["7", "8", "9"], correct: "8" },
    { id: 4, text: "What is 20 ÷ 5?", options: ["3", "4", "5"], correct: "4" },
    { id: 5, text: "What is 15 + 5?", options: ["19", "20", "21"], correct: "20" },
    { id: 6, text: "Which is smaller: 25 or 30?", options: ["25", "30"], correct: "25" },
    { id: 7, text: "What is 18 − 9?", options: ["8", "9", "10"], correct: "9" },
    { id: 8, text: "What is 2 × 7?", options: ["12", "14", "16"], correct: "14" },
    { id: 9, text: "Which shape has 3 sides?", options: ["Square", "Triangle", "Circle"], correct: "Triangle" },
    { id: 10, text: "What is 5 × 5?", options: ["20", "25", "30"], correct: "25" },
  ],

  "Grade 3": [
    { id: 1, text: "What is 9 × 3?", options: ["27", "28", "29"], correct: "27" },
    { id: 2, text: "What is 24 ÷ 6?", options: ["3", "4", "5"], correct: "4" },
    { id: 3, text: "Which fraction equals 2/4?", options: ["1/2", "1/3", "2/3"], correct: "1/2" },
    { id: 4, text: "What is 100 − 45?", options: ["55", "65", "75"], correct: "55" },
    { id: 5, text: "What is 7 × 8?", options: ["54", "56", "58"], correct: "56" },
    { id: 6, text: "What is 36 ÷ 9?", options: ["3", "4", "5"], correct: "4" },
    { id: 7, text: "Which is greater: 2/3 or 1/2?", options: ["2/3", "1/2"], correct: "2/3" },
    { id: 8, text: "What is 11 × 11?", options: ["120", "121", "122"], correct: "121" },
    { id: 9, text: "What is 50 ÷ 10?", options: ["4", "5", "6"], correct: "5" },
    { id: 10, text: "What is 25 + 25?", options: ["40", "50", "60"], correct: "50" },
  ],

  "Grade 4": [
    { id: 1, text: "What is 12 × 12?", options: ["142", "144", "146"], correct: "144" },
    { id: 2, text: "Perimeter of square with side 8?", options: ["32", "36", "40"], correct: "32" },
    { id: 3, text: "Area of rectangle 5 × 7?", options: ["30", "35", "40"], correct: "35" },
    { id: 4, text: "What is 100 ÷ 25?", options: ["2", "3", "4"], correct: "4" },
    { id: 5, text: "What is 15 × 6?", options: ["80", "85", "90"], correct: "90" },
    { id: 6, text: "What is 72 ÷ 9?", options: ["7", "8", "9"], correct: "8" },
    { id: 7, text: "What is 200 − 75?", options: ["115", "125", "135"], correct: "125" },
    { id: 8, text: "What is 9 × 9?", options: ["81", "82", "83"], correct: "81" },
    { id: 9, text: "Area of square with side 10?", options: ["90", "100", "110"], correct: "100" },
    { id: 10, text: "What is 48 ÷ 6?", options: ["6", "7", "8"], correct: "8" },
  ],

  "Grade 5": [
    { id: 1, text: "What is 12 × 12?", options: ["142", "144", "146"], correct: "144" },
    { id: 2, text: "Perimeter of square with side 8?", options: ["32", "36", "40"], correct: "32" },
    { id: 3, text: "Area of rectangle 5 × 7?", options: ["30", "35", "40"], correct: "35" },
    { id: 4, text: "What is 100 ÷ 25?", options: ["2", "3", "4"], correct: "4" },
    { id: 5, text: "What is 15 × 6?", options: ["80", "85", "90"], correct: "90" },
    { id: 6, text: "What is 72 ÷ 9?", options: ["7", "8", "9"], correct: "8" },
    { id: 7, text: "What is 200 − 75?", options: ["115", "125", "135"], correct: "125" },
    { id: 8, text: "What is 9 × 9?", options: ["81", "82", "83"], correct: "81" },
    { id: 9, text: "Area of square with side 10?", options: ["90", "100", "110"], correct: "100" },
    { id: 10, text: "What is 48 ÷ 6?", options: ["6", "7", "8"], correct: "8" },
  ],

  "Grade 6": [
    { id: 1, text: "What is 12 × 12?", options: ["142", "144", "146"], correct: "144" },
    { id: 2, text: "Perimeter of square with side 8?", options: ["32", "36", "40"], correct: "32" },
    { id: 3, text: "Area of rectangle 5 × 7?", options: ["30", "35", "40"], correct: "35" },
    { id: 4, text: "What is 100 ÷ 25?", options: ["2", "3", "4"], correct: "4" },
    { id: 5, text: "What is 15 × 6?", options: ["80", "85", "90"], correct: "90" },
    { id: 6, text: "What is 72 ÷ 9?", options: ["7", "8", "9"], correct: "8" },
    { id: 7, text: "What is 200 − 75?", options: ["115", "125", "135"], correct: "125" },
    { id: 8, text: "What is 9 × 9?", options: ["81", "82", "83"], correct: "81" },
    { id: 9, text: "Area of square with side 10?", options: ["90", "100", "110"], correct: "100" },
    { id: 10, text: "What is 48 ÷ 6?", options: ["6", "7", "8"], correct: "8" },
  ],
  
  "Grade 7": [
    { id: 1, text: "Solve 2x + 3 = 11", options: ["3", "4", "5"], correct: "4" },
    { id: 2, text: "Area of circle with radius 4?", options: ["16π", "8π", "12π"], correct: "16π" },
  ],

  "Grade 8": [
    { id: 1, text: "What is 12 × 12?", options: ["142", "144", "146"], correct: "144" },
    { id: 2, text: "Perimeter of square with side 8?", options: ["32", "36", "40"], correct: "32" },
    { id: 3, text: "Area of rectangle 5 × 7?", options: ["30", "35", "40"], correct: "35" },
    { id: 4, text: "What is 100 ÷ 25?", options: ["2", "3", "4"], correct: "4" },
    { id: 5, text: "What is 15 × 6?", options: ["80", "85", "90"], correct: "90" },
    { id: 6, text: "What is 72 ÷ 9?", options: ["7", "8", "9"], correct: "8" },
    { id: 7, text: "What is 200 − 75?", options: ["115", "125", "135"], correct: "125" },
    { id: 8, text: "What is 9 × 9?", options: ["81", "82", "83"], correct: "81" },
    { id: 9, text: "Area of square with side 10?", options: ["90", "100", "110"], correct: "100" },
    { id: 10, text: "What is 48 ÷ 6?", options: ["6", "7", "8"], correct: "8" },
  ],
  "Grade 9": [
    { id: 1, text: "Derivative of f(x) = x^2?", options: ["2x", "x", "x^3"], correct: "2x" },
    { id: 2, text: "Solve x^2 - 4 = 0", options: ["2", "-2", "Both 2 and -2"], correct: "Both 2 and -2" },
  ],

  "Grade 10": [
    { id: 1, text: "What is 12 × 12?", options: ["142", "144", "146"], correct: "144" },
    { id: 2, text: "Perimeter of square with side 8?", options: ["32", "36", "40"], correct: "32" },
    { id: 3, text: "Area of rectangle 5 × 7?", options: ["30", "35", "40"], correct: "35" },
    { id: 4, text: "What is 100 ÷ 25?", options: ["2", "3", "4"], correct: "4" },
    { id: 5, text: "What is 15 × 6?", options: ["80", "85", "90"], correct: "90" },
    { id: 6, text: "What is 72 ÷ 9?", options: ["7", "8", "9"], correct: "8" },
    { id: 7, text: "What is 200 − 75?", options: ["115", "125", "135"], correct: "125" },
    { id: 8, text: "What is 9 × 9?", options: ["81", "82", "83"], correct: "81" },
    { id: 9, text: "Area of square with side 10?", options: ["90", "100", "110"], correct: "100" },
    { id: 10, text: "What is 48 ÷ 6?", options: ["6", "7", "8"], correct: "8" },
  ],

  "Grade 11": [
    { id: 1, text: "What is 12 × 12?", options: ["142", "144", "146"], correct: "144" },
    { id: 2, text: "Perimeter of square with side 8?", options: ["32", "36", "40"], correct: "32" },
    { id: 3, text: "Area of rectangle 5 × 7?", options: ["30", "35", "40"], correct: "35" },
    { id: 4, text: "What is 100 ÷ 25?", options: ["2", "3", "4"], correct: "4" },
    { id: 5, text: "What is 15 × 6?", options: ["80", "85", "90"], correct: "90" },
    { id: 6, text: "What is 72 ÷ 9?", options: ["7", "8", "9"], correct: "8" },
    { id: 7, text: "What is 200 − 75?", options: ["115", "125", "135"], correct: "125" },
    { id: 8, text: "What is 9 × 9?", options: ["81", "82", "83"], correct: "81" },
    { id: 9, text: "Area of square with side 10?", options: ["90", "100", "110"], correct: "100" },
    { id: 10, text: "What is 48 ÷ 6?", options: ["6", "7", "8"], correct: "8" },
  ],

  "Grade 12": [
    { id: 1, text: "Integral of f(x) = 3x^2?", options: ["x^3 + C", "x^2 + C", "x^4/4 + C"], correct: "x^3 + C" },
    { id: 2, text: "Limit of (2x^2 + 3x + 1) as x→∞?", options: ["Infinity", "0", "2"], correct: "Infinity" },
  ],
};

const MathGame: React.FC = () => {
  const [grade, setGrade] = useState<GradeLevel | null>(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showMistakesOnly, setShowMistakesOnly] = useState(false);
  const [retrySet, setRetrySet] = useState<Question[] | null>(null);
  const navigate = useNavigate();

  function selectAnswer(option: string) {
    setSelected(option);
  }

  function nextQuestion() {
    if (selected) {
      setUserAnswers((prev) => {
        const updated = [...prev];
        updated[current] = selected;
        return updated;
      });

      if (selected === questions[current].correct) {
        setScore((s) => s + 1);
        setStreak((s) => s + 1);
      } else {
        setStreak(0);
      }
    }

    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  }

  function prevQuestion() {
    if (current > 0) {
      setCurrent(current - 1);
      setSelected(null);
    }
  }

  function restartGame() {
    setCurrent(0);
    setScore(0);
    setStreak(0);
    setSelected(null);
    setFinished(false);
    setGrade(null);
    setUserAnswers([]);
    setShowMistakesOnly(false);
    setRetrySet(null);
  }

  function retryMistakes() {
    const mistakes = gradeQuestions[grade!].filter((q, idx) => userAnswers[idx] !== q.correct);
    if (mistakes.length === 0) {
      restartGame();
      return;
    }
    setRetrySet(mistakes);
    setCurrent(0);
    setScore(0);
    setStreak(0);
    setSelected(null);
    setFinished(false);
    setUserAnswers([]);
    setShowMistakesOnly(false);
  }

  // --- Grade Selection Screen ---
  if (!grade) {
    return (
      <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-yellow-100 via-green-100 to-blue-100">
        
        {/* Back button fixed to top-left */}
        <div className="absolute top-6 left-6">
          <button
            onClick={() => navigate("/")}
            className="border-2 border-[#1E90FF] text-[#1E90FF] hover:bg-[#1E90FF] hover:text-white px-3 py-1 rounded-full text-lg font-semibold transition-transform transform hover:scale-105 font-sans"
          >
            ⬅ Back to Home
          </button>
        </div>

        {/* Card */}
        <div className="p-10 bg-white rounded-3xl shadow-2xl w-full max-w-3xl text-center animate-fade-in">
          <h2 className="text-5xl font-extrabold mb-8 bg-gradient-to-r from-blue-600 to-green-600 text-transparent bg-clip-text">
            Choose Your Grade
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {(
              [
                "Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6",
                "Grade 7","Grade 8","Grade 9","Grade 10","Grade 11","Grade 12"
              ] as GradeLevel[]
            ).map((g) => (
              <button
                key={g}
                onClick={() => setGrade(g)}
                className="bg-gradient-to-r from-green-400 to-blue-400 text-white px-6 py-4 rounded-xl font-bold shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Safe to define questions only after grade is chosen
  const questions = retrySet && retrySet.length > 0 ? retrySet : gradeQuestions[grade];
  const question = questions[current];

  // --- Results Screen ---
  if (finished) {
    const message =
      score === questions.length
        ? "🌟 Excellent! You got all correct!"
        : score > questions.length / 2
        ? "👏 Great job! Keep practicing to get even better."
        : "💡 Don’t worry, keep learning and you’ll improve!";

    return (
      <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100">
        
        {/* Back button fixed to top-left */}
        <div className="absolute top-6 left-6">
          <button
            onClick={() => setGrade(null)}
            className="border-2 border-[#1E90FF] text-[#1E90FF] hover:bg-[#1E90FF] hover:text-white px-3 py-1 rounded-full text-lg font-semibold transition-transform transform hover:scale-105 font-sans"
          >
            ⬅ Back
          </button>
        </div>

        {/* Card */}
        <div className="p-10 bg-white rounded-3xl shadow-2xl w-full max-w-4xl text-center">
          <h2 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text">
            Results
          </h2>
          <p className="text-xl mb-4">Final Score: {score} / {questions.length}</p>
          <p className="text-lg mb-6">Longest Streak: {streak}</p>
          <p className="text-lg font-semibold mb-6">{message}</p>

          {/* Toggle Button */}
          <button
            onClick={() => setShowMistakesOnly(!showMistakesOnly)}
            className="mt-4 bg-gradient-to-r from-yellow-400 to-pink-500 text-white px-6 py-2 rounded-lg font-bold hover:scale-105 transition-transform"
          >
            {showMistakesOnly ? "Show All Answers" : "Show Only Mistakes"}
          </button>

          {/* Retry Mistakes */}
          <button
            onClick={retryMistakes}
            className="mt-4 ml-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-lg font-bold hover:scale-105 transition-transform"
          >
            🔄 Retry Mistakes
          </button>

          {/* Detailed Review */}
          <div className="mt-8 text-left space-y-6">
            {questions
              .filter((q, idx) => !showMistakesOnly || userAnswers[idx] !== q.correct)
              .map((q, idx) => {
                const userAnswer = userAnswers[idx];
                const isCorrect = userAnswer === q.correct;
                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl shadow-md ${
                      isCorrect ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    <p className="font-bold text-lg mb-2">
                      Q{idx + 1}: {q.text}
                    </p>
                    {q.image && (
                      <img
                        src={q.image}
                        alt="Question visual"
                        className="w-full h-48 object-cover rounded-lg mb-3"
                      />
                    )}
                    <p>
                      Your Answer:{" "}
                      <span className={isCorrect ? "text-green-700 font-bold" : "text-red-700 font-bold"}>
                        {userAnswer || "No answer"}
                      </span>
                    </p>
                    {!isCorrect && (
                      <p>
                        Correct Answer:{" "}
                        <span className="text-green-700 font-bold">{q.correct}</span>
                      </p>
                    )}
                  </div>
                );
              })}
          </div>

                    {/* Play Again */}
          <button
            onClick={restartGame}
            className="mt-8 inline-flex items-center bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-lg font-bold hover:scale-105 transition-transform"
          >
            <RefreshCcw className="w-5 h-5 mr-2" /> Play Again
          </button>
        </div>
      </div>
    );
  }

  // --- Question Screen ---
  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-green-300 via-yellow-300 to-red-300">
      
      {/* Back button fixed to top-left */}
      <div className="absolute top-6 left-6">
        <button
          onClick={restartGame}
          className="border-2 border-[#1E90FF] text-[#1E90FF] hover:bg-[#1E90FF] hover:text-white px-3 py-1 rounded-full text-lg font-semibold transition-transform transform hover:scale-105 font-sans"
        >
          ⬅ Back
        </button>
      </div>

      {/* Card */}
      <div className="p-6 sm:p-10 bg-white rounded-3xl shadow-2xl w-full max-w-3xl text-center animate-fade-in">
        
        {/* Progress */}
        <div className="flex justify-between items-center mb-6 text-gray-600 font-semibold text-sm sm:text-base">
          <span className="bg-blue-100 px-3 py-1 rounded-full">Grade: {grade}</span>
          <span className="bg-green-100 px-3 py-1 rounded-full">
            Question {current + 1} / {questions.length}
          </span>
        </div>

        {/* Question Card */}
        <div className="bg-gradient-to-r from-blue-200 to-green-200 p-6 sm:p-8 rounded-xl shadow-inner mb-6">
          <p className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">{question.text}</p>
          {question.image && (
            <img
              src={question.image}
              alt="Question visual"
              className="w-full h-82 object-cover rounded-lg mb-4"
            />
          )}
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {question.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => selectAnswer(opt)}
              className={`px-4 py-3 rounded-xl font-bold transition-transform duration-300 shadow-md
                ${selected === opt 
                  ? "bg-green-500 text-white scale-105" 
                  : "bg-gradient-to-r from-blue-500 to-green-500 text-white hover:scale-105 hover:shadow-lg"}`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={prevQuestion}
            disabled={current === 0}
            className="border-2 border-blue-500 text-blue-700 px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform disabled:opacity-75 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={nextQuestion}
            className="inline-flex items-center rounded-md bg-blue-500 hover:bg-blue-400 text-white px-6 py-2 font-semibold transition-transform transform hover:scale-105"
          >
            {current === questions.length - 1 ? "Finish" : "Next"}
          </button>
        </div>

        {/* Score + Streak */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-6 text-lg font-bold text-gray-800">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" /> Score: {score}
          </div>
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-orange-500" /> Streak: {streak}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathGame;
