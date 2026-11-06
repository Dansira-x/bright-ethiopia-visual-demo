// src/lib/api.ts
// Replace with Supabase calls later; keeping the same shape.
import { Activity, ClassRoom, LessonPlan, Message, Resource, Score, Student, Teacher } from '../types/edu';
import { mockActivities, mockClasses, mockMessages, mockPlans, mockResources, mockScores, mockStudents, mockTeacher } from './mockData';

export const api = {
  me(): Promise<Teacher> {
    return Promise.resolve(mockTeacher);
  },
  classesByTeacher(teacherId: string): Promise<ClassRoom[]> {
    return Promise.resolve(mockClasses.filter(c => c.teacherId === teacherId));
  },
  students(): Promise<Student[]> {
    return Promise.resolve(mockStudents);
  },
  activities(): Promise<Activity[]> {
    return Promise.resolve(mockActivities);
  },
  lessonPlans(): Promise<LessonPlan[]> {
    return Promise.resolve(mockPlans);
  },
  scores(): Promise<Score[]> {
    return Promise.resolve(mockScores);
  },
  messages(): Promise<Message[]> {
    return Promise.resolve(mockMessages);
  },
  resources(): Promise<Resource[]> {
    return Promise.resolve(mockResources);
  },
  // Mutations (mock)
  addStudentToClass(classId: string, studentId: string): Promise<void> {
    const c = mockClasses.find(c => c.id === classId);
    if (c && !c.studentIds.includes(studentId)) c.studentIds.push(studentId);
    return Promise.resolve();
  },
  postMessage(msg: Omit<Message, 'id' | 'createdAt'>): Promise<Message> {
    const newMsg: Message = { id: 'm-' + Math.random().toString(36).slice(2), createdAt: new Date().toISOString(), ...msg };
    mockMessages.unshift(newMsg);
    return Promise.resolve(newMsg);
  },
};
