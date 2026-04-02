import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useEffect } from 'react';

const siteLinks = [
  {
    title: "Main Pages",
    links: [
      { label: "Home", path: "/" },
      { label: "Services", path: "/services" },
      { label: "About Us", path: "/about" },
      { label: "Technology", path: "/technology" },
      { label: "Testimonials", path: "/testimonials" },
      { label: "Contact", path: "/contact" }
    ]
  },
  {
    title: "Services",
    links: [
      { label: "Custom Software Development", path: "/services" },
      { label: "Cloud Solutions", path: "/services" },
      { label: "Mobile Apps", path: "/services" },
      { label: "AI & Automation", path: "/services" },
      { label: "Cybersecurity", path: "/services" },
      { label: "Data Analytics", path: "/services" },
      { label: "Digital Marketing", path: "/services" },
      { label: "Blockchain", path: "/services" },
      { label: "Graphics Design", path: "/services" },
      { label: "UI/UX Design", path: "/services" }
    ]
  },
  {
    title: "Legal & Info",
    links: [
      { label: "Privacy Policy", path: "/privacy" },
      { label: "Terms of Service", path: "/terms" },
      { label: "Sitemap", path: "/sitemap" }
    ]
  }
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

      {/* Hero Section */}
      <section className="pt-40 md:pt-52 pb-16 md:pb-24 bg-muted border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[11px] md:text-[12px] tracking-[0.3em] font-semibold uppercase text-primary">
                Site Navigation
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium tracking-tighter mb-6">
              Explore All<br />
              <span className="text-muted-foreground/40 italic">Navigations</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Find your way around our website. Browse all pages, services, and resources available on Echoes Software Technologies.
            </p>
          </div>
        </div>
      </section>

      {/* Sitemap Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {siteLinks.map((section, i) => (
              <div key={i}>
                <h2 className="text-xl font-display font-medium mb-6 pb-4 border-b border-border">
                  {section.title}
                </h2>
                <ul className="space-y-3">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <Link 
                        to={link.path}
                        className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ArrowRight className="w-4 h-4 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 md:py-24 bg-foreground text-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-medium tracking-tighter mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-background/70 leading-relaxed mb-8 max-w-2xl mx-auto">
            If you need assistance navigating our website or have specific questions, our team is here to help.
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-background text-foreground text-sm tracking-widest uppercase font-semibold hover:bg-primary hover:text-white transition-all duration-300"
          >
            Contact Us
            <ArrowRight className="w-4 h-4" />
          </Link>
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
