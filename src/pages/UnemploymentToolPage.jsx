import React, { useState } from 'react';
import { US_STATES } from '../data/constants';

export default function UnemploymentToolPage() {
  const [state, setState] = useState('');
  const [payType, setPayType] = useState('');
  const [stoppedWorking, setStoppedWorking] = useState('');
  const [showResult, setShowResult] = useState(false);

  const getGuidance = () => {
    if (stoppedWorking === 'no') {
      return "You generally cannot file until your employment has officially ended and you have stopped working.";
    }
    if (payType === 'salary-continuation') {
      return "If you are on 'salary continuation' (still on payroll), most states will not let you collect unemployment until those payments stop. However, rules vary strongly by state.";
    }
    if (payType === 'lump-sum') {
      return "If you received a lump-sum severance, you can often apply immediately after your official last day, though your first checks might be delayed by the severance amount. Apply right away to get the clock started.";
    }
    return "Once your official last day has passed, you should apply for unemployment immediately. It takes weeks to process, so don't delay.";
  };

  return (
    <div className="container section fade-in">
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
        <h1 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>When should I file for unemployment?</h1>
        <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
          A quick check to help you understand state unemployment timing norms. Timing it right prevents denied claims and delayed payouts.
        </p>

        {!showResult ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label className="input-label">What state are you in?</label>
              <select className="input-field" value={state} onChange={e => setState(e.target.value)}>
                <option value="">Select state...</option>
                {US_STATES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="input-label">Have you officially stopped working?</label>
              <select className="input-field" value={stoppedWorking} onChange={e => setStoppedWorking(e.target.value)}>
                <option value="">Select...</option>
                <option value="yes">Yes, my last day passed</option>
                <option value="no">No, I am finishing out my notice period (still on payroll)</option>
              </select>
            </div>

            <div>
              <label className="input-label">Are you getting severance?</label>
              <select className="input-field" value={payType} onChange={e => setPayType(e.target.value)}>
                <option value="">Select...</option>
                <option value="lump-sum">Lump-sum payment</option>
                <option value="salary-continuation">Salary continuation (still on standard payroll)</option>
                <option value="none">No severance</option>
                <option value="unsure">Unsure</option>
              </select>
            </div>

            <button 
              className="btn btn-primary" 
              style={{ marginTop: '1rem' }}
              disabled={!state || !stoppedWorking || !payType}
              onClick={() => setShowResult(true)}
            >
              Get Guidance Summary
            </button>
          </div>
        ) : (
          <div className="fade-in">
            <h2 style={{ marginBottom: '1rem', color: 'var(--accent)' }}>Guidance Summary</h2>
            <p style={{ marginBottom: '1.5rem', fontSize: '1.125rem' }}>{getGuidance()}</p>
            
            <div style={{ backgroundColor: '#FEF3C7', color: '#B45309', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
              <strong>Disclaimer:</strong> State rules vary wildly. This is general guidance to help you ask the right questions. Your state's Department of Labor is the final authority.
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <button className="btn btn-secondary" onClick={() => setShowResult(false)}>Start Over</button>
              <a 
                href="https://www.careeronestop.org/LocalHelp/UnemploymentBenefits/find-unemployment-benefits.aspx" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
                style={{ flexGrow: 1 }}
              >
                Find Official {state || 'State'} Portal
              </a>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', marginBottom: '1.5rem' }} />
            
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Related Official Resource:</h3>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius-sm)' }}>
              <div>
                <span className="badge badge-official" style={{ marginBottom: '0.5rem' }}>Official</span>
                <p style={{ fontWeight: 500, fontSize: '0.875rem', marginBottom: '0.25rem' }}>CareerOneStop UI Finder</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>The U.S. Dept of Labor's official directory compiling the correct direct links to every state's unemployment filing website.</p>
                <a href="https://www.careeronestop.org/LocalHelp/UnemploymentBenefits/find-unemployment-benefits.aspx" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 500 }}>
                  View Resource &rarr;
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
