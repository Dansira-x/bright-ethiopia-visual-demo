import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen ,Users, Play, Star, MessageSquare, Trophy} from 'lucide-react';
import {  Video,
  Gamepad2,
  Library,
  Bot,
  BadgeCheck } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const HomePage: React.FC = () => {

  const grades = [
    { label: 'Nursery', age: '3–6', color: 'from-yellow-100 to-yellow-200' },
    { label: 'Grade 1', age: '6–7', color: 'from-green-100 to-green-200' },
    { label: 'Grade 4', age: '9–10', color: 'from-blue-100 to-blue-200' },
    { label: 'Grade 7', age: '12–13', color: 'from-indigo-100 to-indigo-200' },
    { label: 'Grade 9', age: '14–15', color: 'from-purple-100 to-purple-200' },
    { label: 'Grade 12', age: '17–18', color: 'from-pink-100 to-pink-200' }
  ];



  return (
    <PageTransition>
      <div className="min-h-screen font-sans bg-[#FDF6EC] text-[#2C2C2C]">

        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#008F03] via-[#FFD700] to-[#FF000D]">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
    
    {/* Text Content */}
    <div className="text-center lg:text-left flex-1">
      <h1 className="text-6xl md:text-8xl font-heading font-bold text-[#2C2C2C] leading-tight mb-6">
        <span className='block'>Welcome to{' '}</span>
        <span className="block bg-gradient-to-r from-blue-600 to-green-900 bg-clip-text text-transparent">
          Bright-Ethiopia Academy
        </span>
      </h1>
      <p className="font-sans font-bold text-xl leading-relaxed mb-8 max-w-xl text-[#2C2C2C]">
        Joyful, culturally rooted education for Ethiopian students from Nursery to University.
        Learn in your mother tongue and unlock your full potential.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
        <Link
          to="/lessons"
          className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold transition-transform transform hover:scale-105 shadow-lg inline-flex items-center font-sans"
        >
          Start Learning Today
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
        <Link
          to="/about"
          className="border-2 border-[#1E90FF] text-[#1E90FF] hover:bg-[#1E90FF] hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-transform transform hover:scale-105 font-sans"
        >
          Learn Our Story
        </Link>
      </div>
    </div>

    {/* Hero Image */}
    <div className="flex-1 relative">
      <div className="rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
        <img
          src="/thumbnails/herosectionimg.jpg"
          alt="Joyful Ethiopian students learning together"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  </div>
</section>


        {/* Learning Hubs Section */}
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-sectionTitle text-4xl mb-4">
            Discover Your Learning Hubs
          </h2>
          <p className="text-xl text-gray-600">
            Choose a hub and start exploring interactive content
          </p>
        </div>

        {/* Hub Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {[
    {
      label: "Test & Quiz Arena",
      desc: "Practice quizzes, mock exams, and test your knowledge.",
      image: "/thumbnails/hub cards/test&quiz_arena.png",
      color: "from-yellow-100 to-yellow-200",
      link: "/quiz-arena",
    },
    {
      label: "Learning Games Hub",
      desc: "Play educational games that make learning fun.",
      image: "/thumbnails/hub cards/learning_games_hub.png",
      color: "from-green-100 to-green-200",
      link: "/games",
    },
    {
      label: "Story & Adventure Zone",
      desc: "Interactive stories and adventures that teach life lessons.",
      image: "/thumbnails/hub cards/story&adventure_zone.png",
      color: "from-blue-100 to-blue-200",
      link: "/stories",
    },
    {
      label: "Creative Lab",
      desc: "Unleash your creativity with art, writing, and projects.",
      image: "/thumbnails/hub cards/creative_lab.png",
      color: "from-pink-100 to-pink-200",
      link: "/creative-lab",
    },
    {
      label: "Challenge of the Week",
      desc: "Weekly challenges to sharpen your skills and win badges.",
      image: "/thumbnails/hub cards/challenge_of_the_week.png",
      color: "from-indigo-100 to-indigo-200",
      link: "/weekly-challenge",
    },
    {
      label: "Explore & Discover",
      desc: "Fun facts, science experiments, and “Did you know?” moments.",
      image: "/thumbnails/hub cards/explore&discover.png",
      color: "from-purple-100 to-purple-200",
      link: "/explore",
    },
  ].map((hub, index) => (
    <Link
  key={index}
  to={hub.link}
  className={`bg-gradient-to-br ${hub.color} rounded-2xl shadow-md hover:shadow-xl transform transition-all duration-500 hover:-translate-y-2 hover:scale-105 group overflow-hidden flex flex-col`}
  style={{
    animation: `fadeInUp 0.3s ease ${index * 0.1}s forwards`,
    opacity: 0,
  }}
>
  {/* Upper Half: Thumbnail */}
  <div className="h-72 sm:h-80 lg:h-96 w-full overflow-hidden">
    <img
      src={hub.image}
      alt={hub.label}
      className="w-full h-full object-cover rounded-t-2xl"
    />
  </div>

  {/* Lower Half: Text */}
  <div className="flex-1 p-6 text-center">
    <h3 className="text-xl font-semibold mb-3 group-hover:text-[#2E8B57] transition-colors">
      {hub.label}
    </h3>
    <p className="text-gray-700 text-base leading-relaxed">{hub.desc}</p>
  </div>
</Link>

  ))}
</div>


        {/* Explore More Button */}
        <div className="text-center mt-12">
          <Link
            to="/explore"
            className="inline-flex items-center bg-[#1E90FF] hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold transition-transform transform hover:scale-105"
          >
            Explore More
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>

        {/* Teachers Section */}
<section className="py-20 bg-[#FDF6EC]">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="font-sectionTitle text-4xl mb-4 animate-fade-in-up">Meet Our Amazing Teachers</h2>
      <p className="text-xl text-gray-700 animate-fade-in-up">Passionate educators dedicated to your success</p>
    </div>

    <div className="grid md:grid-cols-3 gap-8 mb-12">
      {[
        {
          name: 'Mr. Yidnekachew Kifle',
          grade: 'Grade 6th -12th | 18+ Years of Experience.',
          photo: '/thumbnails/teachers-bio/IMG_9402.re.jpg'
        },
        {
          name: 'Mr. Fekede Atile',
          grade: 'Grade 5th - 9th | 12+ Years of Experience.',
          photo: '/thumbnails/teachers-bio/IMG_9415.re.jpg'
        },
        {
          name: 'Mr. Gizaw Worku',
          grade: 'Grade 5th - 8th | 9+ years of Experience.',
          photo: '/thumbnails/teachers-bio/IMG_9413.re.jpg'
        }
      ].map((teacher, index) => (
        <div
          key={index}
          className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-transform transform hover:scale-105 animate-fade-in-up"
          style={{ animationDelay: `${index * 0.2}s`, animationFillMode: 'forwards' }}
        >
          <img 
            src={teacher.photo} 
            alt={teacher.name}
            className="w-full h-70 object-cover"
          />
          <div className="p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-1">{teacher.name}</h3>
            <p className="text-blue-600 font-medium">{teacher.grade}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="text-center">
      <Link
        to="/teachers"
        className="inline-flex items-center rounded-md bg-blue-500 hover:bg-blue-400 text-white px-3 py-2  font-semibold transition-transform transform hover:scale-105"
      >
        Meet All Teachers
        <ArrowRight className="ml-2 w-4 h-4" />
      </Link>
    </div>
  </div>
</section>
      {/* Why Choose Us Section */}
        <section className="bg-white py-20 px-4 sm:px-6 lg:px-12">
  <div className="max-w-screen-xl mx-auto text-center">
    <h2 className="font-sectionTitle text-4xl mb-6 text-gray-900">Why Choose Bright-Ethiopia Academy?</h2>
    <p className="text-lg text-gray-600 mb-12">
      Discover the features that make learning engaging, effective, and joyful for Ethiopian students.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
      {[
        {
          icon: Video,
          title: 'Interactive Lessons',
          desc: 'Engaging video lessons with quizzes and notes in multiple languages.',
          iconBg: 'bg-yellow-100',
          iconColor: 'text-yellow-600'
        },
        {
          icon: Users,
          title: 'Community Forum',
          desc: 'Connect with classmates and teachers across Ethiopia.',
          iconBg: 'bg-pink-100',
          iconColor: 'text-pink-600'
        },
        {
          icon: Gamepad2,
          title: 'Gamified Learning',
          desc: 'Earn coins, badges, and compete on leaderboards.',
          iconBg: 'bg-purple-100',
          iconColor: 'text-purple-600'
        },
        {
          icon: Library,
          title: 'Digital Library',
          desc: 'Access thousands of textbooks and educational resources.',
          iconBg: 'bg-orange-100',
          iconColor: 'text-orange-600'
        },
        {
          icon: Bot,
          title: 'AI Tutor',
          desc: 'Get personalized help from an intelligent tutoring system.',
          iconBg: 'bg-cyan-100',
          iconColor: 'text-cyan-600'
        },
        {
          icon: BadgeCheck,
          title: 'Certifications',
          desc: 'Earn digital certificates and prepare for your future.',
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600'
        }
      ].map((item, idx) => (
        <div
          key={idx}
          className="bg-gray-100 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300"
        >
          <div className="flex items-center mb-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${item.iconBg}`}>
              <item.icon className={`w-6 h-6 ${item.iconColor}`} />
            </div>
            <h3 className="font-sectionTitle text-xl text-gray-900">{item.title}</h3>
          </div>
          <p className="text-gray-700 text-base leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section> 
        {/* Impact Stats Section */}
        <section className="bg-gradient-to-r from-blue-500 to-green-500 py-20 px-4 sm:px-6 lg:px-12 text-white">
          <div className="max-w-screen-la mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { icon: Users, value: '50,000+', label: 'Active Students' },
              { icon: Play, value: '10,000+', label: 'Video Lessons' },
              { icon: BookOpen, value: '5,000+', label: 'Digital Books' },
              { icon: Star, value: '1,000+', label: 'Success Stories' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <item.icon className="w-8 h-16 mb-2" />
                <h4 className="font-sectionTitle text-4xl mb-6">{item.value}</h4>
                <p className="text-1xl h-12 ">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-12">
          <div className="max-w-screen-xl mx-auto text-center">
            <h2 className="font-sectionTitle text-4xl mb-4 text-gray-900">Ready to Start Your Learning Journey?</h2>
            <p className="text-gray-600 mb-8">
              <p>Join thousands of Ethiopian students who are already learning with us. Access</p> 
              <p>quality education in your mother tongue and English.</p>
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/community" className="text-sm flex items-center justify-center gap-2 bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-400 transition">
                <MessageSquare className="w-5 h-5" />
                Join Community
              </Link>
              <Link to="/leaderboard" className="text-sm flex items-center justify-center gap-2 bg-transparent text-blue-500 px-3 py-2 rounded-md border border-blue-200 hover:border-blue-500 hover:bg-blue-100 transition">
                <Trophy className="w-5 h-5" />
                View Leaderboard
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default HomePage;
