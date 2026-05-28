import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function HomeView() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({ duration: 1000, once: false });
    }
  }, []);

  // Centralized cursor transformation interactions
  const growCursor = () => {
    const cursor = document.getElementById('cursor');
    if (cursor) {
      cursor.style.transform = 'translate(-50%, -50%) scale(6)';
      cursor.style.background = 'white';
      cursor.style.mixBlendMode = 'difference';
    }
  };

  const shrinkCursor = () => {
    const cursor = document.getElementById('cursor');
    if (cursor) {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.background = '#ff3c3c';
      cursor.style.mixBlendMode = 'normal';
    }
  };

  return (
    <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 60px' }}>
      
      {/* --- HERO SPLIT SECTION --- */}
      <section 
        style={{
          height: '100vh',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          alignItems: 'center'
        }}
        className="hero-split-container"
      >
        <div style={{ paddingRight: '40px' }} data-aos="fade-right">
          <p 
            style={{
              fontFamily: "'Syncopate', sans-serif",
              fontSize: '12px',
              color: '#ff3c3c',
              marginBottom: '20px',
              letterSpacing: '4px'
            }}
          >
            Editor & Colorist
          </p>
          <h1 
            style={{
              fontFamily: "'Syncopate', sans-serif",
              fontSize: 'clamp(40px, 6vw, 90px)',
              lineHeight: 0.9,
              textTransform: 'uppercase',
              margin: 0
            }}
          >
            Emotion<br />
            <span 
              className="outline-text" 
              style={{
                color: 'transparent',
                WebkitTextStroke: '1px rgba(255,255,255,0.3)'
              }}
            >
              In Every
            </span><br />
            Frame.
          </h1>
          <p style={{ marginTop: '30px', color: '#888888', maxWidth: '400px', fontSize: '16px', lineHeight: '1.6' }}>
            Crafting cinematic narratives through precision editing and high-fidelity color grading for global brands.
          </p>
        </div>

        <div 
          className="hero-artwork"
          data-aos="zoom-in-left"
          onMouseEnter={growCursor}
          onMouseLeave={shrinkCursor}
          style={{
            height: '80vh',
            backgroundImage: "url('https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=1000')",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            borderRadius: '10px',
            position: 'relative',
            transition: '0.5s'
          }}
        />
      </section>

      {/* --- ADOBE SOFTWARE UTILITY DISPLAY PANEL --- */}
      <section 
        className="adobe-panel" 
        data-aos="fade-up" 
        style={{
          background: '#1e1e1e', 
          border: '1px solid #383838', 
          padding: '30px', 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '20px', 
          margin: '60px 0', 
          fontFamily: "'Courier New', Courier, monospace", 
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', borderLeft: '2px solid #444', paddingLeft: '15px' }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg" alt="Pr" style={{ width: '40px', height: '40px', marginBottom: '15px' }} />
          <span style={{ color: '#999', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>App::Editor</span>
          <span style={{ color: '#3ea6ff', fontSize: '22px', fontWeight: 700 }}>PREMIERE PRO</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', borderLeft: '2px solid #444', paddingLeft: '15px' }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg" alt="Ae" style={{ width: '40px', height: '40px', marginBottom: '15px' }} />
          <span style={{ color: '#999', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>App::Motion</span>
          <span style={{ color: '#3ea6ff', fontSize: '22px', fontWeight: 700 }}>AFTER EFFECTS</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', borderLeft: '2px solid #444', paddingLeft: '15px' }}>
          <div style={{ width: '40px', height: '40px', marginBottom: '15px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px' }}>
            <span style={{ color: '#000', fontWeight: 'bold', fontSize: '10px' }}>CapCut</span>
          </div>
          <span style={{ color: '#999', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>App::Video</span>
          <span style={{ color: '#3ea6ff', fontSize: '22px', fontWeight: 700 }}>CAPCUT</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', borderLeft: '2px solid #444', paddingLeft: '15px' }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg" alt="Ps" style={{ width: '40px', height: '40px', marginBottom: '15px' }} />
          <span style={{ color: '#999', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>App::Design</span>
          <span style={{ color: '#3ea6ff', fontSize: '22px', fontWeight: 700 }}>PHOTOSHOP</span>
        </div>
      </section>

      {/* --- ADDED SECTION: SELECTED WORKS PREVIEW --- */}
      <section style={{ padding: '60px 0' }}>
        <h3 
          onClick={() => { shrinkCursor(); navigate('/projects'); }}
          onMouseEnter={growCursor}
          onMouseLeave={shrinkCursor}
          style={{ 
            fontFamily: "'Syncopate', sans-serif", 
            fontSize: '14px', 
            letterSpacing: '4px', 
            marginBottom: '40px',
            cursor: 'none',
            display: 'inline-block',
            transition: 'color 0.3s ease'
          }}
          className="interactive-header-link"
        >
          SELECTED WORKS —
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div 
            className="work-card" 
            data-aos="fade-up"
            onClick={() => { shrinkCursor(); navigate('/projects'); }}
            onMouseEnter={growCursor}
            onMouseLeave={shrinkCursor}
            style={{ height: '500px', overflow: 'hidden', position: 'relative', background: '#121212', transition: 'transform 0.3s', borderRadius: '4px' }}
          >
            <img src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=800" alt="Work" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.6s', opacity: 0.6 }} />
            <div style={{ position: 'absolute', bottom: '30px', left: '30px' }}>
              <p style={{ fontSize: '10px', color: '#ff3c3c', letterSpacing: '2px', fontWeight: 'bold' }}>STORYTELLING</p>
              <h3 style={{ fontFamily: "'Syncopate', sans-serif", fontSize: '16px', margin: '5px 0 0 0' }}>Urban Pulse</h3>
            </div>
          </div>

          <div 
            className="work-card" 
            data-aos="fade-up" 
            data-aos-delay="200"
            onClick={() => { shrinkCursor(); navigate('/projects'); }}
            onMouseEnter={growCursor}
            onMouseLeave={shrinkCursor}
            style={{ height: '500px', overflow: 'hidden', position: 'relative', background: '#121212', transition: 'transform 0.3s', borderRadius: '4px' }}
          >
            <img src="https://images.unsplash.com/photo-1514525253344-f81bad3b057f?auto=format&fit=crop&q=80&w=800" alt="Work" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.6s', opacity: 0.6 }} />
            <div style={{ position: 'absolute', bottom: '30px', left: '30px' }}>
              <p style={{ fontSize: '10px', color: '#ff3c3c', letterSpacing: '2px', fontWeight: 'bold' }}>COMMERCIAL</p>
              <h3 style={{ fontFamily: "'Syncopate', sans-serif", fontSize: '16px', margin: '5px 0 0 0' }}>Vogue Runway</h3>
            </div>
          </div>
        </div>
      </section>

      {/* --- ADDED SECTION: LET'S CONNECT CTA --- */}
      <section style={{ padding: '150px 0', textAlign: 'center' }}>
        <p style={{ letterSpacing: '3px', marginBottom: '20px', fontSize: '12px', color: '#888888' }}>
          READY TO ELEVATE YOUR FOOTAGE?
        </p>
        <span
          onClick={() => { shrinkCursor(); navigate('/contact'); }}
          onMouseEnter={growCursor}
          onMouseLeave={shrinkCursor}
          style={{ 
            fontFamily: "'Syncopate', sans-serif", 
            fontSize: 'clamp(30px, 5vw, 60px)', 
            color: '#fff', 
            transition: '0.3s',
            display: 'inline-block',
            textDecoration: 'none'
          }}
          className="big-button-link"
        >
          LET'S CONNECT —
        </span>
      </section>

      {/* Embedded style elements for responsive modifications and image transitions */}
      <style dangerouslySetInnerHTML={{__html: `
        .hero-artwork { filter: grayscale(0.5); }
        .hero-artwork:hover { filter: grayscale(0); }
        
        .work-card img { transition: transform 0.6s ease, opacity 0.6s ease; }
        .work-card:hover img { transform: scale(1.05); opacity: 1; }
        
        .interactive-header-link:hover { color: #ff3c3c; }
        .big-button-link:hover { color: #ff3c3c; }

        @media (max-width: 992px) {
          .hero-split-container { grid-template-columns: 1fr !important; height: auto !important; padding-top: 120px; }
          .hero-artwork { height: 400px !important; margin-top: 40px; }
          .adobe-panel { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
          .work-grid { grid-template-columns: 1fr !important; }
        }
      `}} />

    </main>
  );
}