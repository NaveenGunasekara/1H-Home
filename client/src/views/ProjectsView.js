import React, { useState, useEffect } from 'react';

export function ProjectsView() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/inventory/public-projects')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setProjects(data); })
      .catch(err => console.error('Error fetching projects:', err));
  }, []);

  return (
    <div style={{ padding: '60px', minHeight: '80vh' }}>
      <h2 style={{ letterSpacing: '3px', fontFamily: "'Syncopate', sans-serif", marginBottom: '40px' }}>
        SELECTED WORKS
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
        {projects.length === 0 ? (
          <p style={{ color: '#555' }}>No projects live yet. Add some from the admin panel!</p>
        ) : (
          projects.map(proj => (
            <div key={proj._id} className="work-card" style={{ background: '#111', border: '1px solid #222', borderRadius: '4px', overflow: 'hidden' }}>
              <img src={proj.imageUrl} alt={proj.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '20px' }}>
                <span style={{ color: '#ff3c3c', fontSize: '11px', fontWeight: 'bold' }}>{proj.category.toUpperCase()}</span>
                <h4 style={{ margin: '5px 0 0 0', fontSize: '18px' }}>{proj.title}</h4>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}