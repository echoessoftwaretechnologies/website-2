import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const Testimonials: React.FC = () => {
    return (
        <div className="bg-white min-h-screen selection:bg-brand-blue-100 selection:text-brand-blue-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
            <Navbar currentPage="Testimonials" />
            
            <main className="pt-24">
                {/* Hero Section */}
                <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 pt-24 pb-32">
                    <div className="absolute inset-0">
                        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-blue-600/30 rounded-full blur-[150px] animate-float-slow"></div>
                        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-brand-blue-400/20 rounded-full blur-[150px] animate-float-slow" style={{ animationDelay: '-3s' }}></div>
                    </div>
                    
                    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-8">
                        <div className="inline-block px-8 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md animate-fade-in-down">
                            <span className="text-brand-blue-400 font-black tracking-[0.3em] text-xs uppercase">CLIENT TESTIMONIALS</span>
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter animate-slide-up">
                            What Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue-400 to-brand-blue-100">Clients Say</span>
                        </h1>
                        <p className="text-2xl text-navy-200 max-w-3xl mx-auto font-light leading-relaxed animate-fade-in delay-500">
                            Real stories from enterprise leaders who transformed their businesses with Echoes Software Technologies.
                        </p>
                    </div>
                </section>

                {/* Featured Testimonials Section */}
                <section className="py-40 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 relative overflow-hidden">
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0">
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue-500/10 rounded-full blur-[120px] animate-pulse"></div>
                        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-brand-blue-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-brand-blue-400/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="text-center mb-24 space-y-8">
                            <h2 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                                Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue-400 to-cyan-400">Success Stories</span>
                            </h2>
                            <p className="text-xl text-navy-200 max-w-3xl mx-auto font-light leading-relaxed">
                                Hear from industry leaders who have partnered with us to achieve extraordinary results.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    name: "Ravi Kumar",
                                    role: "CTO, TechGlobal Solutions",
                                    company: "TechGlobal Solutions",
                                    content: "Echoes transformed our legacy systems into a modern, scalable platform. Their expertise and commitment to excellence exceeded our expectations. The 40% efficiency boost was achieved within 4 months! The team's technical depth and proactive approach made them the perfect partner for our digital transformation journey.",
                                    avatar: "RK",
                                    rating: 5,
                                    industry: "Technology",
                                    project: "Enterprise Platform Modernization"
                                },
                                {
                                    name: "Lakshmi Priya",
                                    role: "Head of Digital, RetailCorp India",
                                    company: "RetailCorp India",
                                    content: "Working with Echoes was a game-changer for our e-commerce platform. The AI-powered analytics helped us increase conversion rates by 35% and reduce operational costs significantly. Their innovative approach to customer experience optimization delivered measurable business results.",
                                    avatar: "LP",
                                    rating: 5,
                                    industry: "Retail & E-commerce",
                                    project: "E-commerce Platform & Analytics"
                                },
                                {
                                    name: "Arjun Venkatesh",
                                    role: "CIO, HealthTech Systems",
                                    company: "HealthTech Systems",
                                    content: "Echoes revolutionized our healthcare platform with cutting-edge technology solutions. Their HIPAA-compliant architecture and real-time data processing capabilities transformed patient care delivery. The 60% reduction in system downtime speaks volumes about their engineering excellence.",
                                    avatar: "AV",
                                    rating: 5,
                                    industry: "Healthcare Technology",
                                    project: "Healthcare Platform Integration"
                                },
                                {
                                    name: "Meera Devi",
                                    role: "CEO, StartupX Innovations",
                                    company: "StartupX Innovations",
                                    content: "As a startup, we needed a technology partner who could scale with us. Echoes provided enterprise-grade solutions without the enterprise price tag. Their MVP development and rapid iteration approach helped us secure Series A funding and scale to 100,000+ users.",
                                    avatar: "MD",
                                    rating: 5,
                                    industry: "Startups & Innovation",
                                    project: "MVP Development & Scaling"
                                },
                                {
                                    name: "Suresh Rajan",
                                    role: "Director, FinServe Solutions",
                                    company: "FinServe Solutions",
                                    content: "The team delivered our fintech platform ahead of schedule with zero security incidents. Their proactive approach and technical depth made them the perfect partner for our digital transformation. The regulatory compliance and security measures they implemented exceeded industry standards.",
                                    avatar: "SR",
                                    rating: 5,
                                    industry: "Financial Services",
                                    project: "Fintech Platform Development"
                                }
                            ].map((testimonial, i) => (
                                <div key={i} className="group bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-3 relative overflow-hidden hover:border-brand-blue-500/30">
                                    {/* Hover Glow Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                                    
                                    {/* Rating Stars */}
                                    <div className="relative z-10 flex gap-1 mb-6">
                                        {[...Array(testimonial.rating)].map((_, j) => (
                                            <i key={j} data-lucide="star" className="w-5 h-5 text-yellow-400 fill-current"></i>
                                        ))}
                                    </div>
                                    
                                    {/* Testimonial Content */}
                                    <div className="relative z-10">
                                        <p className="text-navy-200 text-lg leading-relaxed mb-8 italic">"{testimonial.content}"</p>
                                        
                                        <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-blue-500 to-cyan-500 flex items-center justify-center text-white font-black text-lg">
                                                {testimonial.avatar}
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
                                                <p className="text-brand-blue-400 text-sm font-medium">{testimonial.role}</p>
                                                <p className="text-navy-400 text-xs uppercase tracking-wider mt-1">{testimonial.company}</p>
                                            </div>
                                        </div>
                                        
                                        {/* Project Details */}
                                        <div className="mt-6 pt-6 border-t border-white/10">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <i data-lucide="briefcase" className="w-4 h-4 text-brand-blue-400"></i>
                                                    <span className="text-navy-300 text-sm">{testimonial.project}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <i data-lucide="building-2" className="w-4 h-4 text-brand-blue-400"></i>
                                                    <span className="text-navy-300 text-sm">{testimonial.industry}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Trust Metrics */}
                        <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { value: "200+", label: "Enterprise Clients", icon: "users" },
                                { value: "98.7%", label: "Client Satisfaction", icon: "heart" },
                                { value: "120+", label: "Projects Delivered", icon: "check-circle" },
                                { value: "24/7", label: "Support Coverage", icon: "clock" }
                            ].map((stat, i) => (
                                <div key={i} className="text-center bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-brand-blue-500/30 transition-all duration-300 group">
                                    <div className="w-16 h-16 bg-gradient-to-br from-brand-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-brand-blue-500/30 group-hover:to-cyan-500/30 transition-all">
                                        <i data-lucide={stat.icon} className="w-8 h-8 text-brand-blue-400"></i>
                                    </div>
                                    <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                                    <div className="text-navy-300 text-sm uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-navy-950 py-40 relative overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-brand-blue-600/20 rounded-full blur-[120px]"></div>
                    </div>
                    
                    <div className="max-w-5xl mx-auto px-6 relative z-10 text-center space-y-12">
                        <h2 className="text-5xl lg:text-7xl font-black text-white leading-tight tracking-tighter">
                            Ready to Join Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue-400 to-brand-blue-100">Success Stories?</span>
                        </h2>
                        <p className="text-2xl text-navy-200 font-light max-w-3xl mx-auto leading-relaxed">
                            Partner with Echoes Software Technologies and let us help you write your next success story.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                            <Link to="/contact" 
                                className="w-full sm:w-auto premium-gradient text-white font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-premium shadow-xl shadow-brand-blue-900/30 text-center text-sm uppercase tracking-wider flex items-center justify-center gap-2">
                                <span className="w-5 h-5"><i data-lucide="mail" className="w-full h-full"></i></span>
                                Get Started
                            </Link>
                            <Link to="/services" 
                                className="w-full sm:w-auto glass-dark hover:bg-white/10 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 border border-white/20 text-center text-sm uppercase tracking-wider flex items-center justify-center gap-2">
                                <span className="w-5 h-5"><i data-lucide="sparkles" className="w-full h-full"></i></span>
                                Our Services
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            {/* Comprehensive Footer */}
            <footer className="bg-gradient-to-br from-navy-950 to-navy-900 text-white relative overflow-hidden py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                        {/* Company Info */}
                        <div className="space-y-6">
                            <img src="/assets/3.png" alt="Echoes Software Technologies" className="h-10" />
                            <p className="text-navy-300 text-sm leading-relaxed">
                                Precision-built enterprise software solutions driving digital transformation worldwide.
                            </p>
                            <div className="flex gap-4">
                                {/* LinkedIn */}
                                <a
                                    href="https://www.linkedin.com/company/echoes-software-solutions/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all hover:scale-110"
                                >
                                    <i data-lucide="linkedin" className="w-5 h-5"></i>
                                </a>

                                {/* Instagram */}
                                <a
                                    href="https://www.instagram.com/echoes_software_technologies?igsh=OW1xOGpmMzZmZ3Bq"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all hover:scale-110"
                                >
                                    <i data-lucide="instagram" className="w-5 h-5"></i>
                                </a>

                                {/* WhatsApp */}
                                <a
                                    href="https://wa.me/918148549511"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all hover:scale-110"
                                >
                                    <i data-lucide="message-circle" className="w-5 h-5"></i>
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">Quick Links</h4>
                            <ul className="space-y-3">
                                {['Home', 'About', 'Services', 'Solutions', 'Contact', 'Testimonials'].map((item) => (
                                    <li key={item}>
                                        <Link to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} className="text-navy-300 hover:text-white transition-colors text-sm">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">Services</h4>
                            <ul className="space-y-3">
                                <li><span className="text-navy-300 text-sm">Custom Development</span></li>
                                <li><span className="text-navy-300 text-sm">Cloud Solutions</span></li>
                                <li><span className="text-navy-300 text-sm">AI Integration</span></li>
                                <li><span className="text-navy-300 text-sm">Enterprise Support</span></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">Contact</h4>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 text-navy-300 text-sm">
                                    <i data-lucide="mail" className="w-5 h-5 flex-shrink-0 mt-0.5"></i>
                                    <span>connect@echoess.in</span>
                                </li>
                                <li className="flex items-start gap-3 text-navy-300 text-sm">
                                    <i data-lucide="phone" className="w-5 h-5 flex-shrink-0 mt-0.5"></i>
                                    <span>+91 81485 49511</span>
                                </li>
                                <li className="flex items-start gap-3 text-navy-300 text-sm">
                                    <i data-lucide="map-pin" className="w-5 h-5 flex-shrink-0 mt-0.5"></i>
                                    <span> Karur, Tamilnadu,<br />India - 639001</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-navy-400 text-sm">
                            © 2026 Echoes Software Technologies. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <Link to="/privacy-policy" className="text-navy-400 hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <Link to="/terms-of-service" className="text-navy-400 hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Testimonials;
