import React, { useState, useEffect } from 'react';
import {
    Users, Search, Filter, Plus, MoreHorizontal,
    Mail, Phone, Building2, Calendar, DollarSign,
    TrendingUp, Zap, Trash2, Edit3, Eye, X, CheckCircle2,
    Clock, AlertCircle, Shield, Activity
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

interface Client {
    id: string;
    name: string;
    company: string;
    contact: string;
    email: string;
    phone: string;
    status: 'active' | 'follow-up' | 'prospect' | 'lead';
    lastContact: string;
    value: string;
    type: string;
    initials: string;
}

const CrmManagement: React.FC = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [clientToDelete, setClientToDelete] = useState<{ id: string, name: string } | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [clients, setClients] = useState<Client[]>([
        {
            id: '1',
            name: 'Acme Corporation',
            company: 'Enterprise',
            contact: 'John Smith',
            email: 'john@acme.com',
            phone: '+91 81485 49511',
            status: 'active',
            lastContact: '2023-11-15',
            value: '$12,500',
            type: 'Enterprise',
            initials: 'AC'
        },
        {
            id: '2',
            name: 'Global Tech',
            company: 'Enterprise',
            contact: 'Sarah Johnson',
            email: 'sarah@globaltech.com',
            phone: '+1 (555) 987-6543',
            status: 'follow-up',
            lastContact: '2023-11-10',
            value: '$8,200',
            type: 'Enterprise',
            initials: 'GT'
        },
        {
            id: '3',
            name: 'Mega Networks',
            company: 'Business',
            contact: 'Michael Brown',
            email: 'michael@meganet.com',
            phone: '+1 (555) 456-7890',
            status: 'active',
            lastContact: '2023-11-18',
            value: '$15,600',
            type: 'Business',
            initials: 'MN'
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);

    const [newClient, setNewClient] = useState({
        name: '',
        email: '',
        company: '',
        contact: '',
        phone: '',
        status: 'active' as const
    });

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const handleAddClient = (e: React.FormEvent) => {
        e.preventDefault();
        const client: Client = {
            id: Date.now().toString(),
            ...newClient,
            lastContact: new Date().toISOString().split('T')[0],
            value: '$0',
            type: 'Lead',
            initials: newClient.name.split(' ').map(n => n[0]).join('').toUpperCase().substr(0, 2)
        };
        setClients([...clients, client]);
        setIsAddModalOpen(false);
        setNewClient({ name: '', email: '', company: '', contact: '', phone: '', status: 'active' });
        setNotification({ type: 'success', message: 'Record initialized successfully!' });
    };

    const handleDeleteClient = () => {
        if (clientToDelete) {
            setClients(clients.filter(c => c.id !== clientToDelete.id));
            setShowDeleteModal(false);
            setClientToDelete(null);
            setNotification({ type: 'success', message: 'Record purged successfully!' });
        }
    };

    const handleViewClient = (client: Client) => {
        setSelectedClient(client);
        setIsDetailModalOpen(true);
    };

    const filteredClients = clients.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.company.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'active': return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
            case 'follow-up': return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
            case 'prospect': return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
            case 'lead': return 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20';
            default: return 'bg-navy-100 dark:bg-white/5 text-navy-500 dark:text-navy-400 border-navy-200 dark:border-white/10';
        }
    };

    return (
        <AdminLayout title="CRM Intelligence" subtitle="Client Relations Core">
            <div className={`space-y-12 transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

                {/* Notification */}
                {notification && (
                    <div className={`fixed top-24 right-8 z-50 px-6 py-4 rounded-2xl shadow-lg border animate-slide-in-right ${notification.type === 'success'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 backdrop-blur-md'
                            : 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20 backdrop-blur-md'
                        }`}>
                        <p className="font-bold uppercase tracking-widest text-[10px]">{notification.message}</p>
                    </div>
                )}

                {/* Stats Tier */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Total Base', val: clients.length.toString(), icon: Users, delta: '+4.2%', color: 'brand-blue', bgColor: 'bg-brand-blue-50 dark:bg-brand-blue-500/5', iconBg: 'bg-brand-blue-100 dark:bg-brand-blue-500/10', textColor: 'text-brand-blue-600 dark:text-brand-blue-400', borderColor: 'border-brand-blue-100 dark:border-brand-blue-500/20' },
                        { label: 'Conversion', val: '24.8%', icon: TrendingUp, delta: '+1.5%', color: 'emerald', bgColor: 'bg-emerald-50 dark:bg-emerald-500/5', iconBg: 'bg-emerald-100 dark:bg-emerald-500/10', textColor: 'text-emerald-600 dark:text-emerald-400', borderColor: 'border-emerald-100 dark:border-emerald-500/20' },
                        { label: 'Avg Value', val: '$12.4k', icon: DollarSign, delta: 'Stable', color: 'indigo', bgColor: 'bg-indigo-50 dark:bg-indigo-500/5', iconBg: 'bg-indigo-100 dark:bg-indigo-500/10', textColor: 'text-indigo-600 dark:text-indigo-400', borderColor: 'border-indigo-100 dark:border-indigo-500/20' },
                        { label: 'Velocity', val: 'High', icon: Zap, delta: 'Healthy', color: 'purple', bgColor: 'bg-purple-50 dark:bg-purple-500/5', iconBg: 'bg-purple-100 dark:bg-purple-500/10', textColor: 'text-purple-600 dark:text-purple-400', borderColor: 'border-purple-100 dark:border-purple-500/20' }
                    ].map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <div key={i} className={`${stat.bgColor} ${stat.borderColor} rounded-[2rem] p-6 border group hover:scale-[1.02] transition-all duration-300 shadow-sm backdrop-blur-sm`}>
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`w-12 h-12 ${stat.iconBg} rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                                        <Icon className={`w-6 h-6 ${stat.textColor}`} />
                                    </div>
                                    <div className={`text-[10px] font-black px-2 py-1 rounded-lg ${stat.iconBg} border ${stat.borderColor} ${stat.textColor} uppercase tracking-tight`}>{stat.delta}</div>
                                </div>
                                <div className={`text-3xl font-black mb-1 ${stat.textColor} tracking-tight`}>{stat.val}</div>
                                <div className="text-[10px] font-black text-navy-500 dark:text-navy-400 uppercase tracking-widest">{stat.label}</div>
                            </div>
                        );
                    })}
                </div>

                {/* Main Content Area */}
                <div className="bg-white dark:bg-white/[0.02] border border-navy-200 dark:border-white/5 rounded-[2.5rem] overflow-hidden shadow-xl shadow-navy-200/20 dark:shadow-navy-950/50">
                    <div className="p-6 md:p-8 border-b border-navy-100 dark:border-white/5 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                        <div>
                            <h2 className="text-xl font-black uppercase tracking-widest text-navy-950 dark:text-white">Client Matrix</h2>
                            <p className="text-xs font-bold text-navy-500 uppercase tracking-widest mt-1">Personnel & Enterprise Records</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
                            <div className="relative flex-1 sm:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400 dark:text-navy-600" />
                                <input
                                    type="text"
                                    placeholder="Execute search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm text-navy-950 dark:text-white placeholder:text-navy-400 dark:placeholder:text-navy-600 focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all"
                                />
                            </div>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl px-4 py-3 text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all cursor-pointer"
                            >
                                <option value="all">All Statuses</option>
                                <option value="active">Active</option>
                                <option value="follow-up">Follow-up</option>
                                <option value="prospect">Prospect</option>
                                <option value="lead">Lead</option>
                            </select>
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="bg-brand-blue-600 hover:bg-brand-blue-700 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand-blue-900/20 active:scale-95"
                            >
                                <Plus className="w-4 h-4" /> Add Record
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-navy-50/50 dark:bg-white/[0.02]">
                                    <th className="px-4 md:px-8 py-5 text-left text-[10px] font-black text-navy-500 uppercase tracking-[0.2em] border-b border-navy-100 dark:border-white/5">Entity</th>
                                    <th className="px-4 md:px-8 py-5 text-left text-[10px] font-black text-navy-500 uppercase tracking-[0.2em] border-b border-navy-100 dark:border-white/5">Intelligence</th>
                                    <th className="px-4 md:px-8 py-5 text-left text-[10px] font-black text-navy-500 uppercase tracking-[0.2em] border-b border-navy-100 dark:border-white/5">Status</th>
                                    <th className="px-4 md:px-8 py-5 text-left text-[10px] font-black text-navy-500 uppercase tracking-[0.2em] border-b border-navy-100 dark:border-white/5">Valuation</th>
                                    <th className="px-4 md:px-8 py-5 text-right text-[10px] font-black text-navy-500 uppercase tracking-[0.2em] border-b border-navy-100 dark:border-white/5">Operations</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-navy-100 dark:divide-white/5">
                                {filteredClients.map(client => (
                                    <tr key={client.id} className="group hover:bg-navy-50 dark:hover:bg-white/[0.02] transition-colors cursor-default">
                                        <td className="px-4 md:px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-navy-100 dark:bg-navy-800 border border-navy-200 dark:border-white/10 flex items-center justify-center font-black text-brand-blue-600 dark:text-brand-blue-400 group-hover:border-brand-blue-500/50 transition-all shadow-inner">
                                                    {client.initials}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-black text-navy-950 dark:text-white">{client.name}</div>
                                                    <div className="text-[10px] font-bold text-navy-500 uppercase tracking-widest mt-0.5">{client.company}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-8 py-6">
                                            <div className="flex items-center gap-2 text-xs font-black text-navy-600 dark:text-navy-300 group-hover:text-brand-blue-600 dark:group-hover:text-white transition-colors uppercase tracking-tight">
                                                <Mail className="w-3.5 h-3.5 text-navy-400/60 dark:text-navy-600" />
                                                {client.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-navy-500 dark:text-navy-600 uppercase tracking-widest mt-1">
                                                <Phone className="w-3.5 h-3.5 text-navy-400 dark:text-navy-700" />
                                                {client.phone}
                                            </div>
                                        </td>
                                        <td className="px-4 md:px-8 py-6">
                                            <span className={`px-3 py-1 rounded-lg border text-[10px] font-black uppercase tracking-widest ${getStatusStyle(client.status)}`}>
                                                {client.status.replace('-', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-4 md:px-8 py-6">
                                            <div className="text-sm font-black text-navy-950 dark:text-white">{client.value}</div>
                                            <div className="text-[10px] font-bold text-navy-400 dark:text-navy-700 uppercase tracking-widest mt-0.5">{client.type}</div>
                                        </td>
                                        <td className="px-4 md:px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <button onClick={() => handleViewClient(client)} className="w-10 h-10 rounded-xl bg-brand-blue-50 dark:bg-brand-blue-500/10 border border-brand-blue-100 dark:border-brand-blue-500/20 flex items-center justify-center text-brand-blue-600 dark:text-brand-blue-400 hover:bg-brand-blue-600 hover:text-white transition-all shadow-sm">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="w-10 h-10 rounded-xl bg-navy-50 dark:bg-white/5 border border-navy-100 dark:border-white/10 flex items-center justify-center text-navy-500 dark:text-navy-400 hover:bg-navy-900 dark:hover:bg-white hover:text-white transition-all shadow-sm">
                                                    <Edit3 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => { setClientToDelete({ id: client.id, name: client.name }); setShowDeleteModal(true); }} className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 flex items-center justify-center text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white transition-all shadow-sm">
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

            {/* Add Record Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
                    <div
                        className="absolute inset-0 bg-navy-950/40 dark:bg-navy-950/80 backdrop-blur-md dark:backdrop-blur-xl animate-fade-in"
                        onClick={() => setIsAddModalOpen(false)}
                    />
                    <div className="bg-white dark:bg-navy-900 border border-navy-200 dark:border-white/10 w-full max-w-xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-y-auto max-h-[90vh] animate-slide-up">
                        <div className="p-6 md:p-10">
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h3 className="text-2xl font-black text-navy-950 dark:text-white">Initialize Record.</h3>
                                    <p className="text-xs font-bold text-navy-500 uppercase tracking-widest mt-1">Personnel Admission Gateway</p>
                                </div>
                                <button onClick={() => setIsAddModalOpen(false)} className="w-12 h-12 rounded-2xl bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/5 flex items-center justify-center text-navy-500 dark:text-navy-400 hover:text-brand-blue-600 dark:hover:text-white transition-all">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleAddClient} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-navy-500 uppercase tracking-widest mb-2 px-1">Identity</label>
                                        <input required value={newClient.name} onChange={e => setNewClient({ ...newClient, name: e.target.value })} className="w-full bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all placeholder:text-navy-300 dark:placeholder:text-navy-700" placeholder="Full legal name" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-navy-500 uppercase tracking-widest mb-2 px-1">Network Address</label>
                                        <input type="email" required value={newClient.email} onChange={e => setNewClient({ ...newClient, email: e.target.value })} className="w-full bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all placeholder:text-navy-300 dark:placeholder:text-navy-700" placeholder="secure@connection.sys" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-navy-500 uppercase tracking-widest mb-2 px-1">Corporate Nexus</label>
                                    <input required value={newClient.company} onChange={e => setNewClient({ ...newClient, company: e.target.value })} className="w-full bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all placeholder:text-navy-300 dark:placeholder:text-navy-700" placeholder="Entity assignment" />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-navy-500 uppercase tracking-widest mb-2 px-1">Communication Core</label>
                                        <input type="tel" value={newClient.phone} onChange={e => setNewClient({ ...newClient, phone: e.target.value })} className="w-full bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all placeholder:text-navy-300 dark:placeholder:text-navy-700" placeholder="Terminal link" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-navy-500 uppercase tracking-widest mb-2 px-1">operational status</label>
                                        <select value={newClient.status} onChange={e => setNewClient({ ...newClient, status: e.target.value as any })} className="w-full bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all cursor-pointer">
                                            <option value="active">Active Duty</option>
                                            <option value="follow-up">Observation</option>
                                            <option value="prospect">Screening</option>
                                            <option value="lead">Discovery</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <button type="submit" className="w-full bg-brand-blue-600 hover:bg-brand-blue-700 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all shadow-xl shadow-brand-blue-900/40 active:scale-95">
                                        Commit to Database
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && clientToDelete && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-red-950/20 dark:bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => { setShowDeleteModal(false); setClientToDelete(null); }} />
                    <div className="bg-white dark:bg-navy-900 border border-red-100 dark:border-red-500/20 w-full max-w-md rounded-[2.5rem] shadow-2xl relative z-10 p-8 sm:p-10 animate-shake">
                        <div className="w-20 h-20 bg-red-100 dark:bg-red-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
                            <AlertCircle className="w-10 h-10 text-red-600" />
                        </div>
                        <h3 className="text-2xl font-black text-center text-navy-950 dark:text-white uppercase tracking-tight mb-2">Purge Record?</h3>
                        <p className="text-sm font-bold text-navy-500 dark:text-navy-400 text-center uppercase tracking-widest leading-relaxed mb-10">
                            Confirm destruction of data for <span className="text-red-600 font-black">{clientToDelete.name}</span>. This logic is terminal.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={() => { setShowDeleteModal(false); setClientToDelete(null); }} className="flex-1 px-8 py-4 bg-navy-50 dark:bg-white/5 text-navy-500 dark:text-navy-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-navy-100 dark:hover:bg-white/10 transition-all active:scale-95">Abort</button>
                            <button onClick={handleDeleteClient} className="flex-1 px-8 py-4 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-red-900/40 active:scale-95">Purge</button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default CrmManagement;
