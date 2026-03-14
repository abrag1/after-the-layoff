import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Building, ShieldCheck, FileText, ArrowRight, CheckCircle } from 'lucide-react';
import PainPointCard from '../components/PainPointCard';
import SignUpForm from '../components/SignUpForm';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="section" style={{ textAlign: 'center', backgroundColor: '#fff', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 style={{ marginBottom: '1rem', color: 'var(--accent)' }}>You are not alone.</h1>
          <p style={{ fontSize: '1.25rem', margin: '0 auto 2rem', lineHeight: '1.6' }}>
            <a href="https://www.bls.gov/news.release/jolts.t05.htm" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Millions of people</a> have been laid off or discharged in the U.S. We are utilizing their best practices and experience to help you navigate your current situation.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2.5rem' }}>
            <button className="btn btn-primary" onClick={() => navigate('/start')}>
              Start your checklist <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/resources')}>
              Browse resources
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="var(--accent)" /> Practical tools for your initial steps on a new journey</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="var(--accent)" /> Built for the first days and weeks</div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="section" style={{ backgroundColor: 'var(--bg-color)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>What do you need help with right now?</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <PainPointCard 
              title="I got laid off today" 
              icon={Calendar} 
              onClick={() => navigate('/start')} 
            />
            <PainPointCard 
              title="I need unemployment help" 
              icon={Building} 
              onClick={() => navigate('/tools/unemployment')} 
            />
            <PainPointCard 
              title="I need health insurance guidance" 
              icon={ShieldCheck} 
              onClick={() => navigate('/tools/insurance')} 
            />
            <PainPointCard 
              title="I’m reviewing severance paperwork" 
              icon={FileText} 
              onClick={() => navigate('/tools/severance')} 
            />
          </div>
        </div>
      </section>
    </div>
  );
}
