import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNav from './components/TopNav';
import Footer from './components/Footer';
import FeedbackWidget from './components/FeedbackWidget';
import HomePage from './pages/HomePage';
import StartHerePage from './pages/StartHerePage';
import ResourceHubPage from './pages/ResourceHubPage';
import ToolsPage from './pages/ToolsPage';
import InsuranceToolPage from './pages/InsuranceToolPage';
import UnemploymentToolPage from './pages/UnemploymentToolPage';
import SeveranceToolPage from './pages/SeveranceToolPage';
import JobSearchRestartPage from './pages/JobSearchRestartPage';
import TemplatesPage from './pages/TemplatesPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <TopNav />
        <main style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/start" element={<StartHerePage />} />
            <Route path="/resources" element={<ResourceHubPage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/tools/insurance" element={<InsuranceToolPage />} />
            <Route path="/tools/unemployment" element={<UnemploymentToolPage />} />
            <Route path="/tools/severance" element={<SeveranceToolPage />} />
            <Route path="/job-search-restart" element={<JobSearchRestartPage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
        <FeedbackWidget />
      </div>
    </Router>
  );
}

export default App;
