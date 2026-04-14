import { Star, Quote, ArrowRight } from 'lucide-react';
import Layout from '../components/Layout';
import PageHero from '../components/PageHero';

const testimonials = [
  {
    quote: "I wanted to create a professional doctor portfolio website with appointment booking and online consultation features. Echoes Software Technologies understood my requirements clearly and delivered exactly what I needed.",
    author: "Dr. Sameel Hassan",
    role: "Doctor",
    company: "Dr. Sameel Hassan",
    industry: "Healthcare",
    rating: 5,
    project: "Doctor Portfolio",
    results: "Professional online presence"
  },
  {
    quote: "I approached Echoes Software Technologies to create my business website, and I'm honestly very satisfied with their work. They understood my requirements clearly and delivered exactly what I had in mind. The design looks professional and modern. Highly recommended!",
    author: "Formann",
    role: "Business Owner",
    company: "Formann",
    industry: "E-commerce",
    rating: 5,
    project: "Ecommerce Website",
    results: "Modern professional website"
  },
  {
    quote: "I approached Echoes Software Technologies for website creation, and I'm very satisfied with their work. They understood my requirements clearly and delivered a modern, professional website that perfectly matched my expectations. Highly recommended!",
    author: "DigiCraft Lab",
    role: "Founder",
    company: "DigiCraft Lab",
    industry: "Technology",
    rating: 5,
    project: "Website and Logo",
    results: "Complete brand identity"
  },
  {
    quote: "I approached Echoes Software Technologies for both website and logo creation for MedZ Pharmacy, and I'm very satisfied with the results. They understood my vision clearly and delivered a professional, modern brand identity. Highly recommended!",
    author: "MedZ Pharmacy",
    role: "Owner",
    company: "MedZ Pharmacy",
    industry: "Healthcare",
    rating: 5,
    project: "Website & Logo",
    results: "Professional brand identity"
  },
  {
    quote: "I approached Echoes Software Technologies for both website and logo creation for MedZ Diagnostics, and I'm very satisfied with the results. They understood my vision clearly and delivered a professional, modern brand identity. Highly recommended!",
    author: "MedZ Diagnostics",
    role: "Owner",
    company: "MedZ Diagnostics",
    industry: "Healthcare",
    rating: 5,
    project: "Website & Logo",
    results: "Professional brand identity"
  },
  {
    quote: "Echoes Software Technologies transformed our digital infrastructure completely. Their expertise in cloud migration and custom software development is unmatched. The team's dedication to delivering quality solutions on time made them an invaluable partner.",
    author: "Priya Sharma",
    role: "CTO",
    company: "TechStart",
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
    author: "Anitha Krishnan",
    role: "Director of Operations",
    company: "HealthPlus",
    industry: "Healthcare",
    rating: 5,
    project: "AI Process Automation",
    results: "85% efficiency improvement"
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
      <PageHero
        label="Testimonials"
        title="Trusted by"
        highlight="Industry Leaders"
        description="Don't just take our word for it. Here's what our clients have to say about working with us and the results we've helped them achieve."
        backgroundImage="/hero-background/2.png"
      />

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
              <div key={i} className="bg-muted p-8 border border-border rounded-lg hover:border-primary hover:shadow-lg transition-all duration-300">
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
            <div className="bg-muted aspect-video rounded-2xl flex items-center justify-center overflow-hidden relative">
              <video 
                src="/client_reviews.mp4" 
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
                onError={(e) => console.error('Video failed to load:', e)}
              >
                <source src="/client_reviews.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <noscript>
                <p className="text-muted-foreground">Video requires JavaScript to play</p>
              </noscript>
            </div>
            <div>
              <span className="text-[11px] tracking-widest uppercase text-primary font-semibold">
                Client Reviews
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-medium tracking-tighter mt-4 mb-6">
                What Our Clients<br />Say About Us
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                At Echoes Software Technologies, we pride ourselves on delivering exceptional 
                results that exceed expectations. Our client testimonials reflect our commitment 
                to quality, innovation, and building lasting partnerships. Watch our client 
                review video to hear directly from those who have experienced our services firsthand.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
                <div>
                  <p className="text-3xl font-display font-bold text-primary">98%</p>
                  <p className="text-sm text-muted-foreground">Client Satisfaction</p>
                </div>
                <div>
                  <p className="text-3xl font-display font-bold text-primary">250+</p>
                  <p className="text-sm text-muted-foreground">Projects Delivered</p>
                </div>
                <div>
                  <p className="text-3xl font-display font-bold text-primary">5.0</p>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                </div>
              </div>
              <a 
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-foreground transition-colors"
              >
                Become Our Next Success Story
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
