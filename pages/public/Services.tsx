import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { Globe, Layout, Cloud, TrendingUp, HelpCircle, Palette, MousePointer, Cpu, Video, Code, ShoppingCart, Wrench, Briefcase, Share2, Monitor, Database, Shield, Zap, Headphones, Target, Check, Smartphone, Download, ArrowRight, Menu, X, Linkedin, MessageCircle, Instagram, ArrowRight as ArrowRightIcon } from 'lucide-react';

declare global {
    interface Window {
        lucide: any;
    }
}

const Services: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/login');
    };

    // Define service categories
    const serviceCategories = [
        'All',
        'Development',
        'Design',
        'Business',
        'Infrastructure',
        'Marketing'
    ];

    // Enhanced services data with categories
    const services = [
        {
            title: "Website Development",
            description: "Custom, high-performance websites built with modern frameworks to engage and convert.",
            icon: "globe",
            category: "Development"
        },
        {
            title: "Web Application",
            description: "Scalable and secure web apps designed to solve complex business logic with ease.",
            icon: "layout",
            category: "Development"
        },
        {
            title: "Cloud DevOps",
            description: "Seamless infrastructure management and continuous delivery for global scalability.",
            icon: "cloud",
            category: "Infrastructure"
        },
        {
            title: "Digital Marketing",
            description: "Data-driven strategies to increase visibility and ROI across digital channels.",
            icon: "trending-up",
            category: "Marketing"
        },
        {
            title: "Free IT Consulting",
            description: "Expert technology strategy consulting at zero cost to accelerate your roadmap.",
            icon: "help-circle",
            category: "Business"
        },
        {
            title: "Graphics Designing",
            description: "Premium visual assets that capture brand essence and leave a lasting mark.",
            icon: "palette",
            category: "Design"
        },
        {
            title: "UI/UX Design",
            description: "Intuitive, human-centric design solutions for seamless cross-device experiences.",
            icon: "mouse-pointer",
            category: "Design"
        },
        {
            title: "AI Solutions",
            description: "Machine learning models to automate tasks and gain intelligence.",
            icon: "cpu",
            category: "Development"
        },
        {
            title: "Video Editing",
            description: "Professional post-production storytelling to elevate your brand's message.",
            icon: "video",
            category: "Design"
        },
        {
            title: "Custom Software",
            description: "Bespoke software engineered from the ground up for unique business needs.",
            icon: "code",
            category: "Development"
        },
        {
            title: "E-Commerce Solutions",
            description: "Robust stores designed for high-conversion and secure premium shopping.",
            icon: "shopping-cart",
            category: "Development"
        },
        {
            title: "Maintenance & Support",
            description: "Round-the-clock elite support to keep your ecosystem secure and optimized.",
            icon: "wrench",
            category: "Business"
        },
        {
            title: "Brand Identity",
            description: "Comprehensive branding services to define your voice in a global market.",
            icon: "briefcase",
            category: "Business"
        },
        {
            title: "Social Media Mktg",
            description: "Strategic management to scale your community and drive participation.",
            icon: "share-2",
            category: "Marketing"
        },
        {
            title: "Web Design",
            description: "Modern, aesthetically-led designs prioritizing clarity, speed, and status.",
            icon: "monitor",
            category: "Design"
        },
        {
            title: "ERP Solutions",
            description: "Integrated resource systems to unify processes and maximize efficiency.",
            icon: "database",
            category: "Business"
        },
        {
            title: "Cybersecurity",
            description: "Military-grade measures and assessments to protect your critical data.",
            icon: "shield",
            category: "Infrastructure"
        }
    ];

    // Filter services based on active category
    const filteredServices = activeCategory === 'All'
        ? services
        : services.filter(service => service.category === activeCategory);

    // Count services per category for display purposes
    const categoryCounts = serviceCategories.reduce((acc, category) => {
        acc[category] = category === 'All'
            ? services.length
            : services.filter(s => s.category === category).length;
        return acc;
    }, {} as Record<string, number>);

    return (
        <div className="bg-white text-navy-900 scroll-smooth selection:bg-brand-blue-100 selection:text-brand-blue-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
            <Navbar currentPage="Services" />

            <main>
                <section className="mesh-gradient relative overflow-hidden pt-24 pb-20 lg:pt-40 lg:pb-32">
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                        <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-brand-blue-100/40 rounded-full blur-[140px] animate-float-slow"></div>
                        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-blue-200/20 rounded-full blur-[140px] animate-float-slow" style={{ animationDelay: '-5s' }}></div>
                    </div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-16 animate-slide-up">
                            <div className="inline-flex items-center space-x-3 px-5 py-2.5 bg-white/60 backdrop-blur-md text-brand-blue-700 rounded-full text-sm font-bold tracking-wider border border-white shadow-sm mb-10">
                                <span className="uppercase tracking-[0.2em]">WORLD-CLASS EXPERTISE</span>
                            </div>
                            <h1 className="text-6xl lg:text-8xl font-extrabold text-navy-950 leading-[1] tracking-tight text-balance mb-10">
                                Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue-600 via-brand-blue-500 to-brand-blue-800 animate-shimmer" style={{ backgroundSize: '200% auto' }}>Professional</span> Services
                            </h1>
                            <p className="text-2xl text-navy-600 max-w-3xl mx-auto leading-relaxed font-light">
                                Comprehensive ecosystem of software services precision-engineered to transform enterprise productivity and scale global operations.
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
                        <div className="text-center mb-12 space-y-6 animate-slide-up">
                            <h2 className="text-brand-blue-600 font-black tracking-[0.3em] text-sm uppercase">OUR EXPERTISE</h2>
                            <h3 className="text-5xl lg:text-6xl font-extrabold text-navy-950 tracking-tight">Ecosystem of Solutions</h3>
                            <p className="text-2xl text-navy-600 max-w-2xl mx-auto font-light leading-relaxed">
                                We provide a specialized range of premium software services tailored to drive enterprise growth.
                            </p>
                        </div>

                        {/* Service Categories Filter */}
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
                            {serviceCategories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${activeCategory === category
                                        ? 'bg-brand-blue-600 text-white shadow-lg'
                                        : 'bg-navy-100 text-navy-700 hover:bg-brand-blue-100 hover:text-brand-blue-700'}`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Services Grid with Active Category Label */}
                        <div className="mb-8 text-center">
                            <span className="inline-block px-6 py-2 bg-brand-blue-100 text-brand-blue-700 rounded-full text-sm font-bold uppercase tracking-wider">
                                Showing: {activeCategory} Services ({filteredServices.length})
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {filteredServices.map((service, index) => (
                                <div key={`${service.title}-${index}`} className="group bg-white p-7 md:p-8 rounded-2xl border border-navy-100 shadow-glass hover:shadow-xl hover:shadow-brand-blue-500/20 hover-lift transition-all duration-500 flex flex-col h-full relative overflow-hidden animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                                    {/* Category badge */}
                                    <div className="absolute top-3 right-3 md:top-4 md:right-4 px-3 py-1 bg-brand-blue-100 text-brand-blue-700 text-xs font-bold rounded-full uppercase tracking-wider">
                                        {service.category}
                                    </div>

                                    {/* Animated gradient top border */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-blue-500 to-brand-blue-700 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>

                                    {/* Icon container */}
                                    <div className="w-14 h-14 md:w-16 md:h-16 bg-brand-blue-50/70 rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-brand-blue-100 transition-all duration-500 shadow-sm mx-auto">
                                        {service.icon === 'globe' && <Globe className="w-7 h-7 md:w-8 md:h-8 text-brand-blue-600 group-hover:text-brand-blue-700 transition-colors duration-500" />}
                                        {service.icon === 'layout' && <Layout className="w-7 h-7 md:w-8 md:h-8 text-brand-blue-600 group-hover:text-brand-blue-700 transition-colors duration-500" />}
                                        {service.icon === 'cloud' && <Cloud className="w-7 h-7 md:w-8 md:h-8 text-brand-blue-600 group-hover:text-brand-blue-700 transition-colors duration-500" />}
                                        {service.icon === 'trending-up' && <TrendingUp className="w-7 h-7 md:w-8 md:h-8 text-brand-blue-600 group-hover:text-brand-blue-700 transition-colors duration-500" />}
                                        {service.icon === 'help-circle' && <HelpCircle className="w-7 h-7 md:w-8 md:h-8 text-brand-blue-600 group-hover:text-brand-blue-700 transition-colors duration-500" />}
                                        {service.icon === 'palette' && <Palette className="w-7 h-7 md:w-8 md:h-8 text-brand-blue-600 group-hover:text-brand-blue-700 transition-colors duration-500" />}
                                        {service.icon === 'mouse-pointer' && <MousePointer className="w-7 h-7 md:w-8 md:h-8 text-brand-blue-600 group-hover:text-brand-blue-700 transition-colors duration-500" />}
                                        {service.icon === 'cpu' && <Cpu className="w-7 h-7 md:w-8 md:h-8 text-brand-blue-600 group-hover:text-brand-blue-700 transition-colors duration-500" />}
                                        {service.icon === 'video' && <Video className="w-7 h-7 md:w-8 md:h-8 text-brand-blue-600 group-hover:text-brand-blue-700 transition-colors duration-500" />}
                                        {service.icon === 'code' && <Code className="w-7 h-7 md:w-8 md:h-8 text-brand-blue-600 group-hover:text-brand-blue-700 transition-colors duration-500" />}
                                        {service.icon === 'shopping-cart' && <ShoppingCart className="w-7 h-7 md:w-8 md:h-8 text-brand-blue-600 group-hover:text-brand-blue-700 transition-colors duration-500" />}
                                        {service.icon === 'wrench' && <Wrench className="w-7 h-7 md:w-8 md:h-8 text-brand-blue-600 group-hover:text-brand-blue-700 transition-colors duration-500" />}
                                        {service.icon === 'briefcase' && <Briefcase className="w-7 h-7 md:w-8 md:h-8 text-brand-blue-600 group-hover:text-brand-blue-700 transition-colors duration-500" />}
                                        {service.icon === 'share-2' && <Share2 className="w-7 h-7 md:w-8 md:h-8 text-brand-blue-600 group-hover:text-brand-blue-700 transition-colors duration-500" />}
                                        {service.icon === 'monitor' && <Monitor className="w-7 h-7 md:w-8 md:h-8 text-brand-blue-600 group-hover:text-brand-blue-700 transition-colors duration-500" />}
                                        {service.icon === 'database' && <Database className="w-7 h-7 md:w-8 md:h-8 text-brand-blue-600 group-hover:text-brand-blue-700 transition-colors duration-500" />}
                                        {service.icon === 'shield' && <Shield className="w-7 h-7 md:w-8 md:h-8 text-brand-blue-600 group-hover:text-brand-blue-700 transition-colors duration-500" />}
                                    </div>

                                    {/* Content container */}
                                    <div className="flex-grow flex flex-col">
                                        <h3 className="text-lg md:text-xl font-black text-navy-950 mb-3 md:mb-4 uppercase tracking-tight text-center group-hover:text-brand-blue-600 transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-navy-600 leading-relaxed mb-4 md:mb-6 text-sm md:text-base font-light text-center flex-grow">
                                            {service.description}
                                        </p>

                                        {/* Service tags/badges */}
                                        <div className="flex flex-wrap justify-center gap-2 mb-4 md:mb-6">
                                            <span className="px-3 py-1 bg-brand-blue-100 text-brand-blue-700 text-xs font-bold rounded-full uppercase tracking-wider">
                                                Professional
                                            </span>
                                            <span className="px-3 py-1 bg-navy-100 text-navy-700 text-xs font-bold rounded-full uppercase tracking-wider">
                                                Custom
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action button */}
                                    <button
                                        onClick={() => navigate('/contact', { state: { subject: service.title } })}
                                        className="flex items-center justify-center text-brand-blue-600 font-black uppercase tracking-wider text-xs hover:text-brand-blue-800 transition-all group-hover:gap-2 mt-auto py-3 px-6 rounded-full hover:bg-brand-blue-50 border border-brand-blue-100 mx-auto w-full sm:w-auto"
                                    >
                                        <span>Learn More</span>
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Show message when no services match filter */}
                        {filteredServices.length === 0 && (
                            <div className="text-center py-16">
                                <div className="text-5xl mb-4">🔍</div>
                                <h3 className="text-2xl font-bold text-navy-900 mb-2">No services found</h3>
                                <p className="text-navy-600 max-w-md mx-auto">
                                    We couldn't find any services matching "{activeCategory}". Try selecting another category.
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Enterprise-Grade Service Capabilities */}
                <section className="bg-white py-32 relative overflow-hidden">
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-brand-blue-50 rounded-full blur-[100px] pointer-events-none opacity-50"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-24 space-y-6">
                            <h2 className="text-brand-blue-600 font-black tracking-[0.2em] text-sm uppercase">BEYOND DELIVERY</h2>
                            <h3 className="text-5xl lg:text-6xl font-extrabold text-navy-950 tracking-tight">Enterprise-Grade Standards</h3>
                            <p className="text-2xl text-navy-600 max-w-2xl mx-auto font-light leading-relaxed">
                                Our services are backed by industry-leading protocols and technical excellence.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { title: "Global Scalability", desc: "Architecture designed to support millions of concurrent users with sub-second latency.", icon: "zap" },
                                { title: "Defense-In-Depth", desc: "Multi-layered security protocols ensuring total protection of enterprise data assets.", icon: "shield" },
                                { title: "24/7 Elite Support", desc: "Dedicated team of technical experts available round-the-clock for mission-critical care.", icon: "headphones" },
                                { title: "Agile Precision", desc: "Rapid deployment cycles combined with rigorous quality assurance for zero-defect delivery.", icon: "target" }
                            ].map((cap, i) => (
                                <div key={i} className="bg-navy-50/50 rounded-3xl p-10 border border-navy-100 hover:bg-white hover:shadow-premium transition-all duration-300 group hover-lift text-center">
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-brand-blue-600 transition-colors mx-auto">
                                        {cap.icon === 'zap' && <Zap className="w-8 h-8 text-brand-blue-600 group-hover:text-white transition-colors" />}
                                        {cap.icon === 'shield' && <Shield className="w-8 h-8 text-brand-blue-600 group-hover:text-white transition-colors" />}
                                        {cap.icon === 'headphones' && <Headphones className="w-8 h-8 text-brand-blue-600 group-hover:text-white transition-colors" />}
                                        {cap.icon === 'target' && <Target className="w-8 h-8 text-brand-blue-600 group-hover:text-white transition-colors" />}
                                    </div>
                                    <h4 className="text-xl font-black text-navy-950 mb-4 uppercase tracking-tight group-hover:text-brand-blue-600 transition-colors">{cap.title}</h4>
                                    <p className="text-navy-600 leading-relaxed font-light">{cap.desc}</p>
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
                        <div className="glass-dark p-16 lg:p-32 rounded-[4rem] border border-white/10 text-center space-y-16 shadow-2xl">
                            <div className="max-w-4xl mx-auto space-y-8">
                                <h2 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter text-balance">
                                    Power Your <br />
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue-400 to-brand-blue-200">Digital Transformation</span>
                                </h2>
                                <p className="text-2xl text-navy-200 leading-relaxed font-light">
                                    Partner with Echoes Software Technologies to leverage world-class <br className="hidden lg:block" />
                                    engineering talent for your next strategic initiative.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                                <a href="https://forms.gle/K3LySpfU6YYvQKGj9" target="_blank" rel="noopener noreferrer"
                                    className="w-full sm:w-auto premium-gradient text-white font-black px-12 py-6 rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-premium shadow-2xl shadow-brand-blue-900/40 text-center text-xl uppercase tracking-widest">
                                    Consult an Expert
                                </a>
                                <a href="https://forms.gle/JNS54uLpgQXWP8NZ9" target="_blank" rel="noopener noreferrer"
                                    className="w-full sm:w-auto glass-dark hover:bg-white/10 text-white font-black px-12 py-6 rounded-full transition-all duration-500 border border-white/20 text-center text-xl uppercase tracking-widest">
                                    Request Ecosystem Demo
                                </a>
                            </div>

                            <div className="pt-10 flex flex-wrap items-center justify-center gap-12 text-navy-400">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <Check className="w-5 h-5 text-green-500" />
                                    </div>
                                    <span className="font-bold uppercase text-xs tracking-[0.2em]">Priority Onboarding</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <Check className="w-5 h-5 text-green-500" />
                                    </div>
                                    <span className="font-bold uppercase text-xs tracking-[0.2em]">Dedicated Team Lead</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <Check className="w-5 h-5 text-green-500" />
                                    </div>
                                    <span className="font-bold uppercase text-xs tracking-[0.2em]">Global SLA Guarantee</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mobile App Section */}
                <section className="bg-navy-50 py-32 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="bg-white rounded-2xl shadow-premium p-12 lg:p-20 relative overflow-hidden border border-navy-100">
                            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue-50/50 rounded-full blur-[100px] pointer-events-none"></div>

                            <div className="grid lg:grid-cols-2 gap-16 items-center">
                                <div className="space-y-10">
                                    <div className="space-y-6">
                                        <div className="w-16 h-16 bg-brand-blue-50 rounded-2xl flex items-center justify-center text-brand-blue-600 shadow-sm">
                                            <Smartphone className="w-8 h-8" />
                                        </div>
                                        <h2 className="text-4xl lg:text-5xl font-black text-navy-950 tracking-tight leading-tight">Mobile Ecosystem <br /> Now Available</h2>
                                        <p className="text-xl text-navy-600 font-light leading-relaxed">
                                            Access our powerful software solutions anytime, anywhere. Our feature-rich mobile application keeps your business at your fingertips.
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        {['Hyper-fast Performance', 'Military-grade Secure Access', 'Real-time Ecosystem Sync', 'Advanced Offline Mode'].map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-4 group">
                                                <div className="w-10 h-10 rounded-xl bg-brand-blue-50 flex items-center justify-center group-hover:bg-brand-blue-600 transition-colors">
                                                    <Zap className="w-5 h-5 text-brand-blue-600 group-hover:text-white" />
                                                </div>
                                                <span className="text-lg font-bold text-navy-800 tracking-tight uppercase tracking-widest text-xs">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <a href="./Echoes Software Technologies.apk" download
                                        className="inline-flex items-center justify-center premium-gradient text-white font-black px-12 py-6 rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-premium shadow-xl shadow-brand-blue-200 text-xl uppercase tracking-widest w-full sm:w-auto">
                                        <Download className="w-6 h-6 mr-3" />
                                        Download App (APK)
                                    </a>
                                </div>

                                <div className="relative">
                                    <div className="absolute -inset-10 bg-brand-blue-100/30 rounded-full blur-[80px] z-0"></div>
                                    <div className="relative z-10 bg-navy-950 p-4 rounded-[3rem] shadow-2xl border-4 border-white/20 hover:rotate-2 transition-transform duration-700">
                                        <div className="bg-navy-900 rounded-[2.5rem] p-8 text-white space-y-6 aspect-[9/16] flex flex-col justify-center border border-white/10">
                                            <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-10"></div>
                                            <div className="space-y-2 text-center">
                                                <img src="/assets/3.png" alt="Echoes Mobile" className="h-8 mx-auto" />
                                                <div className="text-2xl font-black uppercase tracking-[0.2em] italic">Mobile</div>
                                            </div>
                                            <div className="flex-grow flex items-center justify-center">
                                                <div className="w-40 h-40 bg-brand-blue-600/20 rounded-full flex items-center justify-center animate-pulse">
                                                    <Shield className="w-20 h-20 text-brand-blue-500" />
                                                </div>
                                            </div>
                                            <div className="text-center space-y-4">
                                                <div className="text-xs font-bold text-white/40 uppercase tracking-widest">System Status</div>
                                                <div className="flex justify-center gap-2">
                                                    {[1, 2, 3, 4].map(i => <div key={i} className="w-8 h-1 bg-brand-blue-500 rounded-full"></div>)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all hover:scale-110">
                                    <i data-lucide="linkedin" className="w-5 h-5"></i>
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all hover:scale-110">
                                    <i data-lucide="instagram" className="w-5 h-5"></i>
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all hover:scale-110">
                                    <i data-lucide="twitter" className="w-5 h-5"></i>
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

export default Services;
