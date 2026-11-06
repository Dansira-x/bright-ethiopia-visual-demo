import React from 'react';
import { Heart, Target, Globe, Users } from 'lucide-react';
import PageTransition from '../components/PageTransition'; // ✅ Import the wrapper
const AboutPage: React.FC = () => {
  const values = [
    {
      icon: Heart,
      title: 'Cultural Pride',
      description: 'We celebrate Ethiopian heritage while preparing students for global opportunities.'
    },
    {
      icon: Target,
      title: 'Educational Excellence',
      description: 'High-quality content that meets international standards while respecting local context.'
    },
    {
      icon: Globe,
      title: 'Mother Tongue First',
      description: 'Learning begins in the language closest to your heart - your mother tongue.'
    },
    {
      icon: Users,
      title: 'Community Impact',
      description: 'Building stronger communities through accessible, quality education for all.'
    }
  ];

  return (
    <PageTransition>
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="font-sectionTitle text-4xl md:text-5xl text-gray-900 mb-6">
            Our Mission: Empowering Every Ethiopian Student
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Bright-Ethiopia Acadamey was born from a simple belief: every Ethiopian child deserves access to 
            world-class education that honors their cultural identity while preparing them for global success.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-xl p-8 mb-16 text-white text-center">
          <h2 className="font-sectionTitle text-3xl mb-4">Our Vision</h2>
          <p className="text-xl leading-relaxed max-w-3xl mx-auto">
            To create a generation of confident, culturally-grounded Ethiopian learners who can compete 
            globally while staying connected to their roots. We envision an Ethiopia where every child, 
            regardless of location or economic background, has access to quality education.
          </p>
        </div>

        {/* Values Grid */}
        <div className="mb-16">
          <h2 className="font-sectionTitle text-3xl text-gray-900 text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center">
                  <div className="bg-blue-50 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Roadmap */}
        <div className="bg-blue- rounded-xl shadow-sm p-8 mb-16">
          <h2 className="font-sectionTitle text-3xl text-gray-900 text-center mb-12">Our Roadmap</h2>
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">✓</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Phase 1: Foundation (2024-2025)</h3>
                <p className="text-gray-600">Launch core curriculum for Nursery through Grade 4 with comprehensive Amharic, Afaan Oromoo, and English content.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Phase 2: Expansion (2025-2026)</h3>
                <p className="text-gray-600">Extend curriculum to Grade 12, add advanced subjects, and introduce AI-powered personalized learning paths.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Phase 3: University & Beyond (2026+)</h3>
                <p className="text-gray-600">Launch university prep courses, vocational training, and adult education programs to serve learners at every stage.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gray-900 rounded-xl p-8 text-center text-white">
          <h2 className="font-sectionTitle text-3xl mb-4">Join Our Mission</h2>
          <p className="text-xl mb-6 opacity-90">
            Together, we can transform education in Ethiopia. Be part of the change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Become a Volunteer
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors">
              Partner With Us
            </button>
          </div>
        </div>
      </div>
    </div>
    </PageTransition>
  );
};

export default AboutPage;