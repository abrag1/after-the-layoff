import React from 'react';
import SignUpForm from './SignUpForm';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--card-bg)', borderTop: '1px solid var(--border-color)', padding: '2rem 0', marginTop: 'auto' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center' }}>
        <p style={{ fontWeight: 500 }}>After the Layoff</p>
        
        <div style={{ maxWidth: '500px', width: '100%', margin: '1rem auto' }}>
          <SignUpForm contextMessage="Join the waitlist to get notified as we add more tools and state-specific guides." />
        </div>

        <p style={{ fontSize: '0.875rem', maxWidth: '600px', margin: '1rem auto 0', color: 'var(--text-muted)' }}>
          Disclaimer: This product is designed to organize general information and help you navigate next steps. It is not legal, tax, or financial advice. We do not provide professional consulting. Please verify with official or legal sources before making complex decisions.
        </p>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          &copy; {new Date().getFullYear()} Built for practical clarity.
        </p>
      </div>
    </footer>
  );
}
