import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export function PublicLayout() {
  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({ duration: 1000, once: false });
    }

    const cursor = document.getElementById('cursor');
    let animationFrameId;

    const handleMouseMove = (e) => {
      if (cursor) {
        animationFrameId = requestAnimationFrame(() => {
          cursor.style.left = e.clientX + 'px';
          cursor.style.top = e.clientY + 'px';
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="custom-cursor-active" style={{ backgroundColor: '#0a0a0a', color: '#ffffff', minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div id="cursor" style={{ width: '10px', height: '10px', background: '#ff3c3c', borderRadius: '50%', position: 'fixed', pointerEvents: 'none', zIndex: 99999, transform: 'translate(-50%, -50%)', transition: 'transform 0.2s ease-out' }}></div>
      <Navbar />
      <div style={{ paddingTop: '100px' }}>
        <Outlet />
      </div>
    </div>
  );
}