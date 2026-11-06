// src/types/types.ts

// High-level subject type (flexible: can be any string, including Amharic)
export type Subject = string;

// Lesson categories
export type LessonType = 'video' | 'book' | 'quiz' | 'note';

// Blocks inside a note lesson
export type NoteBlock =
  | { type: 'title'; content: string }
  | { type: 'heading'; content: string }
  | { type: 'subTitle'; content: string }
  | { type: 'paragraph'; content: string }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; content: string }
  | { type: 'image'; src: string; alt: string; style?: string; caption?: string; traceable?: boolean }
  | { type: 'video'; title: string; duration: number | string; completed: boolean; url: string; alt?: string }
  | ActivityBlock;

// Activity types
export type ActivityType =
  | "true_false"
  | "multiple_choice"
  | "fill_blank"
  | "matching"
  | "reorder";   // 👈 NEW type added

export interface ActivityBlock {
  type: "activity";
  title: string;
  completed: boolean;
  activities: Activity[];
  // 👇 optional fields for matching layout
  columnALabelStyle?: "numeric" | "amharic";
  columnBLabelStyle?: "letters" | "none" | "amharic";
}

export interface Activity {
  id: string;
  type: ActivityType;
  question: string;
  answer?: any;
  options?: string[];
  hint?: string;

  // Matching-specific
  pairs?: {
    left: string;
    right: string;
    leftImage?: string;   // optional image for Column A
    rightImage?: string;  // optional image for Column B
  }[];
  matchingAnswer?: { [left: string]: string };

  // Reorder-specific
  items?: string[];              // scrambled or unordered items
  correctOrder?: string[];       // expected correct sequence
  itemType?: "letter" | "word" | "image" | "sentence"; // defines how to render
}

// Quiz types and model
export type QuizType = 'true_false' | 'multiple_choice' | 'matching' | 'fill_blank' | 'reorder'; // 👈 added reorder

export interface Quiz {
  id?: string;            // optional for tracking/keys
  type: QuizType;
  question: string;
  options?: string[];     // for multiple_choice
  pairs?: { left: string; right: string }[]; // for matching
  answer: boolean | string | string[];
  explanation?: string;   // explanation shown after answering
  items?: string[];       // for reorder quizzes
  correctOrder?: string[];
  itemType?: "letter" | "word" | "image" | "sentence";
}

// Lesson union — note: no 'subject' or 'thumbnail' here
export type Lesson =
  | {
      id?: string;
      type: 'video';
      title: string;
      duration: number;
      completed: boolean;
      url: string;
    }
  | {
      id?: string;
      type: 'book';
      title: string;
      completed: boolean;
      url: string;
    }
  | {
      id?: string;
      type: 'quiz';
      title: string;
      completed: boolean;
      quizzes: Quiz[];
    }
  | {
      id?: string;
      type: 'note';
      completed: boolean;
      blocks: NoteBlock[];
    };

// Unit container — subject and thumbnail live here
export interface Unit {
  id: string;
  title: string;
  subject: Subject;   // e.g., "English", "አማርኛ", "ሒሳብ"
  thumbnail: string;  // path to thumbnail image
  completed: boolean;
  lessons: Lesson[];
}
