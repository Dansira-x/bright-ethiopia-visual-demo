import React, { useState } from 'react';
import {
  Calendar, Award, FileText, Download, Edit,
  BarChart2, User
} from 'lucide-react';
import PageTransition from '../components/PageTransition';

const MyDashboard: React.FC = () => {
  const [tasks, setTasks] = useState([false, false, true]);

  const student = {
    name: 'Abebe Kebede',
    grade: 'Grade 4 Student',
    memberSince: 'September 2025',
    avatar: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200',
    completedLessons: 24,
    averageScore: 86,
    goalsAchieved: 8
  };

  const badges = [
    { id: 1, icon: '🏆', name: 'Top Learner', date: 'October 2026' },
    { id: 2, icon: '📚', name: 'Reading Star', date: 'September 2026' },
    { id: 3, icon: '⭐', name: 'Math Explorer', date: 'September 2026' }
  ];

  const studyTasks = [
    'Complete Amharic lessons 1–5',
    'Practice Math addition',
    'Read English storybook'
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-5 rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
            Demo Preview — Student dashboard with illustrative sample data.
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <User className="w-6 h-6 mr-2 text-blue-600" />
            My Dashboard
          </h1>

          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
              />
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{student.name}</h2>
                <p className="text-lg text-blue-600 font-medium mb-2">{student.grade}</p>
                <div className="flex items-center justify-center md:justify-start text-gray-600 mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  Member since {student.memberSince}
                </div>
                <button className="inline-flex items-center bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-100">
                  <Edit className="w-4 h-4 mr-2" /> Edit Profile
                </button>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-8 text-center">
            🎉 Great job, {student.name}! You've completed {student.completedLessons} lessons!
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <BarChart2 className="w-5 h-5 mr-2 text-purple-500" />
              My Learning Analytics
            </h2>
            <div className="space-y-4">
              {[
                ['Lessons Completed', student.completedLessons],
                ['Average Score', `${student.averageScore}%`],
                ['Goals Achieved', student.goalsAchieved]
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">{label}</span>
                  <span className="text-blue-600 font-bold">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Learning Activities</h2>
            <div className="grid grid-cols-2 gap-4">
              {['Alphabet Activity', 'Matching Game', 'Greetings Practice', 'Tracing Letters'].map((activity, i) => (
                <button key={activity} className={`p-4 rounded-lg font-semibold ${
                  ['bg-green-100', 'bg-yellow-100', 'bg-pink-100', 'bg-purple-100'][i]
                }`}>
                  {activity}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2 text-yellow-500" />
              Achievement Badges
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {badges.map(badge => (
                <div key={badge.id} className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200 text-center">
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <h4 className="font-semibold text-gray-900 mb-1">{badge.name}</h4>
                  <p className="text-xs text-gray-600">{badge.date}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Study Plan</h2>
              <button className="text-blue-500 hover:text-blue-600 font-medium">Edit Plan</button>
            </div>
            <div className="space-y-4">
              {studyTasks.map((task, index) => (
                <label key={task} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    checked={tasks[index]}
                    onChange={() => setTasks(prev => prev.map((v, i) => i === index ? !v : v))}
                    className="rounded text-blue-500"
                  />
                  <span className="text-gray-700">{task}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-500" />
                Saved Notes
              </h2>
              {['Amharic Alphabet Notes', 'Math Addition Tips', 'English Vocabulary'].map(note => (
                <div key={note} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-3">
                  <span className="text-gray-700">{note}</span>
                  <button className="text-blue-500 text-sm">View</button>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Download className="w-5 h-5 mr-2 text-green-500" />
                Downloads
              </h2>
              {['Grade 1 Worksheet.pdf', 'Amharic Practice.pdf', 'Math Exercises.pdf'].map(file => (
                <div key={file} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-3">
                  <span className="text-gray-700">{file}</span>
                  <button className="text-green-500 text-sm">Download</button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
};

export default MyDashboard;
