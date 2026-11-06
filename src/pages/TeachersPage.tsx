import React from 'react';
import { Mail, MessageCircle, Users } from 'lucide-react';
import { mockTeachers } from '../data/mockData';
import PageTransition from '../components/PageTransition';

const TeachersPage: React.FC = () => {
  return (
    <PageTransition>
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-sectionTitle text-5xl text-gray-800 mb-8 flex items-center justify-center gap-4">
  <Users size={40} strokeWidth={2.5} className="text-gray-800" />
  Meet Our Amazing Teachers
</h1>
   <p className="text-center text-xl text-gray-600 max-w-3xl mx-auto mb-8">
  Our passionate educators are dedicated to providing quality education that honors Ethiopian culture 
  while preparing students for global success.
</p>


        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mockTeachers.map((teacher) => (
            <div key={teacher.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <img
                src={teacher.photo}
                alt={teacher.name}
                className="w-full h-65 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{teacher.name}</h3>
                <p className="text-blue-500 font-medium mb-4">{teacher.grade}</p>
                <p className="text-gray-600 mb-6 leading-relaxed">{teacher.bio}</p>
                
                <div className="flex space-x-3">
                  {teacher.linkedin && (
                    <a
                      href={teacher.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center bg-blue-50 text-blue-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                    >
                      <Mail className="w-4 h-4 mr-1" />
                      LinkedIn
                    </a>
                  )}
                  {teacher.telegram && (
                    <a
                      href={`https://t.me/${teacher.telegram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center bg-green-50 text-green-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Telegram
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Join Our Team Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl p-8 text-center text-white">
          <h2 className="font-sectionTitle text-3xl mb-4">Want to Join Our Teaching Team?</h2>
          <p className="text-xl mb-6 opacity-90">
            Help us empower the next generation of Ethiopian learners
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Apply to Teach
          </button>
        </div>
      </div>
    </div>
    </PageTransition>
  );
};

export default TeachersPage;