// src/components/LessonRenderer.tsx
import React from "react";
import { Lesson, NoteBlock, Quiz as QuizType } from "../data/types";
import Quiz from "./Quiz";

interface LessonRendererProps {
  lessons: Lesson[];
}

const LessonRenderer: React.FC<LessonRendererProps> = ({ lessons }) => {
  return (
    <div className="space-y-6">
      {lessons.map((lesson, i) => {
        switch (lesson.type) {
          case "video":
            return (
              <div key={i} className="p-4 border rounded-lg bg-white shadow-sm">
                <h2 className="font-semibold text-lg mb-2">{lesson.title}</h2>
                <p className="text-sm text-gray-600 mb-2">{lesson.duration} min</p>
                {/* Replace with your video player */}
                <video
                  src={lesson.url}
                  controls
                  className="w-full rounded-lg"
                />
              </div>
            );

          case "book":
            return (
              <div key={i} className="p-4 border rounded-lg bg-white shadow-sm">
                <h2 className="font-semibold text-lg mb-2">{lesson.title}</h2>
                <a
                  href={lesson.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Open Book
                </a>
              </div>
            );

          case "note":
            return (
              <div key={i} className="p-4 border rounded-lg bg-white shadow-sm">
                {lesson.blocks.map((block: NoteBlock, j) => {
                  switch (block.type) {
                    case "title":
                      return (
                        <h2 key={j} className="text-xl font-bold mb-2">
                          {block.content}
                        </h2>
                      );
                    case "heading":
                      return (
                        <h3 key={j} className="text-lg font-semibold mb-1">
                          {block.content}
                        </h3>
                      );
                    case "subTitle":
                      return (
                        <h4 key={j} className="text-md font-medium mb-1">
                          {block.content}
                        </h4>
                      );
                    case "paragraph":
                      return (
                        <p key={j} className="text-gray-700 mb-2">
                          {block.content}
                        </p>
                      );
                    case "list":
                      return (
                        <ul key={j} className="list-disc pl-6 mb-2">
                          {block.items.map((item, k) => (
                            <li key={k}>{item}</li>
                          ))}
                        </ul>
                      );
                    case "quote":
                      return (
                        <blockquote
                          key={j}
                          className="italic text-gray-600 border-l-4 pl-4 mb-2"
                        >
                          {block.content}
                        </blockquote>
                      );
                    case "image":
                      return (
                        <figure key={j} className="mb-4">
                          <img
                            src={block.src}
                            alt={block.alt}
                            className={`rounded-lg ${block.style || ""}`}
                          />
                          {block.caption && (
                            <figcaption className="text-sm text-gray-500 mt-1">
                              {block.caption}
                            </figcaption>
                          )}
                        </figure>
                      );
                    case "video":
                      return (
                        <video
                          key={j}
                          src={block.url}
                          controls
                          className="w-full rounded-lg mb-2"
                        />
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            );

          case "quiz":
            return (
              <div key={i} className="p-4 border rounded-lg bg-white shadow-sm">
                <h2 className="font-semibold text-lg mb-2">{lesson.title}</h2>
                {lesson.quizzes.map((quiz: QuizType, j: number) => (
                  <Quiz key={j} quiz={quiz} />
                ))}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default LessonRenderer;
