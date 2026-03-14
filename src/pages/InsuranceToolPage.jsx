import React, { useState } from 'react';

const QUESTIONS = [
  { id: 'doctors', text: 'Do you want to keep your current doctors specifically?' },
  { id: 'cost', text: 'Is monthly cost your absolute biggest concern right now?' },
  { id: 'treatment', text: 'Do you currently have ongoing medical treatment?' },
  { id: 'dependents', text: 'Do you have dependents (spouse/children) to cover?' }
];

export default function InsuranceToolPage() {
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (qid, val) => {
    setAnswers(prev => ({ ...prev, [qid]: val }));
  };

  const getResult = () => {
    let cobraScore = 0;
    let acaScore = 0;

    if (answers.doctors === 'yes') cobraScore++;
    if (answers.treatment === 'yes') cobraScore += 2; // high weight
    
    if (answers.cost === 'yes') acaScore += 2;
    if (answers.dependents === 'yes' && answers.cost === 'yes') acaScore++;

    if (cobraScore > acaScore) return 'COBRA';
    if (acaScore > cobraScore) return 'Marketplace (ACA)';
    return 'Compare Both Carefully';
  };

  return (
    <div className="container section fade-in">
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
        <h1 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>COBRA vs Marketplace</h1>
        <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
          A quick assessment to help you weigh your two primary health insurance options after losing employer coverage.
        </p>

        {!showResult ? (
          <div>
            {QUESTIONS.map(q => (
              <div key={q.id} style={{ marginBottom: '1.5rem' }}>
                <p style={{ fontWeight: 500, marginBottom: '0.75rem' }}>{q.text}</p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button 
                    className={`btn ${answers[q.id] === 'yes' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => handleAnswer(q.id, 'yes')}
                  >Yes</button>
                  <button 
                    className={`btn ${answers[q.id] === 'no' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => handleAnswer(q.id, 'no')}
                  >No</button>
                </div>
              </div>
            ))}
            
            <button 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '1rem' }}
              onClick={() => setShowResult(true)}
              disabled={Object.keys(answers).length < QUESTIONS.length}
            >
              Get Guidance
            </button>
          </div>
        ) : (
          <div className="fade-in">
            <h2 style={{ marginBottom: '1rem', color: 'var(--accent)' }}>Likely Better Fit: {getResult()}</h2>
            <p style={{ marginBottom: '1.5rem' }}>
              {getResult() === 'COBRA' 
                ? "Because you prioritize keeping current doctors or have ongoing treatment, COBRA is often the safest choice to maintain continuity of care, even though it may cost more."
                : getResult() === 'Marketplace (ACA)'
                ? "Because cost is your primary concern, Marketplace plans frequently offer subsidies that make them significantly cheaper than paying full COBRA premiums."
                : "Your situation requires a careful look at both. Your need for specific doctors conflicts with the high cost of COBRA."}
            </p>

            <div style={{ backgroundColor: 'var(--bg-color)', padding: '1.5rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Practical Considerations:</h3>
              <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>You have 60 days to elect COBRA. If you elect it on day 59, it applies retroactively.</li>
                <li>Losing employer coverage triggers a 60-day Special Enrollment Period for the Marketplace.</li>
                <li>Compare the summary of benefits side-by-side: look at deductibles, not just premiums.</li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <button className="btn btn-secondary" onClick={() => { setShowResult(false); setAnswers({}); }}>Start Over</button>
              <a href="https://www.healthcare.gov/have-job-based-coverage/if-you-lose-job-based-coverage/" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ flexGrow: 1 }}>
                Compare Plans on HealthCare.gov
              </a>
            </div>
            
            <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '1.5rem 0' }} />
            
            <div style={{ backgroundColor: '#FEF3C7', color: '#B45309', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
              <strong>Disclaimer:</strong> We do not provide financial or insurance advice. This is a framework to help you perform your own research. Please consult official sources before enrolling.
            </div>

            <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Related Official Resource:</h3>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius-sm)' }}>
              <div>
                <span className="badge badge-official" style={{ marginBottom: '0.5rem' }}>Official</span>
                <p style={{ fontWeight: 500, fontSize: '0.875rem', marginBottom: '0.25rem' }}>Department of Labor COBRA Guide</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>The explicit legal rules regarding your 60-day election window and covered dependents.</p>
                <a href="https://www.dol.gov/general/topic/health-plans/cobra" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 500 }}>
                  Read Official Guidance &rarr;
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
