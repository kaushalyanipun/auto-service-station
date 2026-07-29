import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 99999 }}>
      {/* Center Pointer Dot */}
      <div 
        style={{
          position: 'fixed',
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          width: '8px',
          height: '8px',
          backgroundColor: '#00d2ff',
          borderRadius: '50%',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 10px #00d2ff, 0 0 15px #00d2ff',
          willChange: 'left, top'
        }}
      />
      
      {/* Outer Concentric Glow Ring (Perfectly Centered) */}
      <div 
        style={{
          position: 'fixed',
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          width: '38px',
          height: '38px',
          border: '1.5px solid rgba(0, 210, 255, 0.7)',
          background: 'radial-gradient(circle, rgba(0, 210, 255, 0.15) 0%, rgba(0, 0, 0, 0) 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.06s ease-out, top 0.06s ease-out',
          willChange: 'left, top'
        }}
      />
    </div>
  );
};

export default CustomCursor;