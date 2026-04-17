import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import PageHero from '../components/PageHero';

const mainLinks = [
  { label: "Home", path: "/", desc: "Welcome to Echoes" },
  { label: "Services", path: "/services", desc: "Our Solutions" },
  { label: "About Us", path: "/about", desc: "Who We Are" },
  { label: "Technology", path: "/technology", desc: "Tech Stack" },
  { label: "Testimonials", path: "/testimonials", desc: "Client Stories" },
  { label: "Exclusive Deals", path: "/exclusive-deals", desc: "Special Pricing" },
  { label: "Careers", path: "/careers", desc: "View Openings" },
  { label: "Contact", path: "/contact", desc: "Get in Touch" }
];

const serviceLinks = [
  { label: "Custom Software", path: "/services" },
  { label: "Cloud Solutions", path: "/services" },
  { label: "Mobile Apps", path: "/services" },
  { label: "AI & Automation", path: "/services" },
  { label: "Cybersecurity", path: "/services" },
  { label: "Data Analytics", path: "/services" },
  { label: "Digital Marketing", path: "/services" },
  { label: "Blockchain", path: "/services" },
  { label: "Graphics Design", path: "/services" },
  { label: "UI/UX Design", path: "/services" }
];

const legalLinks = [
  { label: "Privacy Policy", path: "/privacy" },
  { label: "Terms of Service", path: "/terms" },
  { label: "Exclusive Deals", path: "/exclusive-deals" },
  { label: "Sitemap", path: "/sitemap" }
];

export default function SitemapPage() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24 md:h-28">
            <Link to="/" className="flex items-center">
              <img src="/2.png" alt="Echoes Software Technologies" className="w-[140px] sm:w-[180px] md:w-[200px] h-auto object-contain" />
            </Link>
            <Link 
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-20 md:pt-24">
        <PageHero
          label="Site Directory"
          title="Navigate Our"
          highlight="Digital Ecosystem"
          description="Discover all pages, services, and resources available on our platform. Quickly find what you're looking for or explore our comprehensive offerings."
          backgroundImage="/hero-background/16.png"
        />
      </div>

      {/* Main Navigation Cards */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <h2 className="text-xl font-display font-medium text-blue-600">Primary Navigation</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {mainLinks.map((link, i) => (
              <Link
                key={i}
                to={link.path}
                className="group p-6 bg-muted rounded-lg hover:bg-foreground hover:text-background transition-all duration-300"
              >
                <p className="font-medium text-sm mb-1">{link.label}</p>
                <p className="text-xs text-muted-foreground group-hover:text-background/70">{link.desc}</p>
                <ArrowRight className="w-4 h-4 mt-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Directory */}
      <section className="py-16 md:py-24 bg-muted border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <h2 className="text-xl font-display font-medium text-blue-600">Services Directory</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {serviceLinks.map((link, i) => (
              <Link
                key={i}
                to={link.path}
                className="group flex items-center justify-between px-4 py-3 bg-white border border-border rounded hover:border-primary hover:shadow-sm transition-all duration-300"
              >
                <span className="text-sm">{link.label}</span>
                <ArrowRight className="w-3 h-3 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Legal & Information */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <h2 className="text-xl font-display font-medium text-blue-600">Legal & Information</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {legalLinks.map((link, i) => (
              <Link
                key={i}
                to={link.path}
                className="group flex items-center gap-2 px-6 py-3 border border-border rounded hover:border-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                <span className="text-sm font-medium">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-16 md:py-24 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-medium tracking-tighter mb-4">
                Need Assistance?
              </h2>
              <p className="text-background/70 leading-relaxed">
                Our team is ready to help you navigate our services and find the perfect solution for your business needs.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-start md:justify-end">
              <Link 
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-background text-foreground text-sm tracking-widest uppercase font-semibold hover:bg-primary hover:text-white transition-all duration-300"
              >
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a 
                href="mailto:connect@echoess.in"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-background/30 text-sm tracking-widest uppercase font-semibold hover:bg-background hover:text-foreground transition-all duration-300"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
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
    </div>
  );
}
