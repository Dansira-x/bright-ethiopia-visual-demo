import React from 'react';
import GradeCard from '../components/GradeCard';
import { Grade } from '../types';
import PageTransition from '../components/PageTransition';
import { MdSchool } from 'react-icons/md';

const LessonsHub: React.FC = () => {
  const grades: { grade: Grade; isComingSoon: boolean }[] = [
    { grade: 'Nursery', isComingSoon: true },
    { grade: 'KG1', isComingSoon: true },
    { grade: 'KG2', isComingSoon: true },
    { grade: 'KG3', isComingSoon: true },
    { grade: 'Grade 1', isComingSoon: false },
    { grade: 'Grade 2', isComingSoon: false },
    { grade: 'Grade 3', isComingSoon: false },
    { grade: 'Grade 4', isComingSoon: false },
    { grade: 'Grade 5', isComingSoon: true },
    { grade: 'Grade 6', isComingSoon: true },
    { grade: 'Grade 7', isComingSoon: true },
    { grade: 'Grade 8', isComingSoon: true },
    { grade: 'Grade 9', isComingSoon: true },
    { grade: 'Grade 10', isComingSoon: true },
    { grade: 'Grade 11', isComingSoon: true },
    { grade: 'Grade 12', isComingSoon: true },
    { grade: 'University', isComingSoon: true }
  ];

  return (
    <PageTransition>
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="px-4 md:px-6 lg:px-12 py-12 bg-gray-100">
        <div className="text-center mb-8">
  <h1 className="font-sectionTitle text-5xl text-gray-900 mb-8 flex items-center justify-center gap-4">
  <MdSchool size={60} />
  Choose Your Grade
</h1>
  <p className="text-center text-xl text-gray-600 max-w-3xl mx-auto mb-8">
    Select your grade level to access personalized lessons, interactive content, and track your progress.
  </p>
</div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {grades.map(({ grade, isComingSoon }) => (
            <GradeCard 
              key={grade} 
              grade={grade} 
              isComingSoon={isComingSoon}
            />
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-green-500 mt-16 bg-white rounded-xl p-8 shadow-sm">
          <div className="text-center">
            <h2 className="font-sectionTitle text-3xl text-white mb-4">Can't Find Your Grade?</h2>
            <p className="text-white mb-6">
              We're constantly expanding our curriculum. More grades are coming soon!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Request Your Grade
              </button>
              <button className="border-2 border-gray-300 text-white hover:text-yellow-400 hover:border-yellow-400 px-6 py-3 rounded-lg font-semibold transition-colors">
                Get Notified
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </PageTransition>
  );
};

export default LessonsHub;