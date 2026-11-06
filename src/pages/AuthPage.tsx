import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

type UserRole = 'student' | 'teacher' | 'parent' | 'admin';

const AuthPage = ({ mode }: { mode: 'login' | 'signup' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [role, setRole] = useState<UserRole>('student');

  const navigate = useNavigate();

  const dashboardRoutes: Record<UserRole, string> = {
    student: '/student/dashboard',
    teacher: '/teacher',
    parent: '/parent/dashboard',
    admin: '/admin/dashboard',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Visual demo only: no account creation or password verification.
    navigate(dashboardRoutes[role]);
  };

  return (
    <PageTransition>
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">

          <h2 className="text-2xl font-bold text-center mb-6">
            {mode === 'login'
              ? 'Log In to Bright-Ethiopia Academy'
              : 'Join Bright-Ethiopia Academy'}
          </h2>

          <div className="text-center text-sm text-blue-600 bg-blue-50 rounded-lg p-3 mb-5">
            Demo Preview — Choose a role to explore its dashboard.
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Role selection for both login and registration */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full border rounded-lg px-4 py-3"
              required
            >
              <option value="student">🎓 Student</option>
              <option value="teacher">📚 Teacher</option>
              <option value="parent">👨‍👩‍👧 Parent</option>
              <option value="admin">⚙️ Admin</option>
            </select>

            {/* Registration-only fields */}
            {mode === 'signup' && (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2"
                  required
                />

                {role === 'student' && (
                  <input
                    type="text"
                    placeholder="Grade"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full border rounded-lg px-4 py-2"
                    required
                  />
                )}
              </>
            )}

            <input
              type="email"
              placeholder="Email (e.g. samuel@example.com)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
            >
              {mode === 'login'
                ? 'Log In'
                : 'Join Bright-Ethiopia Academy'}
            </button>

            <div className="text-center">
              <p className="text-gray-600">
                {mode === 'login'
                  ? "Don't have an account? "
                  : 'Already have an account? '}

                <Link
                  to={mode === 'login' ? '/signup' : '/login'}
                  className="text-blue-500 hover:text-blue-600 font-semibold transition-colors"
                >
                  {mode === 'login' ? 'Sign up' : 'Log in'}
                </Link>
              </p>
            </div>

          </form>
        </div>
      </div>
    </PageTransition>
  );
};

export default AuthPage;