import { ArrowRight, Users, Target, Award, Globe, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import Layout from '../components/Layout';
import PageHero from '../components/PageHero';

const stats = [
  { value: "250+", label: "Projects Delivered" },
  { value: "50+", label: "Expert Engineers" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "12+", label: "Years Experience" }
];

const values = [
  {
    icon: Target,
    title: "Innovation First",
    description: "We constantly push boundaries to deliver cutting-edge solutions that keep our clients ahead of the curve."
  },
  {
    icon: Users,
    title: "Client Partnership",
    description: "We believe in building lasting relationships, working as an extension of your team to achieve shared success."
  },
  {
    icon: Award,
    title: "Quality Excellence",
    description: "Every project we deliver meets the highest standards of quality, performance, and user experience."
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "With clients across the globe, we bring diverse perspectives and proven expertise to every challenge."
  }
];

const team = [
  {
    name: "Leadership Team",
    role: "Strategic Vision",
    description: "Seasoned technology leaders with decades of combined experience driving digital transformation."
  },
  {
    name: "Engineering Team",
    role: "Technical Excellence",
    description: "Expert developers, architects, and specialists across all modern technology stacks."
  },
  {
    name: "Design Team",
    role: "Creative Innovation",
    description: "UI/UX designers and creative professionals crafting exceptional user experiences."
  }
];

// Office Gallery Images - all from public/office-gallery
const officeGalleryImages = [
  { src: "/office-gallery/0584590650.png", title: "Interior Plan" },
  { src: "/office-gallery/1.png", title: "Interior Plan" },
  { src: "/office-gallery/12.png", title: "Interior Plan" },
  { src: "/office-gallery/14.png", title: "Interior Plan" },
  { src: "/office-gallery/15.png", title: "Interior Plan" },
  { src: "/office-gallery/16.png", title: "Interior Plan" },
  { src: "/office-gallery/161.png", title: "Exterior Plan" },
  { src: "/office-gallery/2.png", title: "Interior Plan" },
  { src: "/office-gallery/2026-echoes-mockup1.png", title: "Interior Plan" },
  { src: "/office-gallery/2026-mockup1-echoes.png", title: "Interior Plan" },
  { src: "/office-gallery/202608048.png", title: "Interior Plan" },
  { src: "/office-gallery/202684.png", title: "Interior Plan" },
  { src: "/office-gallery/21.png", title: "Interior Plan" },
  { src: "/office-gallery/212.png", title: "Interior Plan" },
  { src: "/office-gallery/22.png", title: "Interior Plan" },
  { src: "/office-gallery/23.png", title: "Interior Plan" },
  { src: "/office-gallery/24.png", title: "Interior Plan" },
  { src: "/office-gallery/3.png", title: "Interior Plan" },
  { src: "/office-gallery/4.png", title: "Interior Plan" },
  { src: "/office-gallery/41.png", title: "Interior Plan" },
  { src: "/office-gallery/5.png", title: "Interior Plan" },
  { src: "/office-gallery/61.png", title: "Interior Plan" },
  { src: "/office-gallery/612.png", title: "Interior Plan" },
  { src: "/office-gallery/613.png", title: "Interior Plan" },
  { src: "/office-gallery/8046.png", title: "Interior Plan" },
  { src: "/office-gallery/81.png", title: "Interior Plan" },
  { src: "/office-gallery/echoes-2026-mockup.png", title: "Interior Plan" },
  { src: "/office-gallery/echoes2026-mockup.png", title: "Interior Plan" },
  { src: "/office-gallery/echoes212.png", title: "Interior Plan" }
];

export default function AboutPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xjgjkvjv', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset();
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <Layout>
      <PageHero
        label="About Us"
        title="Building Digital"
        highlight="Excellence"
        description="Echoes Software Technologies is a forward-thinking technology company dedicated to transforming businesses through innovative digital solutions. Founded with a vision to bridge the gap between complex technology and real-world business needs, we've grown into a trusted partner for organizations worldwide."
        backgroundImage="/hero-background/5.png"
      />

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-4xl lg:text-5xl font-display font-medium tracking-tighter text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="text-[11px] md:text-[12px] tracking-[0.3em] font-semibold uppercase text-primary">
                Our Mission
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tighter mt-6 mb-6">
                Empowering Businesses Through <span className="text-muted-foreground/40 italic">Technology</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our mission is to democratize technology by making enterprise-grade solutions 
                accessible to businesses of all sizes. We believe that the right technology 
                partner can transform not just operations, but entire business trajectories.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From startups taking their first digital steps to enterprises seeking 
                modernization, we bring the same passion, expertise, and commitment to 
                every project we undertake.
              </p>
            </div>
            <div className="bg-muted p-8 md:p-12">
              <blockquote className="text-xl md:text-2xl font-display font-medium leading-relaxed">
                "Technology should empower, not complicate. Our goal is to make digital 
                transformation a seamless journey for every business we partner with."
              </blockquote>
              <p className="text-sm text-muted-foreground mt-4">— Echoes Software Technologies</p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section - Minimalist */}
      <section className="py-24 md:py-40 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
            
            {/* Image - Right on mobile, Left on desktop */}
            <div className="flex-shrink-0 w-full max-w-[400px] order-2 md:order-1">
              <div className="relative w-full mx-auto">
                <img 
                  src="/ukaasha_founder.png" 
                  alt="Mohamed Ukaasha K"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            
            {/* Content - Left on mobile, Right on desktop */}
            <div className="flex-1 max-w-xl order-1 md:order-2">
              <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-6">
                Founder
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-light tracking-tight mb-2">
                Mohamed Ukaasha K
              </h2>
              <p className="text-sm text-muted-foreground mb-10">
                Founder of Echoes Software Technologies
              </p>
              
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  With over 15 years of experience in technology and business leadership, 
                  Mohamed established Echoes Software Technologies with a clear vision: 
                  to make enterprise-grade technology accessible to businesses of all sizes.
                </p>
                <p>
                  His passion for innovation and commitment to client success has been 
                  the driving force behind the company's growth and the trust built 
                  with clients worldwide.
                </p>
              </div>
              
              <div className="mt-12 pt-8 border-t border-border">
                <p className="text-sm italic text-muted-foreground">
                  "Building technology that truly serves people and businesses 
                  is not just our work—it's our purpose."
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 md:py-32 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16 md:mb-24">
            <span className="text-[11px] md:text-[12px] tracking-[0.3em] font-semibold uppercase text-primary">
              Our Values
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tighter mt-6">
              What We Stand<br /><span className="text-muted-foreground/40 italic">For</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, i) => (
              <div key={i} className="bg-white p-8 border border-border hover:border-primary transition-all duration-300">
                <h3 className="text-xl font-display font-medium mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16 md:mb-24">
            <span className="text-[11px] md:text-[12px] tracking-[0.3em] font-semibold uppercase text-primary">
              Our Team
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tighter mt-6">
              The People Behind<br /><span className="text-muted-foreground/40 italic">Our Success</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div key={i} className="border border-border p-8 hover:border-primary transition-all duration-300">
                <h3 className="text-xl font-display font-medium mb-2">{member.name}</h3>
                <p className="text-sm text-primary mb-4">{member.role}</p>
                <p className="text-muted-foreground leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Office Construction - Architecture Gallery */}
      <section className="py-24 md:py-40 bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header - Minimalist */}
          <div className="max-w-2xl mb-16 md:mb-24">
            <span className="text-[11px] md:text-[12px] tracking-[0.3em] font-semibold uppercase text-primary">
              Growth
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tighter mt-6">
              Our New Office<br /><span className="text-muted-foreground/40 italic">Coming Soon</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mt-6">
              Construction in progress. A space designed for innovation, collaboration, and the future of technology.
            </p>
          </div>

          {/* Architecture Gallery - Minimalist Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
            {officeGalleryImages.map((image, i) => (
              <div key={i} className="break-inside-avoid group">
                <div className="relative bg-muted overflow-hidden">
                  <img 
                    src={image.src} 
                    alt={image.title}
                    className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-medium">{image.title}</p>
                    <p className="text-white/70 text-xs mt-1">{i + 1} / {officeGalleryImages.length}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Feedback Section - Featured */}
      <section className="py-16 sm:py-20 md:py-32 bg-gradient-to-br from-blue-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-blue-100 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-blue-100 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-start">
            {/* Left Content */}
            <div className="text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-tighter mb-4 sm:mb-6">
                Tell About Your<br className="hidden sm:block" />
                <span className="text-blue-600">Valuable Feedback</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 sm:mb-8 max-w-lg">
                Your insights help us grow and serve you better. Share your experience, suggestions, or thoughts about our services. Every feedback matters to us.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 sm:gap-8">
                <div className="text-left">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-foreground">500+</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Feedbacks Received</p>
                </div>
                <div className="text-left">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-foreground">4.9</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Average Rating</p>
                </div>
                <div className="text-left">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-foreground">98%</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Response Rate</p>
                </div>
              </div>
            </div>

            {/* Right - Feedback Form Card */}
            <div className="bg-white p-6 sm:p-8 lg:p-12 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-blue-100">
              <h3 className="text-xl sm:text-2xl font-display font-medium mb-2">Share Your Thoughts</h3>
              <p className="text-muted-foreground text-xs sm:text-sm mb-6 sm:mb-8">
                Help us improve by sharing your experience
              </p>

              {formStatus === 'success' ? (
                /* Success Message */
                <div className="text-center py-8 sm:py-12">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-medium mb-2 text-foreground">Thank You!</h3>
                  <p className="text-muted-foreground text-sm sm:text-base mb-6">
                    Your feedback has been received successfully. We appreciate your time and input.
                  </p>
                  <button 
                    onClick={() => setFormStatus('idle')}
                    className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all"
                  >
                    Send Another Feedback
                  </button>
                </div>
              ) : (
                /* Form */
                <form 
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Your Name</label>
                      <input 
                        type="text" 
                        name="name"
                        placeholder="John Doe"
                        required
                        disabled={formStatus === 'submitting'}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        placeholder="john@example.com"
                        required
                        disabled={formStatus === 'submitting'}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Feedback Type</label>
                    <select 
                      name="feedback_type" 
                      disabled={formStatus === 'submitting'}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="General Feedback">General Feedback</option>
                      <option value="Service Experience">Service Experience</option>
                      <option value="Product Suggestion">Product Suggestion</option>
                      <option value="Bug Report">Bug Report</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Your Message</label>
                    <textarea 
                      name="message"
                      rows={3}
                      placeholder="Tell us what you think..."
                      required
                      disabled={formStatus === 'submitting'}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  {formStatus === 'error' && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-600 text-sm">
                        Something went wrong. Please try again.
                      </p>
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full py-3 sm:py-4 bg-blue-600 text-white font-semibold tracking-wider uppercase text-xs sm:text-sm rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Submit Feedback'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-foreground text-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tighter mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-lg text-background/70 leading-relaxed mb-8 max-w-2xl mx-auto">
            Let's discuss how our expertise can help transform your business and achieve your goals.
          </p>
          <a 
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-background text-foreground text-sm tracking-widest uppercase font-semibold hover:bg-primary hover:text-white transition-all duration-300"
          >
            Get in Touch
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </Layout>
  );
}
