import { useEffect, useState } from 'react';

interface TrailHeart {
  id: number;
  x: number;
  y: number;
  size: number;
}

export function RomanticCursor() {
  const [trails, setTrails] = useState<TrailHeart[]>([]);

  useEffect(() => {
    // Disable on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    let counter = 0;
    const handleMouseMove = (e: MouseEvent) => {
      counter++;
      if (counter % 3 !== 0) return; // throttle

      const newHeart: TrailHeart = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        size: Math.floor(Math.random() * 8) + 8,
      };

      setTrails(prev => [...prev.slice(-12), newHeart]);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const interval = setInterval(() => {
      setTrails(prev => (prev.length > 0 ? prev.slice(1) : prev));
    }, 120);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {trails.map(t => (
        <span
          key={t.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 text-rose-400 opacity-60 transition-all duration-500"
          style={{
            left: `${t.x}px`,
            top: `${t.y}px`,
            fontSize: `${t.size}px`,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}
