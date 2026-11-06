import { Student, Teacher } from '../types';

export const mockStudent: Student = {
  id: '1',
  name: 'Meron Tadesse',
  email: 'meron@example.com',
  grade: 'Grade 3',
  avatar: 'https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?auto=compress&cs=tinysrgb&w=150',
  memberSince: new Date('2024-01-15'),
  progress: {
    totalLessons: 120,
    completedLessons: 78,
    badges: [
      { id: '1', name: 'Reading Star', icon: '⭐', color: '#FFB300', earnedDate: new Date('2024-02-01') },
      { id: '2', name: 'Math Genius', icon: '🧮', color: '#1E88E5', earnedDate: new Date('2024-02-15') },
      { id: '3', name: 'Quick Learner', icon: '⚡', color: '#43A047', earnedDate: new Date('2024-03-01') }
    ],
    analytics: {
      completedLessons: 78,
      averageScore: 92,
      goalsAchieved: 6
    }
  }
};


export const mockTeachers: Teacher[] = [
  {
    id: '1',
    name: 'Mr. Yidnekachew Kifle',
    photo: '/thumbnails/teachers-bio/IMG_9402.re.jpg',
    grade: 'Grade 6th -12th | Experience: 18+ Years.',
    bio: 'Mr. Yidnekachew is a dedicated mathematics teacher with a passion for inspiring students to think critically and solve problems. He works tirelessly to build confidence in each learner, ensuring they are well-prepared for future academic challenges. His commitment to education and his ability to make complex concepts clear have made him a respected mentor among his students and colleagues.',
    linkedin: 'https://linkedin.com/in/almazbekele',
    telegram: '@Yk21h'
  },
  {
    id: '2',
    name: 'Mr. Fekede Atile',
    photo: '/thumbnails/teachers-bio/IMG_9415.re.jpg',
    grade: 'Grade 5th -9th | Experience: 12+ Years.',
    bio: 'Mr. Fekede graduated from Mekelle University in 2014 in the Department of Foreign Language and Literature (English Language). Over the years, he has gained valuable skills and experience in his profession, working diligently alongside his colleagues. Known for his strong work ethic and heartfelt support for his students, he continues to inspire learners to achieve their goals with dedication and discipline.',
    linkedin: 'https://linkedin.com/in/girmahaile',
    telegram: '@MAMA1ST'
  },
  {
    id: '3',
    name: 'Mr. Gizaw Worku ',
    photo: '/thumbnails/teachers-bio/IMG_9413.re.jpg',
    grade: 'Grade 5th - 8th | Experience: 9+ years of Teaching and 6+ years of school administration.',
    bio: 'Mr. Gizaw Worku is a passionate educator who guides students with patience, discipline, and a love for learning. Throughout his career, he has been recognized for creating engaging classroom environments that foster both academic excellence and personal growth. With dual expertise as both a teacher and administrator, he has earned respect in the academic community for his leadership and vision.',
    linkedin: 'https://linkedin.com/in/hannahmed',
    telegram: '@gizaw88'
  },
  {
    id: '4',
    name: 'Mr. Habtamu Firew',
    photo: '/thumbnails/teachers-bio/IMG_9422.re.jpg',
    grade: 'Grade 1th - 8th | Experience: 2+ Years.',
    bio: 'Mr. Habtamu is a results-driven professional with two years of experience in his field. He is known for his strong work ethic, adaptability, and commitment to excellence, consistently contributing to the success of his team. His solid foundation and hands-on approach make him a valuable educator who motivates students to strive for both academic and personal achievement.',
    linkedin: 'https://www.linkedin.com/in/habtamu-firew-teshome-44a690388?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    telegram: '@Habtamu4195'
  }
];
