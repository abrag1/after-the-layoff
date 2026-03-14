import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

export default function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback) return;
    setStatus('loading');
    
    // Simulate network submission to a backend (like Formspree or a logging API)
    setTimeout(() => {
      // In a real app we'd await fetch('/api/feedback', { method: 'POST', body: feedback })
      setStatus('success');
      setTimeout(() => {
        setIsOpen(false);
        setFeedback('');
        setStatus('idle');
      }, 3000); // close automatically after 3 seconds
    }, 800);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 50,
          backgroundColor: 'var(--accent)', color: 'white', padding: '0.75rem 1.25rem',
          borderRadius: '9999px', display: 'flex', alignItems: 'center', gap: '0.5rem',
          boxShadow: 'var(--shadow-md)', cursor: 'pointer', border: 'none', fontWeight: 500,
          transition: 'var(--transition)'
        }}
        className="btn"
      >
        <MessageSquare size={18} /> Feedback
      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 50,
      backgroundColor: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-color)', width: '300px',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Send Feedback</h3>
        <button onClick={() => setIsOpen(false)} style={{ color: 'var(--text-muted)', border: 'none', background: 'none', cursor: 'pointer' }}>
          <X size={18} />
        </button>
      </div>

      {status === 'success' ? (
        <div style={{ padding: '1rem', backgroundColor: '#ECFDF5', color: '#065F46', borderRadius: 'var(--radius-sm)', textAlign: 'center', fontSize: '0.875rem' }}>
          Got it. Thanks for helping us improve!
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <textarea 
            value={feedback} 
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="What's missing? What's broken? Let us know."
            className="input-field" 
            required
            style={{ resize: 'vertical', minHeight: '80px', fontSize: '0.875rem' }}
            disabled={status === 'loading'}
          />
          <button type="submit" className="btn btn-primary" disabled={status === 'loading' || !feedback}>
            {status === 'loading' ? 'Sending...' : 'Send Feedback'}
          </button>
        </form>
      )}
    </div>
  );
}
