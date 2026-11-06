import React from 'react';
import { useParams } from 'react-router-dom';
import Grade1Page from './Grade1Page';
import Grade2Page from './Grade2Page';
import Grade3Page from './Grade3Page';
import Grade4Page from './Grade4Page';

const GradeRouter: React.FC = () => {
  const { gradeId } = useParams();

  switch (gradeId) {
    case '1':
      return <Grade1Page />;
    case '2':
      return <Grade2Page />;
    case '3':
      return <Grade3Page />;
    case '4':
      return <Grade4Page />;
    default:
      return (
        <div className="min-h-screen flex items-center justify-center text-gray-600 text-xl">
          🚫 Grade not found
        </div>
      );
  }
};

export default GradeRouter;
