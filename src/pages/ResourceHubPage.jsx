import React, { useState } from 'react';
import { resources } from '../data/resources';
import ResourceCard from '../components/ResourceCard';
import Modal from '../components/Modal';
import SignUpForm from '../components/SignUpForm';
import { Filter, MessageSquare } from 'lucide-react';

const CATEGORIES = [
  'All',
  'First 24 Hours',
  'Unemployment',
  'Health Insurance',
  'Severance + Paperwork',
  'Job Search Restart',
  'Templates + Scripts'
];

export default function ResourceHubPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [comingSoonResource, setComingSoonResource] = useState(null);

  const filteredResources = activeCategory === 'All' 
    ? resources 
    : resources.filter(r => r.category === activeCategory);

  return (
    <div className="container section fade-in">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ marginBottom: '1rem' }}>Resource Hub</h1>
        <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
          Tested, trusted resources compiled to help you navigate your next steps without drowning in tabs.
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem', justifyContent: 'center', alignItems: 'center' }}>
        <Filter size={18} style={{ color: 'var(--text-muted)' }} />
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              border: `1px solid ${activeCategory === cat ? 'var(--accent)' : 'var(--border-color)'}`,
              backgroundColor: activeCategory === cat ? 'var(--accent)' : 'var(--card-bg)',
              color: activeCategory === cat ? 'white' : 'var(--text-main)',
              fontSize: '0.875rem',
              fontWeight: 500,
              transition: 'var(--transition)'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {filteredResources.map(resource => (
          <ResourceCard 
            key={resource.id} 
            resource={resource} 
            onComingSoon={setComingSoonResource}
          />
        ))}
      </div>
      
      {filteredResources.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
          No resources found for this category.
        </div>
      )}

      <div style={{ marginTop: '4rem', padding: '2rem', backgroundColor: 'var(--card-bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1rem' }}>Can't find what you need?</h2>
        <div style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-muted)' }}>
          <p style={{ marginBottom: '1.5rem' }}>We are constantly expanding this library. If there is a specific guide, template, or calculator you wish existed, let us know.</p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', backgroundColor: 'rgba(15, 118, 110, 0.05)', color: 'var(--accent)', borderRadius: 'var(--radius-sm)', fontWeight: 500 }}>
            Click the <MessageSquare size={16} /> <strong>Feedback</strong> button in the bottom corner to request a resource.
          </div>
        </div>
      </div>

      <Modal 
        isOpen={!!comingSoonResource} 
        onClose={() => setComingSoonResource(null)}
        title="Coming Soon"
      >
        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{comingSoonResource?.title}</h3>
          <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>
            We're expanding this section. Join the early list to be notified the moment this {comingSoonResource?.sourceBadge.toLowerCase()} resource goes live.
          </p>
          <div style={{ backgroundColor: 'var(--bg-color)', padding: '1.5rem', borderRadius: 'var(--radius-sm)', textAlign: 'left' }}>
            <SignUpForm contextMessage="" />
          </div>
        </div>
      </Modal>
    </div>
  );
}
