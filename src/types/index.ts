export interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  avatar?: string;
  memberSince: Date;
  progress: {
    totalLessons: number;
    completedLessons: number;
    badges: Badge[];
    analytics: {
      completedLessons: number;
      averageScore: number;
      goalsAchieved: number;
    };
  };
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  color: string;
  earnedDate: Date;
}

export interface Teacher {
  id: string;
  name: string;
  photo: string;
  grade: string;
  bio: string;
  linkedin?: string;
  telegram?: string;
}

export type Grade = 'Nursery' | 'KG1' | 'KG2' | 'KG3' | 'Grade 1' | 'Grade 2' | 'Grade 3' | 'Grade 4' | 'Grade 5' | 'Grade 6' | 'Grade 7' | 'Grade 8' | 'Grade 9'| 'Grade 10' | 'Grade 11' | 'Grade 12' | 'University';