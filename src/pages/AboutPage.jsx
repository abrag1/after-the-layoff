import React from 'react';

export default function AboutPage() {
  return (
    <div className="container section fade-in">
      <div className="card" style={{ maxWidth: '700px', margin: '0 auto', padding: '3rem 2rem' }}>
        <h1 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>About This Guide</h1>
        
        <div style={{ fontSize: '1.125rem', marginBottom: '2rem', color: 'var(--text-muted)' }}>
          <p style={{ marginBottom: '1rem' }}>
            <strong>After the Layoff</strong> helps recently laid-off people find practical next steps and trusted resources in one place.
          </p>
          <p>
            When you lose your job, the last thing you need is a massive library of generic articles or a social feed full of motivational fluff. You need clarity. This app is designed to help you move from anxiety paralysis to strategy-induced action, reducing panic and saving time.
          </p>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '2rem 0' }} />

        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Resource Source Labels Explained</h2>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem', padding: 0, listStyle: 'none' }}>
          <li>
            <span className="badge badge-official" style={{ marginBottom: '0.25rem' }}>Official</span>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Government portals (.gov variants) or direct state labor authorities. Highly reliable.</p>
          </li>
          <li>
            <span className="badge badge-trusted" style={{ marginBottom: '0.25rem' }}>Trusted</span>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Vetted organizations, recognized financial institutions, or highly regarded expert publications.</p>
          </li>
          <li>
            <span className="badge badge-community" style={{ marginBottom: '0.25rem' }}>Community</span>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Crowdsourced advice, templates from former recruiters, or commonly accepted industry tactics.</p>
          </li>
        </ul>

        <div style={{ backgroundColor: 'var(--bg-color)', padding: '1.5rem', borderRadius: 'var(--radius-sm)' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Disclaimer</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            This app is not a substitute for professional counsel. We do not provide legal, tax, or financial advice. We organize information for your convenience. Please consult an employment lawyer or financial advisor before signing legally binding documents or making irrevocable financial choices regarding severance, retirement accounts, or health insurance.
          </p>
        </div>
      </div>
    </div>
  );
}
