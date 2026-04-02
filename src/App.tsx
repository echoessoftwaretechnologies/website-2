import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

import SitemapPage from './pages/SitemapPage';

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
