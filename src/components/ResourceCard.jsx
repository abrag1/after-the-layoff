import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

export default function ResourceCard({ resource, onComingSoon }) {
  const navigate = useNavigate();
  const badgeClass = `badge badge-${resource.sourceBadge.toLowerCase()}`;
  
  return (
    <div className="card fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <button 
          onClick={() => navigate('/about')}
          style={{ cursor: 'pointer', border: 'none', padding: 0, outline: 'none', background: 'none' }}
          title="Learn what this means"
          className="fade-in"
        >
          <span className={badgeClass}>{resource.sourceBadge}</span>
        </button>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500, padding: '0.25rem 0.5rem', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius-sm)' }}>
          {resource.category}
        </span>
      </div>
      
      <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>{resource.title}</h3>
      <p style={{ fontSize: '0.875rem', marginBottom: '1rem', flexGrow: 1 }}>{resource.summary}</p>
      
      <div style={{ fontSize: '0.875rem', marginBottom: '1.5rem', padding: '0.75rem', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius-sm)' }}>
        <p style={{ marginBottom: '0.5rem' }}><strong>Why use this:</strong> {resource.whyUseThis}</p>
        <p><strong>Best for:</strong> {resource.bestFor}</p>
      </div>

      {resource.isComingSoon ? (
        <button 
          onClick={() => onComingSoon(resource)} 
          className="btn" 
          style={{ width: '100%', backgroundColor: 'var(--bg-color)', color: 'var(--text-muted)' }}
        >
          Coming soon
        </button>
      ) : resource.isInternal ? (
        <button 
          onClick={() => navigate(resource.url)} 
          className="btn btn-secondary" 
          style={{ width: '100%' }}
        >
          Go to Tool
        </button>
      ) : (
        <a 
          href={resource.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-secondary" 
          style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}
        >
          Visit Resource <ExternalLink size={16} />
        </a>
      )}
    </div>
  );
}
