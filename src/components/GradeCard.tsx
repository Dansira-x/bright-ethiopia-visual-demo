import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, PenTool, GraduationCap, Baby } from 'lucide-react';
import { Grade } from '../types';

interface GradeCardProps {
  grade: Grade;
  isComingSoon?: boolean;
}

const GradeCard: React.FC<GradeCardProps> = ({ grade, isComingSoon = false }) => {
  const getGradeIcon = (grade: Grade) => {
    if (grade.includes('Nursery') || grade.includes('KG')) return Baby;
    if (grade.includes('1') || grade.includes('2') || grade.includes('3') || grade.includes('4')) return BookOpen;
    if (grade.includes('5') || grade.includes('6') || grade.includes('7') || grade.includes('8')) return PenTool;
    return GraduationCap;
  };

  const IconComponent = getGradeIcon(grade);

  const getGradeSlug = (grade: Grade) => {
  const match = grade.match(/Grade (\d+)/);
  return match ? match[1] : grade.toLowerCase().replace(/\s+/g, '-');
 };


  if (isComingSoon) {
    return (
      <div className="bg-gray-50 rounded-xl p-6 text-center border-2 border-dashed border-gray-300 opacity-60">
        <div className="bg-gray-200 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <IconComponent className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">{grade}</h3>
        <span className="text-sm text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
          Coming Soon
        </span>
      </div>
    );
  }

  return (
    <Link
      to={`/grade/${getGradeSlug(grade)}`}
      className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 group"
    >
      <div className="text-center">
        <div className="bg-gradient-to-r from-blue-500 to-green-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <IconComponent className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {grade}
        </h3>
        <span className="text-blue-500 font-medium text-sm bg-blue-50 px-3 py-1 rounded-full group-hover:bg-blue-100 transition-colors">
          Enter Grade
        </span>
      </div>
    </Link>
  );
};

export default GradeCard;