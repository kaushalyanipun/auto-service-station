import { useEffect, useState } from 'react';

function AnimatedCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    let frameId = null;

    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;

      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(() => {
        setPosition({ x: clientX, y: clientY });
        setTrail((prev) => {
          const nextPoint = { x: clientX, y: clientY, id: Date.now() + Math.random() };
          return [...prev.slice(-10), nextPoint];
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[9999]">
        {trail.map((point, index) => (
          <span
            key={point.id}
            className="cursor-glow absolute rounded-full border border-cyan-300/80 bg-cyan-300/20 shadow-[0_0_18px_rgba(34,211,238,0.35)]"
            style={{
              left: point.x,
              top: point.y,
              width: `${16 + index * 2}px`,
              height: `${16 + index * 2}px`,
              opacity: 1 - index / 12,
            }}
          />
        ))}
      </div>

      <div
        className="pointer-events-none fixed z-[10000] h-4 w-4 rounded-full border border-cyan-200/90 bg-cyan-200/10 shadow-[0_0_20px_rgba(34,211,238,0.6)]"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
}

export default AnimatedCursor;
