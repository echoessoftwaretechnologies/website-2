import { ArrowRight, Users, Target, Award, Globe } from 'lucide-react';
import Layout from '../components/Layout';

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

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-[11px] md:text-[12px] tracking-[0.3em] font-semibold uppercase text-primary">
              About Us
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium tracking-tighter mt-6 mb-6">
              Building Digital<br />
              <span className="text-muted-foreground/40 italic">Excellence</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Echoes Software Technologies is a forward-thinking technology company dedicated to 
              transforming businesses through innovative digital solutions. Founded with a vision to 
              bridge the gap between complex technology and real-world business needs, we've grown 
              into a trusted partner for organizations worldwide.
            </p>
          </div>
        </div>
      </section>

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
            <div className="flex-shrink-0 w-full max-w-[360px] order-2 md:order-1">
              <div className="relative w-full aspect-[3/4] max-w-[360px] mx-auto">
                <div className="absolute inset-0 bg-muted"></div>
                <img 
                  src="/founder.jpg" 
                  alt="Mohamed Ukaasha K"
                  className="absolute top-4 left-4 sm:top-6 sm:left-6 w-[calc(100%-1rem)] h-[calc(100%-1rem)] sm:w-[calc(100%-1.5rem)] sm:h-[calc(100%-1.5rem)] object-cover"
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
