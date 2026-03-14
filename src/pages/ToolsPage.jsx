import React from 'react';
import { useNavigate } from 'react-router-dom';
import PainPointCard from '../components/PainPointCard';
import { Building, ShieldCheck, FileText } from 'lucide-react';

export default function ToolsPage() {
  const navigate = useNavigate();

  return (
    <div className="container section fade-in">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ marginBottom: '1rem' }}>Practical Tools</h1>
        <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
          Lightweight decision assistants and checklists to help you navigate your biggest immediate choices.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
        <PainPointCard 
          title="Unemployment Timing Assistant" 
          icon={Building} 
          onClick={() => navigate('/tools/unemployment')} 
        />
        <PainPointCard 
          title="Health Insurance Decision Tool" 
          icon={ShieldCheck} 
          onClick={() => navigate('/tools/insurance')} 
        />
        <PainPointCard 
          title="Severance Review Checklist" 
          icon={FileText} 
          onClick={() => navigate('/tools/severance')} 
        />
      </div>
    </div>
  );
}
