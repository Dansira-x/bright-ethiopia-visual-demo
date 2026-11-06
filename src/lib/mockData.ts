// src/lib/mockData.ts
import { Activity, ClassRoom, LessonPlan, Message, Resource, Score, Student, Teacher } from '../types/edu';

export const mockTeacher: Teacher = {
  id: 't-001',
  name: 'Ms. Asefa',
  email: 'asefa@example.com',
  phone: '+251900000000',
  languages: ['Amharic', 'English'],
};

export const mockStudents: Student[] = [
  { id: 's-001', name: 'Hana', grade: 4, guardianPhone: '+251911111111' },
  { id: 's-002', name: 'Bini', grade: 4, guardianPhone: '+251922222222' },
  { id: 's-003', name: 'Sami', grade: 4 },
];

export const mockClasses: ClassRoom[] = [
  { id: 'c-004A', name: 'Grade 4 - Section A', grade: 4, teacherId: 't-001', studentIds: mockStudents.map(s => s.id) },
];

// src/lib/mockData.ts
export const mockActivities: Activity[] = [
  { id: 'a-abc', title: 'Alphabet Explorer', subject: 'Language', gradeRange: [1, 4], type: 'tracing', durationMin: 10 },
  { id: 'a-match', title: 'Matching Animals', subject: 'Science', gradeRange: [2, 5], type: 'matching', durationMin: 8 },
  { id: 'a-greet', title: 'Greetings in Amharic', subject: 'Social', gradeRange: [1, 6], type: 'reading', durationMin: 12 },
  { id: 'a-math', title: 'Fractions Basics', subject: 'Math', gradeRange: [4, 6], type: 'quiz', durationMin: 15 },
];


export const mockPlans: LessonPlan[] = [
  { id: 'lp-001', classId: 'c-004A', date: new Date().toISOString().slice(0, 10), activities: ['a-abc', 'a-math'], notes: 'Focus on letter forms and fraction halves.' },
];

export const mockScores: Score[] = [
  { activityId: 'a-abc', studentId: 's-001', score: 92, attempts: 1, timeSpentMin: 9, submittedAt: new Date().toISOString() },
  { activityId: 'a-abc', studentId: 's-002', score: 78, attempts: 2, timeSpentMin: 12, submittedAt: new Date().toISOString() },
  { activityId: 'a-math', studentId: 's-003', score: 65, attempts: 1, timeSpentMin: 14, submittedAt: new Date().toISOString() },
];

export const mockMessages: Message[] = [
  { id: 'm-001', senderId: 't-001', recipientType: 'class', recipientId: 'c-004A', body: 'Reminder: Bring your math notebooks tomorrow.', createdAt: new Date().toISOString() },
];

export const mockResources: Resource[] = [
  { id: 'r-001', title: 'Grade 4 Fractions Worksheet', subject: 'Math', gradeRange: [4, 4], type: 'pdf', url: '#', uploadedBy: 't-001', createdAt: new Date().toISOString() },
  { id: 'r-002', title: 'Amharic Greetings Cards', subject: 'Social', gradeRange: [1, 6], type: 'image', url: '#', uploadedBy: 't-001', createdAt: new Date().toISOString() },
];

// Helpers
// src/lib/mockData.ts (replace your byGrade with this)
export const byGrade = <T extends { gradeRange: [number, number] }>(
  items: T[],
  grade: number
): T[] => items.filter(i => grade >= i.gradeRange[0] && grade <= i.gradeRange[1]);

  

export const classStudents = (cls: ClassRoom, all: Student[]) => all.filter(s => cls.studentIds.includes(s.id));
