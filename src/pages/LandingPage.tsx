import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, X, ArrowRight, Check, Star, ArrowUpRight,
  Mail, MapPin, Phone, ChevronRight, Send
} from 'lucide-react';
import SEO, { seoConfig } from '../components/SEO';

const services = [
  {
    title: "Custom Software Development",
    image: "/csd.png",
    description: "We build tailor-made software solutions that perfectly align with your business objectives. Our expert developers utilize cutting-edge technologies and agile methodologies to deliver scalable, secure, and high-performance applications.",
    features: ["Enterprise Applications", "Web Platforms", "System Integration", "API Development"],
    link: "#contact"
  },
  {
    title: "Cloud Solutions",
    image: "/cloud.jpg",
    description: "Transform your infrastructure with our comprehensive cloud services. We provide seamless migration, optimization, and management of cloud environments to reduce costs and improve operational efficiency.",
    features: ["Cloud Migration", "AWS/Azure/GCP", "DevOps Automation", "Serverless Architecture"],
    link: "#contact"
  },
  {
    title: "Mobile App Development",
    image: "/wad.jpg",
    description: "Create powerful mobile experiences with our native and cross-platform development services. We design and build intuitive mobile applications that engage users and drive business growth.",
    features: ["iOS & Android Apps", "React Native", "Flutter Development", "Mobile UI/UX Design"],
    link: "#contact"
  },
  {
    title: "Data Analytics & BI",
    image: "/da.jpg",
    description: "Unlock the power of your data with our advanced analytics and business intelligence solutions. We help you transform raw data into actionable insights that drive informed decision-making.",
    features: ["Data Visualization", "Predictive Analytics", "Big Data Processing", "Dashboard Solutions"],
    link: "#contact"
  },
  {
    title: "Cybersecurity",
    image: "/cs.jpg",
    description: "Protect your digital assets with our enterprise-grade security solutions. We provide comprehensive security assessments, implementation, and monitoring to safeguard your business against evolving threats.",
    features: ["Security Audits", "Penetration Testing", "Compliance Management", "Threat Monitoring"],
    link: "#contact"
  },
  {
    title: "AI & Automation",
    image: "/ai.jpg",
    description: "Leverage the power of artificial intelligence to automate processes and enhance productivity. Our AI solutions help you streamline operations and gain competitive advantage through intelligent automation.",
    features: ["Machine Learning", "Process Automation", "Chatbots & NLP", "Computer Vision"],
    link: "#contact"
  },
  {
    title: "Digital Marketing",
    image: "/dm.jpg",
    description: "Amplify your online presence with our comprehensive digital marketing services. We create data-driven strategies that increase brand visibility, engage your target audience, and drive measurable business growth.",
    features: ["SEO & SEM", "Social Media Marketing", "Content Strategy", "Analytics & Reporting"],
    link: "#contact"
  },
  {
    title: "Blockchain",
    image: "/bc.jpg",
    description: "Build secure, decentralized applications with our blockchain expertise. From smart contracts to distributed ledger solutions, we help businesses leverage blockchain technology for enhanced security and transparency.",
    features: ["Smart Contracts", "DApp Development", "Tokenization", "Blockchain Integration"],
    link: "#contact"
  },
  {
    title: "Graphics Design",
    image: "/gd.jpg",
    description: "Create stunning visual identities that capture your brand essence. Our creative team delivers compelling designs for digital and print media that resonate with your audience and elevate your brand.",
    features: ["Brand Identity", "Print Design", "Marketing Collateral", "Visual Concepts"],
    link: "#contact"
  },
  {
    title: "UI/UX",
    image: "/uiux.jpg",
    description: "Design intuitive and engaging user experiences that delight your customers. Our user-centered approach combines research, strategy, and creative design to build interfaces that are both beautiful and functional.",
    features: ["User Research", "Wireframing", "Prototyping", "Usability Testing"],
    link: "#contact"
  }
];

const stats = [
  { value: "250+", label: "Projects Delivered" },
  { value: "50+", label: "Expert Engineers" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "12+", label: "Years Experience" }
];

const process = [
  {
    step: "01",
    title: "Discovery",
    description: "We analyze your requirements and define project scope with precision."
  },
  {
    step: "02",
    title: "Strategy",
    description: "Our team crafts a detailed roadmap tailored to your business goals."
  },
  {
    step: "03",
    title: "Development",
    description: "Agile development with regular updates and transparent communication."
  },
  {
    step: "04",
    title: "Delivery",
    description: "Rigorous testing and seamless deployment with ongoing support."
  }
];

const testimonials = [
  {
    quote: "TechVision transformed our digital infrastructure completely. Their expertise is unmatched.",
    author: "Sarah Chen",
    role: "CTO, InnovateCorp",
    rating: 5
  },
  {
    quote: "Exceptional service and outstanding results. They delivered beyond our expectations.",
    author: "Michael Roberts",
    role: "CEO, DataFlow Inc",
    rating: 5
  },
  {
    quote: "The team's technical depth and professionalism made our project a huge success.",
    author: "Priya Sharma",
    role: "Director, TechStart",
    rating: 5
  }
];

const techStack = [
  { name: "React", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Python", category: "AI/ML" },
  { name: "AWS", category: "Cloud" },
  { name: "Docker", category: "DevOps" },
  { name: "PostgreSQL", category: "Database" },
  { name: "TypeScript", category: "Language" },
  { name: "Kubernetes", category: "Infrastructure" }
];

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/xlgowryg', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          service: formData.service,
          message: formData.message,
          source: 'Landing Page'
        })
      });
      
      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: ''
        });
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Failed to send message. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const navLinks = [
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Technology', href: '/technology' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <>
      <SEO {...seoConfig.home} canonical="/" />
      <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm border-b border-border' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24 md:h-28">
            <a href="#" className="flex items-center">
              <img src="/2.png" alt="Echoes Software Technologies" className="w-[140px] sm:w-[180px] md:w-[200px] h-auto object-contain" />
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.label}
                  to={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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
              {navLinks.map((link) => (
                <Link 
                  key={link.label}
                  to={link.href}
                  className="block py-2 text-sm text-muted-foreground hover:text-foreground"
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

      {/* Hero Section */}
      <section className="pt-20 md:pt-28 pb-32 md:pb-48 bg-white relative min-h-[100vh] flex flex-col justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="space-y-8">
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-medium tracking-tighter leading-[0.95] mt-8 md:mt-12" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
                Your Vision,<br />
                <span className="text-muted-foreground/40 italic">Our Focus.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light max-w-2xl mx-auto">
                We craft cutting-edge digital solutions that transform businesses and drive growth in an ever-evolving technological landscape.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-foreground text-background text-[10px] tracking-widest uppercase font-semibold hover:bg-primary transition-all duration-300"
                >
                  Start Your Project
                  <ArrowRight className="w-3 h-3" />
                </a>
                <a 
                  href="#services"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-border text-[10px] tracking-widest uppercase font-semibold hover:bg-muted transition-all duration-300"
                >
                  Explore Services
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-widest uppercase text-muted-foreground">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-muted border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-4xl lg:text-5xl font-display font-medium tracking-tighter text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16 md:mb-24">
            <span className="text-[11px] md:text-[12px] tracking-[0.3em] font-semibold uppercase text-primary">
              What We Do
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tighter mt-6">
              Services That Drive<br /><span className="text-muted-foreground/40 italic">Digital Excellence</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div 
                key={i} 
                className="group bg-white border border-border rounded-lg hover:border-primary hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden bg-muted">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-xl font-display font-medium mb-4">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm mb-6">{service.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <a 
                    href={service.link}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-foreground transition-colors"
                  >
                    Learn More
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24 md:py-32 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16 md:mb-24">
            <span className="text-[11px] md:text-[12px] tracking-[0.3em] font-semibold uppercase text-primary">
              How We Work
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tighter mt-6">
              Our Proven<br /><span className="text-muted-foreground/40 italic">Process</span>
            </h2>
            <p className="text-lg text-muted-foreground mt-4 font-light">
              A streamlined approach to delivering exceptional results
            </p>
          </div>
          
          <div className="border border-border bg-white rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {process.map((step, i) => (
                <div 
                  key={i} 
                  className={`group p-6 md:p-8 hover:bg-muted/50 transition-all duration-300 border-b sm:border-b-0 sm:border-r border-border ${i === 3 ? 'border-r-0 border-b-0' : ''} ${i >= 2 ? 'sm:border-t lg:border-t-0' : ''}`}
                >
                  <span className="text-[10px] tracking-widest uppercase text-muted-foreground font-medium">
                    Step {step.step}
                  </span>
                  <h3 className="text-lg md:text-xl font-display font-medium mt-3 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section id="technology" className="py-24 md:py-32 bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="text-[11px] md:text-[12px] tracking-[0.3em] font-semibold uppercase text-primary">
                Tech Stack
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tighter mt-6 mb-6">
                Modern<br /><span className="text-muted-foreground/40 italic">Technologies</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                We leverage industry-leading technologies and frameworks to build scalable, secure, and high-performance applications that stand the test of time.
              </p>
              <div className="space-y-4">
                {[
                  "Scalable Architecture",
                  "Security First Approach",
                  "Performance Optimized",
                  "Future-Ready Solutions"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {techStack.map((tech, i) => (
                <div 
                  key={i} 
                  className="group p-6 bg-muted hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer"
                >
                  <p className="text-xs uppercase tracking-wider text-muted-foreground group-hover:text-white/70 mb-1">
                    {tech.category}
                  </p>
                  <p className="text-lg font-display font-medium">{tech.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 md:py-32 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16 md:mb-24">
            <span className="text-[11px] md:text-[12px] tracking-[0.3em] font-semibold uppercase text-primary">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tighter mt-6">
              Trusted by<br /><span className="text-muted-foreground/40 italic">Industry Leaders</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-white p-8 border border-border">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SaaS Product Section - Debpto */}
      <section className="py-24 md:py-32 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="text-[11px] md:text-[12px] tracking-[0.3em] font-semibold uppercase text-primary">
                Our SaaS Product
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tighter mt-6 mb-6">
                Debpto <span className="text-muted-foreground/40 italic">(POS)</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                A next-generation Point of Sale system designed for modern retail businesses. 
                Streamline your operations with our intuitive interface, real-time inventory 
                management, and comprehensive sales analytics.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Real-time Inventory Tracking",
                  "Multi-store Management",
                  "Advanced Sales Analytics",
                  "Customer Loyalty Program",
                  "Cloud-based & Secure"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-foreground text-background text-[10px] tracking-widest uppercase font-semibold">
                  Launching Soon
                </span>
              </div>
              
              <a 
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm tracking-widest uppercase font-semibold hover:bg-primary transition-all duration-300"
              >
                Get Early Access
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            
            <div className="relative flex justify-center">
              <img 
                src="/saas-debpto-2026.png" 
                alt="Debpto POS System"
                className="w-full max-w-[400px] h-auto object-cover rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-foreground text-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tighter mb-6">
            Ready to Transform<br /><span className="text-background/40 italic">Your Business?</span>
          </h2>
          <p className="text-lg text-background/70 leading-relaxed mb-8 max-w-2xl mx-auto">
            Let's discuss how our technology solutions can help you achieve your business goals and stay ahead of the competition.
          </p>
          <a 
            href="#contact"
            className="inline-flex items-center gap-2 px-4 py-2 bg-background text-foreground text-[10px] tracking-widest uppercase font-semibold hover:bg-primary hover:text-white transition-all duration-300"
          >
            Schedule a Consultation
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <span className="text-[11px] md:text-[12px] tracking-[0.3em] font-semibold uppercase text-primary">
                Get In Touch
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tighter mt-6 mb-6">
                Let's Build<br /><span className="text-muted-foreground/40 italic">Something Great</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Have a project in mind? We'd love to hear about it. Send us a message and our team will get back to you within 24 hours.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">connect@echoess.in</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">+91 81485 49511</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Office</p>
                    <p className="text-sm text-muted-foreground">Karur, Tamilnadu, India - 639001</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 sm:p-6 md:p-8 lg:p-10 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg border border-border">
              {submitted ? (
                <div className="text-center py-8 sm:py-10 md:py-12">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Check className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-medium mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-xl sm:text-2xl font-display font-medium mb-2">Send us a Message</h2>
                  <p className="text-muted-foreground text-sm sm:text-base mb-5 sm:mb-6 md:mb-8">
                    Fill out the form below and we'll get back to you shortly.
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                      <div>
                        <label className="block text-[10px] sm:text-[11px] tracking-widest uppercase font-semibold mb-1.5 sm:mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border bg-white text-sm focus:outline-none focus:border-primary transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] sm:text-[11px] tracking-widest uppercase font-semibold mb-1.5 sm:mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border bg-white text-sm focus:outline-none focus:border-primary transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-[10px] sm:text-[11px] tracking-widest uppercase font-semibold mb-1.5 sm:mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border bg-white text-sm focus:outline-none focus:border-primary transition-colors"
                        placeholder="Your company"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                      <div>
                        <label className="block text-[10px] sm:text-[11px] tracking-widest uppercase font-semibold mb-1.5 sm:mb-2">
                          Service Interest
                        </label>
                        <select 
                          value={formData.service}
                          onChange={(e) => setFormData({...formData, service: e.target.value})}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border bg-white text-sm focus:outline-none focus:border-primary transition-colors"
                        >
                          <option value="">Select a service</option>
                          {services.map((service, i) => (
                            <option key={i} value={service.title}>{service.title}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] sm:text-[11px] tracking-widest uppercase font-semibold mb-1.5 sm:mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border bg-white text-sm focus:outline-none focus:border-primary transition-colors"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-[10px] sm:text-[11px] tracking-widest uppercase font-semibold mb-1.5 sm:mb-2">
                        Project Details *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border bg-white text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                        placeholder="Tell us about your project..."
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-2.5 bg-foreground text-background text-[11px] tracking-widest uppercase font-semibold hover:bg-primary transition-all duration-300 flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed rounded"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

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
          <ChevronRight className="w-5 h-5 -rotate-90" />
        </button>
      )}
      </div>
    </>
  );
}
