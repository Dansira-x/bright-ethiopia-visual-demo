import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white w-full">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Mission */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Link to="/" className="bg-gradient-to-r from-[#008F03] via-[#FFD700] to-[#FF000D] p-3 rounded-lg">
                <img
                  src="/icons/logo.png"
                  alt="Bright Ethiopia Academy"
                  className="w-12 h-12"
                />
              </Link>
              <span className="text-xl font-bold">Bright-Ethiopia Academy</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Empowering Ethiopian students with joyful, culturally rooted education in their mother tongues. 
              Building tomorrow's leaders today.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/lessons" className="text-gray-300 hover:text-white transition-colors">All Lessons</Link></li>
              <li><Link to="/teachers" className="text-gray-300 hover:text-white transition-colors">Our Teachers</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Languages & Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Languages</h3>
            <div className="flex items-center space-x-2 mb-4">
              <Globe className="w-4 h-4 text-gray-400" />
              <select className="bg-gray-800 text-white border border-gray-700 rounded px-2 py-1 text-sm">
                <option value="am">አማርኛ</option>
                <option value="or">Afaan Oromoo</option>
                <option value="en">English</option>
              </select>
            </div>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Green Hope Learning. All rights reserved. Built with ❤️ for Ethiopian students.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
