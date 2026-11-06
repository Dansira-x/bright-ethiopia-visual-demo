import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowLeft, Clock, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { grade1Units } from '../data/grade1Units';
import PageTransition from '../components/PageTransition';
import { Lesson } from '../data/types';

const subjects = ['English', 'አማርኛ', 'ሒሳብ', 'አካባቢ ሳይንስ', 'የክወናና የዕይታ ጥበባት'];

const defaultNote: Lesson = {
  type: 'note',
  completed: false,
  blocks: [
    { type: 'title', content: 'Unit Overview' },
    { type: 'paragraph', content: 'This unit introduces key concepts and prepares students for the lessons ahead.' }
  ]
};

const injectNotes = (units: typeof grade1Units) => {
  return units.map(unit => {
    const hasNote = unit.lessons.some(l => l.type === 'note');
    const updatedLessons = hasNote ? unit.lessons : [defaultNote, ...unit.lessons];
    return { ...unit, lessons: updatedLessons };
  });
};

const Grade1Page: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubject, setActiveSubject] = useState('English');

  const unitsWithNotes = injectNotes(grade1Units);

  const filteredUnits = unitsWithNotes.filter(
    unit =>
      unit.subject === activeSubject &&
      unit.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const completedCount = unitsWithNotes.filter(u => u.completed).length;
  const totalCount = unitsWithNotes.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/lessons" className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-6 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Grades
          </Link>

          {/* Progress + Search */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h1 className="font-sectionTitle text-4xl text-gray-900 mb-2">Grade 1</h1>
            <p className="text-gray-600 mb-4">Click a unit to explore its lessons and quizzes.</p>

            <div className="mb-6">
              <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                <span>Progress</span>
                <span>{completedCount}/{totalCount} units ({progressPercent}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-blue-500 to-teal-400 h-2.5 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search units..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {/* Subject Tabs */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex flex-wrap gap-2">
              {subjects.map(subject => (
                <button
                  key={subject}
                  onClick={() => setActiveSubject(subject)}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    activeSubject === subject
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>

          {/* Units Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSubject}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredUnits.map(unit => {
                const videoLesson = unit.lessons.find((l): l is Extract<Lesson, { type: 'video' }> => l.type === 'video');
                const quizLesson = unit.lessons.find((l): l is Extract<Lesson, { type: 'quiz' }> => l.type === 'quiz');

                return (
                  <Link key={unit.id} to={`/grade/1/unit/${unit.id}`}>
                    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg">
                      <img src={unit.thumbnail} alt={unit.title} className="w-full h-40 object-cover" />
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{unit.title}</h3>
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                          <span>{unit.subject}</span>
                          {videoLesson && (
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              <span>{videoLesson.duration} min</span>
                            </div>
                          )}
                        </div>
                        {unit.completed && <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />}
                        {/* ✅ Show badge if unit has quizzes */}
                        {quizLesson && (
                          <span className="text-xs text-blue-600 font-medium">Includes Quizzes</span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
};

export default Grade1Page;
