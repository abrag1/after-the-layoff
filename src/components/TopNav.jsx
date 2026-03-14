import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export default function TopNav() {
  return (
    <nav style={{ backgroundColor: 'var(--card-bg)', borderBottom: '1px solid var(--border-color)', position: 'sticky', top: 0, zIndex: 10 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '4rem' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.25rem', color: 'var(--accent)' }}>
          <img src="/favicon.svg" alt="After the Layoff Logo" style={{ width: '28px', height: '28px' }} />
          After the Layoff
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem', fontWeight: 500 }}>
          <Link to="/" style={{ transition: 'var(--transition)' }}>Start Here</Link>
          <Link to="/resources" style={{ transition: 'var(--transition)' }}>Resources</Link>
          <Link to="/tools" style={{ transition: 'var(--transition)' }}>Tools</Link>
          <Link to="/templates" style={{ transition: 'var(--transition)' }}>Templates</Link>
          <Link to="/about" style={{ transition: 'var(--transition)' }}>About</Link>
        </div>
      </div>
    </nav>
  );
}
