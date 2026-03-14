import React, { useState } from 'react';
import { templates } from '../data/templates';
import Modal from '../components/Modal';
import { Copy, RotateCcw } from 'lucide-react';

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [editText, setEditText] = useState('');
  const [copied, setCopied] = useState(false);

  const openModal = (template) => {
    setSelectedTemplate(template);
    setEditText(template.content);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(editText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const resetText = () => {
    setEditText(selectedTemplate.content);
    setCopied(false);
  };

  return (
    <div className="container section fade-in">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ marginBottom: '1rem' }}>Templates & Scripts</h1>
        <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
          Copy, edit, and send these tested scripts instead of staring at a blank page.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {templates.map(tmp => (
          <div key={tmp.id} className="card fade-in" style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>{tmp.title}</h3>
            <p style={{ fontSize: '0.875rem', marginBottom: '1.5rem', flexGrow: 1, color: 'var(--text-muted)' }}>{tmp.description}</p>
            <button className="btn btn-secondary" style={{ width: '100%' }} onClick={() => openModal(tmp)}>
              Use Template
            </button>
          </div>
        ))}
      </div>

      <Modal 
        isOpen={!!selectedTemplate} 
        onClose={() => setSelectedTemplate(null)} 
        title={selectedTemplate?.title}
      >
        {selectedTemplate && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <p style={{ marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              Edit the text below, then click copy.
            </p>
            
            <textarea 
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              style={{
                width: '100%',
                minHeight: '250px',
                padding: '1rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                fontFamily: 'inherit',
                fontSize: '0.875rem',
                resize: 'vertical',
                marginBottom: '1rem',
                lineHeight: 1.5,
                backgroundColor: 'var(--bg-color)'
              }}
            />

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={resetText} style={{ gap: '0.5rem' }}>
                <RotateCcw size={16} /> Reset
              </button>
              <button 
                className="btn btn-primary" 
                onClick={copyToClipboard}
                style={{ gap: '0.5rem', minWidth: '120px' }}
              >
                {copied ? 'Copied!' : <><Copy size={16} /> Copy to Clipboard</>}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
