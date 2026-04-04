import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Technology', href: '/technology' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Contact', href: '/contact' }
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm border-b border-border' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24 md:h-28">
            <Link to="/" className="flex items-center">
              <img src="/2.png" alt="Echoes Software Technologies" className="w-[140px] sm:w-[180px] md:w-[200px] h-auto object-contain" />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.label}
                  to={link.href}
                  className={`text-sm transition-colors ${isActive(link.href) ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                to="/contact"
                className="px-3 py-1.5 bg-foreground text-background text-[10px] tracking-widest uppercase font-semibold hover:bg-primary transition-all duration-300"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-border">
            <div className="px-4 py-4 space-y-3">
              <Link 
                to="/"
                className={`block py-2 text-sm ${isActive('/') ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              {navLinks.map((link) => (
                <Link 
                  key={link.label}
                  to={link.href}
                  className={`block py-2 text-sm ${isActive(link.href) ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                to="/contact"
                className="block w-full text-center px-3 py-2 bg-foreground text-background text-[10px] tracking-widest uppercase font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-20 md:pt-24">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-12 md:py-16 bg-white text-foreground border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-12">
            <div className="col-span-2 lg:col-span-2">
              <Link to="/" className="flex items-center mb-4">
                <img src="/2.png" alt="Echoes Software Technologies" className="w-[140px] sm:w-[180px] md:w-[200px] h-auto object-contain" />
              </Link>
              <p className="text-muted-foreground text-sm max-w-sm">
                Transforming businesses through innovative technology solutions. Your partner in digital excellence.
              </p>
            </div>
            <div>
              <p className="text-[11px] tracking-widest uppercase font-semibold mb-4">Services</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/services" className="hover:text-foreground transition-colors">Custom Software</Link></li>
                <li><Link to="/services" className="hover:text-foreground transition-colors">Cloud Solutions</Link></li>
                <li><Link to="/services" className="hover:text-foreground transition-colors">Mobile Apps</Link></li>
                <li><Link to="/services" className="hover:text-foreground transition-colors">AI & Automation</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-[11px] tracking-widest uppercase font-semibold mb-4">Company</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
                <li><Link to="/technology" className="hover:text-foreground transition-colors">Technology</Link></li>
                <li><Link to="/testimonials" className="hover:text-foreground transition-colors">Testimonials</Link></li>
                <li><Link to="/exclusive-deals" className="hover:text-foreground transition-colors">Exclusive Deals</Link></li>
                <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-[11px] tracking-widest uppercase font-semibold mb-4">Contact</p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <a href="mailto:connect@echoess.in" className="hover:text-foreground transition-colors">connect@echoess.in</a>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <a href="tel:+918148549511" className="hover:text-foreground transition-colors">+91 81485 49511</a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Karur, Tamilnadu, India - 639001</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border/20 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 Echoes Software Technologies. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
              <Link to="/sitemap" className="hover:text-foreground transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-foreground text-background rounded-full shadow-lg hover:bg-primary transition-all duration-300 flex items-center justify-center"
          aria-label="Back to top"
        >
          <ArrowRight className="w-5 h-5 -rotate-90" />
        </button>
      )}
    </div>
  );
}
