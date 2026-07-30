import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleHover = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'SELECT' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleHover);
    };
  }, []);

  // Smooth Ring Follow Motion
  useEffect(() => {
    const follow = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.2,
        y: prev.y + (position.y - prev.y) * 0.2,
      }));
    };
    const animId = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(animId);
  }, [position, trailingPos]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden">
      {/* 🔴 Center Cyan Dot */}
      <div
        className="fixed w-3 h-3 bg-cyan-400 rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 shadow-[0_0_12px_#06b6d4]"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />

      {/* ⭕ Outer Glowing Follow Ring */}
      <div
        className={`fixed rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out border ${
          isHovered
            ? 'w-12 h-12 border-cyan-400 bg-cyan-500/20 scale-125 shadow-[0_0_20px_rgba(6,182,212,0.6)]'
            : 'w-8 h-8 border-cyan-400/60 bg-cyan-500/5'
        }`}
        style={{ left: `${trailingPos.x}px`, top: `${trailingPos.y}px` }}
      />
    </div>
  );
}