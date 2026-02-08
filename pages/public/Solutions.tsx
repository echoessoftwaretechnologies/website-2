import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

declare global {
    interface Window {
        lucide: any;
    }
}

const Solutions: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white text-gray-900 selection:bg-brand-blue-100 selection:text-brand-blue-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
            <Navbar currentPage="Solutions" />

            <main>
                <section className="mesh-gradient relative overflow-hidden pt-24 pb-20 lg:pt-40 lg:pb-32">
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                        <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-brand-blue-100/40 rounded-full blur-[140px] animate-float-slow"></div>
                        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-blue-200/20 rounded-full blur-[140px] animate-float-slow" style={{ animationDelay: '-5s' }}></div>
                    </div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-16 animate-slide-up">
                            <div className="inline-flex items-center space-x-3 px-5 py-2.5 bg-white/60 backdrop-blur-md text-brand-blue-700 rounded-full text-sm font-bold tracking-wider border border-white shadow-sm mb-10">
                                <span className="uppercase tracking-[0.2em]">INNOVATION AT SCALE</span>
                            </div>
                            <h1 className="text-6xl lg:text-8xl font-extrabold text-navy-950 leading-[1] tracking-tight text-balance mb-10">
                                Our Software <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue-600 via-brand-blue-500 to-brand-blue-800 animate-shimmer" style={{ backgroundSize: '200% auto' }}>Solutions</span>
                            </h1>
                            <p className="text-2xl text-navy-600 max-w-3xl mx-auto leading-relaxed font-light">
                                Comprehensive enterprise-grade software ecosystems designed to automate precision, scale intelligence, and dominate market competition.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="bg-navy-50/50 py-32 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
                        <div className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] bg-brand-blue-100 rounded-full blur-[120px]"></div>
                        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-brand-blue-50 rounded-full blur-[120px]"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-24 space-y-6 animate-slide-up">
                            <h2 className="text-brand-blue-600 font-black tracking-[0.3em] text-sm uppercase">ENTERPRISE ARCHITECTURE</h2>
                            <h3 className="text-5xl lg:text-6xl font-extrabold text-navy-950 tracking-tight">Ecosystem Capabilities</h3>
                            <p className="text-2xl text-navy-600 max-w-2xl mx-auto font-light leading-relaxed">
                                Our comprehensive suite of software solutions is engineered to exceed global enterprise requirements for scale, security, and intelligence.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-10">
                            {[
                                {
                                    title: "Scalable Cloud Architecture",
                                    desc: "Built on enterprise-grade cloud infrastructure that scales seamlessly from startup to Fortune 500.",
                                    icon: "cloud",
                                    features: ["Auto-scaling capabilities", "99.99% uptime guarantee", "Global CDN distribution"]
                                },
                                {
                                    title: "Advanced Security Framework",
                                    desc: "Military-grade security protocols and compliance standards that protect your most sensitive data assets.",
                                    icon: "shield",
                                    features: ["End-to-end encryption", "SOC 2 Type II compliant", "Multi-factor authentication"]
                                },
                                {
                                    title: "Intelligent Analytics",
                                    desc: "AI-powered analytics and real-time insights that transform raw data into actionable business intelligence.",
                                    icon: "bar-chart-3",
                                    features: ["Real-time dashboards", "Predictive modeling", "Enterprise data lake"]
                                }
                            ].map((sol, i) => (
                                <div key={i} className="group bg-white p-12 rounded-2xl border border-navy-100 shadow-glass hover:shadow-premium transition-all duration-500 hover-lift relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-blue-500 to-brand-blue-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="w-20 h-20 bg-brand-blue-50 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-brand-blue-600 transition-all duration-500 shadow-sm">
                                        <i data-lucide={sol.icon} className="w-10 h-10 text-brand-blue-600 group-hover:text-white transition-colors"></i>
                                    </div>
                                    <h3 className="text-2xl font-black text-navy-950 mb-6 uppercase tracking-tight group-hover:text-brand-blue-600 transition-colors">{sol.title}</h3>
                                    <p className="text-lg text-navy-600 leading-relaxed mb-8 font-light">{sol.desc}</p>
                                    <ul className="space-y-4">
                                        {sol.features.map((feat, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-sm font-bold text-navy-700 uppercase tracking-widest">
                                                <div className="w-1.5 h-1.5 rounded-full bg-brand-blue-500"></div>
                                                {feat}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-40 bg-white relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-32 space-y-6">
                            <h2 className="text-brand-blue-600 font-black tracking-[0.2em] text-sm uppercase">STRATEGIC DELIVERY</h2>
                            <h3 className="text-5xl lg:text-7xl font-extrabold text-navy-950 tracking-tight leading-[1.1]">Comprehensive Ecosystems</h3>
                            <p className="text-2xl text-navy-600 max-w-3xl mx-auto font-light leading-relaxed">
                                We specialize in the end-to-end engineering of sophisticated digital platforms that define industry standards.
                            </p>
                        </div>

                        <div className="space-y-40">
                            {[
                                {
                                    title: "Custom Software Engineering",
                                    desc: "Bespoke digital foundations engineered with military precision. We build high-performance, resilient ecosystems tailored to unique enterprise architecture.",
                                    image: "/assets/Custom Software Engineering.png",
                                    points: ["Next-Gen Web & Mobile Platforms", "Mission-Critical Enterprise Systems", "High-Throughput API Orchestration"],
                                    reverse: false
                                },
                                {
                                    title: "Technology Strategy & Consulting",
                                    desc: "Navigate the complexity of digital evolution with elite technical advisory. We optimize your technology stack to maximize speed, security, and market impact.",
                                    image: "/assets/Technology Strategy & Consulting.png",
                                    points: ["Global Digital Roadmap Planning", "Architectural Integrity Audits", "Scalability & Performance Strategy"],
                                    reverse: true
                                }
                            ].map((item, i) => (
                                <div key={i} className={`flex flex-col ${item.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-20 items-center`}>
                                    <div className="w-full lg:w-1/2 relative group">
                                        <div className="absolute -inset-4 bg-brand-blue-500/10 rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                        <div className="relative overflow-hidden rounded-[3.5rem] shadow-2xl border border-navy-100">
                                            <img src={item.image} alt={item.title} className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-1000" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent"></div>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-1/2 space-y-10">
                                        <h4 className="text-4xl lg:text-5xl font-black text-navy-950 tracking-tight leading-tight">{item.title}</h4>
                                        <p className="text-xl text-navy-600 font-light leading-relaxed">{item.desc}</p>
                                        <div className="grid gap-6">
                                            {item.points.map((point, idx) => (
                                                <div key={idx} className="flex items-center gap-6 p-6 rounded-xl bg-navy-50/50 border border-navy-100 group hover:bg-brand-blue-600 transition-all duration-500 hover:-translate-y-1">
                                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-brand-blue-500">
                                                        <i data-lucide="check" className="w-6 h-6 text-brand-blue-600 group-hover:text-white"></i>
                                                    </div>
                                                    <span className="text-lg font-bold text-navy-800 uppercase tracking-widest text-xs group-hover:text-white transition-colors">{point}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="grid md:grid-cols-3 gap-10 mt-40">
                            {[
                                { title: "Elite 24/7 Support", desc: "Constant vigil over your digital assets with round-the-clock technical excellence.", icon: "headphones" },
                                { title: "Defense-First Security", desc: "Military-grade protocols integrated into every layer of your application ecosystem.", icon: "shield-check" },
                                { title: "Ultra-Rapid Deployment", desc: "Agile methodologies optimized for sub-millisecond market response and iterative dominance.", icon: "zap" }
                            ].map((card, i) => (
                                <div key={i} className="bg-navy-50/50 p-10 rounded-xl border border-navy-100 text-center space-y-6 hover:bg-white hover:shadow-premium transition-all duration-500 hover-lift group">
                                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto shadow-sm group-hover:bg-brand-blue-600 transition-colors">
                                        <i data-lucide={card.icon} className="w-8 h-8 text-brand-blue-600 group-hover:text-white transition-colors"></i>
                                    </div>
                                    <h5 className="text-xl font-black text-navy-950 uppercase tracking-tight group-hover:text-brand-blue-600 transition-colors">{card.title}</h5>
                                    <p className="text-navy-600 font-light leading-relaxed">{card.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Ready to Transform Section */}
                <section className="bg-navy-950 py-40 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                        <div className="absolute top-[-10%] right-[10%] w-[50%] h-[50%] bg-brand-blue-500 rounded-full blur-[180px] animate-float-slow"></div>
                        <div className="absolute bottom-[-10%] left-[10%] w-[50%] h-[50%] bg-brand-blue-300 rounded-full blur-[180px] animate-float-slow" style={{ animationDelay: '-3s' }}></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="glass-dark px-6 py-16 md:p-20 lg:p-32 rounded-3xl md:rounded-[4rem] border border-white/10 text-center space-y-16 shadow-2xl">
                            <div className="max-w-4xl mx-auto space-y-8">
                                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter text-balance">
                                    Ready to <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue-400 to-brand-blue-200">Scale Your Vision?</span>
                                </h2>
                                <p className="text-2xl text-navy-200 leading-relaxed font-light">
                                    Join the elite circle of enterprises powered by Echoes Software Technologies. <br className="hidden lg:block" />
                                    Let's build the future of your digital ecosystem today.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                                <a href="https://forms.gle/K3LySpfU6YYvQKGj9" target="_blank" rel="noopener noreferrer"
                                    className="w-full sm:w-auto premium-gradient text-white font-black px-12 py-6 rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-premium shadow-2xl shadow-brand-blue-900/40 text-center text-xl uppercase tracking-widest">
                                    Schedule Consultation
                                </a>
                                <a href="https://forms.gle/JNS54uLpgQXWP8NZ9" target="_blank" rel="noopener noreferrer"
                                    className="w-full sm:w-auto glass-dark hover:bg-white/10 text-white font-black px-12 py-6 rounded-full transition-all duration-500 border border-white/20 text-center text-lg md:text-xl uppercase tracking-widest">
                                    Request Demo
                                </a>
                            </div>
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
                                {['Home', 'About', 'Services', 'Solutions', 'Contact'].map((item) => (
                                    <li key={item}>
                                        <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-navy-300 hover:text-white transition-colors text-sm">
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

export default Solutions;
