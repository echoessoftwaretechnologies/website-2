import React, { useState, useEffect } from 'react';
import { Plus, FileText, X, TrendingUp, TrendingDown } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

interface Transaction {
    id: string;
    date: string;
    description: string;
    type: 'Revenue' | 'Expense';
    amount: number;
    category: string;
}

const AccountManagement: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const [formData, setFormData] = useState({
        date: '',
        description: '',
        type: 'Revenue' as 'Revenue' | 'Expense',
        amount: 0,
        category: ''
    });

    const [transactions, setTransactions] = useState<Transaction[]>([
        { id: '1', date: '2026-02-01', description: 'Client Payment - Tech Solutions', type: 'Revenue', amount: 150000, category: 'Sales' },
        { id: '2', date: '2026-02-01', description: 'Office Rent', type: 'Expense', amount: 50000, category: 'Operations' },
        { id: '3', date: '2026-01-30', description: 'Software Licenses', type: 'Expense', amount: 25000, category: 'Technology' },
        { id: '4', date: '2026-01-28', description: 'Consulting Services', type: 'Revenue', amount: 200000, category: 'Services' }
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

    const totalRevenue = transactions.filter(t => t.type === 'Revenue').reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0);
    const netProfit = totalRevenue - totalExpenses;
    const totalTransactions = transactions.length;

    const resetForm = () => {
        setFormData({
            date: '',
            description: '',
            type: 'Revenue',
            amount: 0,
            category: ''
        });
    };

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        const newTransaction: Transaction = {
            id: Date.now().toString(),
            ...formData
        };
        setTransactions([newTransaction, ...transactions]);
        setShowAddModal(false);
        resetForm();
        setNotification({ type: 'success', message: 'Transaction added successfully!' });
    };

    const handleGenerateReport = () => {
        setNotification({ type: 'success', message: 'Report generated successfully!' });
        console.log('Generating report with transactions:', transactions);
    };

    return (
        <AdminLayout title="Account Management" subtitle="Financial Intelligence">
            <div className={`space-y-8 transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

                {notification && (
                    <div className={`fixed top-24 right-8 z-50 px-6 py-4 rounded-2xl shadow-lg border animate-slide-in-right ${notification.type === 'success'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 backdrop-blur-md'
                        : 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20 backdrop-blur-md'
                        }`}>
                        <p className="font-bold uppercase tracking-widest text-[10px]">{notification.message}</p>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 className="text-2xl md:text-3xl font-black tracking-tight text-navy-950 dark:text-white uppercase">Account Matrix</h2>
                    <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                        <button onClick={() => setShowAddModal(true)} className="flex-1 sm:flex-none justify-center flex items-center gap-2 bg-brand-blue-600 hover:bg-brand-blue-700 text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95">
                            <Plus className="w-5 h-5" />
                            Add Transaction
                        </button>
                        <button onClick={handleGenerateReport} className="flex-1 sm:flex-none justify-center flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95">
                            <FileText className="w-5 h-5" />
                            Generate Report
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {[
                        { label: 'Total Revenue', value: `₹${(totalRevenue / 100000).toFixed(1)}L`, icon: '💰', bgColor: 'bg-emerald-50 dark:bg-emerald-500/5', iconBg: 'bg-emerald-100 dark:bg-emerald-500/10', textColor: 'text-emerald-600 dark:text-emerald-400', borderColor: 'border-emerald-100 dark:border-emerald-500/20' },
                        { label: 'Total Expenses', value: `₹${(totalExpenses / 100000).toFixed(1)}L`, icon: '💸', bgColor: 'bg-red-50 dark:bg-red-500/5', iconBg: 'bg-red-100 dark:bg-red-500/10', textColor: 'text-red-600 dark:text-red-400', borderColor: 'border-red-100 dark:border-red-500/20' },
                        { label: 'Net Profit', value: `₹${(netProfit / 100000).toFixed(1)}L`, icon: '📈', bgColor: 'bg-brand-blue-50 dark:bg-brand-blue-500/5', iconBg: 'bg-brand-blue-100 dark:bg-brand-blue-500/10', textColor: 'text-brand-blue-600 dark:text-brand-blue-400', borderColor: 'border-brand-blue-100 dark:border-brand-blue-500/20' },
                        { label: 'Total Entries', value: totalTransactions.toString(), icon: '📊', bgColor: 'bg-purple-50 dark:bg-purple-500/5', iconBg: 'bg-purple-100 dark:bg-purple-500/10', textColor: 'text-purple-600 dark:text-purple-400', borderColor: 'border-purple-100 dark:border-purple-500/20' }
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-white/[0.02] rounded-[2.5rem] border border-navy-100 dark:border-white/5 shadow-xl shadow-navy-100/20 dark:shadow-navy-950/50 p-6 md:p-8">
                        <h3 className="text-xl md:text-2xl font-black mb-6 text-navy-950 dark:text-white uppercase tracking-tight">Revenue vs Expenses</h3>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-[10px] font-black text-navy-500 dark:text-navy-400 uppercase tracking-widest">Revenue Alpha</span>
                                    <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">₹{(totalRevenue / 100000).toFixed(2)}L</span>
                                </div>
                                <div className="w-full bg-navy-50 dark:bg-white/5 rounded-full h-3 overflow-hidden">
                                    <div className="bg-emerald-500 h-3 rounded-full shadow-lg shadow-emerald-500/20 transition-all duration-1000" style={{ width: `${(totalRevenue / (totalRevenue + totalExpenses)) * 100}%` }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-[10px] font-black text-navy-500 dark:text-navy-400 uppercase tracking-widest">Expense Vector</span>
                                    <span className="text-xs font-black text-red-600 dark:text-red-400">₹{(totalExpenses / 100000).toFixed(2)}L</span>
                                </div>
                                <div className="w-full bg-navy-50 dark:bg-white/5 rounded-full h-3 overflow-hidden">
                                    <div className="bg-red-500 h-3 rounded-full shadow-lg shadow-red-500/20 transition-all duration-1000" style={{ width: `${(totalExpenses / (totalRevenue + totalExpenses)) * 100}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-white/[0.02] rounded-[2.5rem] border border-navy-100 dark:border-white/5 shadow-xl shadow-navy-100/20 dark:shadow-navy-950/50 p-6 md:p-8">
                        <h3 className="text-xl md:text-2xl font-black mb-6 text-navy-950 dark:text-white uppercase tracking-tight">Financial Index</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-5 bg-emerald-50 dark:bg-emerald-500/5 rounded-[1.5rem] border border-emerald-100 dark:border-emerald-500/10">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/20 rounded-2xl flex items-center justify-center shadow-inner">
                                        <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black text-navy-950 dark:text-white uppercase tracking-widest leading-none mb-1">Revenue Delta</div>
                                        <div className="text-[9px] font-bold text-navy-500 dark:text-navy-400 uppercase tracking-widest leading-none">vs Cycle-01</div>
                                    </div>
                                </div>
                                <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">+15%</div>
                            </div>
                            <div className="flex items-center justify-between p-5 bg-red-50 dark:bg-red-500/5 rounded-[1.5rem] border border-red-100 dark:border-red-500/10">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-red-100 dark:bg-red-500/20 rounded-2xl flex items-center justify-center shadow-inner">
                                        <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black text-navy-950 dark:text-white uppercase tracking-widest leading-none mb-1">Expense Logic</div>
                                        <div className="text-[9px] font-bold text-navy-500 dark:text-navy-400 uppercase tracking-widest leading-none">vs Cycle-01</div>
                                    </div>
                                </div>
                                <div className="text-2xl font-black text-red-600 dark:text-red-400 tracking-tight">-8%</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-white/[0.02] rounded-[2.5rem] border border-navy-100 dark:border-white/5 shadow-xl shadow-navy-100/20 dark:shadow-navy-950/50 overflow-hidden">
                    <div className="p-6 md:p-8 border-b border-navy-100 dark:border-white/5">
                        <h3 className="text-xl md:text-2xl font-black text-navy-950 dark:text-white uppercase tracking-tight">Recent Ledger</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-navy-50/50 dark:bg-white/[0.02]">
                                <tr>
                                    <th className="px-6 py-5 text-left text-[10px] font-black text-navy-500 uppercase tracking-widest border-b border-navy-100 dark:border-white/5">Date Space</th>
                                    <th className="px-6 py-5 text-left text-[10px] font-black text-navy-500 uppercase tracking-widest border-b border-navy-100 dark:border-white/5">Intelligence Desc</th>
                                    <th className="px-6 py-5 text-left text-[10px] font-black text-navy-500 uppercase tracking-widest border-b border-navy-100 dark:border-white/5">Nexus Category</th>
                                    <th className="px-6 py-5 text-left text-[10px] font-black text-navy-500 uppercase tracking-widest border-b border-navy-100 dark:border-white/5">State Type</th>
                                    <th className="px-6 py-5 text-left text-[10px] font-black text-navy-500 uppercase tracking-widest border-b border-navy-100 dark:border-white/5">Value Quant</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-navy-100 dark:divide-white/5">
                                {transactions.map((transaction) => (
                                    <tr key={transaction.id} className="hover:bg-navy-50 dark:hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-6 py-6 text-sm font-black text-navy-600 dark:text-navy-400 group-hover:text-navy-950 dark:group-hover:text-white transition-colors">{new Date(transaction.date).toLocaleDateString()}</td>
                                        <td className="px-6 py-6 text-sm font-black text-navy-950 dark:text-white">{transaction.description}</td>
                                        <td className="px-6 py-6"><span className="px-3 py-1 rounded-lg text-[10px] font-black bg-navy-50 dark:bg-white/5 text-navy-500 dark:text-navy-400 border border-navy-100 dark:border-white/10 uppercase tracking-widest">{transaction.category}</span></td>
                                        <td className="px-6 py-6">
                                            <span className={`px-3 py-1 rounded-lg text-[10px] font-black border uppercase tracking-widest ${transaction.type === 'Revenue'
                                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                                                : 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20'
                                                }`}>
                                                {transaction.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className={`text-sm font-black tracking-tight ${transaction.type === 'Revenue' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                                                {transaction.type === 'Revenue' ? '+' : '-'}₹{(transaction.amount / 1000).toFixed(2)}K
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

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
                                    <h3 className="text-2xl font-black text-navy-950 dark:text-white uppercase">Log Entry.</h3>
                                    <p className="text-xs font-bold text-navy-500 dark:text-navy-400 uppercase tracking-widest mt-1">Operational Financial Ingestion</p>
                                </div>
                                <button onClick={() => { setShowAddModal(false); resetForm(); }} className="w-12 h-12 rounded-2xl bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 flex items-center justify-center text-navy-400 hover:text-navy-950 dark:hover:text-white transition-all">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <form onSubmit={handleAdd} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-navy-500 dark:text-navy-400 uppercase tracking-widest mb-2 px-1">Cycle Date</label>
                                        <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black" required />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-navy-500 dark:text-navy-400 uppercase tracking-widest mb-2 px-1">Logic Type</label>
                                        <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value as 'Revenue' | 'Expense' })} className="w-full bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all cursor-pointer font-black">
                                            <option className="dark:bg-navy-900">Revenue</option>
                                            <option className="dark:bg-navy-900">Expense</option>
                                        </select>
                                    </div>
                                    <div className="col-span-1 sm:col-span-2">
                                        <label className="block text-[10px] font-black text-navy-500 dark:text-navy-400 uppercase tracking-widest mb-2 px-1">Intel Description</label>
                                        <input type="text" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black placeholder:text-navy-300 dark:placeholder:text-navy-600" placeholder="Source identifier..." required />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-navy-500 dark:text-navy-400 uppercase tracking-widest mb-2 px-1">Nexus Classification</label>
                                        <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black placeholder:text-navy-300 dark:placeholder:text-navy-600" placeholder="Sector assign..." required />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-navy-500 dark:text-navy-400 uppercase tracking-widest mb-2 px-1">Value Quantum (₹)</label>
                                        <input type="number" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })} className="w-full bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black placeholder:text-navy-300 dark:placeholder:text-navy-600" placeholder="0.00" required />
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <button type="submit" className="w-full bg-brand-blue-600 hover:bg-brand-blue-500 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all shadow-xl shadow-brand-blue-900/40 active:scale-95">
                                        Commit Transaction
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default AccountManagement;
