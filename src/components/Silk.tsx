import { useEffect, useRef } from 'react';

interface SilkProps {
  speed?: number;
  scale?: number;
  noiseIntensity?: number;
  rotation?: number;
}

const Silk = ({ speed = 1, scale = 1, noiseIntensity = 0.5, rotation = 0 }: SilkProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create flowing silk-like patterns
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(129, 161, 212, 0.1)');
      gradient.addColorStop(0.5, 'rgba(201, 182, 228, 0.05)');
      gradient.addColorStop(1, 'rgba(247, 141, 167, 0.1)');

      ctx.fillStyle = gradient;
      
      // Create flowing wave pattern
      ctx.beginPath();
      for (let x = 0; x <= canvas.width; x += 10) {
        const y = canvas.height / 2 + 
          Math.sin((x * 0.01 + time * speed) * scale) * 50 * noiseIntensity +
          Math.cos((x * 0.005 + time * speed * 0.5) * scale) * 30 * noiseIntensity;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fill();

      time += 0.016; // ~60fps
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [speed, scale, noiseIntensity, rotation]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.3 }}
    />
  );
};

export default Silk;