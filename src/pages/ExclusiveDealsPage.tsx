import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import PageHero from '../components/PageHero';

const contentPackages = [
  {
    title: "Basic Plan",
    description: "Perfect for small businesses starting their digital journey",
    originalPrice: "₹5,999",
    dealPrice: "₹3,999",
    discount: "33% OFF",
    features: [
      "12 Videos Per Month",
      "12 Flyers / Posters",
      "Basic Content Creation",
      "Basic Level Video Editing",
      "Monthly Delivery"
    ],
    tag: "Starter",
    validUntil: "Per Month"
  },
  {
    title: "Pro Plan",
    description: "Complete social media management for growing businesses",
    originalPrice: "₹7,999",
    dealPrice: "₹5,499",
    discount: "31% OFF",
    features: [
      "20 Videos Per Month",
      "20 Social Media Posters",
      "Social Media Handling",
      "Pro Level Video Editing",
      "Market Analysis Support"
    ],
    tag: "Most Popular",
    validUntil: "Per Month"
  },
  {
    title: "Premium Plan",
    description: "Comprehensive content solution for established brands",
    originalPrice: "₹9,999",
    dealPrice: "₹6,999",
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
    validUntil: "Per 2 Months"
  }
];

const businessBundles = [
  {
    title: "Business Starter Kit",
    description: "Complete starter solution for new businesses",
    originalPrice: "₹7,999",
    dealPrice: "₹5,499",
    discount: "31% OFF",
    features: [
      "Static Website 4 Pages (One Time)",
      "Branding (One Time)",
      "Logo Design (One Time)",
      "Domain + Hosting (Yearly Renewal)",
      "Marketing Analysis Support (One Time)"
    ],
    tag: "Starter",
    validUntil: "Limited Offer"
  },
  {
    title: "Business Pro Kit",
    description: "Advanced solution for growing businesses",
    originalPrice: "₹9,999",
    dealPrice: "₹6,799",
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
    validUntil: "Limited Offer"
  },
  {
    title: "Business Premium Kit",
    description: "Complete e-commerce and marketing solution",
    originalPrice: "₹18,999",
    dealPrice: "₹12,999",
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
    validUntil: "Limited Offer"
  }
];

const addOns = [
  { title: "Extra Website Page", price: "₹999", original: "₹1,500" },
  { title: "Advanced SEO Package", price: "₹2,499", original: "₹3,999" },
  { title: "Extra Flyers (10)", price: "₹499", original: "₹799" },
  { title: "Priority Support", price: "₹999/mo", original: "₹1,499/mo" },
  { title: "Social Media Post (10)", price: "₹1,499", original: "₹2,499" },
  { title: "Video Editing (5 videos)", price: "₹2,999", original: "₹4,499" },
  { title: "Logo Redesign", price: "₹1,999", original: "₹2,999" },
  { title: "Business Card Design", price: "₹499", original: "₹799" },
  { title: "Email Marketing Setup", price: "₹1,499", original: "₹2,499" },
  { title: "Google My Business Setup", price: "₹999", original: "₹1,499" },
  { title: "WhatsApp Business API", price: "₹1,999", original: "₹2,999" },
  { title: "Payment Gateway Integration", price: "₹2,499", original: "₹3,499" }
];

export default function ExclusiveDealsPage() {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formPayload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      selectedPackage: selectedPackage || 'Custom Package',
      selectedServices: selectedServices.join(', ') || 'None selected'
    };

    try {
      const response = await fetch('https://formspree.io/f/mjgpadbl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formPayload),
      });

      if (response.ok) {
        alert('Thank you! Your custom pricing request has been submitted. We will get back to you within 24 hours.');
        setIsModalOpen(false);
        setSelectedServices([]);
        setSelectedPackage('');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        alert('Something went wrong. Please try again later.');
      }
    } catch (error) {
      alert('Failed to submit. Please check your connection and try again.');
    }
  };

  const websiteServices = [
    "Static Website (One Time)",
    "Dynamic Website (One Time)",
    "E-Commerce Website (One Time)",
    "Extra Website Page (One Time)",
    "Website Maintenance (Monthly)",
    "Domain + Hosting (Yearly Renewal)"
  ];

  const contentServices = [
    "Content Creation (Monthly)",
    "Video Editing Services (Monthly)",
    "Flyer/Poster Design (Per Design)",
    "Animated Videos (Per Video)",
    "Social Media Handling (Monthly)",
    "Social Media Page Handling (One Time)",
    "Professional Marketing Guidance (One Time)",
    "Basic Level Marketing Guidance (One Time)"
  ];

  const brandingServices = [
    "Logo Design (One Time)",
    "Branding Package (One Time)",
    "Logo + Branding Combo (One Time)",
    "Basic SEO (One Time)",
    "Advanced SEO (One Time)",
    "Marketing Analysis Support (One Time)",
    "Lifetime Support for Future Upgrades"
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <PageHero
          label="Limited Time Offers"
          title="Exclusive Pricing"
          highlight="& Special Deals"
          description="Take advantage of our curated bundle deals designed to accelerate your business growth. Save up to 34% on comprehensive technology solutions."
          backgroundImage="/hero-background/3.png"
        />

        {/* Content Creation Packages */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <span className="text-[11px] tracking-[0.3em] font-semibold uppercase text-primary mb-4 block">
                Content Services
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight">
                Content Creation Packages
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {contentPackages.map((deal, index) => (
                <div 
                  key={index} 
                  className="group relative bg-white border border-border rounded-lg hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5"
                >
                  {/* Tag Badge */}
                  <div className="absolute -top-3 left-6">
                    <span className="inline-block px-3 py-1 bg-primary text-white text-[10px] font-semibold uppercase tracking-wider">
                      {deal.tag}
                    </span>
                  </div>

                  <div className="p-8 pt-10">
                    {/* Header */}
                    <div className="mb-6">
                      <h3 className="text-lg font-display font-medium mb-2">{deal.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{deal.description}</p>
                    </div>

                    {/* Price */}
                    <div className="mb-8 pb-8 border-b border-border">
                      <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-display font-medium text-primary">{deal.dealPrice}</span>
                        <span className="text-base text-muted-foreground line-through">{deal.originalPrice}</span>
                      </div>
                      <span className="inline-block mt-2 px-2 py-1 bg-green-50 text-green-600 text-xs font-bold">
                        {deal.discount}
                      </span>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {deal.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <button 
                      onClick={() => {
                        setSelectedPackage(deal.title);
                        setIsModalOpen(true);
                      }}
                      className="block w-full py-2.5 bg-foreground text-background text-sm font-medium text-center hover:bg-primary transition-colors duration-300"
                    >
                      Get Started
                    </button>
                    <p className="text-center text-[10px] text-muted-foreground mt-3">
                      {deal.validUntil}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Business Bundles */}
        <section className="py-20 md:py-28 bg-muted border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <span className="text-[11px] tracking-[0.3em] font-semibold uppercase text-primary mb-4 block">
                Business Solutions
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight">
                Business Bundles
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {businessBundles.map((deal, index) => (
                <div 
                  key={index} 
                  className="group relative bg-white border border-border rounded-lg hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5"
                >
                  {/* Tag Badge */}
                  <div className="absolute -top-3 left-6">
                    <span className="inline-block px-3 py-1 bg-blue-500 text-white text-[10px] font-semibold uppercase tracking-wider">
                      {deal.tag}
                    </span>
                  </div>

                  <div className="p-8 pt-10">
                    {/* Header */}
                    <div className="mb-6">
                      <h3 className="text-lg font-display font-medium mb-2">{deal.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{deal.description}</p>
                    </div>

                    {/* Price */}
                    <div className="mb-8 pb-8 border-b border-border">
                      <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-display font-medium text-primary">{deal.dealPrice}</span>
                        <span className="text-base text-muted-foreground line-through">{deal.originalPrice}</span>
                      </div>
                      <span className="inline-block mt-2 px-2 py-1 bg-green-50 text-green-600 text-xs font-bold">
                        {deal.discount}
                      </span>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {deal.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <button 
                      onClick={() => {
                        setSelectedPackage(deal.title);
                        setIsModalOpen(true);
                      }}
                      className="block w-full py-2.5 bg-foreground text-background text-sm font-medium text-center hover:bg-primary transition-colors duration-300"
                    >
                      Get Started
                    </button>
                    <p className="text-center text-[10px] text-muted-foreground mt-3">
                      {deal.validUntil}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Add-ons Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8 md:mb-12">
              <h2 className="text-lg md:text-xl font-display font-medium">Discounted Add-ons</h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4">
              {addOns.map((addon, index) => (
                <div 
                  key={index} 
                  className="p-3 md:p-4 bg-muted border border-border rounded hover:border-primary transition-all duration-300"
                >
                  <h4 className="font-medium text-xs md:text-sm mb-1 md:mb-2 leading-tight">{addon.title}</h4>
                  <div className="flex items-baseline gap-1 md:gap-2 flex-wrap">
                    <span className="text-base md:text-lg font-medium text-primary">{addon.price}</span>
                    <span className="text-xs md:text-sm text-muted-foreground line-through">{addon.original}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Customize Your Package Section */}
        <section className="py-20 md:py-28 bg-white border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <span className="text-[11px] tracking-[0.3em] font-semibold uppercase text-primary mb-4 block">
                Build Your Own
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-4">
                Customize Your Package
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Select the services you need and we'll create a custom quote tailored to your requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Website Services */}
              <div className="bg-muted p-6 border border-border">
                <h3 className="text-lg font-display font-medium mb-4 pb-4 border-b border-border">
                  Website Services
                </h3>
                <div className="space-y-3">
                  {websiteServices.map((item, i) => (
                    <label key={i} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 border-border rounded accent-primary"
                        checked={selectedServices.includes(item)}
                        onChange={() => toggleService(item)}
                      />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Content & Marketing */}
              <div className="bg-muted p-6 border border-border">
                <h3 className="text-lg font-display font-medium mb-4 pb-4 border-b border-border">
                  Content & Marketing
                </h3>
                <div className="space-y-3">
                  {contentServices.map((item, i) => (
                    <label key={i} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 border-border rounded accent-primary"
                        checked={selectedServices.includes(item)}
                        onChange={() => toggleService(item)}
                      />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Branding & SEO */}
              <div className="bg-muted p-6 border border-border">
                <h3 className="text-lg font-display font-medium mb-4 pb-4 border-b border-border">
                  Branding & SEO
                </h3>
                <div className="space-y-3">
                  {brandingServices.map((item, i) => (
                    <label key={i} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 border-border rounded accent-primary"
                        checked={selectedServices.includes(item)}
                        onChange={() => toggleService(item)}
                      />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Request Quote Section */}
            <div className="mt-8 md:mt-12 p-4 sm:p-6 bg-background border border-border rounded-lg">
              <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-6">
                {/* Left: Request Custom Pricing */}
                <div className="text-center md:text-left w-full md:w-auto">
                  <h3 className="text-lg md:text-xl font-display font-medium mb-2 text-foreground">
                    Request Custom Pricing
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm mb-4 max-w-md mx-auto md:mx-0">
                    {selectedServices.length > 0 
                      ? `You have selected ${selectedServices.length} service(s). Fill out the form to get your custom quote.`
                      : 'Select your desired services above and click below to send us your requirements. We will get back to you with a personalized quote within 24 hours.'
                    }
                  </p>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-foreground text-background text-[11px] font-semibold hover:bg-primary transition-all duration-300 w-full sm:w-auto rounded"
                  >
                    Request Pricing
                  </button>
                </div>
                
                {/* Right: Value Propositions */}
                <div className="text-center md:text-right w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-border">
                  <div className="flex items-center justify-center md:justify-end gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-medium text-primary">24/7</div>
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-[10px] font-medium text-green-600">100%</div>
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-medium text-blue-600">FREE</div>
                  </div>
                  <div className="text-base sm:text-lg md:text-xl font-medium text-foreground">Free Consultation</div>
                  <div className="text-xs text-muted-foreground">24/7 Support • Lifetime Upgrades • No Hidden Fees</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-white">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="text-lg font-display font-medium">Request Pricing</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 hover:bg-muted transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} className="p-4 space-y-4">
                {/* Selected Package Summary */}
                {selectedPackage && (
                  <div className="bg-primary/10 p-3 border border-primary/20">
                    <h4 className="font-medium text-xs text-primary/70 mb-1">Selected Package</h4>
                    <p className="text-primary font-semibold text-sm">{selectedPackage}</p>
                  </div>
                )}

                {/* Selected Services Summary */}
                {selectedServices.length > 0 && (
                  <div className="bg-muted p-3 border border-border">
                    <h4 className="font-medium text-xs text-muted-foreground mb-2">Selected Services ({selectedServices.length})</h4>
                    <ul className="space-y-1 max-h-24 overflow-y-auto">
                      {selectedServices.map((service, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-border bg-white text-sm focus:outline-none focus:border-primary"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-border bg-white text-sm focus:outline-none focus:border-primary"
                      placeholder="Your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border bg-white text-sm focus:outline-none focus:border-primary"
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5">Requirements</label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border bg-white text-sm focus:outline-none focus:border-primary resize-none"
                    placeholder="Any specific requirements..."
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-2 border border-border text-sm font-medium hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-foreground text-background text-sm font-medium hover:bg-primary transition-colors"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-foreground text-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-display font-medium tracking-tighter mb-4">
                  Need a Custom Deal?
                </h2>
                <p className="text-background/70 leading-relaxed">
                  We can create tailored packages based on your specific requirements. 
                  Contact us to discuss custom pricing for your project.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-start md:justify-end">
                <Link 
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-background text-foreground text-sm tracking-widest uppercase font-semibold hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Contact Us
                </Link>
                <Link 
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-background/30 text-sm tracking-widest uppercase font-semibold hover:bg-background hover:text-foreground transition-all duration-300"
                >
                  View Services
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
