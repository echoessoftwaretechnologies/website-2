import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface NavbarProps {
    currentPage?: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage = 'Home' }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const handleLoginClick = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/login');
    };

    const navItems = ['Home', 'Solutions', 'Services', 'About', 'Contact'];

    return (
        <>
            <header className="fixed top-0 w-full z-[100] transition-all duration-500 bg-white/90 backdrop-blur-xl border-b border-gray-200/80 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center">
                            <Link to="/" className="flex-shrink-0 hover:opacity-80 transition-opacity">
                                <img src="/assets/2.png" alt="Echoes Software Technologies" width="160" height="45" />
                            </Link>
                        </div>
                        <nav className="hidden md:flex items-center gap-12">
                            {navItems.map((item) => (
                                <Link
                                    key={item}
                                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                    className={`text-sm font-normal uppercase tracking-[0.2em] transition-all relative group nav-blip ${currentPage === item ? 'text-brand-blue-600 active' : 'text-navy-700 hover:text-brand-blue-600'}`}
                                >
                                    {item}
                                </Link>
                            ))}
                        </nav>
                        <div className="flex items-center gap-6">
                            <button
                                onClick={handleLoginClick}
                                className="hidden md:flex premium-gradient text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-brand-blue-500/25 hover:shadow-xl hover:shadow-brand-blue-500/35 hover:scale-105 active:scale-95 transition-all"
                            >
                                Login
                            </button>
                            <button className="md:hidden w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-100 text-navy-900 hover:bg-gray-200 active:scale-90 transition-all" onClick={toggleMobileMenu}>
                                <i data-lucide="menu" className="w-7 h-7"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Premium Mobile Menu Overlay - Refined text size and spacing */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[200] md:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-navy-900/30 backdrop-blur-sm animate-fade-in"
                        onClick={toggleMobileMenu}
                    />

                    {/* Drawer */}
                    <div className="absolute top-0 right-0 w-3/4 h-full bg-white shadow-2xl animate-slide-in-right flex flex-col">
                        <div className="p-8 flex justify-between items-center border-b border-gray-200">
                            <img src="/assets/2.png" alt="Echoes Logo" className="h-8 w-auto" />
                            <button
                                onClick={toggleMobileMenu}
                                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-100 text-navy-900 hover:bg-gray-200 active:rotate-90 transition-all duration-300"
                            >
                                <i data-lucide="x" className="w-6 h-6"></i>
                            </button>
                        </div>

                        <nav className="flex-1 px-8 py-12 flex flex-col gap-8">
                            {navItems.map((item, i) => (
                                <Link
                                    key={item}
                                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                    onClick={toggleMobileMenu}
                                    className={`text-xl font-normal uppercase tracking-tight transition-all ${currentPage === item ? 'text-brand-blue-600 pl-4 border-l-4 border-brand-blue-600' : 'text-navy-900 hover:text-brand-blue-600 hover:pl-4'}`}
                                    style={{ animationDelay: `${i * 100}ms` }}
                                >
                                    {item}
                                </Link>
                            ))}
                        </nav>

                        <div className="p-8 border-t border-gray-200 space-y-8">
                            <button
                                onClick={handleLoginClick}
                                className="w-full premium-gradient text-white py-5 rounded-3xl font-black uppercase tracking-widest shadow-lg hover:shadow-xl transition-all"
                            >
                                Login
                            </button>
                            <div className="flex justify-center gap-8">
                                {['linkedin', 'instagram', 'message-circle'].map(icon => (
                                    <div key={icon} className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-brand-blue-50 flex items-center justify-center text-navy-600 hover:text-brand-blue-600 transition-all cursor-pointer">
                                        <i data-lucide={icon} className="w-4 h-4"></i>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
