import { useRef, useState } from 'react';
import WorkspaceLayout from '../../../components/workspace/WorkspaceLayout';
import { 
  ShoppingCart, Plus, Minus, Trash2, CreditCard, 
  Banknote, Smartphone, Search, Package,
  CheckCircle, X
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
}

interface CartItem extends Product {
  quantity: number;
  price: number;
}

const products: Product[] = [
  { id: '1', name: 'Web Development', category: 'Services', stock: 999 },
  { id: '2', name: 'Mobile App Dev', category: 'Services', stock: 999 },
  { id: '3', name: 'UI/UX Design', category: 'Services', stock: 999 },
  { id: '4', name: 'Cloud Hosting (1yr)', category: 'Products', stock: 100 },
  { id: '5', name: 'SSL Certificate', category: 'Products', stock: 500 },
  { id: '6', name: 'Domain (.com)', category: 'Products', stock: 200 },
  { id: '7', name: 'SEO Package', category: 'Services', stock: 999 },
  { id: '8', name: 'Maintenance', category: 'Services', stock: 999 },
  { id: '9', name: 'Custom Item', category: 'Custom', stock: 999 },
];

export default function InvoicePage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'upi'>('cash');
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [customPrice, setCustomPrice] = useState('');
  const [transactionComplete, setTransactionComplete] = useState(false);

  const categories = ['All', 'Services', 'Products', 'Custom'];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openPriceModal = (product: Product) => {
    setSelectedProduct(product);
    setCustomPrice('');
    setShowPriceModal(true);
  };

  const addToCartWithPrice = () => {
    const price = parseFloat(customPrice);
    if (selectedProduct && price > 0) {
      setCart(prev => {
        const existing = prev.find(item => item.id === selectedProduct.id && item.price === price);
        if (existing) {
          return prev.map(item => 
            item.id === selectedProduct.id && item.price === price
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { ...selectedProduct, quantity: 1, price }];
      });
      setShowPriceModal(false);
      setCustomPrice('');
      setSelectedProduct(null);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  const [showReceipt, setShowReceipt] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'paid' | 'pending'>('paid');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [receiptNumber, setReceiptNumber] = useState('');

  const generateReceiptNumber = () => {
    const prefix = 'RCP';
    const date = new Date().toISOString().slice(2, 10).replace(/-/g, '');
    const random = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}-${date}-${random}`;
  };

  const handlePayment = () => {
    const newReceiptNumber = generateReceiptNumber();
    setReceiptNumber(newReceiptNumber);
    setTransactionComplete(true);
    setTimeout(() => {
      setShowPaymentModal(false);
      setShowReceipt(true);
    }, 1500);
  };

  const closeReceipt = () => {
    setShowReceipt(false);
    setTransactionComplete(false);
    setCustomerName('');
    setCustomerPhone('');
    clearCart();
  };

  const printReceipt = () => {
    window.print();
  };

  return (
    <WorkspaceLayout title="Invoice & POS" subtitle="Create invoices and process sales">
      <div className="flex flex-col gap-6">
        {/* Invoice Generator - Top */}
        <div className="w-full overflow-hidden" style={{ height: '600px' }}>
          <div 
            className="w-full h-full"
            style={{
              transform: 'scale(0.85)',
              transformOrigin: 'top left',
              width: '117.65%',
              height: '117.65%'
            }}
          >
            <iframe
              ref={iframeRef}
              src="https://invoice.echoess.in"
              className="w-full h-full border-0"
              title="Invoice Generator"
            />
          </div>
        </div>

        {/* POS System - Bottom */}
        <div className="w-full flex flex-col bg-white border border-border">
          {/* POS Header */}
          <div className="p-4 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary text-white rounded">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Quick POS</h3>
                <p className="text-xs text-muted-foreground">Add items & process payment</p>
              </div>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="p-3 border-b border-border space-y-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-muted border border-border text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div className="flex gap-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 text-xs font-medium transition-colors ${
                    selectedCategory === cat 
                      ? 'bg-primary text-white' 
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="p-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
              {filteredProducts.map(product => (
                <button
                  key={product.id}
                  onClick={() => openPriceModal(product)}
                  className="p-3 bg-muted/50 border border-border hover:border-primary hover:bg-primary/5 transition-all text-left group"
                >
                  <div className="flex items-start justify-between mb-1">
                    <Package className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                    <span className="text-[10px] text-muted-foreground">{product.category}</span>
                  </div>
                  <p className="text-sm font-medium truncate">{product.name}</p>
                  <p className="text-xs text-primary mt-2">Click to set price</p>
                </button>
              ))}
            </div>
          </div>

          {/* Cart Section */}
          <div className="border-t border-border">
            {/* Cart Items */}
            <div className="max-h-[150px] overflow-y-auto p-3 space-y-2">
              {cart.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  <ShoppingCart className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Cart is empty - click products above to add</p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-2 p-2 bg-muted/50 border border-border">
                      <div className="min-w-0">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">₹{item.price.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-1 ml-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-white border border-border"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-white border border-border"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Totals & Actions */}
            <div className="p-3 border-t border-border bg-muted/30 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-sm text-muted-foreground">Subtotal: </span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">GST (18%): </span>
                  <span className="font-medium">₹{tax.toLocaleString()}</span>
                </div>
                <div className="text-lg font-bold text-primary">
                  <span>Total: ₹{total.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={clearCart}
                  disabled={cart.length === 0}
                  className="px-4 py-2 border border-border text-sm font-medium hover:bg-muted transition-colors disabled:opacity-50"
                >
                  Clear Cart
                </button>
                <button
                  onClick={() => setShowPaymentModal(true)}
                  disabled={cart.length === 0}
                  className="px-6 py-2 bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Price Entry Modal */}
      {showPriceModal && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white w-full max-w-sm border border-border shadow-lg">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-semibold">Enter Price</h3>
              <button 
                onClick={() => {
                  setShowPriceModal(false);
                  setCustomPrice('');
                  setSelectedProduct(null);
                }}
                className="p-1 hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Price (₹)</label>
                <input
                  type="number"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-3 py-3 bg-muted border border-border text-lg focus:outline-none focus:border-primary text-center"
                  autoFocus
                />
              </div>
            </div>

            <div className="p-4 border-t border-border bg-muted/20">
              <button
                onClick={addToCartWithPrice}
                disabled={!customPrice || parseFloat(customPrice) <= 0}
                className="w-full py-3 bg-primary text-white font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white w-full max-w-sm border border-border shadow-lg">
            {transactionComplete ? (
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-1">Payment Successful!</h3>
                <p className="text-sm text-muted-foreground">Transaction completed</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between p-3 border-b border-border">
                  <h3 className="font-semibold text-sm">Payment</h3>
                  <button 
                    onClick={() => setShowPaymentModal(false)}
                    className="p-1 hover:bg-muted"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-3 space-y-3">
                  {/* Total Display */}
                  <div className="text-center p-2 bg-muted/50">
                    <p className="text-xs text-muted-foreground">Amount</p>
                    <p className="text-2xl font-bold text-primary">₹{total.toLocaleString()}</p>
                  </div>

                  {/* Customer Name Input */}
                  <div>
                    <p className="text-xs font-medium mb-1 text-muted-foreground">Customer Name</p>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Enter customer name (optional)"
                      className="w-full px-3 py-2 bg-muted border border-border text-sm focus:outline-none focus:border-primary"
                    />
                  </div>

                  {/* Customer Phone Input */}
                  <div>
                    <p className="text-xs font-medium mb-1 text-muted-foreground">Phone Number</p>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="Enter phone number (optional)"
                      className="w-full px-3 py-2 bg-muted border border-border text-sm focus:outline-none focus:border-primary"
                    />
                  </div>

                  {/* Payment Status Selection */}
                  <div>
                    <p className="text-xs font-medium mb-1 text-muted-foreground">Payment Status</p>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setPaymentStatus('paid')}
                        className={`p-2 border text-center text-sm transition-colors flex items-center justify-center gap-1 ${
                          paymentStatus === 'paid'
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-border hover:bg-muted'
                        }`}
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        Paid
                      </button>
                      <button
                        onClick={() => setPaymentStatus('pending')}
                        className={`p-2 border text-center text-sm transition-colors flex items-center justify-center gap-1 ${
                          paymentStatus === 'pending'
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-border hover:bg-muted'
                        }`}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Not Paid
                      </button>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPaymentMethod('cash')}
                      className={`p-2 border text-center transition-colors flex items-center justify-center gap-2 ${
                        paymentMethod === 'cash' 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:bg-muted'
                      }`}
                    >
                      <Banknote className="w-4 h-4" />
                      <span className="text-sm">Cash</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-2 border text-center transition-colors flex items-center justify-center gap-2 ${
                        paymentMethod === 'upi' 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:bg-muted'
                      }`}
                    >
                      <Smartphone className="w-4 h-4" />
                      <span className="text-sm">UPI</span>
                    </button>
                  </div>

                  {/* UPI QR Code Scanner - Compact */}
                  {paymentMethod === 'upi' && (
                    <div className="text-center p-2 bg-muted/30 border border-dashed border-border">
                      <img src="/upi.jpeg" alt="UPI QR Code" className="w-32 h-32 mx-auto border border-border object-contain" />
                      <p className="text-[10px] text-muted-foreground mt-1">razorpay.me/@echoessoftwaretechnologies</p>
                    </div>
                  )}

                  {/* Order Summary - Compact */}
                  <div className="border border-border p-2 text-sm">
                    <p className="text-xs font-medium mb-1 text-muted-foreground">Order Summary</p>
                    <div className="max-h-[80px] overflow-y-auto space-y-0.5">
                      {cart.map(item => (
                        <div key={item.id} className="flex justify-between text-xs">
                          <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                          <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-1 mt-1 border-t border-border flex justify-between font-semibold text-sm">
                      <span>Total</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 border-t border-border bg-muted/20">
                  <button
                    onClick={handlePayment}
                    className="w-full py-2 bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Complete Payment
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Professional Corporate Receipt Modal - Enhanced */}
      {showReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black/60 overflow-y-auto">
          <div className="bg-white w-full max-w-sm shadow-2xl rounded-sm">
            {/* Receipt Container */}
            <div id="receipt" className="p-5 bg-white relative">
              {/* Subtle Background Pattern */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, #2563eb 0, #2563eb 1px, transparent 0, transparent 50%)',
                  backgroundSize: '20px 20px'
                }}
              />
              
              {/* Header Section */}
              <div className="border-b border-blue-200 pb-3 mb-3 relative">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <img src="/2.png" alt="Echoess Software" className="h-10 w-auto" />
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1">Echoes Software Technologies</p>
                    <p className="text-[10px] text-gray-500">GSTIN: 33AABCU9603R1ZX</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] font-mono font-semibold text-blue-700">{receiptNumber}</p>
                    <p className="text-[10px] text-gray-500">
                      {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="mb-3 bg-blue-50 p-2">
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">Billed To</p>
                <p className="text-xs font-medium text-gray-800">{customerName || 'Walk-in Customer'}</p>
                <p className="text-[10px] text-gray-500">Phone: {customerPhone || '-'}</p>
              </div>

              {/* Items Table */}
              <table className="w-full mb-3 border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 bg-blue-50/50">
                    <th className="text-left py-1.5 px-1 text-[10px] font-bold uppercase tracking-wider text-blue-700">Description</th>
                    <th className="text-center py-1.5 px-1 text-[10px] font-bold uppercase w-8 text-blue-700">Qty</th>
                    <th className="text-right py-1.5 px-1 text-[10px] font-bold uppercase text-blue-700">Rate</th>
                    <th className="text-right py-1.5 px-1 text-[10px] font-bold uppercase text-blue-700">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-1.5 px-1 text-xs text-gray-800">{item.name}</td>
                      <td className="py-1.5 px-1 text-xs text-center font-medium">{item.quantity}</td>
                      <td className="py-1.5 px-1 text-xs text-right text-gray-600">₹{item.price.toLocaleString()}</td>
                      <td className="py-1.5 px-1 text-xs text-right font-semibold text-blue-700">₹{(item.price * item.quantity).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals Section */}
              <div className="bg-blue-50 border border-blue-200 p-3 mb-3">
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>CGST @ 9%</span>
                    <span>₹{(tax / 2).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>SGST @ 9%</span>
                    <span>₹{(tax / 2).toLocaleString()}</span>
                  </div>
                  <div className="border-t border-gray-100 pt-2 mt-2 flex justify-between">
                    <span className="text-sm font-bold text-blue-700">TOTAL AMOUNT</span>
                    <span className="text-sm font-bold text-blue-700">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Payment Info with PAID Stamp */}
              <div className="flex justify-between items-start mb-3">
                <div className="text-xs">
                  <p className="text-gray-600 mb-1">
                    <span className="font-semibold">Payment Mode:</span>{' '}
                    <span className="uppercase font-bold text-blue-600">{paymentMethod === 'cash' ? 'Cash' : 'UPI'}</span>
                  </p>
                  {paymentMethod === 'upi' && (
                    <>
                      <p className="text-[10px] text-gray-500 font-mono mb-2">Txn ID: UPI{Date.now().toString().slice(-8)}</p>
                      <img src="/upi.jpeg" alt="UPI QR Code" className="w-20 h-20 border border-gray-100 object-contain" />
                    </>
                  )}
                </div>
                {/* Status Stamp */}
                <div className="relative">
                  {paymentStatus === 'paid' ? (
                    <div className="border border-green-300 text-green-600 font-bold text-lg px-3 py-1 transform -rotate-12 opacity-60">
                      PAID
                    </div>
                  ) : (
                    <div className="border border-orange-300 text-orange-500 font-bold text-lg px-3 py-1 transform -rotate-12 opacity-60">
                      PENDING
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="text-center border-t border-blue-100 pt-3">
                <p className="text-xs font-semibold text-blue-700 mb-1">Thank you for your business!</p>
                <p className="text-[10px] text-gray-500">This is a computer generated receipt</p>
                <p className="text-[10px] text-gray-400">support@echoess.in | www.echoess.in</p>
              </div>

              {/* Signature & Stamp Area */}
              <div className="mt-4 flex justify-between items-end">
                <div className="text-center">
                  <img src="/founder_signature.png" alt="Authorized Signature" className="w-24 h-12 object-contain mb-0" />
                  <p className="text-[10px] text-gray-500 mt-1">Authorized Signature</p>
                </div>
                <div className="text-right">
                  <img src="/seal_nos2.png" alt="Company Seal" className="w-16 h-16 object-contain opacity-80" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-3 border-t border-blue-200 bg-blue-50 flex gap-2 print:hidden rounded-b-sm">
              <button
                onClick={printReceipt}
                className="flex-1 py-2 bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5 rounded-sm"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Receipt
              </button>
              <button
                onClick={closeReceipt}
                className="flex-1 py-2 border-2 border-blue-600 text-blue-600 text-xs font-semibold hover:bg-blue-600 hover:text-white transition-colors rounded-sm"
              >
                New Sale
              </button>
            </div>
          </div>
        </div>
      )}
    </WorkspaceLayout>
  );
}
