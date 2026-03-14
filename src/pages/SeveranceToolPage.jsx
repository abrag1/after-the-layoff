import React, { useState } from 'react';
import { CheckSquare, Square, Printer, Calendar, DollarSign, FileText, Download, ChevronDown, ChevronUp } from 'lucide-react';
import useLocalStorage from '../hooks/useLocalStorage';

const CHECKLIST_SECTIONS = [
  {
    id: 'sec_a',
    title: 'A. Confirm core facts in writing',
    icon: Calendar,
    items: [
      { id: 'ca1', text: 'Confirm your official last day worked and official last day employed' },
      { id: 'ca2', text: 'Confirm whether you are on salary continuation or receiving lump-sum severance' },
      { id: 'ca3', text: 'Confirm your agreement signing deadline and who to contact with questions' },
      { id: 'ca4', text: 'Confirm the exact end date for health, dental, and vision coverage' }
    ]
  },
  {
    id: 'sec_b',
    title: 'B. Itemize what you are owed',
    icon: DollarSign,
    items: [
      { id: 'cb1', text: 'Confirm what is included in your final paycheck' },
      { id: 'cb2', text: 'Confirm your accrued PTO / vacation payout (if applicable in your state or policy)' },
      { id: 'cb3', text: 'Confirm any bonus, commission, reimbursement, or expense payout still owed' },
      { id: 'cb4', text: 'Confirm equity treatment: RSUs, vesting cutoff, options, and exercise windows' },
      { id: 'cb5', text: 'Confirm the severance payment schedule: amount, dates, and method' },
      { id: 'cb6', text: 'Ask if they are providing a COBRA subsidy or employer contribution to healthcare' }
    ]
  },
  {
    id: 'sec_c',
    title: 'C. Review the agreement carefully',
    icon: FileText,
    items: [
      { id: 'cc1', text: 'Review the "release of claims" language carefully' },
      { id: 'cc2', text: 'Review any non-disparagement, confidentiality, or non-solicit clauses' },
      { id: 'cc3', text: 'Review any non-compete or other work restriction language' },
      { id: 'cc4', text: 'Ask what HR will say for references / employment verification' },
      { id: 'cc5', text: 'Confirm whether you are marked eligible for rehire' }
    ]
  },
  {
    id: 'sec_d',
    title: 'D. Preserve records before access is gone',
    icon: Download,
    items: [
      { id: 'cd1', text: 'Save copies of paystubs, W-2 access info, and benefits documents' },
      { id: 'cd2', text: 'Save HR / payroll / benefits contact information' },
      { id: 'cd3', text: 'Save COBRA notice details or benefits administrator info' },
      { id: 'cd4', text: 'If you use an FSA, confirm whether funds must be used or forfeited' }
    ]
  }
];

export default function SeveranceToolPage() {
  const [checks, setChecks] = useLocalStorage('after-layoff-severance-checks-v2', {});
  const [isQAExpanded, setIsQAExpanded] = useState(false);

  const toggleCheck = (id) => {
    setChecks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="container section fade-in" style={{ paddingBottom: '4rem' }}>
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto', padding: '0' }}>
        
        {/* Header Area */}
        <div style={{ padding: '2rem 2rem 1.5rem 2rem', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div>
              <h1 style={{ marginBottom: '0.5rem', fontSize: '1.75rem' }}>Review your severance and final pay</h1>
              <p style={{ color: 'var(--text-muted)' }}>
                A structured checklist to ensure you don't miss money, benefits, or important restrictions.
              </p>
            </div>
            <button onClick={() => window.print()} className="btn btn-secondary no-print" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Printer size={16} /> Save / Print
            </button>
          </div>

          <div className="no-print" style={{ backgroundColor: '#FEF2F2', borderLeft: '4px solid #DC2626', padding: '1rem', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', color: '#991B1B', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Pause before signing
            </h3>
            <p style={{ color: '#7F1D1D', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              Take time to confirm your dates, pay details, benefits timing, and agreement terms in writing. Many people rush this step and miss important details.
            </p>
            <p style={{ color: '#7F1D1D', fontSize: '0.875rem' }}>
              <em>If you’re 40+ or the agreement contains unusual restrictions, consider getting professional review before signing.</em>
            </p>
          </div>

          <div className="no-print" style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
            <button 
              onClick={() => setIsQAExpanded(!isQAExpanded)}
              style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: 'var(--bg-color)', fontWeight: 600, color: 'var(--text-main)' }}
            >
              Most important questions to ask HR
              {isQAExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {isQAExpanded && (
              <div style={{ padding: '1rem', backgroundColor: 'white' }}>
                <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-main)', fontSize: '0.875rem' }}>
                  <li>What is my official last day worked and my official last day employed?</li>
                  <li>Am I on payroll continuation or is this severance separate from final pay?</li>
                  <li>When do my health benefits actually end?</li>
                  <li>What exactly will be paid out, and on what dates?</li>
                  <li>What am I agreeing to by signing this document?</li>
                  <li>What will you confirm to future employers about my departure?</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Print-only Header */}
        <div style={{ display: 'none' }} className="print-only">
          <div style={{ padding: '2rem 2rem 0 2rem', marginBottom: '1rem' }}>
            <h2>Severance & Final Pay Review Sheet</h2>
            <p style={{ color: '#666', fontSize: '0.875rem' }}>Generated on: {today}</p>
            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', gap: '2rem' }}>
              <div style={{ flex: 1, borderBottom: '1px solid #ccc', paddingBottom: '0.25rem' }}><strong>Employee:</strong> </div>
              <div style={{ flex: 1, borderBottom: '1px solid #ccc', paddingBottom: '0.25rem' }}><strong>Company HR Rep:</strong> </div>
            </div>
          </div>
        </div>

        {/* Checklist Content */}
        <div style={{ padding: '2rem' }}>
          {CHECKLIST_SECTIONS.map((section, index) => {
            const Icon = section.icon;
            return (
              <div key={section.id} style={{ marginBottom: index === CHECKLIST_SECTIONS.length - 1 ? '0' : '2.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)' }}>
                  <Icon size={20} /> {section.title}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {section.items.map(item => (
                    <div 
                      key={item.id} 
                      onClick={() => toggleCheck(item.id)}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'flex-start', 
                        gap: '1rem', 
                        padding: '1rem',
                        backgroundColor: checks[item.id] ? 'var(--bg-color)' : 'white',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        transition: 'var(--transition)'
                      }}
                    >
                      <div className="no-print" style={{ color: checks[item.id] ? 'var(--accent)' : 'var(--border-color)', marginTop: '2px' }}>
                        {checks[item.id] ? <CheckSquare size={20} /> : <Square size={20} />}
                      </div>
                      
                      {/* Print-only checkbox square */}
                      <div className="print-only" style={{ display: 'none', width: '20px', height: '20px', border: '2px solid #ccc', marginTop: '2px' }}></div>

                      <span style={{ 
                        flexGrow: 1, 
                        fontSize: '0.95rem',
                        lineHeight: '1.4',
                        textDecoration: checks[item.id] ? 'line-through' : 'none',
                        color: checks[item.id] ? 'var(--text-muted)' : 'var(--text-main)'
                      }}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Print-only Notes Section */}
          <div style={{ display: 'none', marginTop: '3rem' }} className="print-only">
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--accent)' }}>Notes / Follow-up Questions</h2>
            <div style={{ border: '1px solid #ccc', height: '150px', borderRadius: '4px' }}></div>
          </div>
        </div>

      </div>

      {/* Disclaimers & Official Resources (No Print) */}
      <div className="no-print" style={{ maxWidth: '800px', margin: '2rem auto 0 auto' }}>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem', textAlign: 'center' }}>
          <strong>General guidance only.</strong> Rules vary by state, employer policy, age, and agreement language. If you have concerns about what you’re being asked to sign, consult an employment attorney or official state/federal source.
        </p>

        <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Official Resources</h3>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyle: 'none', padding: 0 }}>
          <li>
            <a href="https://www.dol.gov/general/topic/wages/lastpaycheck" target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '1rem', backgroundColor: 'var(--card-bg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.875rem', fontWeight: 500 }}>
              U.S. Department of Labor: Final Paycheck Rules &rarr;
            </a>
          </li>
          <li>
            <a href="https://www.dol.gov/agencies/ebsa/laws-and-regulations/laws/cobra" target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '1rem', backgroundColor: 'var(--card-bg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.875rem', fontWeight: 500 }}>
              U.S. Department of Labor: COBRA Continuation Coverage &rarr;
            </a>
          </li>
          <li>
            <a href="https://www.healthcare.gov/have-job-based-coverage/if-you-lose-job-based-coverage/" target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '1rem', backgroundColor: 'var(--card-bg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.875rem', fontWeight: 500 }}>
              HealthCare.gov: Losing job-based coverage &rarr;
            </a>
          </li>
          <li>
            <a href="https://www.eeoc.gov/laws/guidance/qa-understanding-waivers-discrimination-claims-employee-severance-agreements" target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '1rem', backgroundColor: 'var(--card-bg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.875rem', fontWeight: 500 }}>
              EEOC: Understanding Waivers in Severance Agreements &rarr;
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
