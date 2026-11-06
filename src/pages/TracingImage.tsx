import React, { useEffect, useRef, useState } from "react";

interface TracingImageProps {
  src: string;
  alt: string;
  style?: string; // Tailwind/cls for the image
}

const TracingImage: React.FC<TracingImageProps> = ({ src, alt, style }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [active, setActive] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  // Config
  const [color, setColor] = useState("#000000");
  const [width, setWidth] = useState(4);

  // Ensure canvas matches image size and is crisp
  const resizeCanvasToImage = () => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;

    const rect = img.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // CSS size for overlay fit
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // Internal buffer for crisp lines
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.max(1, Math.round(rect.height * dpr));

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    }
  };

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const handleLoad = () => resizeCanvasToImage();
    if (img.complete) handleLoad();
    else img.addEventListener("load", handleLoad);

    window.addEventListener("resize", resizeCanvasToImage);
    return () => {
      img?.removeEventListener("load", handleLoad);
      window.removeEventListener("resize", resizeCanvasToImage);
    };
  }, []);

  // Unified coordinate getter
  const getCoords = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    if ("nativeEvent" in e && "offsetX" in e.nativeEvent) {
      const me = e.nativeEvent as MouseEvent;
      // Mouse events: offsetX/Y align to CSS pixels thanks to ctx.setTransform
      return { x: me.offsetX, y: me.offsetY };
    } else {
      const te = e.nativeEvent as TouchEvent;
      const t = te.touches[0] || te.changedTouches[0];
      return { x: t.clientX - rect.left, y: t.clientY - rect.top };
    }
  };

  const start = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Prepare stroke
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = color;
    ctx.lineWidth = width;

    const { x, y } = getCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const move = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const { x, y } = getCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const end = () => setIsDrawing(false);

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="relative inline-block">
      {/* Image: disable pointer events when tracing so canvas captures everything */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`${style || ""} ${active ? "pointer-events-none" : ""}`}
      />

      {/* Pencil toggle */}
      <button
        type="button"
        onClick={() => {
          setActive((v) => !v);
          // Resize when activating to ensure exact fit
          setTimeout(resizeCanvasToImage, 0);
        }}
        className="absolute top-2 right-2 z-30 bg-white/90 hover:bg-white rounded-full shadow px-2.5 py-2"
        aria-label="Toggle tracing"
      >
        ✏️
      </button>

      {/* Canvas overlay */}
      {active && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-20 touch-none"
          onMouseDown={start}
          onMouseMove={move}
          onMouseUp={end}
          onMouseLeave={end}
          onTouchStart={start}
          onTouchMove={move}
          onTouchEnd={end}
        />
      )}

      {/* Controls: slide in next to the pencil */}
      <div
        className={`absolute top-2 right-12 z-30 flex items-center gap-2 transition-transform duration-300 ${
          active ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0 pointer-events-none"
        }`}
      >
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-8 h-8 border rounded"
          aria-label="Color"
        />
        <select
          value={width}
          onChange={(e) => setWidth(parseInt(e.target.value, 10))}
          className="px-2 py-1 border rounded text-xs bg-white"
          aria-label="Line width"
        >
          <option value={2}>Thin</option>
          <option value={4}>Normal</option>
          <option value={6}>Thick</option>
          <option value={10}>Extra</option>
        </select>
        <button
          type="button"
          onClick={clear}
          className="px-2 py-1 bg-red-600 text-white rounded text-xs"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default TracingImage;
