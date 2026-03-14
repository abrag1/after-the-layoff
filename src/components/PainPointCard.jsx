import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function PainPointCard({ title, icon: Icon, onClick }) {
  return (
    <div 
      className="card fade-in" 
      onClick={onClick}
      style={{ 
        cursor: 'pointer',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-start',
        borderLeft: '4px solid var(--accent)'
      }}
    >
      <div style={{ padding: '0.5rem', backgroundColor: 'rgba(15, 118, 110, 0.1)', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', color: 'var(--accent)' }}>
        <Icon size={24} />
      </div>
      <h3 style={{ fontSize: '1.125rem', marginBottom: '1.5rem', flexGrow: 1 }}>{title}</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', fontWeight: 500, fontSize: '0.875rem' }}>
        View Guidance <ArrowRight size={16} />
      </div>
    </div>
  );
}
