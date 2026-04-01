import { Star, Quote, ArrowRight } from 'lucide-react';
import Layout from '../components/Layout';

const testimonials = [
  {
    quote: "Echoes Software Technologies transformed our digital infrastructure completely. Their expertise in cloud migration and custom software development is unmatched. The team's dedication to delivering quality solutions on time made them an invaluable partner.",
    author: "Sarah Chen",
    role: "CTO",
    company: "InnovateCorp",
    industry: "Technology",
    rating: 5,
    project: "Enterprise Cloud Migration",
    results: "40% cost reduction, 99.99% uptime"
  },
  {
    quote: "Working with Echoes was a game-changer for our startup. They helped us build a scalable mobile platform that handled our rapid growth seamlessly. Their technical depth and professionalism exceeded our expectations at every turn.",
    author: "Michael Roberts",
    role: "CEO",
    company: "DataFlow Inc",
    industry: "Data Analytics",
    rating: 5,
    project: "Mobile App Development",
    results: "1M+ downloads, 4.8 star rating"
  },
  {
    quote: "The AI and automation solutions implemented by Echoes revolutionized our operations. What used to take days now happens in hours. Their team's understanding of our industry and technical excellence made our project a huge success.",
    author: "Priya Sharma",
    role: "Director of Operations",
    company: "TechStart",
    industry: "Healthcare",
    rating: 5,
    project: "AI Process Automation",
    results: "85% efficiency improvement"
  },
  {
    quote: "We've worked with many development teams, but Echoes stands out for their communication and transparency. They kept us informed throughout the project and delivered exactly what they promised. A truly reliable partner.",
    author: "James Wilson",
    role: "VP of Engineering",
    company: "BuildRight Construction",
    industry: "Construction",
    rating: 5,
    project: "Custom ERP System",
    results: "50% faster project delivery"
  },
  {
    quote: "The cybersecurity audit and implementation by Echoes gave us peace of mind. They identified vulnerabilities we didn't know existed and implemented robust security measures. Our data has never been safer.",
    author: "Emily Thompson",
    role: "CISO",
    company: "SecureBank Financial",
    industry: "Financial Services",
    rating: 5,
    project: "Security Infrastructure",
    results: "Zero security incidents, full compliance"
  },
  {
    quote: "Echoes helped us modernize our legacy systems without disrupting our operations. Their careful planning and phased approach meant zero downtime during the transition. Exceptional technical expertise combined with business understanding.",
    author: "David Kim",
    role: "IT Director",
    company: "Global Logistics Solutions",
    industry: "Logistics",
    rating: 5,
    project: "Legacy Modernization",
    results: "60% performance improvement"
  }
];

const stats = [
  { value: "98%", label: "Client Satisfaction Rate" },
  { value: "250+", label: "Projects Completed" },
  { value: "50+", label: "Expert Engineers" },
  { value: "12+", label: "Years of Excellence" }
];

export default function TestimonialsPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-[11px] md:text-[12px] tracking-[0.3em] font-semibold uppercase text-primary">
              Testimonials
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium tracking-tighter mt-6 mb-6">
              Trusted by<br />
              <span className="text-muted-foreground/40 italic">Industry Leaders</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Don't just take our word for it. Here's what our clients have to say about 
              working with us and the results we've helped them achieve.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl md:text-5xl font-display font-medium tracking-tighter text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-muted p-8 border border-border hover:border-primary hover:shadow-lg transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                
                <p className="text-foreground leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
                
                <div className="border-t border-border pt-6">
                  <div className="mb-4">
                    <p className="font-medium text-lg">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-sm text-primary font-medium">{testimonial.company}</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg">
                    <div className="mb-2">
                      <span className="text-[10px] tracking-widest uppercase text-muted-foreground font-semibold">
                        Project: {testimonial.project}
                      </span>
                    </div>
                    <p className="text-sm text-primary font-medium">{testimonial.results}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Success Story */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-muted aspect-video rounded-2xl flex items-center justify-center">
              <span className="text-muted-foreground">Case Study Video Placeholder</span>
            </div>
            <div>
              <span className="text-[11px] tracking-widest uppercase text-primary font-semibold">
                Featured Case Study
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-medium tracking-tighter mt-4 mb-6">
                How We Helped a FinTech Startup Scale to 1 Million Users
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                A detailed look at how we architected and built a scalable platform that handled 
                rapid growth while maintaining 99.99% uptime and bank-grade security.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
                <div>
                  <p className="text-3xl font-display font-bold text-primary">1M+</p>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                </div>
                <div>
                  <p className="text-3xl font-display font-bold text-primary">99.99%</p>
                  <p className="text-sm text-muted-foreground">Uptime</p>
                </div>
                <div>
                  <p className="text-3xl font-display font-bold text-primary">&lt;100ms</p>
                  <p className="text-sm text-muted-foreground">Response Time</p>
                </div>
              </div>
              <a 
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-foreground transition-colors"
              >
                Read Full Case Study
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-foreground text-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tighter mb-6">
            Join Our Satisfied Clients
          </h2>
          <p className="text-lg text-background/70 leading-relaxed mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve similar results. Your success story starts here.
          </p>
          <a 
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-background text-foreground text-sm tracking-widest uppercase font-semibold hover:bg-primary hover:text-white transition-all duration-300"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </Layout>
  );
}
