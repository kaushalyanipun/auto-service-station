import React, { useState } from 'react'
import CustomerBookingPage from './pages/CustomerBookingPage'
import MouseTrail from './MouseTrail' 
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [activeTab, setActiveTab] = useState('booking') 

  return (
    <div style={{ backgroundColor: '#040718', minHeight: '100vh', color: 'white' }}>
      
      {/* ✨ 2. Mouse Sparkle Animation */}
      <MouseTrail />

      {/* Navigation Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          padding: '15px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(255, 255, 255, 0.02)',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backdropFilter: 'blur(10px)'
        }}
      >
        <button
          onClick={() => setActiveTab('booking')}
          style={{
            padding: '10px 20px',
            background: activeTab === 'booking' ? '#2563eb' : 'transparent',
            color: 'white',
            border: activeTab === 'booking' ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.3s ease',
          }}
        >
          Customer Booking Form
        </button>

        <button
          onClick={() => setActiveTab('demo')}
          style={{
            padding: '10px 20px',
            background: activeTab === 'demo' ? '#4f46e5' : 'transparent',
            color: 'white',
            border: activeTab === 'demo' ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.3s ease',
          }}
        >
          Vite Demo Page
        </button>
      </div>

      {/* Main Content Area */}
      {activeTab === 'booking' ? (
        <CustomerBookingPage />
      ) : (
        <main style={{ padding: '20px' }}>
          <section id="center">
            <div className="hero">
              <img src={heroImg} className="base" width="170" height="179" alt="" />
              <img src={reactLogo} className="framework" alt="React logo" />
              <img src={viteLogo} className="vite" alt="Vite logo" />
            </div>
            <div>
              <h1>Get started</h1>
              <p>
                Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
              </p>
            </div>
            <button
              type="button"
              className="counter"
              onClick={() => setCount((prevCount) => prevCount + 1)}
            >
              Count is {count}
            </button>
          </section>

          <div className="ticks"></div>

          <section id="next-steps">
            <div id="docs">
              <svg className="icon" role="presentation" aria-hidden="true">
                <use href="/icons.svg#documentation-icon"></use>
              </svg>
              <h2>Documentation</h2>
              <p>Your questions, answered</p>
              <ul>
                <li>
                  <a href="https://vite.dev/" target="_blank" rel="noreferrer">
                    <img className="logo" src={viteLogo} alt="" />
                    Explore Vite
                  </a>
                </li>
                <li>
                  <a href="https://react.dev/" target="_blank" rel="noreferrer">
                    <img className="button-icon" src={reactLogo} alt="" />
                    Learn more
                  </a>
                </li>
              </ul>
            </div>
            <div id="social">
              <svg className="icon" role="presentation" aria-hidden="true">
                <use href="/icons.svg#social-icon"></use>
              </svg>
              <h2>Connect with us</h2>
              <p>Join the Vite community</p>
              <ul>
                <li>
                  <a href="https://github.com/vitejs/vite" target="_blank" rel="noreferrer">
                    <svg
                      className="button-icon"
                      role="presentation"
                      aria-hidden="true"
                    >
                      <use href="/icons.svg#github-icon"></use>
                    </svg>
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://chat.vite.dev/" target="_blank" rel="noreferrer">
                    <svg
                      className="button-icon"
                      role="presentation"
                      aria-hidden="true"
                    >
                      <use href="/icons.svg#discord-icon"></use>
                    </svg>
                    Discord
                  </a>
                </li>
                <li>
                  <a href="https://x.com/vite_js" target="_blank" rel="noreferrer">
                    <svg
                      className="button-icon"
                      role="presentation"
                      aria-hidden="true"
                    >
                      <use href="/icons.svg#x-icon"></use>
                    </svg>
                    X.com
                  </a>
                </li>
                <li>
                  <a href="https://bsky.app/profile/vite.dev" target="_blank" rel="noreferrer">
                    <svg
                      className="button-icon"
                      role="presentation"
                      aria-hidden="true"
                    >
                      <use href="/icons.svg#bluesky-icon"></use>
                    </svg>
                    Bluesky
                  </a>
                </li>
              </ul>
            </div>
          </section>

          <div className="ticks"></div>
          <section id="spacer"></section>
        </main>
      )}

    </div>
  )
}

export default App