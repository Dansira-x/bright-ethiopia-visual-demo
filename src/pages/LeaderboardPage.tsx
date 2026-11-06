import {
  Medal,
  Crown,
  Users,
  BookOpen,
  Star,
  Zap,
  CheckCircle,
  UserCircle,
  HelpingHand,
  TrendingUp,
  Brain,
} from 'lucide-react';

export default function LeaderboardPage() {
  const topStats = [
    { label: 'Total Participants', value: '2,847', icon: <Users size={35} className="text-blue-500" /> },
    { label: 'Active This Week', value: '1,234', icon: <TrendingUp size={35} className="text-green-500" /> },
    { label: 'Lessons Completed', value: '45,678', icon: <BookOpen size={35} className="text-purple-500" /> },
    { label: 'Quizzes Taken', value: '23,456', icon: <Brain size={35} className="text-pink-500" /> },
  ];

  const userPosition = {
    name: 'Daniel Yohannes',
    grade: 'Grade 9',
    rank: 25,
    points: 8453,
    streak: 12,
    toNextRank: 1530
  };

  const fullRankings = [
    {
      name: 'Abebe Kebede',
      grade: 'Grade 10',
      lessons: 186,
      streak: 54,
      points: 15420,
      badges: ['Scholar', 'Quiz Master', 'Helper'],
      profileIcon: "/icons/golden.png"
    },
    {
      name: 'Hanan Mohammed',
      grade: 'Grade 10',
      lessons: 180,
      streak: 53,
      points: 14950,
      badges: ['Helper', 'Study Buddy', 'Motivator'],
      profileIcon: "/icons/silver.png"
    },
    {
      name: 'Dawit Tadesse',
      grade: 'Grade 10',
      lessons: 174,
      streak: 52,
      points: 13990,
      badges: ['Consistent Learner', 'Math Wizard'],
      profileIcon: "/icons/bronze.png"
    },
    {
      name: 'Meron Haile',
      grade: 'Grade 10',
      lessons: 168,
      streak: 51,
      points: 13590,
      badges: ['Quick Learner', 'Top Student'],
      profileIcon: "/icons/your-position.png"
    },
    {
      name: 'Yohannes Girma',
      grade: 'Grade 10',
      lessons: 162,
      streak: 50,
      points: 13010,
      badges: ['Language Master', 'Quick Learner'],
      profileIcon: "/icons/your-position.png"
    },
    {
      name: 'Daniel Yohannes',
      grade: 'Grade 9',
      lessons: 58,
      streak: 12,
      points: 8450,
      badges: ['First Steps', 'Quiz Master'],
      profileIcon: "/icons/your-position.png"
    },
  ];

  const featuredAchievements = [
    { title: 'Top Scholar', description: 'Highest points this month', rarity: 'Legendary', icon: <Star size={20} className="text-yellow-500" /> },
    { title: 'Speed Demon', description: 'Fastest lesson completion', rarity: 'Epic', icon: <Zap size={20} className="text-red-500" /> },
    { title: 'Quiz Master', description: '100% quiz accuracy', rarity: 'Rare', icon: <CheckCircle size={20} className="text-blue-500" /> },
    { title: 'Helper', description: 'Most forum contributions', rarity: 'Common', icon: <HelpingHand size={20} className="text-green-500" /> },
  ];

  const topThree = [
  {
    name: 'Hanan Mohammed',
    grade: 'Grade 11',
    points: 14850,
    streak: 32,
    lessons: 148,
    rank: 2,
  },
  {
    name: 'Abebe Kebede',
    grade: 'Grade 10',
    points: 15420,
    streak: 45,
    lessons: 155,
    rank: 1,
  },
  {
    name: 'Dawit Tadesse',
    grade: 'Grade 9',
    points: 13990,
    streak: 28,
    lessons: 134,
    rank: 3,
  },
];

  return (
    <div className="px-4 md:px-8 lg:px-16 py-10 bg-gray-100 space-y-12">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-8">
  <div className="flex items-center gap-2 mb-6">
    <span className="text-5xl">🏆</span>
    <h1 className="font-sectionTitle text-4xl text-gray-900 md:text-5xl text-gray-900 flex items-center gap-4">Leaderboard</h1>
  </div>
  <p className="text-gray-600 text-lg max-w-2xl mt-2">
    See how you rank against other students. Earn points by completing lessons, passing quizzes, and helping others in the community.
  </p>
</div>


      {/* Top Stats */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
  {topStats.map((stat, index) => (
    <div
      key={index}
      className="bg-gray-100 border border-gray-300 rounded-xl shadow-sm p-6 flex flex-col items-center text-center"
    >
      <div className="mb-3">{stat.icon}</div>
      <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
      <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
    </div>
  ))}
</div>

{/* Top Performers Grid */}
<div className="px-6 py-8">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
    {topThree.map((student, index) => {
      const profileImage = {
        "Hanan Mohammed": "/icons/silver.png",
        "Abebe Kebede": "/icons/golden.png",
        "Dawit Tadesse": "/icons/bronze.png"
      }[student.name];

      const badgeIcon = {
        0: "🥈", // Crown for 1st place
        1: "👑", // Silver medal
        2: "🥉"  // Bronze medal
      }[index];

      const elevationClass = index === 1 ? "md:-mt-16" : ""; // Raise 1st place

      return (
        <div key={index} className={`flex flex-col items-center justify-center ${elevationClass}`}>
          {/* Profile Image with Badge */}
          <div className="relative w-24 h-24 mb-3">
            <img
              src={profileImage}
              alt={`${student.name} profile`}
              className="w-24 h-24 rounded-full shadow-md"
            />
            <div className="absolute top-[-4px] right-0 text-3xl">{badgeIcon}</div>
          </div>

          {/* Name + Grade */}
          <div className="text-lg font-semibold text-gray-900">{student.name}</div>
          <div className="text-sm text-gray-500 mb-3">{student.grade}</div>

          {/* Points */}
          <div className="text-2xl font-bold text-blue-600 mb-1">{student.points.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mb-4">points</div>

          {/* Streak + Lessons */}
          <div className="flex gap-6 text-xs text-gray-500">
            <div>
              <div className="text-green-600 font-semibold">{student.streak}</div>
              <div>streak</div>
            </div>
            <div>
              <div className="text-purple-600 font-semibold">{student.lessons}</div>
              <div>lessons</div>
            </div>
          </div>
        </div>
      );
    })}
  </div>
</div>


      {/* Your Position Card */}
<div className="border-2 border-blue-500 bg-blue-100 rounded-xl shadow-md p-3">
  <h2 className="text-xl font-bold text-gray-800 mb-1">Your Position</h2>
  <div className="flex items-center justify-between">
    {/* Left: Profile + Info */}
    <div className="flex items-center gap-4">
      <img
        src="/icons/your-position.png" // Replace with actual avatar path
        alt="Your profile"
        className="w-16 h-16 rounded-full border border-gray-300"
      />
      <div className="text-sm text-gray-700">
        <div className="font-bold text-base">{userPosition.name}</div>
        <div className="text-gray-500">{userPosition.grade}</div>
      </div>
    </div>

    {/* Right: Stats */}
    <div className="text-right text-sm text-gray-700">
      <div className="text-lg font-bold text-blue-600">Rank #{userPosition.rank}</div>
      <div>Points: <span className="font-semibold">{userPosition.points}</span></div>
      <div>Points to next rank: <span className="text-blue-600 font-semibold">{userPosition.toNextRank}</span></div>
      <div>Streak: <span className="text-green-600 font-semibold">{userPosition.streak}-day</span></div>
    </div>
  </div>
</div>

      {/* Full Rankings */}
{/* Full Rankings Section */}
<div className="bg-blue-100 rounded-xl p-4">
  <div className="bg-white border-2 border-blue-500 rounded-xl shadow-md p-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Full Rankings</h2>

    {fullRankings.map((student, index) => (
      <div key={index} className="relative flex items-start gap-4 mb-6 border-b pb-4 last:border-none last:pb-0">
        {/* Profile Icon */}
        <div className="relative">
          <img
            src={student.profileIcon}
            alt={`${student.name} profile`}
            className="w-16 h-16 rounded-full border border-gray-300"
          />
          {index === 0 && (
    <span className="absolute -top-2 -right-2 text-yellow-500 text-3xl">👑</span>
  )}
  {index === 1 && (
    <span className="absolute -top-2 -right-2 text-gray-400 text-3xl">🥈</span>
  )}
  {index === 2 && (
    <span className="absolute -top-2 -right-2 text-orange-400 text-3xl">🥉</span>
  )}
        </div>

        {/* Info Block */}
        <div className="flex-1">
          {/* Name + Rank */}
          <div className="flex items-center justify-between">
            <div className="text-base font-semibold text-gray-800">{student.name}</div>
            <div className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
              #{index + 1}
            </div>
          </div>
          {/* Grade + Lessons + Streak + Badges + Points */}
<div className="flex justify-between items-center mt-1 text-sm">
  {/* Left: Grade, Lessons, Streak */}
  <div className="flex gap-6 text-gray-600">
    <div>{student.grade}</div>
    <div>Lessons: <span className="text-purple-600 font-semibold">{student.lessons}</span></div>
    <div>Streak: <span className="text-green-600 font-semibold">{student.streak}-day</span></div>
  </div>

  {/* Right: Badges + Points */}
  <div className="flex flex-wrap gap-2 items-center text-gray-700">
    {student.badges.map((badge, i) => (
      <span key={i} className="bg-gray-100 text-blue-500 text-sm px-2 py-0 rounded border border-blue-400">
        {badge}
      </span>
    ))}
    <div className="ml-2 text-gray-900 font-bold">
      {student.points.toLocaleString()} points
    </div>
  </div>
</div>
         
        </div>
      </div>
    ))}
  </div>
</div>
 
{/* Featured Achievements */}
<div>
  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Featured Achievements</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {featuredAchievements.map((badge, index) => (
      <div
        key={index}
        className="bg-white rounded-xl shadow p-4 flex items-start gap-4 border border-gray-100"
      >
        <div>{badge.icon}</div>
        <div>
          <div className="text-sm font-bold text-gray-800">{badge.title}</div>
          <div className="text-xs text-gray-500">{badge.description}</div>
          <div className="text-xs mt-1 text-gray-400 italic">{badge.rarity}</div>
        </div>
      </div>
    ))}
  </div>
</div>
</div>
);
}
