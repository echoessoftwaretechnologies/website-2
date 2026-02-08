import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';

declare global {
    interface Window {
        lucide: any;
    }
}

const Contact: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        company: '',
        subject: '',
        message: ''
    });

    useEffect(() => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }, []); // Removed isMobileMenuOpen from dependency array as it's no longer needed

    useEffect(() => {
        const state = location.state as { subject?: string } | null;
        if (state?.subject) {
            setFormData(prev => ({ ...prev, subject: state.subject || '' }));
            // Clear location state to prevent flickering or re-filling on refresh/navigate back
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const { firstName, lastName, phone, email, company, subject, message } = formData;

        const whatsappMessage = `Hey, I'm ${firstName} ${lastName}.

Regarding the subject about ${subject}, I'm contacting you for:
${message}

My contact details:
Phone: ${phone}
Email: ${email}`;

        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/918148549511?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
    };

    const handleGetStarted = () => {
        navigate('/login');
    };

    return (
        <div className="bg-white min-h-screen selection:bg-brand-blue-100 selection:text-brand-blue-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
            <Navbar currentPage="Contact" />

            <main className="pt-24">
                {/* Hero Section */}
                <section className="relative min-h-[75vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-navy-950 pt-24 pb-32">
                    <div className="absolute inset-0">
                        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-blue-600/30 rounded-full blur-[150px] animate-float-slow"></div>
                        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-brand-blue-400/20 rounded-full blur-[150px] animate-float-slow" style={{ animationDelay: '-3s' }}></div>
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-10">
                        <div className="inline-block px-8 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md animate-fade-in-down">
                            <span className="text-brand-blue-400 font-black tracking-[0.3em] text-xs uppercase">GET IN TOUCH</span>
                        </div>
                        <h1 className="text-6xl lg:text-8xl font-black text-white leading-[1.1] tracking-tighter animate-slide-up">
                            Initialize <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue-400 to-brand-blue-100">Global Dialogue</span>
                        </h1>
                        <p className="text-2xl text-navy-200 max-w-3xl mx-auto font-light leading-relaxed animate-fade-in delay-500">
                            Partner with elite architecture teams to build your enterprise legacy. <br />
                        </p>
                    </div>
                </section>

                {/* Form & Info Section */}
                <section className="py-40 bg-white relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="grid lg:grid-cols-12 gap-24">
                            {/* Left Column: Contact Info */}
                            <div className="lg:col-span-5 space-y-16">
                                <div className="space-y-6">
                                    <h2 className="text-brand-blue-600 font-black tracking-[0.3em] text-sm uppercase">CONTACT CHANNELS</h2>
                                    <h3 className="text-5xl font-extrabold text-navy-950 tracking-tight leading-tight">Direct Access to <span className="text-brand-blue-600">Expertise</span></h3>
                                </div>

                                <div className="space-y-8">
                                    {[
                                        { title: "Our Headquarters", content: "Covai Main Road, Karur, Tamil Nadu, India", icon: "map-pin" },
                                        { title: "Secure Communications", content: "+91 81485 49511\n+91 63796 44145", icon: "phone" },
                                        { title: "Digital Correspondence", content: "connect@echoess.in", icon: "mail" },
                                        { title: "Operational Hours", content: "Monday - Friday: 09:00 - 18:00 PST", icon: "clock" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-8 group">
                                            <div className="w-16 h-16 bg-navy-50 rounded-2xl flex-shrink-0 flex items-center justify-center group-hover:bg-brand-blue-600 transition-all duration-500">
                                                <i data-lucide={item.icon} className="w-8 h-8 text-brand-blue-600 group-hover:text-white"></i>
                                            </div>
                                            <div className="space-y-2">
                                                <h4 className="text-sm font-black text-navy-400 uppercase tracking-widest">{item.title}</h4>
                                                <p className="text-xl text-navy-950 font-medium whitespace-pre-line leading-relaxed">{item.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Column: Premium Form */}
                            <div className="lg:col-span-7">
                                <div className="relative group">
                                    <div className="absolute -inset-4 bg-gradient-to-br from-brand-blue-500/15 to-brand-blue-700/10 rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                    <div className="relative bg-white p-8 lg:p-12 rounded-2xl border border-navy-100 shadow-glass shadow-xl">
                                        <div className="mb-8">
                                            <h3 className="text-3xl font-black text-navy-950 mb-2">Send us a message</h3>
                                            <p className="text-navy-600">We'd love to hear from you. Please fill out this form to get in touch.</p>
                                        </div>

                                        <form className="space-y-6" onSubmit={handleSubmit}>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label htmlFor="firstName" className="block text-xs font-black uppercase text-navy-400 tracking-wider pl-2">First Name *</label>
                                                    <div className="relative">
                                                        <input type="text" id="firstName" value={formData.firstName} onChange={handleInputChange} required className="w-full bg-navy-50 border border-navy-200 rounded-xl px-5 py-4 text-navy-950 focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 transition-all peer" placeholder="Enter your first name" />
                                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 opacity-0 peer-focus:opacity-100 transition-opacity">
                                                            <i data-lucide="user" className="w-5 h-5 text-brand-blue-500"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label htmlFor="lastName" className="block text-xs font-black uppercase text-navy-400 tracking-wider pl-2">Last Name *</label>
                                                    <div className="relative">
                                                        <input type="text" id="lastName" value={formData.lastName} onChange={handleInputChange} required className="w-full bg-navy-50 border border-navy-200 rounded-xl px-5 py-4 text-navy-950 focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 transition-all peer" placeholder="Enter your last name" />
                                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 opacity-0 peer-focus:opacity-100 transition-opacity">
                                                            <i data-lucide="user" className="w-5 h-5 text-brand-blue-500"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label htmlFor="phone" className="block text-xs font-black uppercase text-navy-400 tracking-wider pl-2">Phone Number *</label>
                                                    <div className="relative">
                                                        <input type="tel" id="phone" value={formData.phone} onChange={handleInputChange} required className="w-full bg-navy-50 border border-navy-200 rounded-xl px-5 py-4 text-navy-950 focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 transition-all peer" placeholder="Enter your phone number" />
                                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 opacity-0 peer-focus:opacity-100 transition-opacity">
                                                            <i data-lucide="phone" className="w-5 h-5 text-brand-blue-500"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label htmlFor="email" className="block text-xs font-black uppercase text-navy-400 tracking-wider pl-2">Email Address *</label>
                                                    <div className="relative">
                                                        <input type="email" id="email" value={formData.email} onChange={handleInputChange} required className="w-full bg-navy-50 border border-navy-200 rounded-xl px-5 py-4 text-navy-950 focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 transition-all peer" placeholder="Enter your email" />
                                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 opacity-0 peer-focus:opacity-100 transition-opacity">
                                                            <i data-lucide="mail" className="w-5 h-5 text-brand-blue-500"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="subject" className="block text-xs font-black uppercase text-navy-400 tracking-wider pl-2">Subject *</label>
                                                <div className="relative">
                                                    <input type="text" id="subject" value={formData.subject} onChange={handleInputChange} required className="w-full bg-navy-50 border border-navy-200 rounded-xl px-5 py-4 text-navy-950 focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 transition-all peer" placeholder="What is this regarding?" />
                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 opacity-0 peer-focus:opacity-100 transition-opacity">
                                                        <i data-lucide="tag" className="w-5 h-5 text-brand-blue-500"></i>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="message" className="block text-xs font-black uppercase text-navy-400 tracking-wider pl-2">Message *</label>
                                                <div className="relative">
                                                    <textarea id="message" value={formData.message} onChange={handleInputChange} required rows={5} className="w-full bg-navy-50 border border-navy-200 rounded-xl px-5 py-4 text-navy-950 focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 transition-all resize-none peer" placeholder="Please enter your message here..."></textarea>
                                                    <div className="absolute bottom-3 right-3 opacity-0 peer-focus:opacity-100 transition-opacity">
                                                        <i data-lucide="pen-tool" className="w-5 h-5 text-brand-blue-500"></i>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-4">
                                                <button type="submit" className="w-full premium-gradient text-white py-4 rounded-xl font-black uppercase tracking-widest shadow-lg shadow-brand-blue-500/20 hover:scale-[1.01] active:scale-100 transition-all duration-300 flex items-center justify-center gap-3">
                                                    <span>Send Message</span>
                                                    <i data-lucide="send" className="w-5 h-5"></i>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Global Offices Section */}
                <section className="py-40 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 relative overflow-hidden">
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0">
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue-500/10 rounded-full blur-[120px] animate-pulse"></div>
                        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-brand-blue-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-brand-blue-400/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="text-center mb-24 space-y-8">
                            <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-brand-blue-500/10 border border-brand-blue-500/20 backdrop-blur-xl">
                                <i data-lucide="globe" className="w-6 h-6 text-brand-blue-400"></i>
                                <span className="text-brand-blue-400 font-black tracking-[0.3em] text-sm uppercase">GLOBAL COMMAND NETWORK</span>
                            </div>
                            <h3 className="text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
                                Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue-400 to-cyan-400">Operational Hubs</span>
                            </h3>
                            <p className="text-xl text-navy-200 max-w-3xl mx-auto font-light leading-relaxed">
                                Our global network of elite operational hubs ensures 24/7 coverage with immediate response capabilities across multiple time zones.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    city: "Karur",
                                    country: "India",
                                    address: "Covai Main Road, Karur, Tamil Nadu",
                                    phone: "+91 81485 49511",
                                    timezone: "IST (UTC+5:30)",
                                    capacity: "Primary Operations Hub",
                                    icon: "building-2",
                                    status: "Active",
                                    metrics: [
                                        { label: "Team Size", value: "45+ Experts" },
                                        { label: "Uptime", value: "99.98%" }
                                    ]
                                },
                                {
                                    city: "Coimbatore",
                                    country: "India",
                                    address: "Thomas Street, Coimbatore, Tamil Nadu",
                                    phone: "+91 63796 44145",
                                    timezone: "IST (UTC+5:30)",
                                    capacity: "Research & Development Center",
                                    icon: "microscope",
                                    status: "Active",
                                    metrics: [
                                        { label: "Projects", value: "120+" },
                                        { label: "Innovations", value: "25+ Patents" }
                                    ]
                                },
                                {
                                    city: "Coimbatore",
                                    country: "India",
                                    address: "Anna Salai, Coimbatore, Tamil Nadu",
                                    phone: "+91 63796 44145",
                                    timezone: "IST (UTC+5:30)",
                                    capacity: "Client Success Center",
                                    icon: "users",
                                    status: "Active",
                                    metrics: [
                                        { label: "Clients", value: "200+" },
                                        { label: "Satisfaction", value: "98.7%" }
                                    ]
                                }
                            ].map((office, i) => (
                                <div key={i} className="group bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-3 relative overflow-hidden hover:border-brand-blue-500/30">
                                    {/* Hover Glow Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>

                                    {/* Status Indicator */}
                                    <div className="absolute top-6 right-6 flex items-center gap-2">
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-xs font-bold text-green-400 uppercase tracking-wider">{office.status}</span>
                                    </div>

                                    {/* Icon */}
                                    <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-brand-blue-500/10 to-cyan-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:from-brand-blue-500/20 group-hover:to-cyan-500/20 transition-all duration-500 shadow-lg group-hover:shadow-xl group-hover:-translate-y-1">
                                        <i data-lucide={office.icon} className="w-12 h-12 text-brand-blue-400 group-hover:text-cyan-400 transition-colors duration-500"></i>
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10 space-y-6">
                                        <div>
                                            <h3 className="text-3xl font-black text-white mb-2 tracking-tight group-hover:text-brand-blue-400 transition-colors duration-300">{office.city}</h3>
                                            <p className="text-brand-blue-400 font-extrabold tracking-widest text-xs uppercase">{office.country}</p>
                                        </div>

                                        <div className="space-y-4 pt-6 border-t border-white/10">
                                            <div className="flex items-start gap-3">
                                                <i data-lucide="map-pin" className="w-5 h-5 text-brand-blue-400 flex-shrink-0 mt-0.5"></i>
                                                <p className="text-navy-200 font-light leading-relaxed">{office.address}</p>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <i data-lucide="phone" className="w-5 h-5 text-brand-blue-400"></i>
                                                <p className="text-white font-bold">{office.phone}</p>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <i data-lucide="clock" className="w-5 h-5 text-brand-blue-400"></i>
                                                <p className="text-navy-300 font-medium text-sm">{office.timezone}</p>
                                            </div>
                                        </div>

                                        {/* Metrics */}
                                        <div className="grid grid-cols-2 gap-4 pt-4">
                                            {office.metrics.map((metric, j) => (
                                                <div key={j} className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
                                                    <p className="text-lg font-black text-white">{metric.value}</p>
                                                    <p className="text-xs text-navy-400 uppercase tracking-wider">{metric.label}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="pt-4">
                                            <span className="inline-block px-4 py-2 bg-brand-blue-500/10 text-brand-blue-400 text-xs font-bold rounded-full border border-brand-blue-500/20">
                                                {office.capacity}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Network Visualization */}

                    </div>
                </section>

                {/* Ready to Transform Section (Shared) */}
                <section className="bg-navy-950 py-40 relative overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-brand-blue-600/20 rounded-full blur-[120px]"></div>
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                    </div>

                    <div className="max-w-5xl mx-auto px-6 relative z-10 text-center space-y-12">
                        <h2 className="text-5xl lg:text-8xl font-black text-white leading-tight tracking-tighter">
                            Ready to Build Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue-400 to-brand-blue-100">Legacy?</span>
                        </h2>
                        <p className="text-2xl text-navy-200 font-light max-w-3xl mx-auto leading-relaxed">
                            Join the ranks of global leaders who have scaled their operations with our elite engineering team.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                            <a href="https://forms.gle/K3LySpfU6YYvQKGj9" target="_blank" rel="noopener noreferrer"
                                className="w-full sm:w-auto premium-gradient text-white font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-premium shadow-xl shadow-brand-blue-900/30 text-center text-sm uppercase tracking-wider flex items-center justify-center gap-2">
                                <span className="w-5 h-5"><i data-lucide="calendar" className="w-full h-full"></i></span>
                                Consultation
                            </a>
                            <a href="https://forms.gle/JNS54uLpgQXWP8NZ9" target="_blank" rel="noopener noreferrer"
                                className="w-full sm:w-auto glass-dark hover:bg-white/10 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 border border-white/20 text-center text-sm uppercase tracking-wider flex items-center justify-center gap-2">
                                <span className="w-5 h-5"><i data-lucide="play-circle" className="w-full h-full"></i></span>
                                Request Demo
                            </a>
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

export default Contact;
