import React, { useState } from 'react';
import PageTransition from '../components/PageTransition';
import { Grid3X3, Library, List, Search } from 'lucide-react';


interface Book {
  id: number;
  title: string;
  author?: string;
  year?: number;
  description: string;
  category: string;
  thumbnail: string; // URL to image
  pdfUrl: string;    // URL to PDF
}

const booksData: Book[] = [
  //Grade-1 Books
   {   id: 1, 
       title: 'English', 
       author: 'Ethi',
       year: 10 ,
       description: 'Grade 1 | Text-Book.', 
       category: 'English',
       thumbnail: '/books-thumbnails/grade-1/English.jpg',
       pdfUrl: '/books/Grade 1/GRADE 1 ENGLISH.pdf',   
   },
   {  id: 2, 
      title: 'አማርኛ',
      description: 'Grade 1 | Text-Book.', 
      category: 'አማርኛ',
      thumbnail: '/books-thumbnails/grade-1/Amharic.jpg',
      pdfUrl: '/books/Grade 1/GRADE 1 AMHARIC.pdf', 
   },
   {  id: 3, 
      title: 'ሒሳብ', 
      description: 'Grade 1 | Text-Book.', 
      category: 'ሒሳብ',
      thumbnail: '/books-thumbnails/grade-1/Hisab.jpg',
      pdfUrl: '/books/Grade 1/GRADE 1 HISAB.pdf', 
   },
   {   id: 4, 
       title: 'አካባቢ ሳይንስ', 
       description: 'Grade 1 | Text-Book', 
       category: 'አካባቢ ሳይንስ',
       thumbnail: '/books-thumbnails/grade-1/Akababiseience.jpg',
       pdfUrl: '/books/Grade 1/GRADE 1 AKABABI SCIENCE.pdf', 
   },
   {   id: 5, 
       title: 'የክወናና የዕይታ ጥበባት', 
       description: 'Grade 1 | Text-Book', 
       category: 'የክወናና የዕይታ ጥበባት',
       thumbnail: '/books-thumbnails/grade-1/Kwena.jpg',
       pdfUrl: '/books/Grade 1/GRADE 1 PERFORMING & VISUAL ARTS.pdf', 
   },
   {   id: 6, 
       title: 'የጤናና ሰዉነት ማጎልመሻ', 
       description: 'Grade 1 | Text-Book', 
       category: 'የጤናና ሰዉነት ማጎልመሻ',
       thumbnail: '/books-thumbnails/grade-1/Te-se-ma.jpg',
       pdfUrl: '/books/Grade 1/GRADE 1 H.P.E.pdf', 
   },
   {   id: 7, 
       title: 'የግብረ ገብ ትምህርት', 
       description: 'Grade 1 | Text-Book', 
       category: 'የግብረ ገብ ትምህርት',
       thumbnail: '/books-thumbnails/grade-1/moral.jpg',
       pdfUrl: '/books/Grade 1/moral grade 1.pdf', 
   },
   //Grade-2 Books
   {   id: 8, 
       title: 'English', 
       description: 'Grade 2 | Text-Book.', 
       category: 'English',
       thumbnail: '/books-thumbnails/grade-2/English.jpg',
       pdfUrl: '/books/Grade 2/GRADE 2 ENGLISH.pdf',   
   },
   {  id: 9, 
      title: 'አማርኛ',
      description: 'Grade 2 | Text-Book.', 
      category: 'አማርኛ',
      thumbnail: '/books-thumbnails/grade-2/Amharic.jpg',
      pdfUrl: '/books/Grade 2/GRADE 2 AMHARIC.pdf', 
   },
   {  id: 10, 
      title: 'ሒሳብ', 
      description: 'Grade 2 | Text-Book.', 
      category: 'ሒሳብ',
      thumbnail: '/books-thumbnails/grade-2/Hisab.jpg',
      pdfUrl: '/books/Grade 2/GRADE 2 HISAB.pdf', 
   },
   {   id: 11, 
       title: 'አካባቢ ሳይንስ', 
       description: 'Grade 2 | Text-Book', 
       category: 'አካባቢ ሳይንስ',
       thumbnail: '/books-thumbnails/grade-2/Akababi-Science.jpg',
       pdfUrl: '/books/Grade 2/GRADE 2 AKABABI SCIENCE.pdf', 
   },
   {   id: 12, 
       title: 'የክወናና የዕይታ ጥበባት', 
       description: 'Grade 2 | Text-Book', 
       category: 'የክወናና የዕይታ ጥበባት',
       thumbnail: '/books-thumbnails/grade-2/Kwena.jpg',
       pdfUrl: '/books/Grade 2/GRADE 2 PERFORMING & VISUAL ARTS.pdf', 
   },
   {   id: 13, 
       title: 'የጤናና ሰዉነት ማጎልመሻ', 
       description: 'Grade 2 | Text-Book', 
       category: 'የጤናና ሰዉነት ማጎልመሻ',
       thumbnail: '/books-thumbnails/grade-2/Te-se-ma.jpg',
       pdfUrl: '/books/Grade 2/GRADE 2 H.P.E.pdf', 
   },
   {   id: 14, 
       title: 'የግብረ ገብ ትምህርት', 
       description: 'Grade 2 | Text-Book', 
       category: 'የግብረ ገብ ትምህርት',
       thumbnail: '/books-thumbnails/grade-2/Moral.jpg',
       pdfUrl: '/books/Grade 2/moral grade 2.pdf', 
   },
   //Grade-3 Books
   {   id: 15, 
       title: 'English', 
       description: 'Grade 3 | Text-Book.', 
       category: 'English',
       thumbnail: '/books-thumbnails/grade-3/English.jpg',
       pdfUrl: '/books/Grade 3/GRADE 3 ENGLISH.pdf',   
   },
   {  id: 16, 
      title: 'አማርኛ',
      description: 'Grade 3 | Text-Book.', 
      category: 'አማርኛ',
      thumbnail: '/books-thumbnails/grade-3/Amharic.jpg',
      pdfUrl: '/books/Grade 3/GRADE 3 AMHARIC.pdf', 
   },
   {  id: 17, 
      title: 'ሒሳብ', 
      description: 'Grade 3 | Text-Book.', 
      category: 'ሒሳብ',
      thumbnail: '/books-thumbnails/grade-3/Hisab.jpg',
      pdfUrl: '/books/Grade 3/GRADE 3 HISAB.pdf', 
   },
   {   id: 18, 
       title: 'አካባቢ ሳይንስ', 
       description: 'Grade 3 | Text-Book', 
       category: 'አካባቢ ሳይንስ',
       thumbnail: '/books-thumbnails/grade-3/Akababi-Science.jpg',
       pdfUrl: '/books/Grade 3/GRADE 3 AKABABI SCIENCE.pdf', 
   },
   {   id: 19, 
       title: 'የክወናና የዕይታ ጥበባት', 
       description: 'Grade 3 | Text-Book', 
       category: 'የክወናና የዕይታ ጥበባት',
       thumbnail: '/books-thumbnails/grade-3/Kwena.jpg',
       pdfUrl: '/books/Grade 3/GRADE 3 PERFORMING & VISUAL ARTS.pdf', 
   },
   {   id: 20, 
       title: 'የጤናና ሰዉነት ማጎልመሻ', 
       description: 'Grade 3 | Text-Book', 
       category: 'የጤናና ሰዉነት ማጎልመሻ',
       thumbnail: '/books-thumbnails/grade-3/Te-se-ma.jpg',
       pdfUrl: '/books/Grade 3/GRADE 3 H.P.E.pdf', 
   },
   {   id: 21, 
       title: 'የግብረ ገብ ትምህርት', 
       description: 'Grade 3 | Text-Book', 
       category: 'የግብረ ገብ ትምህርት',
       thumbnail: '/books-thumbnails/grade-3/Moral.jpg',
       pdfUrl: '/books/Grade 3/moral grade 3.pdf', 
   },
   //Grade-4 Books
   {   id: 22, 
       title: 'English', 
       description: 'Grade 4 | Text-Book.', 
       category: 'English',
       thumbnail: '/books-thumbnails/grade-4/English.jpg',
       pdfUrl: '/books/Grade 4/GRADE 4 ENGLISH.pdf',   
   },
   {  id: 23, 
      title: 'አማርኛ',
      description: 'Grade 4 | Text-Book.', 
      category: 'አማርኛ',
      thumbnail: '/books-thumbnails/grade-4/Amharic.jpg',
      pdfUrl: '/books/Grade 4/GRADE 4 AMHARIC.pdf', 
   },
   {  id: 24, 
      title: 'ሒሳብ', 
      description: 'Grade 4 | Text-Book.', 
      category: 'ሒሳብ',
      thumbnail: '/books-thumbnails/grade-4/Hisab.jpg',
      pdfUrl: '/books/Grade 4/GRADE 4 HISAB.pdf', 
   },
   {   id: 25, 
       title: 'አካባቢ ሳይንስ', 
       description: 'Grade 4 | Text-Book', 
       category: 'አካባቢ ሳይንስ',
       thumbnail: '/books-thumbnails/grade-4/Akababi-Scienece.jpg',
       pdfUrl: '/books/Grade 4/GRADE 4 AKABABI SCIENCE.pdf', 
   },
   {   id: 26, 
       title: 'የክወናና የዕይታ ጥበባት', 
       description: 'Grade 4 | Text-Book', 
       category: 'የክወናና የዕይታ ጥበባት',
       thumbnail: '/books-thumbnails/grade-4/Kwena.jpg',
       pdfUrl: '/books/Grade 4/GRADE 4 PERFORMING & VISUAL ARTS.pdf', 
   },
   {   id: 27, 
       title: 'የጤናና ሰዉነት ማጎልመሻ', 
       description: 'Grade 4 | Text-Book', 
       category: 'የጤናና ሰዉነት ማጎልመሻ',
       thumbnail: '/books-thumbnails/grade-4/Te-se-ma.jpg',
       pdfUrl: '/books/Grade 4/GRADE 4 H.P.E.pdf', 
   },
   {   id: 28, 
       title: 'የግብረ ገብ ትምህርት', 
       description: 'Grade 4 | Text-Book', 
       category: 'የግብረ ገብ ትምህርት',
       thumbnail: '/books-thumbnails/grade-4/Moral.jpg',
       pdfUrl: '/books/Grade 4/moral grade 4 .pdf', 
   },
   //Grade-5 Books
   {   id: 29, 
       title: 'English', 
       description: 'Grade 5 | Text-Book.', 
       category: 'English',
       thumbnail: '/books-thumbnails/grade-5/English.jpg',
       pdfUrl: '/books/Grade 4/GRADE 4 ENGLISH.pdf',   
   },
   {  id: 30, 
      title: 'አማርኛ',
      description: 'Grade 5 | Text-Book.', 
      category: 'አማርኛ',
      thumbnail: '/books-thumbnails/grade-5/Amharic.jpg',
      pdfUrl: '/books/Grade 4/GRADE 4 AMHARIC.pdf', 
   },
   {  id: 31, 
      title: 'ሒሳብ', 
      description: 'Grade 5 | Text-Book.', 
      category: 'ሒሳብ',
      thumbnail: '/books-thumbnails/grade-5/Hisab.jpg',
      pdfUrl: '/books/Grade 5/GRADE 5 HISAB.pdf', 
   },
   {   id: 32, 
       title: 'አካባቢ ሳይንስ', 
       description: 'Grade 5 | Text-Book', 
       category: 'አካባቢ ሳይንስ',
       thumbnail: '/books-thumbnails/grade-5/Akababi-Science.jpg',
       pdfUrl: '/books/Grade 5/GRADE 5 AKABABI SCIENCE.pdf', 
   },
   {   id: 33, 
       title: 'የክወናና የዕይታ ጥበባት', 
       description: 'Grade 5 | Text-Book', 
       category: 'የክወናና የዕይታ ጥበባት',
       thumbnail: '/books-thumbnails/grade-5/Kwena.jpg',
       pdfUrl: '/books/Grade 5/GRADE 5 PERFORMING & VISUAL ARTS.pdf', 
   },
   {   id: 34, 
       title: 'የጤናና ሰዉነት ማጎልመሻ', 
       description: 'Grade 5 | Text-Book', 
       category: 'የጤናና ሰዉነት ማጎልመሻ',
       thumbnail: '/books-thumbnails/grade-5/Te-se-ma.jpg',
       pdfUrl: '/books/Grade 5/GRADE 5 H.P.E.pdf', 
   },
   {   id: 35, 
       title: 'የግብረ ገብ ትምህርት', 
       description: 'Grade 5 | Text-Book', 
       category: 'የግብረ ገብ ትምህርት',
       thumbnail: '/books-thumbnails/grade-5/Moral.jpg',
       pdfUrl: '/books/Grade 5/moral grade 5 .pdf', 
   },
   //Grade-6 Books
   {   id: 36, 
       title: 'English', 
       description: 'Grade 6 | Text-Book.', 
       category: 'English',
       thumbnail: '/books-thumbnails/grade-6/English.jpg',
       pdfUrl: '/books/Grade 6/GRADE 6 ENGLISH.pdf',   
   },
   {  id: 37, 
      title: 'አማርኛ',
      description: 'Grade 6 | Text-Book.', 
      category: 'አማርኛ',
      thumbnail: '/books-thumbnails/grade-6/Amharic.jpg',
      pdfUrl: '/books/Grade 6/GRADE 6 AMHARIC.pdf', 
   },
   {  id: 38, 
      title: 'ሒሳብ', 
      description: 'Grade 6 | Text-Book.', 
      category: 'ሒሳብ',
      thumbnail: '/books-thumbnails/grade-6/Hisab.jpg',
      pdfUrl: '/books/Grade 6/GRADE 6 HISAB.pdf', 
   },
   {   id: 39, 
       title: 'አካባቢ ሳይንስ', 
       description: 'Grade 6 | Text-Book', 
       category: 'አካባቢ ሳይንስ',
       thumbnail: '/books-thumbnails/grade-6/Akababi-Science.jpg',
       pdfUrl: '/books/Grade 6/GRADE 6 AKABABI SCIENCE.pdf', 
   },
   {   id: 40, 
       title: 'የክወናና የዕይታ ጥበባት', 
       description: 'Grade 6 | Text-Book', 
       category: 'የክወናና የዕይታ ጥበባት',
       thumbnail: '/books-thumbnails/grade-6/Kwena.jpg',
       pdfUrl: '/books/Grade 6/GRADE 6 PERFORMING & VISUAL ARTS.pdf', 
   },
   {   id: 41, 
       title: 'የጤናና ሰዉነት ማጎልመሻ', 
       description: 'Grade 6 | Text-Book', 
       category: 'የጤናና ሰዉነት ማጎልመሻ',
       thumbnail: '/books-thumbnails/grade-6/Te-se-ma.jpg',
       pdfUrl: '/books/Grade 6/GRADE 6 H.P.E.pdf', 
   },
   {   id: 42, 
       title: 'የግብረ ገብ ትምህርት', 
       description: 'Grade 6 | Text-Book', 
       category: 'የግብረ ገብ ትምህርት',
       thumbnail: '/books-thumbnails/grade-6/Moral.jpg',
       pdfUrl: '/books/Grade 6/moral grade 6 .pdf', 
   },
   //Grade-7 Books
   {   id: 43, 
       title: 'English', 
       description: 'Grade 7 | Text-Book.', 
       category: 'English',
       thumbnail: '/books-thumbnails/grade-7/English.jpg',
       pdfUrl: '/books/Grade 7/GRADE 7 ENGLISH.pdf',   
   },
   {  id: 44, 
      title: 'Amharic',
      description: 'Grade 7 | Text-Book.', 
      category: 'Amharic',
      thumbnail: '/books-thumbnails/grade-7/Amharic.jpg',
      pdfUrl: '/books/Grade 7/GRADE 7 AMHARIC.pdf', 
   },
   {  id: 45, 
      title: 'Mathematics', 
      description: 'Grade 7 | Text-Book.', 
      category: 'Mathematics',
      thumbnail: '/books-thumbnails/grade-7/Maths.jpg',
      pdfUrl: '/books/Grade 7/GRADE 7 MATHEMATICS.pdf', 
   },
   {   id: 46, 
       title: 'Career & Technical Education', 
       description: 'Grade 7 | Text-Book', 
       category: 'Career & Technical Education',
       thumbnail: '/books-thumbnails/grade-7/Career.jpg',
       pdfUrl: '/books/Grade 7/GRADE 7 CAREER & TECHNICAL EDUCATION.pdf', 
   },
   {   id: 47, 
       title: 'Citizenship', 
       description: 'Grade 7 | Text-Book', 
       category: 'Citizenship',
       thumbnail: '/books-thumbnails/grade-7/Citizenship.jpg',
       pdfUrl: '/books/Grade 7/GRADE 7 CITIZENSHIP.pdf', 
   },
   {   id: 48, 
       title: 'General Science', 
       description: 'Grade 7 | Text-Book', 
       category: 'General Science',
       thumbnail: '/books-thumbnails/grade-7/G.S.jpg',
       pdfUrl: '/books/Grade 7/GRADE 7 GENERAL SCIENCE.pdf', 
   },
   {   id: 49, 
       title: 'Health & Physical Education', 
       description: 'Grade 7 | Text-Book', 
       category: 'Health & Physical Education',
       thumbnail: '/books-thumbnails/grade-7/Health.jpg',
       pdfUrl: '/books/Grade 7/GRADE 7 HEALTH & PHYSICAL EDUCATION.pdf', 
   },
   {   id: 50, 
       title: 'Information Technology', 
       description: 'Grade 7 | Text-Book', 
       category: 'Information Technology',
       thumbnail: '/books-thumbnails/grade-7/I.C.T.jpg',
       pdfUrl: '/books/Grade 7/GRADE 7 INFORMATION TECHNOLOGY.pdf', 
   },
   {   id: 51, 
       title: 'Performing & Visual Arts', 
       description: 'Grade 7 | Text-Book', 
       category: 'Performing & Visual Arts',
       thumbnail: '/books-thumbnails/grade-7/Performing.jpg',
       pdfUrl: '/books/Grade 7/GRADE 7 PERFORMING & VISUAL ARTS.pdf', 
   },
   {   id: 52, 
       title: 'Social Studies', 
       description: 'Grade 7 | Text-Book', 
       category: 'Social Studies',
       thumbnail: '/books-thumbnails/grade-7/Social.jpg',
       pdfUrl: '/books/Grade 7/GRADE 7 SOCIAL STUDIES.pdf', 
   },
   //Grade-8 Books
   {   id: 53, 
       title: 'English', 
       description: 'Grade 8 | Text-Book.', 
       category: 'English',
       thumbnail: '/books-thumbnails/grade-8/English.jpg',
       pdfUrl: '/books/Grade 8/GRADE 8 ENGLISH.pdf',   
   },
   {  id: 54, 
      title: 'Amharic',
      description: 'Grade 8 | Text-Book.', 
      category: 'Amharic',
      thumbnail: '/books-thumbnails/grade-8/Amharic.jpg',
      pdfUrl: '/books/Grade 8/GRADE 8 AMHARIC.pdf', 
   },
   {  id: 55, 
      title: 'Mathematics', 
      description: 'Grade 8 | Text-Book.', 
      category: 'Mathematics',
      thumbnail: '/books-thumbnails/grade-8/Maths.jpg',
      pdfUrl: '/books/Grade 8/GRADE 8 MATHEMATICS.pdf', 
   },
   {   id: 56, 
       title: 'Career & Technical Education', 
       description: 'Grade 8 | Text-Book', 
       category: 'Career & Technical Education',
       thumbnail: '/books-thumbnails/grade-8/Career.jpg',
       pdfUrl: '/books/Grade 8/GRADE 8 CAREER & TECHNICAL EDUCATION.pdf', 
   },
   {   id: 57, 
       title: 'Citizenship', 
       description: 'Grade 8 | Text-Book', 
       category: 'Citizenship',
       thumbnail: '/books-thumbnails/grade-8/Citizenship.jpg',
       pdfUrl: '/books/Grade 8/GRADE 8 CITIZENSHIP.pdf', 
   },
   {   id: 58, 
       title: 'General Science', 
       description: 'Grade 8 | Text-Book', 
       category: 'General Science',
       thumbnail: '/books-thumbnails/grade-8/G.S.jpg',
       pdfUrl: '/books/Grade 8/GRADE 8 GENERAL SCIENCE.pdf', 
   },
   {   id: 59, 
       title: 'Health & Physical Education', 
       description: 'Grade 8 | Text-Book', 
       category: 'Health & Physical Education',
       thumbnail: '/books-thumbnails/grade-8/Health.jpg',
       pdfUrl: '', 
   },
   {   id: 60, 
       title: 'Information Technology', 
       description: 'Grade 8 | Text-Book', 
       category: 'Information Technology',
       thumbnail: '/books-thumbnails/grade-8/I.C.T.jpg',
       pdfUrl: '/books/Grade 8/GRADE 8 INFORMATION TECHNOLOGY.pdf', 
   },
   {   id: 61, 
       title: 'Performing & Visual Arts', 
       description: 'Grade 8 | Text-Book', 
       category: 'Performing & Visual Arts',
       thumbnail: '/books-thumbnails/grade-8/Performing.jpg',
       pdfUrl: '/books/Grade 8/GRADE 8 PERFORMING & VISUAL ARTS.pdf', 
   },
   {   id: 62, 
       title: 'Social Studies', 
       description: 'Grade 8 | Text-Book', 
       category: 'Social Studies',
       thumbnail: '/books-thumbnails/grade-8/Social.jpg',
       pdfUrl: '/books/Grade 8/GRADE 8 SOCIAL STUDIES.pdf', 
   },
   //Grade - 9
   {   id: 63, 
       title: 'English', 
       description: 'Grade 9 | Text-Book', 
       category: 'English',
       thumbnail: '/books-thumbnails/grade-9/english.png',
       pdfUrl: '/books/Grade 9/G9-English-STB-2023-web.pdf', 
   },
   {   id: 64, 
       title: 'Mathematics', 
       description: 'Grade 9 | Text-Book', 
       category: 'Mathematics',
       thumbnail: '/books-thumbnails/grade-9/maths.png',
       pdfUrl: '/books/Grade 9/G9-Mathematics-STB-2023-web.pdf', 
   },
   {   id: 65, 
       title: 'Biology', 
       description: 'Grade 9  | Text-Book', 
       category: 'Biology',
       thumbnail: '/books-thumbnails/grade-9/Bio.png',
       pdfUrl: '/books/Grade 9/G9-Biology-STB-2023-web.pdf', 
   },
   {   id: 66, 
       title: 'Chemistry', 
       description: 'Grade 9 | Text-Book', 
       category: 'Chemistry',
       thumbnail: '/books-thumbnails/grade-9/chemistry.png',
       pdfUrl: '/books/Grade 9/G9-Chemistry-STB-2023-web.pdf', 
   },
   {   id: 67, 
       title: 'Citizenship', 
       description: 'Grade 9 | Text-Book', 
       category: 'Citizenship',
       thumbnail: '/books-thumbnails/grade-9/citizenship.png',
       pdfUrl: '/books/Grade 9/G9-Citizenship-STB-2023-web.pdf', 
   },
   {   id: 68, 
       title: 'Economics', 
       description: 'Grade 9 | Text-Book', 
       category: 'Economics',
       thumbnail: '/books-thumbnails/grade-9/economics.png',
       pdfUrl: '/books/Grade 9/G9-Economics-STB-2023-web.pdf', 
   },
   {   id: 69, 
       title: 'Geography', 
       description: 'Grade 9 | Text-Book', 
       category: 'Geography',
       thumbnail: '/books-thumbnails/grade-9/geography.png',
       pdfUrl: '/books/Grade 9/G9-Geography-STB-2023-web.pdf', 
   },
   {   id: 70, 
       title: 'History', 
       description: 'Grade 9 | Text-Book', 
       category: 'History',
       thumbnail: '/books-thumbnails/grade-9/history.png',
       pdfUrl: '/books/Grade 9/G9-History-STB-2023-web.pdf', 
   },
   {   id: 71, 
       title: 'I.C.T', 
       description: 'Grade 9 | Text-Book', 
       category: 'I.C.T',
       thumbnail: '/books-thumbnails/grade-9/ict.png',
       pdfUrl: '/books/Grade 9/G9-IT-STB-2023-web.pdf', 
   },
   {   id: 72, 
       title: 'H.P.E', 
       description: 'Grade 9 | Text-Book', 
       category: 'H.P.E',
       thumbnail: '/books-thumbnails/grade-9/hpe.png',
       pdfUrl: '/books/Grade 9/G9-HPE-STB-2023-web.pdf', 
   },
   //Grade - 10
   {   id: 73, 
       title: 'English', 
       description: 'Grade 10 | Text-Book', 
       category: 'English',
       thumbnail: '/books-thumbnails/grade-10/english.png',
       pdfUrl: '/books/Grade 10/G10-English-STB-2023-web.pdf', 
   },
   {   id: 74, 
       title: 'Mathematics', 
       description: 'Grade 10 | Text-Book', 
       category: 'Mathematics',
       thumbnail: '/books-thumbnails/grade-10/maths.png',
       pdfUrl: '/books/Grade 10/G10-Mathematics-STB-2023-web.pdf', 
   },
   {   id: 75, 
       title: 'Biology', 
       description: 'Grade 10  | Text-Book', 
       category: 'Biology',
       thumbnail: '/books-thumbnails/grade-10/Bio.png',
       pdfUrl: '/books/Grade 10/G10-Biology-STB-2023-web.pdf', 
   },
   {   id: 76, 
       title: 'Chemistry', 
       description: 'Grade 10 | Text-Book', 
       category: 'Chemistry',
       thumbnail: '/books-thumbnails/grade-10/chemistry.png',
       pdfUrl: '/books/Grade 10/G10-Chemistry-STB-2023-web.pdf', 
   },
   {   id: 77, 
       title: 'Citizenship', 
       description: 'Grade 10 | Text-Book', 
       category: 'Citizenship',
       thumbnail: '/books-thumbnails/grade-10/citizenship.png',
       pdfUrl: '/books/Grade 10/G10-Citizenship-STB-2023-web.pdf', 
   },
   {   id: 78, 
       title: 'Economics', 
       description: 'Grade 10 | Text-Book', 
       category: 'Economics',
       thumbnail: '/books-thumbnails/grade-10/economics.png',
       pdfUrl: '/books/Grade 10/G10-Economics-STB-2023-web.pdf', 
   },
   {   id: 79, 
       title: 'Geography', 
       description: 'Grade 10 | Text-Book', 
       category: 'Geography',
       thumbnail: '/books-thumbnails/grade-10/geography.png',
       pdfUrl: '/books/Grade 10/G10-Geography-STB-2023-web.pdf', 
   },
   {   id: 80, 
       title: 'History', 
       description: 'Grade 10 | Text-Book', 
       category: 'History',
       thumbnail: '/books-thumbnails/grade-10/history.png',
       pdfUrl: '/books/Grade 10/G10-History-STB-2023-web.pdf', 
   },
   {   id: 81, 
       title: 'Health & Physical Education', 
       description: 'Grade 10 | Text-Book', 
       category: 'Health & Physical Education',
       thumbnail: '/books-thumbnails/grade-10/hpe.png',
       pdfUrl: '/books/Grade 10/G10-HPE-STB-2023-web.pdf', 
   },
   {   id: 82, 
       title: 'Information Technology', 
       description: 'Grade 10 | Text-Book', 
       category: 'Information Technology',
       thumbnail: '/books-thumbnails/grade-10/ict.png',
       pdfUrl: '/books/Grade 10/G10-IT-STB-2023-web.pdf', 
   },
   //Grade - 11
   {   id: 83, 
       title: 'English', 
       description: 'Grade 11 | Text-Book', 
       category: 'English',
       thumbnail: '/books-thumbnails/grade-11/english.png',
       pdfUrl: '/books/Grade 11/G11-English-STB-2023-web.pdf', 
   },
   {   id: 84, 
       title: 'Mathematics', 
       description: 'Grade 11 | Text-Book', 
       category: 'Mathematics',
       thumbnail: '/books-thumbnails/grade-11/maths.png',
       pdfUrl: '/books/Grade 11/G11-Mathematics-STB-2023-web.pdf', 
   },
   {   id: 85, 
       title: 'Biology', 
       description: 'Grade 11  | Text-Book', 
       category: 'Biology',
       thumbnail: '/books-thumbnails/grade-11/Bio.png',
       pdfUrl: '/books/Grade 11/G11-Biology-STB-2023-web.pdf', 
   },
   {   id: 86, 
       title: 'Chemistry', 
       description: 'Grade 11 | Text-Book', 
       category: 'Chemistry',
       thumbnail: '/books-thumbnails/grade-11/chemistry.png',
       pdfUrl: '/books/Grade 11/G11-Chemistry-STB-2023-web.pdf', 
   },
   {   id: 87, 
       title: 'Physics', 
       description: 'Grade 11 | Text-Book', 
       category: 'Physics',
       thumbnail: '/books-thumbnails/grade-11/physics.png',
       pdfUrl: '/books/Grade 11/G11-Physics-STB-2023-web.pdf', 
   },
   {   id: 88, 
       title: 'Economics', 
       description: 'Grade 11 | Text-Book', 
       category: 'Economics',
       thumbnail: '/books-thumbnails/grade-11/economics.png',
       pdfUrl: '/books/Grade 11/G11-Economics-STB-2023-web.pdf', 
   },
   {   id: 89, 
       title: 'Geography', 
       description: 'Grade 11 | Text-Book', 
       category: 'Geography',
       thumbnail: '/books-thumbnails/grade-11/geography.png',
       pdfUrl: '/books/Grade 11/G11-Geography-STB-2023-web.pdf', 
   },
   {   id: 90, 
       title: 'History', 
       description: 'Grade 11 | Text-Book', 
       category: 'History',
       thumbnail: '/books-thumbnails/grade-11/history.png',
       pdfUrl: '/books/Grade 11/G11-History-STB-2023-web.pdf', 
   },
   {   id: 91, 
       title: 'Information Technology', 
       description: 'Grade 11 | Text-Book', 
       category: 'Information Technology',
       thumbnail: '/books-thumbnails/grade-11/ict.png',
       pdfUrl: '/books/Grade 11/G11-IT-STB-2023-web.pdf', 
   },
    {   id: 92, 
       title: 'Agriculture', 
       description: 'Grade 11 | Text-Book', 
       category: 'Agriculture',
       thumbnail: '/books-thumbnails/grade-11/agri.png',
       pdfUrl: '/books/Grade 11/G11-Agriculture-STB-2023-web.pdf', 
   },
   //Grade - 12
    {   id: 93, 
       title: 'English', 
       description: 'Grade 12 | Text-Book', 
       category: 'English',
       thumbnail: '/books-thumbnails/grade-12/english.png',
       pdfUrl: '/books/Grade 12/G12-English-STB-2023-web.pdf', 
   },
   {   id: 94, 
       title: 'Mathematics', 
       description: 'Grade 12 | Text-Book', 
       category: 'Mathematics',
       thumbnail: '/books-thumbnails/grade-12/maths.png',
       pdfUrl: '/books/Grade 12/G12-Mathematics-STB-2023-web (2).pdf', 
   },
   {   id: 95, 
       title: 'Biology', 
       description: 'Grade 12  | Text-Book', 
       category: 'Biology',
       thumbnail: '/books-thumbnails/grade-12/Bio.png',
       pdfUrl: '/books/Grade 12/G12-Biology-STB-2023-web (1).pdf', 
   },
   {   id: 96, 
       title: 'Chemistry', 
       description: 'Grade 12 | Text-Book', 
       category: 'Chemistry',
       thumbnail: '/books-thumbnails/grade-12/chemistry.png',
       pdfUrl: '/books/Grade 12/G12-Chemistry-STB-2023-web.pdf', 
   },
   {   id: 97, 
       title: 'Physics', 
       description: 'Grade 12 | Text-Book', 
       category: 'Physics',
       thumbnail: '/books-thumbnails/grade-12/physics.png',
       pdfUrl: '/books/Grade 12/G12-Physics-STB-2023-web.pdf', 
   },
   {   id: 98, 
       title: 'Economics', 
       description: 'Grade 12 | Text-Book', 
       category: 'Economics',
       thumbnail: '/books-thumbnails/grade-12/economics.png',
       pdfUrl: '/books/Grade 12/G12-Economics-STB-2023-web.pdf', 
   },
   {   id: 99, 
       title: 'Geography', 
       description: 'Grade 12 | Text-Book', 
       category: 'Geography',
       thumbnail: '/books-thumbnails/grade-12/geography.png',
       pdfUrl: '/books/Grade 12/G12-Geography-STB-2023-web.pdf', 
   },
   {   id: 100, 
       title: 'History', 
       description: 'Grade 12 | Text-Book', 
       category: 'History',
       thumbnail: '/books-thumbnails/grade-12/history.png',
       pdfUrl: '/books/Grade 12/G12-History-STB-2023-web.pdf', 
   },
   {   id: 101, 
       title: 'Information Technology', 
       description: 'Grade 12 | Text-Book', 
       category: 'Information Technology',
       thumbnail: '/books-thumbnails/grade-12/ict.png',
       pdfUrl: '/books/Grade 12/G12-IT-STB-2023-web.pdf', 
   },
    {   id: 102, 
       title: 'Agriculture', 
       description: 'Grade 12 | Text-Book', 
       category: 'Agriculture',
       thumbnail: '/books-thumbnails/grade-12/agri.png',
       pdfUrl: '/books/Grade 12/G12-Agriculture-STB-2023-web.pdf', 
   },
];

const categories = ['All Books', 'English', 'Amharic','አማርኛ','ሒሳብ', 'አካባቢ ሳይንስ', 'የክወናና የዕይታ ጥበባት', 'የጤናና ሰዉነት ማጎልመሻ', 'የግብረ ገብ ትምህርት', 'Career & Technical Education', 'Citizenship', 'General Science', 'Health & Physical Education', 'Information Technology', 'Mathematics', 'Performing & Visual Arts', 'Social Studies', 'Physics', 'Biology', 'Chemistry', 'Agriculture' , 'History', 'Geography', 'Economics', 'Language'];

const BookLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Books');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredBooks = booksData.filter(book => {
    const matchesCategory = selectedCategory === 'All Books' || book.category === selectedCategory;
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryCount = (category: string) =>
    category === 'All Books'
      ? booksData.length
      : booksData.filter(book => book.category.trim() === category.trim()).length;

 ;

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-12 font-sans text-[#2C2C2C]">
        {/* Header */}
        <div className="text-left mb-8">
          <h1 className="font-sectionTitle text-5xl text-gray-800 mb-8 flex items-center gap-4">
            <Library size={60} strokeWidth={2.5} className="transition-transform hover:scale-110" />
            Digital Library
          </h1>
          <p className="text-left text-base text-gray-600 max-w-3xl">
            Access thousands of educational textbooks and resources for all grade levels. Download and study offline with our comprehensive digital library.
          </p>
        </div>

        {/* Control Panel Box */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-6 gap-6">
            {/* Search Bar */}
            <div className="basis-1/3 max-w-md relative">
              <Search className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search books, authors, or topics..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 shadow-sm text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* View Toggle */}
            <div className="basis-1/3 flex justify-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md border border-gray-300 ${
                  viewMode === 'grid' ? 'bg-blue-50' : 'bg-white'
                } hover:bg-blue-100`}
              >
                <Grid3X3 className="w-4 h-4 text-blue-500" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md border border-gray-300 ${
                  viewMode === 'list' ? 'bg-blue-50' : 'bg-white'
                } hover:bg-blue-100`}
              >
                <List className="w-4 h-4 text-blue-500" />
              </button>
            </div>

            {/* Book Count */}
            <div className="basis-1/3 text-right text-sm text-gray-500 font-medium whitespace-nowrap">
              {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} found
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-1 py-1 rounded-md text-sm font-medium flex items-center gap-2 transition ${
                  selectedCategory === cat
                    ? 'bg-blue-500 text-white'
                    : 'bg-white border border-gray-300 text-blue-600 hover:bg-gray-100'
                }`}
              >
                {cat}
                <span className="bg-green-500 text-white px-2 py-0.5 rounded text-xs font-bold shadow-sm">
                  {getCategoryCount(cat)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Book Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredBooks.map(book => (
              <div
                key={book.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
              >
                <img src={book.thumbnail} alt={book.title} className="w-full h-70 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
                  {book.author && <p className="text-sm text-gray-600">By {book.author}</p>}
                  {book.year && <p className="text-sm text-gray-500">Published: {book.year}</p>}
                  {book.description && <p className="text-sm text-gray-700 mt-2">{book.description}</p>}
                  <a
                    href={book.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-green-700 transition"
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-6">
  {filteredBooks.map(book => (
    <div
      key={book.id}
      className="bg-white rounded-xl shadow-sm border border-gray-200 flex items-start gap-6 p-4 hover:shadow-md transition"
    >
      <img
        src={book.thumbnail}
        alt={book.title}
        className="w-32 h-44 object-cover rounded-md flex-shrink-0"
      />
      <div className="flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{book.title}</h3>
          {book.author && (
            <p className="text-sm text-gray-600 mt-1">By {book.author}</p>
          )}
          {book.year && (
            <p className="text-sm text-gray-500 mt-1">Published: {book.year}</p>
          )}
          {book.description && (
            <p className="text-sm text-gray-700 mt-3 line-clamp-3">{book.description}</p>
          )}
        </div>
        <div className="mt-4">
          <a
            href={book.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-green-700 transition"
          >
            Download
          </a>
        </div>
      </div>
    </div>
  ))}
</div>

        )}
      </div>
    </PageTransition>
  );
};

export default BookLibrary;