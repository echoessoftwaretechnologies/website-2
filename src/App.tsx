import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import TechnologyPage from './pages/TechnologyPage';
import TestimonialsPage from './pages/TestimonialsPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import AcceptanceModal from './components/AcceptanceModal';
import LoginPage from './pages/LoginPage';

import SitemapPage from './pages/SitemapPage';
import OverviewPage from './pages/workspace/overview/OverviewPage';
import ProjectsPage from './pages/workspace/projects/ProjectsPage';
import TeamPage from './pages/workspace/team/TeamPage';
import MessagesPage from '@/pages/workspace/messages/MessagesPage';
import CalendarPage from './pages/workspace/calendar/CalendarPage';
import SettingsPage from './pages/workspace/settings/SettingsPage';
import InvoicePage from './pages/workspace/invoice/InvoicePage';

// Protected Route wrapper component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem('workspace_auth') === 'true';
  const location = useLocation();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
}

function AppContent() {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const acceptance = localStorage.getItem('echoes_acceptance');
    if (acceptance !== 'accepted') {
      setShowModal(true);
    }
  }, []);

  const handleAccept = () => {
    setShowModal(false);
  };

  const handleReject = () => {
    window.location.href = 'https://www.google.com';
  };

  const isPolicyPage = location.pathname === '/privacy' || location.pathname === '/terms';

  return (
    <>
      {showModal && !isPolicyPage && (
        <AcceptanceModal onAccept={handleAccept} onReject={handleReject} />
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/technology" element={<TechnologyPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/sitemap" element={<SitemapPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Workspace Routes */}
        <Route path="/workspace" element={<ProtectedRoute><OverviewPage /></ProtectedRoute>} />
        <Route path="/workspace/projects" element={<ProtectedRoute><ProjectsPage /></ProtectedRoute>} />
        <Route path="/workspace/team" element={<ProtectedRoute><TeamPage /></ProtectedRoute>} />
        <Route path="/workspace/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
        <Route path="/workspace/calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />
        <Route path="/workspace/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="/workspace/invoice" element={<ProtectedRoute><InvoicePage /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
