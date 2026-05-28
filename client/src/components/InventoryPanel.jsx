import React, { useState, useEffect } from 'react';

export function InventoryPanel() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  const fetchInventory = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('http://localhost:5000/api/inventory', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchInventory(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('http://localhost:5000/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, quantity: Number(quantity) })
      });
      if (res.ok) {
        setName('');
        setQuantity('');
        fetchInventory();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`http://localhost:5000/api/inventory/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchInventory();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div data-aos="fade-in">
      <p style={{ fontFamily: "'Syncopate', sans-serif", fontSize: '11px', color: '#ff3c3c', letterSpacing: '3px', marginBottom: '10px' }}>LOGISTICS CONTROL ENGINE</p>
      <h2 style={{ fontFamily: "'Syncopate', sans-serif", fontSize: '28px', letterSpacing: '2px', marginBottom: '40px', fontWeight: 700 }}>ASSET STOCK LEDGER</h2>

      <form onSubmit={handleCreate} style={{ display: 'flex', gap: '15px', marginBottom: '40px', background: '#121212', padding: '20px', border: '1px solid #222' }}>
        <input type="text" placeholder="ASSET DESCRIPTION" value={name} onChange={e => setName(e.target.value)} required style={{ background: '#0a0a0a', border: '1px solid #333', color: '#fff', padding: '14px', flexGrow: 1, fontFamily: 'monospace', fontSize: '12px' }} />
        <input type="number" placeholder="QUANTITY" value={quantity} onChange={e => setQuantity(e.target.value)} required style={{ background: '#0a0a0a', border: '1px solid #333', color: '#fff', padding: '14px', width: '130px', fontFamily: 'monospace', fontSize: '12px' }} />
        <button type="submit" style={{ background: '#ff3c3c', color: '#fff', border: 'none', padding: '0 30px', fontFamily: "'Syncopate', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '1px', cursor: 'pointer' }}>REGISTER</button>
      </form>

      <div style={{ border: '1px solid #222', background: '#121212' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', borderBottom: '2px solid #222', fontFamily: "'Syncopate', sans-serif", fontSize: '10px', letterSpacing: '1px', color: '#666' }}>
          <span>ASSET IDENTITY</span>
          <span>VOLUME STATUS</span>
        </div>
        {items.length === 0 ? (
          <p style={{ padding: '30px', color: '#666', fontSize: '13px', textAlign: 'center' }}>No records found in database.</p>
        ) : (
          items.map(item => (
            <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 30px', borderBottom: '1px solid #222', transition: '0.2s' }}>
              <span style={{ fontSize: '14px', fontWeight: '600' }}>{item.name}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                <span style={{ color: item.quantity < 5 ? '#ff3c3c' : '#3ea6ff', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '14px' }}>{item.quantity} UNITS</span>
                <button onClick={() => handleDelete(item._id)} style={{ background: 'transparent', border: 'none', color: '#444', cursor: 'pointer', fontSize: '11px', fontFamily: "'Syncopate', sans-serif" }} onMouseEnter={e => e.target.style.color = '#ff3c3c'} onMouseLeave={e => e.target.style.color = '#444'}>[REMOVE]</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}