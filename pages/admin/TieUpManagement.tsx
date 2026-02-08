import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, AlertTriangle, X } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

interface TieUp {
    id: string;
    company: string;
    contact: string;
    type: string;
    status: 'Active' | 'Inactive';
    startDate: string;
    endDate: string;
    expectedRevenue: number;
    actualRevenue: number;
    expiringWarning?: boolean;
}

const TieUpManagement: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [typeFilter, setTypeFilter] = useState('All Types');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTieUp, setSelectedTieUp] = useState<TieUp | null>(null);
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const [formData, setFormData] = useState({
        company: '',
        contact: '',
        type: 'Technology',
        status: 'Active' as 'Active' | 'Inactive',
        startDate: '',
        endDate: '',
        expectedRevenue: 0,
        actualRevenue: 0
    });

    const [tieUps, setTieUps] = useState<TieUp[]>([
        {
            id: '1',
            company: 'Tech Solutions Inc.',
            contact: 'John Davis',
            type: 'Technology',
            status: 'Active',
            startDate: '15/1/2024',
            endDate: '15/1/2025',
            expectedRevenue: 500000,
            actualRevenue: 350000,
            expiringWarning: true
        },
        {
            id: '2',
            company: 'Marketing Pro Ltd.',
            contact: 'Sarah Wilson',
            type: 'Marketing',
            status: 'Active',
            startDate: '1/3/2024',
            endDate: '31/12/2024',
            expectedRevenue: 300000,
            actualRevenue: 280000,
            expiringWarning: true
        }
    ]);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const totalTieUps = tieUps.length;
    const activeTieUps = tieUps.filter(t => t.status === 'Active').length;
    const expiringTieUps = tieUps.filter(t => t.expiringWarning).length;
    const totalRevenue = tieUps.reduce((sum, t) => sum + t.actualRevenue, 0);

    const filteredTieUps = tieUps.filter(tieUp => {
        const matchesSearch = tieUp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tieUp.contact.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'All Status' || tieUp.status === statusFilter;
        const matchesType = typeFilter === 'All Types' || tieUp.type === typeFilter;
        return matchesSearch && matchesStatus && matchesType;
    });

    const resetForm = () => {
        setFormData({
            company: '',
            contact: '',
            type: 'Technology',
            status: 'Active',
            startDate: '',
            endDate: '',
            expectedRevenue: 0,
            actualRevenue: 0
        });
    };

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        const newTieUp: TieUp = {
            id: Date.now().toString(),
            ...formData
        };
        setTieUps([...tieUps, newTieUp]);
        setShowAddModal(false);
        resetForm();
        setNotification({ type: 'success', message: 'Tie-up added successfully!' });
    };

    const handleEdit = (tieUp: TieUp) => {
        setSelectedTieUp(tieUp);
        setFormData({
            company: tieUp.company,
            contact: tieUp.contact,
            type: tieUp.type,
            status: tieUp.status,
            startDate: tieUp.startDate,
            endDate: tieUp.endDate,
            expectedRevenue: tieUp.expectedRevenue,
            actualRevenue: tieUp.actualRevenue
        });
        setShowEditModal(true);
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedTieUp) {
            setTieUps(tieUps.map(t => t.id === selectedTieUp.id ? { ...selectedTieUp, ...formData } : t));
            setShowEditModal(false);
            setSelectedTieUp(null);
            resetForm();
            setNotification({ type: 'success', message: 'Tie-up updated successfully!' });
        }
    };

    const handleDelete = () => {
        if (selectedTieUp) {
            setTieUps(tieUps.filter(t => t.id !== selectedTieUp.id));
            setShowDeleteModal(false);
            setSelectedTieUp(null);
            setNotification({ type: 'success', message: 'Tie-up deleted successfully!' });
        }
    };

    const openDeleteModal = (tieUp: TieUp) => {
        setSelectedTieUp(tieUp);
        setShowDeleteModal(true);
    };

    const TieUpForm = ({ onSubmit, buttonText }: { onSubmit: (e: React.FormEvent) => void, buttonText: string }) => (
        <form onSubmit={onSubmit} className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label className="block text-[10px] font-black text-navy-500 dark:text-navy-400 uppercase tracking-widest mb-2 px-1">Entity Name</label>
                    <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black placeholder:text-navy-300 dark:placeholder:text-navy-600"
                        placeholder="Company identifier..."
                        required
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-black text-navy-500 dark:text-navy-400 uppercase tracking-widest mb-2 px-1">Primary Agent</label>
                    <input
                        type="text"
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        className="w-full bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black placeholder:text-navy-300 dark:placeholder:text-navy-600"
                        placeholder="Primary agent..."
                        required
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-black text-navy-500 dark:text-navy-400 uppercase tracking-widest mb-2 px-1">Nexus Typology</label>
                    <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all cursor-pointer font-black"
                    >
                        <option className="dark:bg-navy-900">Technology</option>
                        <option className="dark:bg-navy-900">Marketing</option>
                        <option className="dark:bg-navy-900">Finance</option>
                        <option className="dark:bg-navy-900">Consulting</option>
                    </select>
                </div>
                <div>
                    <label className="block text-[10px] font-black text-navy-500 dark:text-navy-400 uppercase tracking-widest mb-2 px-1">System State</label>
                    <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Active' | 'Inactive' })}
                        className="w-full bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all cursor-pointer font-black"
                    >
                        <option className="dark:bg-navy-900">Active</option>
                        <option className="dark:bg-navy-900">Inactive</option>
                    </select>
                </div>
                <div>
                    <label className="block text-[10px] font-black text-navy-500 dark:text-navy-400 uppercase tracking-widest mb-2 px-1">Genesis Date</label>
                    <input
                        type="text"
                        placeholder="DD/MM/YYYY"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="w-full bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black"
                        required
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-black text-navy-500 dark:text-navy-400 uppercase tracking-widest mb-2 px-1">Terminal Date</label>
                    <input
                        type="text"
                        placeholder="DD/MM/YYYY"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        className="w-full bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black"
                        required
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-black text-navy-500 dark:text-navy-400 uppercase tracking-widest mb-2 px-1">Projected Quant (₹)</label>
                    <input
                        type="number"
                        value={formData.expectedRevenue}
                        onChange={(e) => setFormData({ ...formData, expectedRevenue: Number(e.target.value) })}
                        className="w-full bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black"
                        required
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-black text-navy-500 dark:text-navy-400 uppercase tracking-widest mb-2 px-1">Realized Quant (₹)</label>
                    <input
                        type="number"
                        value={formData.actualRevenue}
                        onChange={(e) => setFormData({ ...formData, actualRevenue: Number(e.target.value) })}
                        className="w-full bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black"
                        required
                    />
                </div>
            </div>
            <button
                type="submit"
                className="w-full bg-brand-blue-600 hover:bg-brand-blue-500 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all shadow-xl shadow-brand-blue-900/40 active:scale-95"
            >
                {buttonText}
            </button>
        </form>
    );

    return (
        <AdminLayout title="Tie-ups Management" subtitle="Partnership Intelligence">
            <div className={`space-y-8 transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

                {/* Notification */}
                {notification && (
                    <div className={`fixed top-24 right-8 z-50 px-6 py-4 rounded-2xl shadow-lg border animate-slide-in-right ${notification.type === 'success'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 backdrop-blur-md'
                            : 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20 backdrop-blur-md'
                        }`}>
                        <p className="font-bold uppercase tracking-widest text-[10px]">{notification.message}</p>
                    </div>
                )}

                {/* Header with Add Button */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 className="text-2xl md:text-3xl font-black tracking-tight text-navy-950 dark:text-white uppercase">Tie-up Nexus</h2>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-blue-600 hover:bg-brand-blue-700 text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Tie-up
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Total Tie-ups', value: totalTieUps.toString(), icon: '🤝', bgColor: 'bg-brand-blue-50 dark:bg-brand-blue-500/5', iconBg: 'bg-brand-blue-100 dark:bg-brand-blue-500/10', textColor: 'text-brand-blue-600 dark:text-brand-blue-400', borderColor: 'border-brand-blue-100 dark:border-brand-blue-500/20' },
                        { label: 'Active States', value: activeTieUps.toString(), icon: '📈', bgColor: 'bg-emerald-50 dark:bg-emerald-500/5', iconBg: 'bg-emerald-100 dark:bg-emerald-500/10', textColor: 'text-emerald-600 dark:text-emerald-400', borderColor: 'border-emerald-100 dark:border-emerald-500/20' },
                        { label: 'Value Generated', value: `₹${(totalRevenue / 100000).toFixed(1)}L`, icon: '💰', bgColor: 'bg-amber-50 dark:bg-amber-500/5', iconBg: 'bg-amber-100 dark:bg-amber-500/10', textColor: 'text-amber-600 dark:text-amber-400', borderColor: 'border-amber-100 dark:border-amber-500/20' },
                        { label: 'Expiry Alerts', value: expiringTieUps.toString(), icon: '📅', bgColor: 'bg-purple-50 dark:bg-purple-500/5', iconBg: 'bg-purple-100 dark:bg-purple-500/10', textColor: 'text-purple-600 dark:text-purple-400', borderColor: 'border-purple-100 dark:border-purple-500/20' }
                    ].map((stat, i) => (
                        <div key={i} className={`${stat.bgColor} ${stat.borderColor} rounded-[2rem] p-6 border group hover:scale-[1.02] transition-all duration-300 shadow-sm backdrop-blur-sm`}>
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 ${stat.iconBg} rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>{stat.icon}</div>
                            </div>
                            <div className={`text-3xl font-black mb-1 ${stat.textColor} tracking-tight`}>{stat.value}</div>
                            <div className="text-[10px] font-black text-navy-500 dark:text-navy-400 uppercase tracking-widest">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Tie-ups List Section */}
                <div className="bg-white dark:bg-white/[0.02] rounded-[2.5rem] border border-navy-100 dark:border-white/5 shadow-xl shadow-navy-100/20 dark:shadow-navy-950/50 overflow-hidden">
                    <div className="p-6 md:p-8 border-b border-navy-100 dark:border-white/5">
                        <h3 className="text-xl md:text-2xl font-black mb-6 text-navy-950 dark:text-white uppercase tracking-tight">Active Ledger</h3>
                        <div className="flex flex-col lg:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-navy-400" />
                                <input type="text" placeholder="Scan identification..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-navy-50/50 dark:bg-white/5 border border-navy-100 dark:border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black" />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-navy-50/50 dark:bg-white/5 border border-navy-100 dark:border-white/10 rounded-2xl px-6 py-3.5 text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all cursor-pointer font-black">
                                    <option className="dark:bg-navy-900">All Status</option><option className="dark:bg-navy-900">Active</option><option className="dark:bg-navy-900">Inactive</option>
                                </select>
                                <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="bg-navy-50/50 dark:bg-white/5 border border-navy-100 dark:border-white/10 rounded-2xl px-6 py-3.5 text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all cursor-pointer font-black">
                                    <option className="dark:bg-navy-900">All Types</option><option className="dark:bg-navy-900">Technology</option><option className="dark:bg-navy-900">Marketing</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-navy-50/50 dark:bg-white/[0.02]">
                                <tr>
                                    <th className="px-6 py-5 text-left text-[10px] font-black text-navy-500 uppercase tracking-widest border-b border-navy-100 dark:border-white/5">Entity Core</th>
                                    <th className="px-6 py-5 text-left text-[10px] font-black text-navy-500 uppercase tracking-widest border-b border-navy-100 dark:border-white/5">Nexus Typology</th>
                                    <th className="px-6 py-5 text-left text-[10px] font-black text-navy-500 uppercase tracking-widest border-b border-navy-100 dark:border-white/5">System State</th>
                                    <th className="px-6 py-5 text-left text-[10px] font-black text-navy-500 uppercase tracking-widest border-b border-navy-100 dark:border-white/5">Genesis</th>
                                    <th className="px-6 py-5 text-left text-[10px] font-black text-navy-500 uppercase tracking-widest border-b border-navy-100 dark:border-white/5">Terminal</th>
                                    <th className="px-6 py-5 text-left text-[10px] font-black text-navy-500 uppercase tracking-widest border-b border-navy-100 dark:border-white/5">Value Vector</th>
                                    <th className="px-6 py-5 text-left text-[10px] font-black text-navy-500 uppercase tracking-widest border-b border-navy-100 dark:border-white/5">Control</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-navy-100 dark:divide-white/5">
                                {filteredTieUps.map((tieUp) => (
                                    <tr key={tieUp.id} className="hover:bg-navy-50 dark:hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-brand-blue-50 dark:bg-white/5 rounded-2xl flex items-center justify-center border border-brand-blue-100 dark:border-white/10 group-hover:scale-110 transition-transform">
                                                    <span className="text-xl">🤝</span>
                                                </div>
                                                <div>
                                                    <div className="text-sm font-black text-navy-950 dark:text-white uppercase tracking-tight">{tieUp.company}</div>
                                                    <div className="text-[10px] font-bold text-navy-500 dark:text-navy-400 uppercase tracking-widest">{tieUp.contact}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className={`px-3 py-1 rounded-lg text-[10px] font-black border uppercase tracking-widest ${tieUp.type === 'Technology'
                                                    ? 'bg-brand-blue-500/10 text-brand-blue-600 dark:text-brand-blue-400 border-brand-blue-500/20'
                                                    : 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
                                                }`}>
                                                {tieUp.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex flex-col gap-2">
                                                <span className={`w-fit px-3 py-1 rounded-lg text-[10px] font-black border uppercase tracking-widest ${tieUp.status === 'Active'
                                                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                                                        : 'bg-navy-100 dark:bg-white/5 text-navy-500 dark:text-navy-400 border-navy-200 dark:border-white/10'
                                                    }`}>
                                                    {tieUp.status}
                                                </span>
                                                {tieUp.expiringWarning && (
                                                    <div className="flex items-center gap-1.5 text-amber-500 animate-pulse">
                                                        <AlertTriangle className="w-3 h-3" />
                                                        <span className="text-[9px] font-black uppercase tracking-widest">Expiry imminent</span>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-sm font-black text-navy-600 dark:text-navy-400">{tieUp.startDate}</td>
                                        <td className="px-6 py-6 text-sm font-black text-navy-600 dark:text-navy-400">{tieUp.endDate}</td>
                                        <td className="px-6 py-6">
                                            <div className="space-y-1">
                                                <div className="text-[10px] font-black text-navy-500 dark:text-navy-400 uppercase tracking-widest">Proj: ₹{(tieUp.expectedRevenue / 100000).toFixed(2)}L</div>
                                                <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 tracking-tight">Real: ₹{(tieUp.actualRevenue / 100000).toFixed(2)}L</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-3">
                                                <button onClick={() => handleEdit(tieUp)} className="w-10 h-10 rounded-xl bg-brand-blue-50 dark:bg-brand-blue-500/10 border border-brand-blue-100 dark:border-brand-blue-500/20 flex items-center justify-center text-brand-blue-600 dark:text-brand-blue-400 hover:bg-brand-blue-600 hover:text-white transition-all">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => openDeleteModal(tieUp)} className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 flex items-center justify-center text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white transition-all">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
                    <div
                        className="absolute inset-0 bg-navy-950/40 dark:bg-black/60 backdrop-blur-sm animate-fade-in"
                        onClick={() => { setShowAddModal(false); resetForm(); }}
                    />
                    <div className="bg-white dark:bg-navy-900 border border-navy-200 dark:border-white/10 w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-y-auto max-h-[90vh] animate-slide-up">
                        <div className="p-6 md:p-10">
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h3 className="text-2xl font-black text-navy-950 dark:text-white uppercase">Initialize.</h3>
                                    <p className="text-xs font-bold text-navy-500 dark:text-navy-400 uppercase tracking-widest mt-1">New Partnership Ingestion</p>
                                </div>
                                <button onClick={() => { setShowAddModal(false); resetForm(); }} className="w-12 h-12 rounded-2xl bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 flex items-center justify-center text-navy-400 hover:text-navy-950 dark:hover:text-white transition-all">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <TieUpForm onSubmit={handleAdd} buttonText="Commit Partnership" />
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEditModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
                    <div
                        className="absolute inset-0 bg-navy-950/40 dark:bg-black/60 backdrop-blur-sm animate-fade-in"
                        onClick={() => { setShowEditModal(false); setSelectedTieUp(null); resetForm(); }}
                    />
                    <div className="bg-white dark:bg-navy-900 border border-navy-200 dark:border-white/10 w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-y-auto max-h-[90vh] animate-slide-up">
                        <div className="p-6 md:p-10">
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h3 className="text-2xl font-black text-navy-950 dark:text-white uppercase">Modify.</h3>
                                    <p className="text-xs font-bold text-navy-500 dark:text-navy-400 uppercase tracking-widest mt-1">Existing Partnership Tuning</p>
                                </div>
                                <button onClick={() => { setShowEditModal(false); setSelectedTieUp(null); resetForm(); }} className="w-12 h-12 rounded-2xl bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 flex items-center justify-center text-navy-400 hover:text-navy-950 dark:hover:text-white transition-all">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <TieUpForm onSubmit={handleUpdate} buttonText="Commit Changes" />
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && selectedTieUp && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-red-950/20 dark:bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => { setShowDeleteModal(false); setSelectedTieUp(null); }} />
                    <div className="bg-white dark:bg-navy-900 border border-red-100 dark:border-red-500/20 w-full max-w-md rounded-[2.5rem] shadow-2xl relative z-10 p-8 sm:p-10 animate-shake">
                        <div className="w-20 h-20 bg-red-100 dark:bg-red-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
                            <AlertTriangle className="w-10 h-10 text-red-600" />
                        </div>
                        <h3 className="text-2xl font-black text-center text-navy-950 dark:text-white uppercase tracking-tight mb-2">Purge Entry?</h3>
                        <p className="text-sm font-bold text-navy-500 dark:text-navy-400 text-center uppercase tracking-widest leading-relaxed mb-10">
                            Confirm destruction of partnership with <span className="text-red-600 font-black">{selectedTieUp.company}</span>. This logic is terminal.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={() => { setShowDeleteModal(false); setSelectedTieUp(null); }} className="flex-1 px-8 py-4 bg-navy-50 dark:bg-white/5 text-navy-500 dark:text-navy-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-navy-100 dark:hover:bg-white/10 transition-all active:scale-95">Abort</button>
                            <button onClick={handleDelete} className="flex-1 px-8 py-4 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-red-900/40 active:scale-95">Purge</button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default TieUpManagement;
