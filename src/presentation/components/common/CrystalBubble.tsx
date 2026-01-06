'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

interface Bubble {
  id: number;
  size: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  opacity: number;
}

interface CrystalBubbleProps {
  count?: number;
}

const BUBBLE_COLORS_LIGHT = [
  'rgba(99, 102, 241, 0.35)',  // indigo - more visible
  'rgba(139, 92, 246, 0.35)',  // purple
  'rgba(236, 72, 153, 0.3)',   // pink
  'rgba(59, 130, 246, 0.3)',   // blue
  'rgba(16, 185, 129, 0.25)',  // emerald
];

const BUBBLE_COLORS_DARK = [
  'rgba(99, 102, 241, 0.2)',
  'rgba(139, 92, 246, 0.2)',
  'rgba(236, 72, 153, 0.15)',
  'rgba(59, 130, 246, 0.15)',
  'rgba(16, 185, 129, 0.12)',
];

export function CrystalBubble({ count = 10 }: CrystalBubbleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const bubblesRef = useRef<Bubble[]>([]);
  const [, forceUpdate] = useState(0);
  const [isDark, setIsDark] = useState(false);

  // Detect dark mode
  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const BUBBLE_COLORS = isDark ? BUBBLE_COLORS_DARK : BUBBLE_COLORS_LIGHT;

  const initialBubbles = useMemo<Bubble[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 100 + 80, // Bigger bubbles
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      vx: (Math.random() - 0.5) * 0.04,
      vy: (Math.random() - 0.5) * 0.04,
      color: BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)],
      opacity: Math.random() * 0.4 + 0.6, // Higher opacity
    }));
  }, [count, BUBBLE_COLORS]);

  useEffect(() => {
    bubblesRef.current = [...initialBubbles];

    const animate = () => {
      const container = containerRef.current;
      if (!container) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;

      bubblesRef.current = bubblesRef.current.map((bubble) => {
        let newX = bubble.x + bubble.vx;
        let newY = bubble.y + bubble.vy;
        let newVx = bubble.vx;
        let newVy = bubble.vy;

        const bubbleSizePercent = (bubble.size / containerWidth) * 100;
        const bubbleSizePercentY = (bubble.size / containerHeight) * 100;

        // Soft bounce
        if (newX <= 0) {
          newX = 0;
          newVx = Math.abs(newVx);
        } else if (newX >= 100 - bubbleSizePercent) {
          newX = 100 - bubbleSizePercent;
          newVx = -Math.abs(newVx);
        }

        if (newY <= 0) {
          newY = 0;
          newVy = Math.abs(newVy);
        } else if (newY >= 100 - bubbleSizePercentY) {
          newY = 100 - bubbleSizePercentY;
          newVy = -Math.abs(newVy);
        }

        // Very subtle random drift
        newVx += (Math.random() - 0.5) * 0.002;
        newVy += (Math.random() - 0.5) * 0.002;

        // Limit velocity (very slow)
        const maxVelocity = 0.06;
        newVx = Math.max(-maxVelocity, Math.min(maxVelocity, newVx));
        newVy = Math.max(-maxVelocity, Math.min(maxVelocity, newVy));

        return { ...bubble, x: newX, y: newY, vx: newVx, vy: newVy };
      });

      forceUpdate((n) => n + 1);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [initialBubbles]);

  return (
    <div ref={containerRef} className="crystal-bubble-container">
      {bubblesRef.current.map((bubble) => (
        <div
          key={bubble.id}
          className="crystal-bubble"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: bubble.size,
            height: bubble.size,
            opacity: bubble.opacity,
            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), ${bubble.color})`,
            boxShadow: `inset 0 0 30px rgba(255,255,255,0.15), 0 8px 32px ${bubble.color}`,
          }}
        />
      ))}
    </div>
  );
}
