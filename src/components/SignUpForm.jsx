import React, { useState } from 'react';
import { submitEmailSignup } from '../services/api';

export default function SignUpForm({ layout = 'vertical', contextMessage = "Get updates as we add more tools and resources." }) {
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('all');
  const [status, setStatus] = useState('idle'); // idle, loading, success
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    // Simulate API call
    const result = await submitEmailSignup(email, topic);
    
    setStatus('success');
    setMessage(result.message);
    setEmail('');
  };

  if (status === 'success') {
    return (
      <div style={{ 
        padding: '1.5rem', 
        backgroundColor: '#ECFDF5', 
        border: '1px solid #A7F3D0',
        borderRadius: 'var(--radius-sm)',
        color: '#065F46',
        textAlign: 'center'
      }}>
        <p style={{ fontWeight: 500 }}>{message}</p>
      </div>
    );
  }

  const isHorizontalRow = layout === 'horizontal';

  return (
    <div style={{ width: '100%' }}>
      {contextMessage && (
        <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          {contextMessage}
        </p>
      )}
      
      <form 
        onSubmit={handleSubmit} 
        style={{ 
          display: 'flex', 
          flexDirection: isHorizontalRow ? 'row' : 'column', 
          gap: '0.75rem',
          alignItems: isHorizontalRow ? 'center' : 'stretch',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ flexGrow: 1, minWidth: '200px' }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="input-field"
            required
            disabled={status === 'loading'}
            style={{ padding: '0.625rem 1rem' }}
          />
        </div>

        <div style={{ flexGrow: isHorizontalRow ? 0 : 1, minWidth: '150px' }}>
          <select 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="input-field"
            disabled={status === 'loading'}
            style={{ padding: '0.625rem 1rem' }}
          >
            <option value="all">All updates</option>
            <option value="unemployment">Unemployment info</option>
            <option value="insurance">Health insurance</option>
            <option value="severance">Severance review</option>
            <option value="job_search">Job search tools</option>
          </select>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={status === 'loading' || !email}
          style={{ whiteSpace: 'nowrap', padding: '0.625rem 1.5rem', opacity: status === 'loading' ? 0.7 : 1 }}
        >
          {status === 'loading' ? 'Joining...' : 'Join early list'}
        </button>
      </form>
      <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        No spam, ever. We are building this with users in real-time.
      </p>
    </div>
  );
}
