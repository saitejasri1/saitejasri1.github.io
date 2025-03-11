import { useEffect, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { backgroundTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const stars: Array<{
      x: number;
      y: number;
      size: number;
      alpha: number;
      speed: number;
    }> = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const createStar = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2,
      alpha: Math.random(),
      speed: Math.random() * 0.002 + 0.002,
    });

    const initStars = () => {
      stars.length = 0;
      const density = (canvas.width * canvas.height) / 8000;
      for (let i = 0; i < density; i++) {
        stars.push(createStar());
      }
    };

    const drawStar = (star: typeof stars[0]) => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(220, 100%, 80%, ${star.alpha})`;
      ctx.fill();
    };

    const updateStar = (star: typeof stars[0]) => {
      star.alpha += Math.sin(Date.now() * star.speed) * 0.01;
      star.alpha = Math.max(0.1, Math.min(1, star.alpha));
      return star;
    };

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        updateStar(star);
        drawStar(star);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resize();
      initStars();
    };

    if (backgroundTheme === "space") {
      handleResize();
      animate();

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, [backgroundTheme]);

  return (
    <div className="fixed inset-0 -z-10 transition-colors duration-500">
      {/* Gradient background */}
      <div 
        className={`absolute inset-0 transition-opacity duration-500 ${
          backgroundTheme === "gradient" ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(to right top, #f3f4f6, #e5e7eb, #d1d5db)',
        }}
      >
        {/* Subtle animated gradient overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `
              radial-gradient(circle at 0% 0%, #ffffff 0%, transparent 50%),
              radial-gradient(circle at 100% 100%, #ffffff 0%, transparent 50%)
            `,
            backgroundSize: '200% 200%',
            animation: 'gradientMove 15s ease infinite',
          }}
        />
      </div>

      {/* Space background */}
      <div 
        className={`absolute inset-0 transition-opacity duration-500 ${
          backgroundTheme === "space" ? 'opacity-100' : 'opacity-0'
        } bg-black/50`}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
      </div>

      {/* Add styles for the gradient animation */}
      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 0%; }
            50% { background-position: 100% 100%; }
            100% { background-position: 0% 0%; }
          }
        `}
      </style>
    </div>
  );
}