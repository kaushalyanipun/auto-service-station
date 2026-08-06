import React, { useEffect, useState } from 'react'

const MouseTrail = () => {
  const [trail, setTrail] = useState([])

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newPoint = {
        x: e.clientX,
        y: e.clientY,
        id: Math.random(),
      }

      setTrail((prevTrail) => [...prevTrail.slice(-18), newPoint])
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTrail((prevTrail) => prevTrail.slice(1))
    }, 40)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: 9999 }}>
      {trail.map((pt, index) => {
        
        const size = 35 - index * 1.2
        return (
          <span
            key={pt.id}
            className="cyan-glow-circle"
            style={{
              left: `${pt.x}px`,
              top: `${pt.y}px`,
              width: `${size > 5 ? size : 5}px`,
              height: `${size > 5 ? size : 5}px`,
            }}
          />
        )
      })}
    </div>
  )
}

export default MouseTrail