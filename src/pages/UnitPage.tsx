import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import NoteRenderer from '../components/NoteRenderer';
import Quiz from '../components/Quiz'; // ✅ import Quiz component
import { grade1Units } from '../data/grade1Units';
import { grade2Units } from '../data/grade2Units';
import { grade3Units } from '../data/grade3Units';
import { grade4Units } from '../data/grade4Units';
import {
  Play,
  BookOpen,
  FileQuestion,
  ArrowLeft,
  CheckCircle,
  StickyNote
} from 'lucide-react';
import { Quiz as QuizType } from '../data/types'; // ✅ import Quiz type

const UnitPage: React.FC = () => {
  const { gradeId, unitId } = useParams();
  const normalizedGradeId = gradeId?.replace('grade-', '') ?? '';

  const units =
    normalizedGradeId === '1' ? grade1Units :
    normalizedGradeId === '2' ? grade2Units :
    normalizedGradeId === '3' ? grade3Units :
    normalizedGradeId === '4' ? grade4Units :
    [];

  const unit = units.find(u => u.id === unitId);

  if (!unit) {
    return (
      <div className="min-h-screen bg-gray-50 py-20 text-center text-gray-600">
        <h2 className="text-2xl font-semibold mb-4">🚫 Unit Not Found</h2>
        <Link to={`/grade/${normalizedGradeId}`} className="mt-6 inline-block text-blue-500 hover:underline">
          ← Back to Grade {normalizedGradeId}
        </Link>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 py-8 px-4 max-w-3xl mx-auto">
        <Link to={`/grade/${normalizedGradeId}`} className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-6 font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Grade {normalizedGradeId}
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">{unit.title}</h1>
        <p className="text-gray-600 mb-6">Subject: {unit.subject}</p>

        {unit.lessons.map((lesson, index) => {
          switch (lesson.type) {
            case 'video':
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Play className="w-6 h-6 text-red-500" />
                    <h2 className="text-xl font-semibold text-gray-800">Video</h2>
                    {lesson.completed && <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />}
                  </div>
                  <p className="text-gray-700 mb-2">{lesson.title}</p>
                  <p className="text-sm text-gray-500">Duration: {lesson.duration} min</p>
                  {lesson.url && (
                    <div className="aspect-w-16 aspect-h-18 mt-4 rounded overflow-hidden">
                      <iframe
                        src={lesson.url}
                        title={lesson.title}
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  )}
                </div>
              );

            case 'book':
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <BookOpen className="w-6 h-6 text-blue-500" />
                    <h2 className="text-xl font-semibold text-gray-800">Book</h2>
                    {lesson.completed && <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />}
                  </div>
                  <p className="text-gray-700">{lesson.title}</p>
                  {lesson.url && (
                    <iframe
                      src={lesson.url}
                      title={lesson.title}
                      className="w-full h-96 mt-4 rounded"
                    />
                  )}
                </div>
              );

            case 'quiz':
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <FileQuestion className="w-6 h-6 text-green-500" />
                    <h2 className="text-xl font-semibold text-gray-800">Quiz</h2>
                    {lesson.completed && <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />}
                  </div>
                  <p className="text-gray-700">{lesson.title}</p>
                  <div className="mt-4 space-y-4">
                    {lesson.quizzes.map((quiz: QuizType, i: number) => (
                      <Quiz key={i} quiz={quiz} />
                    ))}
                  </div>
                </div>
              );

            case 'note':
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <StickyNote className="w-6 h-6 text-yellow-500" />
                    <h2 className="text-xl font-semibold text-gray-800">Note</h2>
                    {lesson.completed && <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />}
                  </div>
                  <NoteRenderer blocks={lesson.blocks} />
                </div>
              );

            default:
              return null;
          }
        })}
      </div>
    </PageTransition>
  );
};

export default UnitPage;
