import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, X, CreditCard, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import PageHero from '../components/PageHero';

const premiumBundles = [
  {
    id: 'content-basic',
    title: "Basic Plan",
    description: "Perfect for small businesses starting their digital journey",
    originalPrice: 5999,
    dealPrice: 3999,
    discount: "33% OFF",
    features: [
      "12 Videos Per Month",
      "12 Flyers / Posters",
      "Basic Content Creation",
      "Basic Level Video Editing",
      "Monthly Delivery"
    ],
    tag: "Starter",
    validUntil: "Per Month",
    category: "Content Creation"
  },
  {
    id: 'content-pro',
    title: "Pro Plan",
    description: "Complete social media management for growing businesses",
    originalPrice: 7999,
    dealPrice: 5499,
    discount: "31% OFF",
    features: [
      "20 Videos Per Month",
      "20 Social Media Posters",
      "Social Media Handling",
      "Pro Level Video Editing",
      "Market Analysis Support"
    ],
    tag: "Most Popular",
    validUntil: "Per Month",
    category: "Content Creation"
  },
  {
    id: 'content-premium',
    title: "Premium Plan",
    description: "Comprehensive content solution for established brands",
    originalPrice: 9999,
    dealPrice: 6999,
    discount: "30% OFF",
    features: [
      "60 Videos for 2 Months",
      "60 Social Media Flyers",
      "Premium Video Editing",
      "Social Media Handling",
      "Unlimited Revisions",
      "Professional Content Planning"
    ],
    tag: "Best Value",
    validUntil: "Per 2 Months",
    category: "Content Creation"
  },
  {
    id: 'business-starter',
    title: "Business Starter Kit",
    description: "Complete starter solution for new businesses",
    originalPrice: 7999,
    dealPrice: 5499,
    discount: "31% OFF",
    features: [
      "Static Website 4 Pages (One Time)",
      "Branding (One Time)",
      "Logo Design (One Time)",
      "Domain + Hosting (Yearly Renewal)",
      "Marketing Analysis Support (One Time)"
    ],
    tag: "Starter",
    validUntil: "Limited Offer",
    category: "Business Bundle"
  },
  {
    id: 'business-pro',
    title: "Business Pro Kit",
    description: "Advanced solution for growing businesses",
    originalPrice: 9999,
    dealPrice: 6799,
    discount: "32% OFF",
    features: [
      "Static Website 5 Pages (One Time)",
      "Logo + Branding (One Time)",
      "Domain + Hosting (Yearly Renewal)",
      "Basic SEO (One Time)",
      "Social Media Handling (One Time)",
      "Flyer/Poster Creation upto 10/month (One Time)",
      "Animated Videos upto 3/month (One Time)",
      "Basic Level Marketing Guidance (One Time)"
    ],
    tag: "Most Popular",
    validUntil: "Limited Offer",
    category: "Business Bundle"
  },
  {
    id: 'business-premium',
    title: "Business Premium Kit",
    description: "Complete e-commerce and marketing solution",
    originalPrice: 18999,
    dealPrice: 12999,
    discount: "32% OFF",
    features: [
      "Static E-Commerce Site with WhatsApp Order (One Time)",
      "Advanced SEO (One Time)",
      "Flyer/Poster upto 30/month (One Time)",
      "Professional Marketing Guidance (One Time)",
      "Domain + Hosting (Yearly Renewal)",
      "Lifetime Support for Future Upgrades",
      "Unlimited Revision",
      "Marketing Analysis Support (One Time)",
      "Content Creation + Video Editing upto 10/month (One Time)",
      "Social Media Page Handling (One Time)"
    ],
    tag: "Best Value",
    validUntil: "Limited Offer",
    category: "Business Bundle"
  }
];

export default function PremiumBundlesPage() {
  const location = useLocation();
  const [selectedBundle, setSelectedBundle] = useState<typeof premiumBundles[0] | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'details' | 'processing' | 'success'>('details');
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });
  const [paymentMethod] = useState<'upi'>('upi');
  const [googleFormClicked, setGoogleFormClicked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  const handleGetStarted = (bundle: typeof premiumBundles[0]) => {
    setSelectedBundle(bundle);
    setIsPaymentModalOpen(true);
    setPaymentStep('details');
    setCustomerDetails({ name: '', email: '', phone: '', company: '' });
    setGoogleFormClicked(false);
    setTermsAccepted(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({ ...prev, [name]: value }));
  };


  const handleConfirmOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedBundle) return;

    setSubmitting(true);

    try {
      // Prepare base payload
      const payload: any = {
        customerName: customerDetails.name,
        customerEmail: customerDetails.email,
        customerPhone: customerDetails.phone,
        company: customerDetails.company || 'N/A',
        bundleName: selectedBundle.title,
        bundleId: selectedBundle.id,
        price: selectedBundle.dealPrice.toString(),
        originalPrice: selectedBundle.originalPrice.toString(),
        category: selectedBundle.category,
        paymentMethod: paymentMethod,
        orderDate: new Date().toISOString(),
        _subject: `New Premium Bundle Order: ${selectedBundle.title}`,
      };

      // Note: Screenshot uploaded separately via Google Form
      payload.paymentScreenshotNote = 'User uploaded screenshot via Google Form: https://forms.gle/55j862UY8k6m5UpbA';

      const response = await fetch('https://formspree.io/f/xgorvkaz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setPaymentStep('success');
      } else {
        const errorData = await response.text();
        console.error('Formspree error:', errorData);
        alert('Failed to submit order. Please try again or contact support.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit order. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedBundle(null);
    setPaymentStep('details');
    setCustomerDetails({ name: '', email: '', phone: '', company: '' });
  };

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <Layout>
      <PageHero
        label="Premium Bundles"
        title="Ready-to-Deploy"
        highlight="Solutions"
        description="Skip the inquiry process and get instant access to our premium bundles. Complete your purchase now and start your project immediately."
        backgroundImage="/hero-background/pb-hero.png"
      />

      {/* Content Creation Bundles */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[11px] tracking-[0.3em] font-semibold uppercase text-primary">
              Content Creation
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tighter mt-4 mb-4">
              Video & Content <span className="text-muted-foreground/40 italic">Packages</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional content creation services to boost your social media presence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {premiumBundles
              .filter(b => b.category === 'Content Creation')
              .map((bundle, i) => (
                <div 
                  key={i} 
                  className={`relative bg-white border-2 rounded-lg ${
                    bundle.tag === 'Most Popular' ? 'border-primary' : 'border-border'
                  } p-6 sm:p-8 flex flex-col`}
                >
                  {bundle.tag && (
                    <div className={`absolute -top-3 left-6 px-3 py-1 text-[10px] tracking-widest uppercase font-semibold ${
                      bundle.tag === 'Most Popular' 
                        ? 'bg-primary text-white' 
                        : bundle.tag === 'Best Value'
                        ? 'bg-green-500 text-white'
                        : 'bg-muted text-foreground'
                    }`}>
                      {bundle.tag}
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-display font-medium mb-2">{bundle.title}</h3>
                    <p className="text-sm text-muted-foreground">{bundle.description}</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl sm:text-4xl font-display font-medium">{formatPrice(bundle.dealPrice)}</span>
                      <span className="text-sm text-muted-foreground">{bundle.validUntil}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground line-through">{formatPrice(bundle.originalPrice)}</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">
                        {bundle.discount}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {bundle.features.map((feature, fi) => (
                      <li key={fi} className="flex items-start gap-3 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleGetStarted(bundle)}
                    className="w-full py-2.5 bg-foreground text-background text-[11px] tracking-widest uppercase font-semibold hover:bg-primary transition-all duration-300 flex items-center justify-center gap-1.5"
                  >
                    <CreditCard className="w-4 h-4" />
                    Buy Now
                  </button>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Business Bundles */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[11px] tracking-[0.3em] font-semibold uppercase text-primary">
              Business Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tighter mt-4 mb-4">
              Complete Business <span className="text-muted-foreground/40 italic">Kits</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              All-in-one solutions to establish and grow your online presence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {premiumBundles
              .filter(b => b.category === 'Business Bundle')
              .map((bundle, i) => (
                <div 
                  key={i} 
                  className={`relative bg-white border-2 rounded-lg ${
                    bundle.tag === 'Most Popular' ? 'border-primary' : 'border-border'
                  } p-6 sm:p-8 flex flex-col`}
                >
                  {bundle.tag && (
                    <div className={`absolute -top-3 left-6 px-3 py-1 text-[10px] tracking-widest uppercase font-semibold ${
                      bundle.tag === 'Most Popular' 
                        ? 'bg-primary text-white' 
                        : bundle.tag === 'Best Value'
                        ? 'bg-green-500 text-white'
                        : 'bg-muted text-foreground'
                    }`}>
                      {bundle.tag}
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-display font-medium mb-2">{bundle.title}</h3>
                    <p className="text-sm text-muted-foreground">{bundle.description}</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl sm:text-4xl font-display font-medium">{formatPrice(bundle.dealPrice)}</span>
                      <span className="text-sm text-muted-foreground">{bundle.validUntil}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground line-through">{formatPrice(bundle.originalPrice)}</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">
                        {bundle.discount}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {bundle.features.map((feature, fi) => (
                      <li key={fi} className="flex items-start gap-3 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleGetStarted(bundle)}
                    className="w-full py-2.5 bg-foreground text-background text-[11px] tracking-widest uppercase font-semibold hover:bg-primary transition-all duration-300 flex items-center justify-center gap-1.5"
                  >
                    <CreditCard className="w-4 h-4" />
                    Buy Now
                  </button>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[11px] tracking-[0.3em] font-semibold uppercase text-primary">
              Simple Process
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tighter mt-4 mb-4">
              How It <span className="text-muted-foreground/40 italic">Works</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Select Bundle", desc: "Choose the perfect package for your needs" },
              { step: "02", title: "Fill Details", desc: "Provide your contact and business information" },
              { step: "03", title: "Make Payment", desc: "Secure payment via Razorpay or UPI" },
              { step: "04", title: "Get Started", desc: "Receive confirmation and start your project" }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-display font-medium text-primary">{item.step}</span>
                </div>
                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Note */}
      <section className="py-12 md:py-16 bg-muted">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl sm:text-2xl font-display font-medium mb-4">Questions?</h3>
          <p className="text-muted-foreground mb-6">
            For bulk orders, custom requirements, or any questions about our premium bundles, 
            please contact our sales team.
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background text-[11px] tracking-widest uppercase font-semibold hover:bg-primary transition-all duration-300"
          >
            Contact Sales
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Payment Modal */}
      {isPaymentModalOpen && selectedBundle && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg max-h-[92vh] sm:max-h-[90vh] overflow-y-auto rounded-lg sm:rounded-xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-border p-3 sm:p-4 lg:p-6 flex items-center justify-between z-10 rounded-t-lg sm:rounded-t-xl">
              <div>
                <h3 className="text-base sm:text-lg lg:text-xl font-display font-medium">
                  {paymentStep === 'success' ? 'Order Confirmed' : 'Complete Your Purchase'}
                </h3>
                {paymentStep !== 'success' && (
                  <p className="text-xs sm:text-sm text-muted-foreground truncate max-w-[200px] sm:max-w-none">{selectedBundle.title}</p>
                )}
              </div>
              <button 
                onClick={closeModal}
                className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-3 sm:p-4 lg:p-6">
              {paymentStep === 'details' && (
                <form onSubmit={handleConfirmOrder} className="space-y-3 sm:space-y-4">
                  {/* Bundle Summary */}
                  <div className="bg-muted p-3 sm:p-4 mb-4 sm:mb-6 rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                      <div className="flex-1">
                        <p className="font-medium text-sm sm:text-base">{selectedBundle.title}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">{selectedBundle.category}</p>
                      </div>
                      <p className="text-base sm:text-lg font-display font-medium whitespace-nowrap">{formatPrice(selectedBundle.dealPrice)}</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Original Price</span>
                      <span className="line-through">{formatPrice(selectedBundle.originalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-muted-foreground">You Save</span>
                      <span className="text-green-600 font-medium">
                        {formatPrice(selectedBundle.originalPrice - selectedBundle.dealPrice)}
                      </span>
                    </div>
                  </div>

                  {/* Customer Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs tracking-widest uppercase font-semibold mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={customerDetails.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border text-sm focus:outline-none focus:border-primary transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-widest uppercase font-semibold mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={customerDetails.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border text-sm focus:outline-none focus:border-primary transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs tracking-widest uppercase font-semibold mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={customerDetails.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border text-sm focus:outline-none focus:border-primary transition-colors"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-widest uppercase font-semibold mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={customerDetails.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border text-sm focus:outline-none focus:border-primary transition-colors"
                        placeholder="Your Company"
                      />
                    </div>
                  </div>

                  {/* UPI Scanner */}
                    <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-muted rounded-lg">
                      <p className="text-xs sm:text-sm font-medium mb-2 sm:mb-3 text-center">Scan to Pay {formatPrice(selectedBundle.dealPrice)}</p>
                      <div className="bg-white p-2 sm:p-3 rounded-lg max-w-[160px] sm:max-w-[200px] mx-auto">
                        <img 
                          src="/upi.jpeg" 
                          alt="UPI Payment QR Code" 
                          className="w-full h-auto"
                        />
                      </div>
                      <p className="text-[10px] sm:text-xs text-muted-foreground mt-2 sm:mt-3 text-center">
                        Open any UPI app and scan this QR code to complete payment
                      </p>
                    </div>
                  {/* Screenshot Upload */}
                  <div className="mt-3 sm:mt-4">
                    <label className="block text-[10px] sm:text-xs tracking-widest uppercase font-semibold mb-1.5 sm:mb-2">
                      Attach Payment Screenshot * {googleFormClicked && <span className="text-green-600">✓ Completed</span>}
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setGoogleFormClicked(true);
                        window.open('https://forms.gle/55j862UY8k6m5UpbA', '_blank');
                      }}
                      className={`w-full block px-3 sm:px-4 py-2 border text-[11px] sm:text-xs text-center transition-colors rounded ${
                        googleFormClicked 
                          ? 'bg-green-600 text-white border-green-600' 
                          : 'bg-primary text-white border-border hover:bg-primary/90'
                      }`}
                    >
                      {googleFormClicked ? '✓ Screenshot Submitted - Click to Reopen' : 'Upload Screenshot on Google Form'}
                    </button>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-1.5 sm:mt-2">
                      {googleFormClicked 
                        ? 'Thank you! You can click above to reopen if needed.' 
                        : 'Click to open Google Form and upload your payment screenshot'}
                    </p>
                  </div>

                  {/* Terms Checkbox */}
                  <div className="flex items-start gap-2 mb-4">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-0.5 w-4 h-4 border border-border rounded cursor-pointer"
                    />
                    <label htmlFor="terms" className="text-[11px] sm:text-xs text-muted-foreground cursor-pointer">
                      I agree to the{' '}
                      <Link to="/terms" target="_blank" className="text-primary hover:underline">Terms of Service</Link>
                      {' '}and{' '}
                      <Link to="/privacy" target="_blank" className="text-primary hover:underline">Privacy Policy</Link>
                    </label>
                  </div>

                  {/* Total */}
                  <div className="border-t border-border pt-3 sm:pt-4 mt-4 sm:mt-6">
                    <div className="flex justify-between items-center mb-3 sm:mb-4">
                      <span className="text-sm sm:text-lg font-medium">Total Amount</span>
                      <span className="text-xl sm:text-2xl font-display font-medium">{formatPrice(selectedBundle.dealPrice)}</span>
                    </div>
                    <button
                      type="submit"
                      disabled={submitting || !googleFormClicked || !termsAccepted}
                      className="w-full py-2 bg-foreground text-background text-[11px] tracking-widest uppercase font-semibold hover:bg-primary transition-all duration-300 flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed rounded"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                          Confirming...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Confirm Order
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-muted-foreground text-center">
                    By proceeding, you agree to our Terms of Service and Privacy Policy
                  </p>
                </form>
              )}

              {paymentStep === 'processing' && (
                <div className="text-center py-8 sm:py-12">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-display font-medium mb-2">Submitting Order...</h3>
                  <p className="text-xs sm:text-base text-muted-foreground">Please do not close this window</p>
                </div>
              )}

              {paymentStep === 'success' && (
                <div className="text-center py-6 sm:py-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-display font-medium mb-2">Payment Successful!</h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for your purchase. A confirmation email has been sent to {customerDetails.email}
                  </p>
                  
                  <div className="bg-muted p-4 text-left mb-6">
                    <p className="text-sm"><strong>Order Summary:</strong></p>
                    <p className="text-sm text-muted-foreground">{selectedBundle.title}</p>
                    <p className="text-lg font-display font-medium mt-1">{formatPrice(selectedBundle.dealPrice)}</p>
                  </div>

                  <div className="flex justify-center">
                    <a
                      href="https://wa.me/918148549511?text=Hi!%20I%20have%20just%20completed%20my%20payment%20on%20your%20website.%20Please%20verify%20and%20confirm%20my%20order."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-5 bg-green-600 text-white text-[11px] tracking-widest font-semibold hover:bg-green-700 transition-all duration-300 rounded"
                    >
                      Contact us on whatsapp
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
