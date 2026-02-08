import React, { useState, useRef } from 'react';
import { Download, Plus, Trash2 } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import AdminLayout from '../../components/admin/AdminLayout';

interface InvoiceItem {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
}

const InvoiceGenerator: React.FC = () => {
    const invoiceRef = useRef<HTMLDivElement>(null);
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    // Company Information
    const [companyInfo, setCompanyInfo] = useState({
        name: 'ECHOES SOFTWARE TECHNOLOGIES',
        address: '',
        city: '',
        zip: '',
        country: '',
        email: '',
        phone: '',
        gst: '037-86x-xxx'
    });

    // Bill To Information
    const [billTo, setBillTo] = useState({
        name: '',
        address: '',
        city: '',
        zip: '',
        country: '',
        email: '',
        phone: ''
    });

    // Invoice Details
    const [invoiceDetails, setInvoiceDetails] = useState({
        invoiceNumber: 'INV-001',
        date: new Date().toISOString().split('T')[0],
        purchaseOrder: '',
        projectRef: '',
        currency: 'USD',
        taxRate: 10,
        discount: 0,
        paymentTerms: 'Net 30'
    });

    // Items
    const [items, setItems] = useState<InvoiceItem[]>([
        { id: '1', description: 'Item', quantity: 0, unitPrice: 60.00 }
    ]);

    // Notes and Terms
    const [notes, setNotes] = useState('');
    const [terms, setTerms] = useState('');
    const [bankDetails, setBankDetails] = useState('Scan to Pay via UPI');

    React.useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const addItem = () => {
        setItems([...items, { id: Date.now().toString(), description: '', quantity: 0, unitPrice: 0 }]);
    };

    const removeItem = (id: string) => {
        setItems(items.filter(item => item.id !== id));
    };

    const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
        setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const calculateSubtotal = () => {
        return items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    };

    const calculateTax = () => {
        const subtotal = calculateSubtotal();
        return (subtotal * invoiceDetails.taxRate) / 100;
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateTax();
    };

    const getDueDate = () => {
        const date = new Date(invoiceDetails.date);
        const days = parseInt(invoiceDetails.paymentTerms.replace(/\D/g, '')) || 30;
        date.setDate(date.getDate() + days);
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    const generatePDF = async () => {
        if (!invoiceRef.current) return;

        try {
            // Save original styles
            const originalStyle = invoiceRef.current.getAttribute('style');

            // Force A4 width for capture
            invoiceRef.current.style.width = '210mm';
            invoiceRef.current.style.minHeight = '297mm';

            // Wait for render
            await new Promise(resolve => setTimeout(resolve, 50));

            const canvas = await html2canvas(invoiceRef.current, {
                scale: 2,
                useCORS: true,
                logging: false,
                windowWidth: 794 // 210mm at 96dpi
            } as any);

            // Restore original styles
            if (originalStyle) {
                invoiceRef.current.setAttribute('style', originalStyle);
            } else {
                invoiceRef.current.removeAttribute('style');
            }

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 0;

            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save(`Invoice-${invoiceDetails.invoiceNumber}.pdf`);
            setNotification({ type: 'success', message: 'Invoice PDF downloaded successfully!' });
        } catch (error) {
            console.error('Error generating PDF:', error);
            if (invoiceRef.current) invoiceRef.current.removeAttribute('style');
            setNotification({ type: 'error', message: 'Failed to generate PDF' });
        }
    };

    return (
        <AdminLayout title="Invoice Generator" subtitle="Financial Documents">
            <div className="space-y-6">
                {notification && (
                    <div className={`fixed top-24 right-8 z-50 px-6 py-4 rounded-2xl shadow-lg border animate-slide-in-right ${notification.type === 'success'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 backdrop-blur-md'
                        : 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20 backdrop-blur-md'
                        }`}>
                        <p className="font-bold uppercase tracking-widest text-[10px]">{notification.message}</p>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-navy-950 dark:text-white uppercase">Invoice Nexus</h2>
                        <p className="text-[10px] font-black text-navy-500 dark:text-navy-400 uppercase tracking-widest mt-1">Financial Intelligence & Document Generation</p>
                    </div>
                    <button onClick={generatePDF} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-blue-600 hover:bg-brand-blue-700 text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 group">
                        <Download className="w-5 h-5 group-hover:bounce" />
                        Generate Protocol PDF
                    </button>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* Left Column - Invoice Details Form */}
                    <div className="space-y-6">
                        {/* Company Information */}
                        <div className="bg-white dark:bg-white/[0.02] border border-navy-100 dark:border-white/5 rounded-[2rem] p-6 shadow-sm">
                            <h3 className="text-sm font-black text-navy-950 dark:text-white uppercase tracking-widest mb-6">Origin Data</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-black text-navy-500 dark:text-navy-400 uppercase tracking-widest mb-1.5 px-1">Entity Identity</label>
                                    <input type="text" placeholder="Legal entity name..." value={companyInfo.name} onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })} className="w-full px-4 py-3 bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-xl text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black placeholder:text-navy-300 dark:placeholder:text-navy-600" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-navy-500 dark:text-navy-400 uppercase tracking-widest mb-1.5 px-1">Operational Base</label>
                                    <input type="text" placeholder="Physical location..." value={companyInfo.address} onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })} className="w-full px-4 py-3 bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-xl text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black placeholder:text-navy-300 dark:placeholder:text-navy-600" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="City" value={companyInfo.city} onChange={(e) => setCompanyInfo({ ...companyInfo, city: e.target.value })} className="w-full px-4 py-3 bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-xl text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black" />
                                    <input type="text" placeholder="ZIP" value={companyInfo.zip} onChange={(e) => setCompanyInfo({ ...companyInfo, zip: e.target.value })} className="w-full px-4 py-3 bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-xl text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black" />
                                </div>
                                <input type="text" placeholder="Country" value={companyInfo.country} onChange={(e) => setCompanyInfo({ ...companyInfo, country: e.target.value })} className="w-full px-4 py-3 bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-xl text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="email" placeholder="Email link..." value={companyInfo.email} onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })} className="w-full px-4 py-3 bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-xl text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black" />
                                    <input type="tel" placeholder="Terminal phone..." value={companyInfo.phone} onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })} className="w-full px-4 py-3 bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-xl text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-navy-500 dark:text-navy-400 uppercase tracking-widest mb-1.5 px-1">GST/Tax Identifier</label>
                                    <input type="text" placeholder="Tax identification code..." value={companyInfo.gst} onChange={(e) => setCompanyInfo({ ...companyInfo, gst: e.target.value })} className="w-full px-4 py-3 bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-xl text-sm text-brand-blue-600 dark:text-brand-blue-400 focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black" />
                                </div>
                            </div>
                        </div>

                        {/* Bill To */}
                        <div className="bg-white dark:bg-white/[0.02] border border-navy-100 dark:border-white/5 rounded-[2rem] p-6 shadow-sm">
                            <h3 className="text-sm font-black text-navy-950 dark:text-white uppercase tracking-widest mb-6">Target Entity</h3>
                            <div className="space-y-4">
                                <input type="text" placeholder="Client identity..." value={billTo.name} onChange={(e) => setBillTo({ ...billTo, name: e.target.value })} className="w-full px-4 py-3 bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-xl text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black placeholder:text-navy-300 dark:placeholder:text-navy-600" />
                                <input type="text" placeholder="Destination address..." value={billTo.address} onChange={(e) => setBillTo({ ...billTo, address: e.target.value })} className="w-full px-4 py-3 bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-xl text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="City" value={billTo.city} onChange={(e) => setBillTo({ ...billTo, city: e.target.value })} className="w-full px-4 py-3 bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-xl text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black" />
                                    <input type="text" placeholder="ZIP" value={billTo.zip} onChange={(e) => setBillTo({ ...billTo, zip: e.target.value })} className="w-full px-4 py-3 bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-xl text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black" />
                                </div>
                                <input type="text" placeholder="Country" value={billTo.country} onChange={(e) => setBillTo({ ...billTo, country: e.target.value })} className="w-full px-4 py-3 bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-xl text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="email" placeholder="Email link..." value={billTo.email} onChange={(e) => setBillTo({ ...billTo, email: e.target.value })} className="w-full px-4 py-3 bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-xl text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black" />
                                    <input type="tel" placeholder="Terminal phone..." value={billTo.phone} onChange={(e) => setBillTo({ ...billTo, phone: e.target.value })} className="w-full px-4 py-3 bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-xl text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black" />
                                </div>
                            </div>
                        </div>

                        {/* Invoice Details */}
                        <div className="bg-white dark:bg-white/[0.02] border border-navy-100 dark:border-white/5 rounded-[2rem] p-6 shadow-sm">
                            <h3 className="text-sm font-black text-navy-950 dark:text-white uppercase tracking-widest mb-6">Protocol Specs</h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-black text-navy-500 dark:text-navy-400 uppercase tracking-widest mb-1.5 px-1">Protocol ID</label>
                                        <input type="text" value={invoiceDetails.invoiceNumber} onChange={(e) => setInvoiceDetails({ ...invoiceDetails, invoiceNumber: e.target.value })} className="w-full px-4 py-3 bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-xl text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-navy-500 dark:text-navy-400 uppercase tracking-widest mb-1.5 px-1">Genesis Date</label>
                                        <input type="date" value={invoiceDetails.date} onChange={(e) => setInvoiceDetails({ ...invoiceDetails, date: e.target.value })} className="w-full px-4 py-3 bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-xl text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black cursor-pointer" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="PO Vector..." value={invoiceDetails.purchaseOrder} onChange={(e) => setInvoiceDetails({ ...invoiceDetails, purchaseOrder: e.target.value })} className="w-full px-4 py-3 bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-xl text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black placeholder:text-navy-300 dark:placeholder:text-navy-600" />
                                    <input type="text" placeholder="Project Nexus..." value={invoiceDetails.projectRef} onChange={(e) => setInvoiceDetails({ ...invoiceDetails, projectRef: e.target.value })} className="w-full px-4 py-3 bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-xl text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black placeholder:text-navy-300 dark:placeholder:text-navy-600" />
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <select value={invoiceDetails.currency} onChange={(e) => setInvoiceDetails({ ...invoiceDetails, currency: e.target.value })} className="w-full px-4 py-3 bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-xl text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black cursor-pointer">
                                        <option className="dark:bg-navy-900">USD</option>
                                        <option className="dark:bg-navy-900">EUR</option>
                                        <option className="dark:bg-navy-900">INR</option>
                                    </select>
                                    <input type="number" placeholder="Tax %" value={invoiceDetails.taxRate} onChange={(e) => setInvoiceDetails({ ...invoiceDetails, taxRate: Number(e.target.value) })} className="w-full px-4 py-3 bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-xl text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black" />
                                    <input type="number" placeholder="Discount %" value={invoiceDetails.discount} onChange={(e) => setInvoiceDetails({ ...invoiceDetails, discount: Number(e.target.value) })} className="w-full px-4 py-3 bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-xl text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black" />
                                </div>
                                <select value={invoiceDetails.paymentTerms} onChange={(e) => setInvoiceDetails({ ...invoiceDetails, paymentTerms: e.target.value })} className="w-full px-4 py-3 bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-xl text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black cursor-pointer">
                                    <option className="dark:bg-navy-900">Net 30</option>
                                    <option className="dark:bg-navy-900">Net 60</option>
                                    <option className="dark:bg-navy-900">Net 90</option>
                                    <option className="dark:bg-navy-900">Due on Receipt</option>
                                </select>
                            </div>
                        </div>

                        {/* Items */}
                        <div className="bg-white dark:bg-white/[0.02] border border-navy-100 dark:border-white/5 rounded-[2rem] p-6 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-sm font-black text-navy-950 dark:text-white uppercase tracking-widest">Resource Matrix</h3>
                                <button onClick={addItem} className="flex items-center gap-2 bg-brand-blue-600/10 hover:bg-brand-blue-600 text-brand-blue-600 dark:text-brand-blue-400 hover:text-white px-4 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all border border-brand-blue-500/20">
                                    <Plus className="w-4 h-4" />
                                    Inject Item
                                </button>
                            </div>
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div key={item.id} className="grid grid-cols-12 gap-3 group">
                                        <div className="col-span-12 sm:col-span-5">
                                            <input type="text" placeholder="Description..." value={item.description} onChange={(e) => updateItem(item.id, 'description', e.target.value)} className="w-full px-3 py-2.5 bg-navy-50/50 dark:bg-white/5 border border-navy-100 dark:border-white/10 rounded-xl text-xs text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black placeholder:text-navy-300 dark:placeholder:text-navy-600" />
                                        </div>
                                        <div className="col-span-4 sm:col-span-2">
                                            <input type="number" placeholder="Qty" value={item.quantity} onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))} className="w-full px-3 py-2.5 bg-navy-50/50 dark:bg-white/5 border border-navy-100 dark:border-white/10 rounded-xl text-xs text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black" />
                                        </div>
                                        <div className="col-span-4 sm:col-span-2">
                                            <input type="number" placeholder="Price" value={item.unitPrice} onChange={(e) => updateItem(item.id, 'unitPrice', Number(e.target.value))} className="w-full px-3 py-2.5 bg-navy-50/50 dark:bg-white/5 border border-navy-100 dark:border-white/10 rounded-xl text-xs text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black" />
                                        </div>
                                        <div className="col-span-3 sm:col-span-2 px-3 py-2.5 bg-emerald-500/5 border border-emerald-500/10 rounded-xl text-xs font-black text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                                            {invoiceDetails.currency} {(item.quantity * item.unitPrice).toFixed(2)}
                                        </div>
                                        <div className="col-span-1 flex items-center justify-center">
                                            <button onClick={() => removeItem(item.id)} className="p-2 hover:bg-red-500/10 text-navy-300 hover:text-red-500 rounded-xl transition-all">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Notes & Terms */}
                        <div className="bg-white dark:bg-white/[0.02] border border-navy-100 dark:border-white/5 rounded-[2rem] p-6 shadow-sm">
                            <h3 className="text-sm font-black text-navy-950 dark:text-white uppercase tracking-widest mb-4">Protocol Notes</h3>
                            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Operational details..." className="w-full px-4 py-3 bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black placeholder:text-navy-300 dark:placeholder:text-navy-600 min-h-[80px]" />
                        </div>

                        <div className="bg-white dark:bg-white/[0.02] border border-navy-100 dark:border-white/5 rounded-[2rem] p-6 shadow-sm">
                            <h3 className="text-sm font-black text-navy-950 dark:text-white uppercase tracking-widest mb-4">System Terms</h3>
                            <textarea value={terms} onChange={(e) => setTerms(e.target.value)} placeholder="Technical constraints..." className="w-full px-4 py-3 bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black placeholder:text-navy-300 dark:placeholder:text-navy-600 min-h-[80px]" />
                        </div>

                        <div className="bg-white dark:bg-white/[0.02] border border-navy-100 dark:border-white/5 rounded-[2rem] p-6 shadow-sm">
                            <h3 className="text-sm font-black text-navy-950 dark:text-white uppercase tracking-widest mb-4">Financial Terminal</h3>
                            <textarea value={bankDetails} onChange={(e) => setBankDetails(e.target.value)} placeholder="Routing codes, account vectors..." className="w-full px-4 py-3 bg-navy-50 dark:bg-white/5 border border-navy-200 dark:border-white/10 rounded-2xl text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-blue-500 transition-all font-black placeholder:text-navy-300 dark:placeholder:text-navy-600 min-h-[80px]" />
                        </div>
                    </div>

                    {/* Right Column - Invoice Preview Container */}
                    <div className="bg-navy-50 dark:bg-navy-950/20 border border-navy-100 dark:border-white/5 rounded-[2.5rem] p-4 md:p-8 flex flex-col items-center overflow-auto max-h-[1400px] shadow-inner backdrop-blur-sm">
                        <div className="mb-6 flex items-center justify-between w-full max-w-[210mm] px-4">
                            <h4 className="text-[10px] font-black text-navy-500 dark:text-navy-400 uppercase tracking-widest">Protocol Preview (A4 Scale)</h4>
                            <div className="flex gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                <div className="w-2 h-2 rounded-full bg-brand-blue-500"></div>
                                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                            </div>
                        </div>
                        <div ref={invoiceRef} className="bg-white text-[13px] text-gray-800 shadow-2xl origin-top transition-transform">

                            {/* ===== HEADER ===== */}
                            <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
                                <div>
                                    <h1 className="text-lg font-black leading-tight">INVOICE</h1>
                                    <p className="text-[11px] font-semibold opacity-90">
                                        {companyInfo.name}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <img
                                        src="/assets/3.png"
                                        alt="Echoes Logo"
                                        className="w-21 h-20 object-contain"
                                    />
                                </div>

                            </div>

                            {/* ===== BILL TO + DETAILS ===== */}
                            <div className="grid grid-cols-2 gap-6 px-6 py-5">
                                <div>
                                    <h4 className="text-blue-600 text-[11px] font-bold uppercase mb-2">
                                        Bill To
                                    </h4>
                                    <p className="font-bold">{billTo.name || 'Client Name'}</p>
                                    <p>{billTo.address}</p>
                                    <p>{billTo.city} {billTo.zip}</p>
                                    <p>{billTo.country}</p>
                                </div>

                                <div className="space-y-1 text-right">
                                    <h4 className="text-blue-600 text-[11px] font-bold uppercase mb-2">
                                        Invoice Details
                                    </h4>
                                    <div className="flex justify-between">
                                        <span>Invoice Number:</span>
                                        <span className="font-semibold">{invoiceDetails.invoiceNumber}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Date:</span>
                                        <span>{new Date(invoiceDetails.date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Due Date:</span>
                                        <span>{getDueDate()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Currency:</span>
                                        <span>{invoiceDetails.currency}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Payment Terms:</span>
                                        <span>{invoiceDetails.paymentTerms}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Tax ID:</span>
                                        <span>{companyInfo.gst}</span>
                                    </div>
                                </div>
                            </div>

                            {/* ===== SERVICES TABLE ===== */}
                            <div className="px-6">
                                <h4 className="text-blue-600 text-[11px] font-bold uppercase mb-2">
                                    Services
                                </h4>

                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-y border-gray-300">
                                            <th className="py-2 text-left">Description</th>
                                            <th className="py-2 text-center">Quantity</th>
                                            <th className="py-2 text-right">Unit Price</th>
                                            <th className="py-2 text-right">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map(item => (
                                            <tr key={item.id} className="border-b border-gray-200">
                                                <td className="py-2">{item.description || 'Item'}</td>
                                                <td className="py-2 text-center">{item.quantity}</td>
                                                <td className="py-2 text-right">
                                                    ${item.unitPrice.toFixed(2)}
                                                </td>
                                                <td className="py-2 text-right font-semibold">
                                                    ${(item.quantity * item.unitPrice).toFixed(2)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* ===== TOTALS ===== */}
                            <div className="px-6 py-4 flex justify-end">
                                <div className="w-64 space-y-1">
                                    <div className="flex justify-between">
                                        <span>Subtotal:</span>
                                        <span>${calculateSubtotal().toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Tax ({invoiceDetails.taxRate}%):</span>
                                        <span>${calculateTax().toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between bg-blue-100 px-3 py-2 font-bold">
                                        <span>TOTAL USD:</span>
                                        <span>${calculateTotal().toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* ===== NOTES & TERMS ===== */}
                            <div className="grid grid-cols-2 px-6 py-4">
                                <div>
                                    <h4 className="text-blue-600 text-[11px] font-bold uppercase mb-1">
                                        Notes
                                    </h4>
                                    <p className="text-xs">{notes}</p>
                                </div>
                                <div className="text-right">
                                    <h4 className="text-blue-600 text-[11px] font-bold uppercase mb-1 text-right">
                                        Terms & Conditions
                                    </h4>
                                    <p className="text-xs">{terms}</p>
                                </div>
                            </div>

                            {/* ===== NOTES, TERMS & BANK DETAILS ===== */}
                            <div className="grid grid-cols-2 gap-6 px-6 py-6 border-t border-gray-300">
                                <div>
                                    <div className="mb-4">
                                        <h4 className="font-bold text-[11px] uppercase mb-1">
                                            Bank Details
                                        </h4>
                                        <p className="text-xs">{bankDetails}</p>
                                    </div>

                                    {/* QR IMAGE */}
                                    <div className="mt-4">
                                        <img
                                            src="/assets/gpayQR.png"
                                            alt="Google Pay QR Code"
                                            className="w-24 h-24 border border-gray-300 p-1 object-contain"
                                        />
                                    </div>
                                </div>


                                <div className="text-right">
                                    <h4 className="font-bold text-[11px] uppercase mb-6">
                                        Authorized Signature
                                    </h4>

                                    <img
                                        src="/assets/signature.png"
                                        alt="Authorized Signature"
                                        className="inline-block h-12 object-contain border border-gray-300 px-4 py-2"
                                    />
                                </div>

                            </div>

                            {/* ===== FOOTER ===== */}
                            <div className="border-t border-gray-300 py-4 text-center text-xs">
                                <p className="font-bold mb-1">Thank you for your business!</p>
                                <p>For inquiries, contact us at {companyInfo.email || 'connect@echoess.in'}</p>
                                <p className="opacity-70 mt-1">
                                    This is a computer generated invoice and does not require signature.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default InvoiceGenerator;
