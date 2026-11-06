import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu, X, Users, MessageSquare, Home, BookOpen,
  Library, Info, Mail, GraduationCap, Briefcase,
  UserRound, Shield
} from 'lucide-react';

type NavItem = {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainNav: NavItem[] = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Lessons', href: '/lessons', icon: BookOpen },
    { name: 'Library', href: '/library', icon: Library },
    { name: 'Teachers', href: '/teachers', icon: Users },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: Mail }
  ];

  const communityNav: NavItem[] = [
    { name: 'Forum', href: '/forum', icon: MessageSquare },
    { name: 'Leaderboard', href: '/leaderboard', icon: Users }
  ];

  const dashboardNav: NavItem[] = [
    { name: 'Student Preview', href: '/student/dashboard', icon: GraduationCap },
    { name: 'Teacher Preview', href: '/teacher', icon: Briefcase },
    { name: 'Parent Preview', href: '/parent/dashboard', icon: UserRound },
    { name: 'Admin Preview', href: '/admin/dashboard', icon: Shield }
  ];

  const navLink = (item: NavItem, mobile = false) => (
    <Link
      key={item.name}
      to={item.href}
      onClick={() => setIsMenuOpen(false)}
      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        location.pathname === item.href
          ? 'bg-blue-500 text-white'
          : 'text-gray-800 hover:bg-gray-100'
      } ${mobile ? 'w-full' : ''}`}
    >
      {item.icon && <item.icon className="w-4 h-4 mr-2" />}
      {item.name}
    </Link>
  );

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur shadow-md' : 'bg-white'
    }`}>
      <div className="flex justify-between items-center min-h-16 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center space-x-3 hover:opacity-80">
          <img src="/icons/logo.png" alt="Bright Ethiopia Academy" className="h-14 w-auto" />
          <span className="font-sectionTitle text-xl sm:text-2xl text-gray-900">
            Bright-Ethiopia Academy
          </span>
        </Link>

        <nav className="hidden lg:flex items-center space-x-2">
          {mainNav.map(item => navLink(item))}

          <div className="relative">
            <button
              onClick={() => setIsCommunityOpen(!isCommunityOpen)}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <Users className="w-4 h-4 mr-2" /> Community ▼
            </button>
            {isCommunityOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border py-1">
                {communityNav.map(item => (
                  <div key={item.name} onClick={() => setIsCommunityOpen(false)}>
                    {navLink(item)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link to="/login" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm">
            Log In
          </Link>
          <Link to="/signup" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm">
            Join Bright-Ethiopia
          </Link>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
          aria-label="Toggle navigation"
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white p-4 space-y-2">
          {mainNav.map(item => navLink(item, true))}
          {communityNav.map(item => navLink(item, true))}

          <div className="border-t pt-3 mt-3">
            <p className="text-xs font-semibold uppercase text-gray-500 mb-2">
              Dashboard Previews
            </p>
            {dashboardNav.map(item => navLink(item, true))}
          </div>

          <div className="flex gap-3 border-t pt-3">
            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-blue-600">
              Log In
            </Link>
            <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="text-green-600">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
