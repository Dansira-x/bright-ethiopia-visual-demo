import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout';

import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import LessonsHub from './pages/LessonsHub';
import GradeRouter from './pages/GradeRouter';
import UnitPage from './pages/UnitPage';
import LibraryPage from './pages/LibraryPage';
import MyDashboard from './pages/MyDashboard';
import TeachersPage from './pages/TeachersPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ForumPage from './pages/ForumPage';
import LeaderboardPage from './pages/LeaderboardPage';

import TeacherDashboard from './pages/TeacherDashboard';
import ParentDashboard from './pages/ParentDashboard';
import AdminDashboard from './pages/AdminDashboard';

import GamesHub from './pages/GamesHub';
import MathGame from './games/MathGame';
import WordScramble from './games/WordScramble';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>

          {/* Homepage */}
          <Route index element={<HomePage />} />

          {/* Visual-only authentication pages */}
          <Route path="login" element={<AuthPage mode="login" />} />
          <Route path="signup" element={<AuthPage mode="signup" />} />

          {/* Student dashboard - directly accessible */}
          <Route path="student/dashboard" element={<MyDashboard />} />

          {/* Learning pages */}
          <Route path="lessons" element={<LessonsHub />} />
          <Route path="grade/:gradeId" element={<GradeRouter />} />
          <Route path="grade/:gradeId/unit/:unitId" element={<UnitPage />} />
          <Route path="library" element={<LibraryPage />} />

          {/* General pages */}
          <Route path="teachers" element={<TeachersPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="forum" element={<ForumPage />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />

          {/* Games */}
          <Route path="games" element={<GamesHub />} />
          <Route path="games/math" element={<MathGame />} />
          <Route path="games/word-scramble" element={<WordScramble />} />

          {/* Role dashboards - directly accessible */}
          <Route path="teacher" element={<TeacherDashboard />} />
          <Route path="parent/dashboard" element={<ParentDashboard />} />
          <Route path="admin/dashboard" element={<AdminDashboard />} />

          {/* Unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;