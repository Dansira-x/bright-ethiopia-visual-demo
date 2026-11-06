// src/types/edu.ts
export type UserRole = 'student' | 'teacher' | 'parent' | 'admin';

export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone?: string;
  languages?: string[]; // e.g., ['Amharic', 'English']
}

export interface Student {
  id: string;
  name: string;
  grade: number; // 1..12
  guardianPhone?: string;
}

export interface ClassRoom {
  id: string;
  name: string; // e.g., "Grade 4 - Section A"
  grade: number;
  teacherId: string;
  studentIds: string[];
}

export interface Activity {
  id: string;
  title: string;
  subject: 'Language' | 'Math' | 'Science' | 'Social' | 'Arts';
  gradeRange: [number, number]; // inclusive
  type: 'video' | 'quiz' | 'tracing' | 'matching' | 'reading';
  durationMin: number;
}

export interface LessonPlan {
  id: string;
  classId: string;
  date: string; // ISO
  activities: string[]; // Activity IDs
  notes?: string;
}

export interface Score {
  activityId: string;
  studentId: string;
  score: number; // 0..100
  attempts: number;
  timeSpentMin?: number;
  submittedAt: string; // ISO
}

export interface Message {
  id: string;
  senderId: string;
  recipientType: 'class' | 'student' | 'parent' | 'admin';
  recipientId: string; // classId or studentId or 'admin'
  body: string;
  createdAt: string; // ISO
}

export interface Resource {
  id: string;
  title: string;
  subject: Activity['subject'];
  gradeRange: [number, number];
  type: 'pdf' | 'video' | 'image' | 'doc';
  url: string;
  uploadedBy: string; // teacherId
  createdAt: string;
}
