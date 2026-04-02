import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Check, MessageSquare, Users, Calendar } from 'lucide-react';
import Layout from '../components/Layout';

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "connect@echoess.in",
    description: "For general inquiries and project discussions"
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+91 81485 49511",
    description: "Mon-Fri from 8am to 6pm EST"
  },
  {
    icon: MapPin,
    title: "Office",
    value: "Karur, Tamilnadu, India - 639001",
    description: "Visit us for in-person consultations"
  },
  {
    icon: Clock,
    title: "Working Hours",
    value: "Monday - Friday: 8am - 6pm EST",
    description: "Weekend support available for urgent matters"
  }
];

const services = [
  "Custom Software Development",
  "Cloud Solutions",
  "Mobile App Development",
  "Data Analytics & BI",
  "Cybersecurity",
  "AI & Automation",
  "UI/UX Design",
  "Digital Transformation Consulting"
];

const faqs = [
  {
    question: "What is your typical project timeline?",
    answer: "Project timelines vary based on scope and complexity. A typical MVP takes 3-4 months, while enterprise solutions may take 6-12 months. We provide detailed timelines during the discovery phase."
  },
  {
    question: "How do you handle project communication?",
    answer: "We maintain transparent communication through regular stand-ups, weekly progress reports, and dedicated project management tools. You'll have direct access to our team throughout the project."
  },
  {
    question: "What technologies do you specialize in?",
    answer: "We work with modern tech stacks including React, Node.js, Python, AWS, and more. We choose technologies based on your specific requirements and long-term goals."
  },
  {
    question: "Do you provide ongoing support?",
    answer: "Yes, we offer comprehensive maintenance and support packages. This includes bug fixes, security updates, performance monitoring, and feature enhancements."
  },
  {
    question: "How do you ensure project quality?",
    answer: "Quality is ensured through code reviews, automated testing, CI/CD pipelines, and rigorous QA processes. We maintain high standards at every stage of development."
  }
];

const whyChooseUs = [
  {
    icon: MessageSquare,
    title: "Free Consultation",
    description: "Discuss your project with our experts at no cost"
  },
  {
    icon: Users,
    title: "Dedicated Team",
    description: "A team focused exclusively on your project"
  },
  {
    icon: Calendar,
    title: "Flexible Engagement",
    description: "Choose from fixed-price, time & material, or retainer models"
  },
  {
    icon: Check,
    title: "Quality Guarantee",
    description: "We stand behind our work with comprehensive warranties"
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/xlgowryg', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          service: formData.service,
          message: formData.message
        })
      });
      
      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: ''
        });
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Failed to send message. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-[11px] md:text-[12px] tracking-[0.3em] font-semibold uppercase text-primary">
              Get In Touch
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium tracking-tighter mt-6 mb-6">
              Let's Build<br />
              <span className="text-muted-foreground/40 italic">Something Great</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Have a project in mind? We'd love to hear about it. Send us a message and 
              our team will get back to you within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <div key={i} className="bg-muted p-6 border border-border hover:border-primary transition-colors duration-300">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">{info.title}</h3>
                  <p className="text-foreground font-medium mb-2">{info.value}</p>
                  <p className="text-sm text-muted-foreground">{info.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="py-24 md:py-32 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 md:p-12 border border-border">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-display font-medium mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-display font-medium mb-2">Send us a Message</h2>
                  <p className="text-muted-foreground mb-8">
                    Fill out the form below and we'll get back to you shortly.
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-4 py-3 border border-border bg-white text-sm focus:outline-none focus:border-primary transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-4 py-3 border border-border bg-white text-sm focus:outline-none focus:border-primary transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full px-4 py-3 border border-border bg-white text-sm focus:outline-none focus:border-primary transition-colors"
                        placeholder="Your company"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">
                          Service Interest
                        </label>
                        <select 
                          value={formData.service}
                          onChange={(e) => setFormData({...formData, service: e.target.value})}
                          className="w-full px-4 py-3 border border-border bg-white text-sm focus:outline-none focus:border-primary transition-colors"
                        >
                          <option value="">Select a service</option>
                          {services.map((service, i) => (
                            <option key={i} value={service}>{service}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full px-4 py-3 border border-border bg-white text-sm focus:outline-none focus:border-primary transition-colors"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">
                        Project Details *
                      </label>
                      <textarea
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full px-4 py-3 border border-border bg-white text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                        placeholder="Tell us about your project..."
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full px-6 py-3 bg-foreground text-background text-sm tracking-widest uppercase font-semibold hover:bg-primary transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Sending...' : 'Send Message'}
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* FAQ Section */}
            <div>
              <h2 className="text-2xl font-display font-medium mb-2">Frequently Asked Questions</h2>
              <p className="text-muted-foreground mb-8">
                Quick answers to common questions. Can't find what you're looking for? Contact us directly.
              </p>
              
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-white border border-border">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between"
                    >
                      <span className="font-medium">{faq.question}</span>
                      <span className="text-2xl text-muted-foreground">
                        {openFaq === i ? '−' : '+'}
                      </span>
                    </button>
                    {openFaq === i && (
                      <div className="px-6 pb-4">
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tighter mb-4">
              Why Work With <span className="text-muted-foreground/40 italic">Us?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to your success from day one
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-medium mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 md:py-32 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-border overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.217676750679!2d-73.98784408459418!3d40.74844097932788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405548c!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1645564756836!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-foreground text-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tighter mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-background/70 leading-relaxed mb-8 max-w-2xl mx-auto">
            Let's turn your ideas into reality. Contact us today for a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+918148549511"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-background text-foreground text-sm tracking-widest uppercase font-semibold hover:bg-primary hover:text-white transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              Call Us Now
            </a>
            <a 
              href="mailto:connect@echoess.in"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-background text-sm tracking-widest uppercase font-semibold hover:bg-background hover:text-foreground transition-all duration-300"
            >
              <Mail className="w-4 h-4" />
              Send Email
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
