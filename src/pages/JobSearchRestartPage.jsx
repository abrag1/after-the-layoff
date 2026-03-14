import React, { useState } from 'react';
import Modal from '../components/Modal';
import PainPointCard from '../components/PainPointCard';
import { FileDown, Linkedin, Users, CalendarDays, CheckCircle } from 'lucide-react';

const RESTART_GUIDES = [
  {
    id: 'resume',
    title: 'Resume reset',
    icon: FileDown,
    detail: 'A guide to adding your most recent role without overthinking the formatting.',
    bullets: [
      'Stop trying to make it perfect; aim for "good enough to send".',
      'Add your most recent role. Focus on 3-5 bullet points driven by metrics.',
      'Remove outdated jobs from 10+ years ago unless highly relevant.',
      'Ensure it is exported as a clean PDF.'
    ],
    checklistTitle: 'The 2-Hour Rule',
    checklistItem: 'Give yourself exactly 2 hours to update it, then start sending it. Iteration happens later.'
  },
  {
    id: 'linkedin',
    title: 'LinkedIn refresh',
    icon: Linkedin,
    detail: 'A quick checklist to update your digital footprint.',
    bullets: [
      'Turn on "Open to Work" (recruiters only or public, your choice).',
      'Update your headline to reflect the roles you are targeting.',
      'Add an end date to your last position.',
      'Write a short, professional post announcing your transition.'
    ],
    checklistTitle: 'Algorithmic Boost',
    checklistItem: 'Engage with 5 posts in your industry to wake up your feed visibility.'
  },
  {
    id: 'outreach',
    title: 'Recruiter outreach',
    icon: Users,
    detail: 'How to bypass the application black hole.',
    bullets: [
      'Find the internal recruiter for the role on LinkedIn.',
      'Send a short connection request (under 300 characters).',
      'Do not send your resume in the first message unless asked.',
      'Focus on proving you meet the core requirements.'
    ],
    checklistTitle: 'Daily Goal',
    checklistItem: 'Send 2 targeted cold messages to recruiters or hiring managers every day.'
  },
  {
    id: 'structure',
    title: 'Weekly search structure',
    icon: CalendarDays,
    detail: 'A simple schedule to keep you focused without burning out.',
    bullets: [
      'Treat the search like a job, but not a 60-hour-a-week job.',
      'Timebox your application sending to mornings.',
      'Use afternoons for networking, upskilling, or informational interviews.',
      'Log completely off on weekends. Rest is productive.'
    ],
    checklistTitle: 'Golden Rule',
    checklistItem: 'Track everything in a simple spreadsheet so you don\'t lose context.'
  }
];

export default function JobSearchRestartPage() {
  const [selectedGuide, setSelectedGuide] = useState(null);

  return (
    <div className="container section fade-in">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ marginBottom: '1rem' }}>Job Search Restart</h1>
        <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
          Not getting any traction? Use these lightweight guides to reset your strategy.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {RESTART_GUIDES.map(guide => (
          <PainPointCard 
            key={guide.id}
            title={guide.title} 
            icon={guide.icon} 
            onClick={() => setSelectedGuide(guide)} 
          />
        ))}
      </div>

      <Modal 
        isOpen={!!selectedGuide} 
        onClose={() => setSelectedGuide(null)} 
        title={selectedGuide?.title}
      >
        {selectedGuide && (
          <div>
            <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>{selectedGuide.detail}</p>
            
            <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Practical Steps:</h3>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-muted)' }}>
              {selectedGuide.bullets.map((bullet, idx) => (
                 <li key={idx}>{bullet}</li>
              ))}
            </ul>

            <div style={{ backgroundColor: 'rgba(15, 118, 110, 0.05)', border: '1px solid rgba(15, 118, 110, 0.2)', padding: '1.5rem', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--accent)', fontWeight: 600 }}>
                <CheckCircle size={20} />
                {selectedGuide.checklistTitle}
              </div>
              <p style={{ color: 'var(--text-main)', fontSize: '0.875rem' }}>{selectedGuide.checklistItem}</p>
            </div>
            
            <button className="btn btn-secondary" style={{ width: '100%', marginTop: '2rem' }} onClick={() => setSelectedGuide(null)}>
              Close Guide
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
