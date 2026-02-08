import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const TermsOfService: React.FC = () => {
    useEffect(() => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white text-navy-900 min-h-screen selection:bg-brand-blue-100 selection:text-brand-blue-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
            <Navbar currentPage="Terms of Service" />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-brand-blue-600 to-indigo-700 py-20 lg:py-32 relative overflow-hidden">
                    {/* Background Patterns */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="absolute -top-24 -left-24 w-64 h-64 lg:w-96 lg:h-96 bg-white rounded-full blur-[100px]" />
                        <div className="absolute bottom-1/2 right-0 w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] border border-white/10 rounded-full" />
                        <div className="absolute -bottom-24 -right-24 w-64 h-64 lg:w-96 lg:h-96 bg-blue-400 rounded-full blur-[100px]" />
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-sm font-bold uppercase tracking-widest mb-6 lg:mb-8 border border-white/20">
                            <i data-lucide="scale" className="w-4 h-4"></i>
                            <span>Legal Agreement</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6 lg:mb-8 tracking-tight drop-shadow-sm">
                            Terms of Service
                        </h1>
                        <p className="text-lg lg:text-xl text-blue-50 max-w-2xl mx-auto font-light leading-relaxed px-4">
                            Please read these terms carefully before using our services. They define our relationship with you.
                        </p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-12 lg:py-24 bg-gray-50 relative">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white rounded-[2rem] lg:rounded-[2.5rem] shadow-xl shadow-gray-200/50 p-6 sm:p-10 md:p-16 border border-gray-100">

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-8 mb-8 lg:mb-12 gap-6 sm:gap-0">
                                <div>
                                    <p className="text-sm font-bold text-navy-400 uppercase tracking-widest mb-1">Effective Date</p>
                                    <p className="text-navy-900 font-semibold">December 28, 2025</p>
                                </div>
                                <div className="text-left sm:text-right">
                                    <p className="text-sm font-bold text-navy-400 uppercase tracking-widest mb-1">Version</p>
                                    <p className="text-navy-900 font-semibold">2.0</p>
                                </div>
                            </div>

                            <article className="prose prose-base md:prose-lg prose-headings:text-navy-950 prose-p:text-navy-600 prose-a:text-brand-blue-600 prose-li:text-navy-600 max-w-none">
                                <p className="lead text-lg md:text-xl text-navy-700 font-light mb-8 lg:mb-12">
                                    Welcome to Echoes Software Technologies ("Company", "we", "our", "us"). These Terms & Conditions ("Terms") govern your access to and use of our websites, applications, software, products, and services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms.
                                </p>

                                <div className="p-6 lg:p-8 bg-blue-50 border border-blue-100 rounded-3xl mb-8 lg:mb-12 not-prose">
                                    <h4 className="text-lg font-bold text-navy-900 mb-2 flex items-center gap-2">
                                        <i data-lucide="info" className="w-5 h-5 text-brand-blue-600"></i>
                                        Important Notice
                                    </h4>
                                    <p className="text-navy-700 text-sm leading-relaxed mb-0">
                                        By using our Services, you represent that you have the legal authority to accept these Terms on behalf of yourself or any party you represent. If you do not agree to these Terms, you are not authorized to use the Services.
                                    </p>
                                </div>

                                <h3>1. Usage & Eligibility</h3>
                                <p>You must use our Services only for lawful purposes. You agree not to:</p>
                                <ul className="marker:text-brand-blue-500">
                                    <li>Violate any applicable national or international laws.</li>
                                    <li>Infringe upon the intellectual property rights of others.</li>
                                    <li>Distribute viruses, malware, or any other harmful code.</li>
                                    <li>Attempt to gain unauthorized access to our systems or user accounts.</li>
                                </ul>

                                <h3>2. Intellectual Property</h3>
                                <p>
                                    All content included on our website and services, such as text, graphics, logos, images, as well as the compilation thereof, and any software used on the site, is the property of Echoes Software Technologies or its suppliers and protected by copyright and other laws.
                                </p>

                                <h3>3. User Accounts</h3>
                                <p>
                                    If you create an account with us, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account. You must immediately notify us of any unauthorized uses of your account or any other breaches of security.
                                </p>

                                <h3>4. Limitation of Liability</h3>
                                <p>
                                    To the maximum extent permitted by applicable law, in no event shall Echoes Software Technologies be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, checking data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service).
                                </p>

                                <blockquote className="border-l-4 border-brand-blue-500 pl-6 italic text-navy-700 bg-gray-50 py-4 pr-4 rounded-r-xl my-8">
                                    "Our liability is limited to the fullest extent permitted by law. We prioritize transparency and fairness in all our agreements."
                                </blockquote>

                                <h3>5. Termination</h3>
                                <p>
                                    We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms and Conditions. Upon termination, your right to use the Service will cease immediately.
                                </p>

                                <h3>6. Governing Law</h3>
                                <p>
                                    These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                                </p>

                                <h3>7. Contact Information</h3>
                                <p>If you have any questions about these Terms, please contact us:</p>

                                <div className="grid md:grid-cols-2 gap-6 not-prose mt-8">
                                    <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                        <div className="w-10 h-10 bg-brand-blue-50 rounded-full flex items-center justify-center mb-4">
                                            <i data-lucide="mail" className="w-5 h-5 text-brand-blue-600"></i>
                                        </div>
                                        <h5 className="font-bold text-navy-900 mb-1">Email Support</h5>
                                        <p className="text-navy-500 text-sm mb-3">Get a response within 24 hours.</p>
                                        <a href="mailto:echoessoftwaretech@gmail.com" className="text-brand-blue-600 font-semibold hover:underline break-all">echoessoftwaretech@gmail.com</a>
                                    </div>
                                    <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                        <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                                            <i data-lucide="phone" className="w-5 h-5 text-purple-600"></i>
                                        </div>
                                        <h5 className="font-bold text-navy-900 mb-1">Phone Support</h5>
                                        <p className="text-navy-500 text-sm mb-3">Mon-Fri from 9am to 6pm.</p>
                                        <a href="tel:+918148549511" className="text-purple-600 font-semibold hover:underline">+91 81485 49511</a>
                                    </div>
                                </div>

                            </article>
                        </div>
                    </div>
                </section>
            </main>

            {/* Comprehensive Footer - Exactly matching Home.tsx */}
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
                                <a href="https://www.linkedin.com/company/echoes-software-solutions/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all hover:scale-110">
                                    <i data-lucide="linkedin" className="w-5 h-5"></i>
                                </a>
                                <a href="https://www.instagram.com/echoes_software_technologies?igsh=OW1xOGpmMzZmZ3Bq" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all hover:scale-110">
                                    <i data-lucide="instagram" className="w-5 h-5"></i>
                                </a>
                                <a href="https://wa.me/918148549511" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all hover:scale-110">
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

export default TermsOfService;
