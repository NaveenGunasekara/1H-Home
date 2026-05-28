import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.css';

export default function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });

    const cursor = document.getElementById('cursor');
    const onMove = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };
    document.addEventListener('mousemove', onMove);

    const hoverEls = document.querySelectorAll('a, .work-card, .hero-artwork');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(6)';
        cursor.style.background = 'white';
        cursor.style.mixBlendMode = 'difference';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.background = '#ff3c3c';
        cursor.style.mixBlendMode = 'normal';
      });
    });

    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      {/* Custom Cursor */}
      <div id="cursor" style={{
        width: '10px', height: '10px', background: 'var(--accent)',
        borderRadius: '50%', position: 'fixed', pointerEvents: 'none',
        zIndex: 9999, transition: 'transform 0.2s ease'
      }}></div>

      {/* Nav */}
      <header>
        <nav style={{
          padding: '30px 60px', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', position: 'fixed', width: '100%', top: 0,
          zIndex: 100, mixBlendMode: 'difference'
        }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', letterSpacing: '5px', fontWeight: 700 }}>
            EDIT<span>.</span>CRAFT
          </div>
          <ul style={{ display: 'flex', gap: '40px', listStyle: 'none' }}>
            {['Projects', 'Process', 'Contact'].map((item, i) => (
              <li key={i}>
                <a href={`#${item.toLowerCase()}`} style={{
                  textDecoration: 'none', color: '#fff', fontSize: '11px',
                  textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600
                }}>{item}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 60px' }}>

        {/* Hero */}
        <section style={{
          height: '100vh', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', alignItems: 'center'
        }}>
          <div data-aos="fade-right" style={{ paddingRight: '40px' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '12px', color: 'var(--accent)', marginBottom: '20px', letterSpacing: '4px' }}>
              Editor & Colorist
            </p>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(40px, 6vw, 90px)', lineHeight: 0.9, textTransform: 'uppercase' }}>
              Emotion<br />
              <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>In Every</span><br />
              Frame.
            </h1>
            <p style={{ marginTop: '30px', color: 'var(--text-muted)', maxWidth: '400px' }}>
              Crafting cinematic narratives through precision editing and high-fidelity color grading for global brands.
            </p>
          </div>
          <div className="hero-artwork" data-aos="zoom-in-left" style={{
            height: '80vh',
            background: "url('https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=1000') center/cover no-repeat",
            borderRadius: '10px', filter: 'grayscale(0.5)', transition: '0.5s'
          }}
            onMouseEnter={e => e.currentTarget.style.filter = 'grayscale(0)'}
            onMouseLeave={e => e.currentTarget.style.filter = 'grayscale(0.5)'}
          ></div>
        </section>

        {/* Adobe Tools Panel */}
        <section data-aos="fade-up" style={{
          background: '#1e1e1e', border: '1px solid #383838', padding: '30px',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px',
          margin: '60px 0', fontFamily: "'Courier New', monospace",
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
        }}>
          {[
            { src: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg', label: 'App::Editor', name: 'PREMIERE PRO' },
            { src: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg', label: 'App::Motion', name: 'AFTER EFFECTS' },
            { src: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg', label: 'App::Video', name: 'CAPCUT' },
            { src: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg', label: 'App::Design', name: 'PHOTOSHOP' },
          ].map((tool, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', borderLeft: '2px solid #444', paddingLeft: '15px' }}>
              <img src={tool.src} alt={tool.name} style={{ width: '40px', height: '40px', marginBottom: '15px' }} />
              <span style={{ color: '#999', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>{tool.label}</span>
              <span style={{ color: '#3ea6ff', fontSize: '22px', fontWeight: 700 }}>{tool.name}</span>
            </div>
          ))}
        </section>

        {/* Process */}
        <section id="process" style={{ padding: '120px 0' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', letterSpacing: '4px' }}>THE METHODOLOGY</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', marginTop: '60px' }}>
            {[
              { num: '01', title: 'Narrative Discovery', desc: 'We dive deep into the story beats to find the emotional core of your footage.' },
              { num: '02', title: 'The First Cut', desc: 'Focusing on rhythm and pacing to ensure a seamless flow from start to finish.' },
              { num: '03', title: 'Color & Sonic Mastery', desc: 'Elevating the visual aesthetic with industry-leading grading and soundscapes.' },
            ].map((step, i) => (
              <div key={i} data-aos="fade-up" data-aos-delay={`${(i + 1) * 100}`}
                style={{ borderLeft: '1px solid var(--accent)', paddingLeft: '20px' }}>
                <span style={{ fontFamily: 'var(--font-heading)', color: 'var(--accent)', fontSize: '12px' }}>{step.num}</span>
                <h4 style={{ fontFamily: 'var(--font-heading)', margin: '15px 0', fontSize: '16px' }}>{step.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Work Grid */}
        <section id="work">
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', letterSpacing: '4px', marginBottom: '40px' }}>SELECTED WORKS</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', margin: '100px 0' }}>
            {[
              { img: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=800', tag: 'STORYTELLING', title: 'Urban Pulse', delay: '' },
              { img: 'https://images.unsplash.com/photo-1514525253344-f81bad3b057f?auto=format&fit=crop&q=80&w=800', tag: 'COMMERCIAL', title: 'Vogue Runway', delay: '200' },
            ].map((work, i) => (
              <div key={i} className="work-card" data-aos="fade-up" data-aos-delay={work.delay}
                style={{ height: '500px', overflow: 'hidden', position: 'relative', background: 'var(--surface)' }}>
                <img src={work.img} alt={work.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.6s', opacity: 0.8 }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.opacity = 1; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.opacity = 0.8; }}
                />
                <div style={{ position: 'absolute', bottom: '30px', left: '30px' }}>
                  <p style={{ fontSize: '10px', color: 'var(--accent)' }}>{work.tag}</p>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px' }}>{work.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" style={{ padding: '150px 0', textAlign: 'center' }}>
          <p style={{ letterSpacing: '3px', marginBottom: '20px', fontSize: '12px', color: 'var(--text-muted)' }}>READY TO ELEVATE YOUR FOOTAGE?</p>
          <a href="mailto:hello@alexrivera.com" data-aos="fade-up"
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(30px, 5vw, 60px)', textDecoration: 'none', color: '#fff', transition: '0.3s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#ff3c3c'}
            onMouseLeave={e => e.currentTarget.style.color = '#fff'}
          >LET'S CONNECT —</a>
        </section>
      </main>

      <footer style={{ padding: '60px 0', textAlign: 'center', fontSize: '10px', letterSpacing: '2px', color: '#444', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        © 2025 ALL RIGHTS RESERVED / ALEX RIVERA STUDIO
      </footer>
    </>
  );
}