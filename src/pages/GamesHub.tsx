import React from "react";
import { Link } from "react-router-dom";
import { Gamepad2, Trophy } from "lucide-react";
import PageTransition from "../components/PageTransition";

const GamesHub: React.FC = () => {
  const games = [
    {
      title: "Math Challenge",
      desc: "Solve quick math puzzles and boost your skills.",
      image: "/thumbnails/games/maths.png",
      color: "from-yellow-400 to-yellow-600",
      link: "/games/math"
    },
    {
      title: "Word Scramble",
      desc: "Unscramble words to improve vocabulary.",
      image: "/thumbnails/games/word_scramble.jpg",
      color: "from-pink-400 to-pink-600",
      link: "/games/word-scramble"
    },
    {
      title: "Memory Match",
      desc: "Match cards and train your memory.",
      image: "/thumbnails/games/memory_match.jpg",
      color: "from-green-400 to-green-600",
      link: "/games/memory-match"
    },
    {
      title: "Trivia Arena",
      desc: "Answer fun trivia questions across subjects.",
      image: "/thumbnails/games/trivial_arena.png",
      color: "from-blue-400 to-blue-600",
      link: "/games/trivia"
    },
    {
      title: "Weekly Challenge",
      desc: "Compete in weekly challenges and earn badges.",
      image: "/thumbnails/games/weekly_challenge.png",
      color: "from-purple-400 to-purple-600",
      link: "/games/weekly"
    }
  ];

  return (
    <PageTransition>
  <div className="relative min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] text-white font-sans">
    
    {/* Decorative Stickers */}
<img
  src="/thumbnails/games/planets_icon.png"
  alt="Sticker 1"
  className="absolute top-6 right-6 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32"
/>

<img
  src="/thumbnails/games/shooting_star.png"
  alt="Sticker 2"
  className="absolute top-2 right-2 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 hover:rotate-12 transition"
/>

<img
  src="/thumbnails/games/balloons.png"
  alt="Sticker 3"
  className="hidden sm:block absolute top-10 left-10 w-20 h-20 lg:w-32 lg:h-32"
/>


    {/* Hero Section */}
    <section className="py-16 text-center relative z-10">
      <h1 className="text-5xl md:text-6xl font-bold mb-4">
  {Array.from("🎮 Welcome to the Games Hub").map((char, i) => (
    <span
      key={i}
      className="inline-block animate-glow"
      style={{ animationDelay: `${i * 0.2}s` }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ))}
</h1>



      <p className="text-xl text-gray-300 max-w-2xl mx-auto">
        Choose your adventure, play interactive learning games, and climb the leaderboard!
      </p>
    </section>

    {/* Game Menu Grid */}
    <section className="px-6 sm:px-12 py-12 relative z-10">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {games.map((game, index) => (
          <Link
            key={index}
            to={game.link}
            className={`relative bg-gradient-to-br ${game.color} rounded-3xl shadow-lg transform transition-all duration-500 hover:-translate-y-2 hover:scale-105 group overflow-hidden`}
          >
            {/* Upper half: Thumbnail image */}
            <div className="h-54 w-full">
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Lower half: Content */}
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold mb-2 group-hover:text-yellow-100 transition">
                {game.title}
              </h3>
              <p className="text-gray-200 mb-4">{game.desc}</p>

              {/* Play Button */}
              <span className="inline-flex items-center bg-black bg-opacity-40 px-4 py-2 rounded-lg text-white font-semibold transition group-hover:bg-opacity-60">
                Play Now
                <Gamepad2 className="ml-2 w-5 h-5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>

    {/* Leaderboard Teaser */}
    <section className="py-16 text-center bg-black bg-opacity-30 mt-12 relative z-10">
      <h2 className="text-4xl font-bold mb-4">🏆 Compete & Win</h2>
      <p className="text-lg text-gray-300 mb-6">
        Earn points, badges, and see your name on the leaderboard!
      </p>
      <Link
        to="/leaderboard"
        className="inline-flex items-center bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-full font-bold transition-transform transform hover:scale-105"
      >
        View Leaderboard
        <Trophy className="ml-2 w-6 h-6" />
      </Link>
    </section>
  </div>
</PageTransition>

  );
};

export default GamesHub;
