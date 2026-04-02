import { ArrowRight, Check } from 'lucide-react';
import Layout from '../components/Layout';

const techCategories = [
  {
    title: "Frontend",
    description: "Modern, responsive user interfaces",
    technologies: ["React", "Vue.js", "Angular", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
  },
  {
    title: "Backend",
    description: "Robust and scalable server solutions",
    technologies: ["Node.js", "Python", "Java", "Go", "PHP", "Ruby on Rails", "GraphQL"]
  },
  {
    title: "Mobile",
    description: "Native and cross-platform apps",
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "iOS", "Android"]
  },
  {
    title: "Database",
    description: "Efficient data storage solutions",
    technologies: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Elasticsearch", "Firebase"]
  },
  {
    title: "Cloud",
    description: "Scalable cloud infrastructure",
    technologies: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform"]
  },
  {
    title: "AI/ML",
    description: "Intelligent automation solutions",
    technologies: ["TensorFlow", "PyTorch", "OpenAI", "Hugging Face", "Scikit-learn", "Pandas"]
  },
  {
    title: "DevOps",
    description: "Streamlined deployment pipelines",
    technologies: ["Jenkins", "GitHub Actions", "GitLab CI", "CircleCI", "Ansible", "Prometheus"]
  },
  {
    title: "Security",
    description: "Enterprise-grade protection",
    technologies: ["OAuth 2.0", "JWT", "SSL/TLS", "HashiCorp Vault", "OWASP", "Penetration Testing"]
  }
];

const whyModernStack = [
  {
    title: "Scalability",
    description: "Our technology choices ensure your applications can grow seamlessly with your business, handling increased traffic and data without performance degradation."
  },
  {
    title: "Security",
    description: "We prioritize security at every layer, implementing best practices and using tools designed with security in mind from the ground up."
  },
  {
    title: "Performance",
    description: "Modern frameworks and optimized architectures deliver lightning-fast load times and smooth user experiences across all devices."
  },
  {
    title: "Maintainability",
    description: "Clean code, comprehensive documentation, and well-structured architectures make your applications easy to maintain and extend over time."
  }
];

const recentProjects = [
  {
    title: "Arroway",
    category: "Website",
    description: "A modern, responsive corporate website designed for Arroway with seamless user experience and contemporary design aesthetics.",
    tech: ["React", "Next.js", "Tailwind CSS", "Vercel"],
    year: "2024",
    link: "#",
    image: "/arroway.jpeg"
  },
  {
    title: "Formann",
    category: "Website",
    description: "Professional business website for Formann featuring clean design, smooth animations, and optimized performance.",
    tech: ["React", "TypeScript", "Framer Motion", "AWS"],
    year: "2024",
    link: "#",
    image: "/formann.png"
  },
  {
    title: "Dr. Mohammed Sameel Hassan",
    category: "Doctor Portfolio",
    description: "Elegant medical portfolio website showcasing expertise, services, and patient information with a professional aesthetic.",
    tech: ["React", "Node.js", "MongoDB", "Netlify"],
    year: "2023",
    link: "#",
    image: "/dr.sameel.png"
  }
];

export default function TechnologyPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-[11px] md:text-[12px] tracking-[0.3em] font-semibold uppercase text-primary">
              Tech Stack
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium tracking-tighter mt-6 mb-6">
              Modern<br />
              <span className="text-muted-foreground/40 italic">Technologies</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We leverage industry-leading technologies and frameworks to build scalable, 
              secure, and high-performance applications that stand the test of time. Our 
              technology choices are driven by your business needs, not trends.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Categories Grid */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tighter mb-4">
              Our Technology <span className="text-muted-foreground/40 italic">Expertise</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We work with the best tools in the industry to deliver exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techCategories.map((category, i) => (
              <div key={i} className="group bg-white border border-border hover:border-primary hover:shadow-lg transition-all duration-300 p-6">
                <h3 className="text-xl font-display font-medium mb-2">{category.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{category.description}</p>
                <div className="flex flex-wrap gap-2">
                  {category.technologies.slice(0, 4).map((tech, j) => (
                    <span key={j} className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded">
                      {tech}
                    </span>
                  ))}
                  {category.technologies.length > 4 && (
                    <span className="px-2 py-1 bg-primary/10 text-xs text-primary rounded">
                      +{category.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Modern Stack */}
      <section className="py-24 md:py-32 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tighter mb-6">
            Why a Modern<br />
            <span className="text-muted-foreground/40 italic">Tech Stack?</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            Choosing the right technology stack is crucial for the success of your project. 
            We carefully select technologies that align with your business goals, ensuring 
            long-term viability and competitive advantage.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyModernStack.map((item, i) => (
              <div key={i} className="flex gap-4 p-6 bg-white border border-border hover:border-primary transition-all duration-300">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tighter mb-4">
              Our Recent <span className="text-muted-foreground/40 italic">Projects</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Featured work showcasing our technical expertise and innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentProjects.map((project, i) => (
              <div 
                key={i} 
                className="group bg-white border border-border hover:border-foreground/20 hover:shadow-[0_2px_20px_rgba(0,0,0,0.04)] transition-all duration-300 relative flex flex-col overflow-hidden"
              >
                {/* Accent line */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Project Image */}
                <div className="h-48 bg-muted flex items-center justify-center border-b border-border overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={`${project.title}`}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  {/* Year badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-semibold">
                      {project.category}
                    </span>
                    <span className="text-[10px] text-muted-foreground/60">
                      {project.year}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-display font-medium mb-3">{project.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50 mb-6">
                    {project.tech.map((t, j) => (
                      <span key={j} className="text-[10px] px-2 py-1 bg-muted text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>

                  <a 
                    href={project.link}
                    className="inline-flex items-center gap-2 text-[11px] tracking-widest uppercase font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    Visit Project
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-foreground text-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tighter mb-6">
            Need Technical Guidance?
          </h2>
          <p className="text-lg text-background/70 leading-relaxed mb-8 max-w-2xl mx-auto">
            Our technical architects can help you choose the right technology stack for your project.
          </p>
          <a 
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-background text-foreground text-sm tracking-widest uppercase font-semibold hover:bg-primary hover:text-white transition-all duration-300"
          >
            Talk to an Expert
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </Layout>
  );
}
