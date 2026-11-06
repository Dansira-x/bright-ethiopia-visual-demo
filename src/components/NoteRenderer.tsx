// src/components/NoteRenderer.tsx
import React from "react";
import TracingImage from "../pages/TracingImage";
import ActivityRenderer from "./ActivityRenderer"; // ✅ import the renderer

const NoteRenderer: React.FC<{ blocks: any[] }> = ({ blocks }) => {
  const defaultStyles: Record<string, string> = {
    title: "text-2xl font-bold text-blue-900",
    heading: "text-xl font-semibold text-blue-600",
    subTitle: "text-xl font-medium text-indigo-700 mt-4",
    paragraph: "text-gray-800",
    quote: "italic border-l-4 border-blue-300 pl-4 text-blue-500",
    image: "rounded shadow-md mx-auto w-96 h-96",
    list: "text-green-600",
    video: "mt-4",
  };

  return (
    <div className="space-y-4">
      {blocks.map((block, index) => {
        const style = block.style || defaultStyles[block.type];

        switch (block.type) {
          case "title":
            return (
              <h2 key={index} className={style}>
                {block.content}
              </h2>
            );

          case "heading":
            return (
              <h3 key={index} className={style}>
                {block.content}
              </h3>
            );

          case "subTitle":
            return (
              <h4 key={index} className={style}>
                {block.content}
              </h4>
            );

          case "paragraph":
            return (
              <p key={index} className={style}>
                {block.content
                  .split(/(\*\*.*?\*\*)/)
                  .map((part: string, i: React.Key) =>
                    part.startsWith("**") && part.endsWith("**") ? (
                      <strong key={i}>{part.slice(2, -2)}</strong>
                    ) : (
                      part
                    )
                  )}
              </p>
            );

          case "list": {
            let listClass = "list-disc";
            if (block.listStyle === "decimal") listClass = "list-decimal";
            if (block.listStyle === "roman") listClass = "list-[upper-roman]";
            if (block.listStyle === "alpha") listClass = "list-[lower-alpha]";

            return (
              <ul key={index} className={`${listClass} list-inside ${style}`}>
                {block.items.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          }

          case "quote":
            return (
              <blockquote key={index} className={style}>
                {block.content}
              </blockquote>
            );

          case "image":
            return (
              <figure key={index} className="relative flex flex-col items-center">
                {block.traceable ? (
                  <TracingImage
                    src={block.src}
                    alt={block.alt || "lesson image"}
                    style={block.style || defaultStyles.image}
                  />
                ) : (
                  <img
                    src={block.src}
                    alt={block.alt || "lesson image"}
                    className={block.style || defaultStyles.image}
                  />
                )}

                {block.caption && (
                  <figcaption className="mt-2 text-sm text-gray-500 italic">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case "video":
            return (
              <div key={index} className={style}>
                {block.title && (
                  <h4 className="font-medium text-gray-800 mb-2">
                    {block.title}
                  </h4>
                )}
                <iframe
                  src={block.url}
                  title={block.title || `video-${index}`}
                  allowFullScreen
                  className="w-full h-64 rounded"
                />
                {block.duration && (
                  <p className="text-sm text-gray-500 mt-1">
                    Duration: {block.duration} min
                  </p>
                )}
              </div>
            );

          // ✅ NEW: Activity block
          case "activity":
            return <ActivityRenderer key={index} block={block} />;

          default:
            return null;
        }
      })}
    </div>
  );
};

export default NoteRenderer;
