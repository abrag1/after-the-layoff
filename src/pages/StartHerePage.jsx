import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import SignUpForm from '../components/SignUpForm';
import { CheckCircle, Circle, ArrowRight, ArrowLeft, Printer } from 'lucide-react';
import { US_STATES } from '../data/constants';

const QUESTIONS = [
  { id: 'country', question: 'What country are you in?', type: 'select', options: ['United States'] },
  { id: 'state', question: 'What state are you in?', type: 'select', options: US_STATES },
  { id: 'when', question: 'When were you laid off?', type: 'radio', options: ['Today', 'This week', 'Earlier'] },
  { id: 'pay', question: 'Are you still receiving pay or severance?', type: 'radio', options: ['Yes', 'No', 'Not sure'] },
  { id: 'insurance', question: 'Do you need health insurance soon?', type: 'radio', options: ['Yes', 'No'] },
  { id: 'dependents', question: 'Do you have dependents on your health plan?', type: 'radio', options: ['Yes', 'No'] },
  { id: 'job_search', question: 'Do you want job search help now?', type: 'radio', options: ['Yes', 'No'] }
];

export default function StartHerePage() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useLocalStorage('after-layoff-answers', {});
  const [completedFlow, setCompletedFlow] = useLocalStorage('after-layoff-completed', false);
  const [checklist, setChecklist] = useLocalStorage('after-layoff-checklist', {});

  const [currentStep, setCurrentStep] = useState(-1); // -1 is the intro screen

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const nextStep = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setCompletedFlow(true);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const toggleCheck = (taskId) => {
    setChecklist(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const generateActionPlan = () => {
    // Basic logic to generate tasks based on answers
    const plan = { today: [], thisWeek: [], next: [] };

    plan.today.push({
      id: 't1', title: 'Pause and breathe',
      explain: 'Don\'t make any huge financial or career decisions in the first 24 hours.',
      why: 'Panic leads to poor choices. You have more time than you think.',
      link: null
    });

    if (answers.when === 'Today' || answers.when === 'This week') {
      plan.today.push({
        id: 't2', title: 'Review your severance and final pay',
        explain: 'Confirm your official dates, what you’re owed, when it will be paid, and what you’d be giving up before signing anything.',
        why: 'The biggest mistakes happen when people sign too fast, misunderstand benefits timing, or miss payout details.',
        link: '/tools/severance'
      });
    }

    if (answers.pay === 'No' || answers.pay === 'Not sure') {
      plan.thisWeek.push({
        id: 'w1', title: 'File for unemployment',
        explain: 'Apply via your state’s official portal as soon as your employment officially ends.',
        why: 'It takes weeks for the first check to arrive. Apply early.',
        link: '/tools/unemployment'
      });
    }

    if (answers.insurance === 'Yes') {
      plan.thisWeek.push({
        id: 'w2', title: 'Evaluate COBRA vs Marketplace',
        explain: `You have 60 days to decide on COBRA. Compare it against ACA plans ${answers.dependents === 'Yes' ? 'for your whole family' : ''}.`,
        why: 'COBRA is often expensive. Marketplace plans might offer better subsidies.',
        link: '/tools/insurance'
      });
    }

    if (answers.job_search === 'Yes') {
      plan.next.push({
        id: 'n1', title: 'Update your LinkedIn and Resume',
        explain: 'Do a fast refresh of your recent role and turn on "Open to Work".',
        why: 'Recruiters are actively searching for newly available talent.',
        link: '/resources'
      });
    }

    plan.next.push({
      id: 'n2', title: 'Draft a simple budget',
      explain: 'Calculate your monthly burn rate and cut non-essentials.',
      why: 'Knowing your financial runway reduces anxiety drastically.',
      link: '/resources'
    });

    return plan;
  };

  const resetFlow = () => {
    setAnswers({});
    setCompletedFlow(false);
    setChecklist({});
    setCurrentStep(0);
  };

  if (completedFlow) {
    const plan = generateActionPlan();
    
    const renderTaskList = (tasks) => (
      tasks.map(task => (
        <div key={task.id} className="card fade-in" style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'flex-start' }}>
          <button onClick={() => toggleCheck(task.id)} style={{ color: checklist[task.id] ? 'var(--accent)' : 'var(--border-color)', marginTop: '0.25rem' }}>
            {checklist[task.id] ? <CheckCircle size={24} /> : <Circle size={24} />}
          </button>
          <div style={{ flexGrow: 1, opacity: checklist[task.id] ? 0.6 : 1, transition: 'var(--transition)' }}>
            <h4 style={{ fontSize: '1.125rem', marginBottom: '0.25rem', textDecoration: checklist[task.id] ? 'line-through' : 'none' }}>{task.title}</h4>
            <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>{task.explain}</p>
            {task.why && <p style={{ fontSize: '0.75rem', color: 'var(--accent)', marginBottom: '0.5rem', fontWeight: 500 }}>Why this matters: {task.why}</p>}
            {task.link && (
              <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', marginTop: '0.5rem' }} onClick={() => navigate(task.link)}>
                Go to step <ArrowRight size={14} style={{ marginLeft: '0.5rem' }} />
              </button>
            )}
          </div>
        </div>
      ))
    );

    return (
      <div className="container section fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2>Your Action Plan</h2>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={() => window.print()} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Printer size={16} /> Save / Print
            </button>
            <button onClick={resetFlow} className="btn" style={{ color: 'var(--text-muted)' }}>Start Over</button>
          </div>
        </div>
        
        <h3 style={{ marginBottom: '1rem', color: 'var(--accent)' }}>Today</h3>
        {renderTaskList(plan.today)}

        <h3 style={{ marginBottom: '1rem', marginTop: '2.5rem', color: 'var(--accent)' }}>This Week</h3>
        {renderTaskList(plan.thisWeek)}

        <h3 style={{ marginBottom: '1rem', marginTop: '2.5rem', color: 'var(--accent)' }}>Next</h3>
        {renderTaskList(plan.next)}

        <div style={{ marginTop: '4rem', padding: '2rem', backgroundColor: 'var(--card-bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <SignUpForm contextMessage="Want updates as we add more state-specific guidance and templates?" />
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === -1) {
    return (
      <div className="container section flex fade-in" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="card" style={{ width: '100%', maxWidth: '600px', padding: '3rem 2rem', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1rem' }}>Let's build your plan.</h2>
          <p style={{ marginBottom: '2rem', color: 'var(--text-muted)', fontSize: '1.125rem' }}>
            Answer 7 quick questions to get a personalized checklist of exactly what to do first. Let's reduce the noise.
          </p>
          <div style={{ padding: '1rem', backgroundColor: 'rgba(15, 118, 110, 0.05)', borderRadius: 'var(--radius-sm)', marginBottom: '2rem', color: 'var(--accent)', fontWeight: 500 }}>
            This takes under a minute.
          </div>
          <button className="btn btn-primary" style={{ width: '100%', fontSize: '1.125rem' }} onClick={nextStep}>
            Begin Questionnaire
          </button>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[currentStep];
  const progressPercent = Math.round(((currentStep) / QUESTIONS.length) * 100);

  return (
    <div className="container section flex fade-in" style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="card" style={{ width: '100%', maxWidth: '600px', padding: '2rem' }}>
        
        {/* Progress Bar Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            <span>Question {currentStep + 1} of {QUESTIONS.length}</span>
            <span>{progressPercent}%</span>
          </div>
          <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${progressPercent}%`, height: '100%', backgroundColor: 'var(--accent)', transition: 'width 0.3s ease' }} />
          </div>
        </div>
        
        <h2 style={{ marginBottom: '2rem' }}>{q.question}</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
          {q.type === 'select' ? (
            <select 
              className="input-field"
              value={answers[q.id] || ''}
              onChange={(e) => handleAnswer(q.id, e.target.value)}
            >
              <option value="" disabled>Select an option</option>
              {q.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          ) : (
            q.options.map(opt => (
              <label 
                key={opt} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem', 
                  padding: '1rem', 
                  border: `1px solid ${answers[q.id] === opt ? 'var(--accent)' : 'var(--border-color)'}`,
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  backgroundColor: answers[q.id] === opt ? 'rgba(15, 118, 110, 0.05)' : 'white',
                  transition: 'var(--transition)'
                }}
              >
                <input 
                  type="radio" 
                  name={q.id} 
                  value={opt} 
                  checked={answers[q.id] === opt}
                  onChange={() => handleAnswer(q.id, opt)}
                  style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--accent)' }}
                />
                <span style={{ fontWeight: 500 }}>{opt}</span>
              </label>
            ))
          )}
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            className="btn btn-secondary" 
            onClick={prevStep}
            style={{ padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label="Go Back"
          >
            <ArrowLeft size={20} />
          </button>
          
          <button 
            className="btn btn-primary" 
            style={{ flexGrow: 1 }}
            onClick={nextStep}
            disabled={!answers[q.id]}
          >
            {currentStep === QUESTIONS.length - 1 ? 'Build My Plan' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
