import { ArrowUpRight, Check, ArrowRight } from 'lucide-react';
import Layout from '../components/Layout';

const services = [
  {
    title: "Custom Software Development",
    image: "/csd.png",
    description: "We build tailor-made software solutions that perfectly align with your business objectives. Our expert developers utilize cutting-edge technologies and agile methodologies to deliver scalable, secure, and high-performance applications.",
    features: ["Enterprise Applications", "Web Platforms", "System Integration", "API Development"],
    link: "/contact"
  },
  {
    title: "Cloud Solutions",
    image: "/cloud.jpg",
    description: "Transform your infrastructure with our comprehensive cloud services. We provide seamless migration, optimization, and management of cloud environments to reduce costs and improve operational efficiency.",
    features: ["Cloud Migration", "AWS/Azure/GCP", "DevOps Automation", "Serverless Architecture"],
    link: "/contact"
  },
  {
    title: "Mobile App Development",
    image: "/wad.jpg",
    description: "Create powerful mobile experiences with our native and cross-platform development services. We design and build intuitive mobile applications that engage users and drive business growth.",
    features: ["iOS & Android Apps", "React Native", "Flutter Development", "Mobile UI/UX Design"],
    link: "/contact"
  },
  {
    title: "Data Analytics & BI",
    image: "/da.jpg",
    description: "Unlock the power of your data with our advanced analytics and business intelligence solutions. We help you transform raw data into actionable insights that drive informed decision-making.",
    features: ["Data Visualization", "Predictive Analytics", "Big Data Processing", "Dashboard Solutions"],
    link: "/contact"
  },
  {
    title: "Cybersecurity",
    image: "/cs.jpg",
    description: "Protect your digital assets with our enterprise-grade security solutions. We provide comprehensive security assessments, implementation, and monitoring to safeguard your business against evolving threats.",
    features: ["Security Audits", "Penetration Testing", "Compliance Management", "Threat Monitoring"],
    link: "/contact"
  },
  {
    title: "AI & Automation",
    image: "/ai.jpg",
    description: "Leverage the power of artificial intelligence to automate processes and enhance productivity. Our AI solutions help you streamline operations and gain competitive advantage through intelligent automation.",
    features: ["Machine Learning", "Process Automation", "Chatbots & NLP", "Computer Vision"],
    link: "/contact"
  },
  {
    title: "Digital Marketing",
    image: "/dm.jpg",
    description: "Amplify your online presence with our comprehensive digital marketing services. We create data-driven strategies that increase brand visibility, engage your target audience, and drive measurable business growth.",
    features: ["SEO & SEM", "Social Media Marketing", "Content Strategy", "Analytics & Reporting"],
    link: "/contact"
  },
  {
    title: "Blockchain",
    image: "/bc.jpg",
    description: "Build secure, decentralized applications with our blockchain expertise. From smart contracts to distributed ledger solutions, we help businesses leverage blockchain technology for enhanced security and transparency.",
    features: ["Smart Contracts", "DApp Development", "Tokenization", "Blockchain Integration"],
    link: "/contact"
  },
  {
    title: "Graphics Design",
    image: "/gd.jpg",
    description: "Create stunning visual identities that capture your brand essence. Our creative team delivers compelling designs for digital and print media that resonate with your audience and elevate your brand.",
    features: ["Brand Identity", "Print Design", "Marketing Collateral", "Visual Concepts"],
    link: "/contact"
  },
  {
    title: "UI/UX",
    image: "/uiux.jpg",
    description: "Design intuitive and engaging user experiences that delight your customers. Our user-centered approach combines research, strategy, and creative design to build interfaces that are both beautiful and functional.",
    features: ["User Research", "Wireframing", "Prototyping", "Usability Testing"],
    link: "/contact"
  }
];

export default function ServicesPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-[11px] md:text-[12px] tracking-[0.3em] font-semibold uppercase text-primary">
              Our Services
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium tracking-tighter mt-6 mb-6">
              Comprehensive<br />
              <span className="text-muted-foreground/40 italic">Digital Solutions</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From custom software development to cutting-edge AI solutions, we offer a full spectrum 
              of technology services designed to help your business thrive in the digital age.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid - Same style as homepage What We Do */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16 md:mb-24">
            <span className="text-[11px] md:text-[12px] tracking-[0.3em] font-semibold uppercase text-primary">
              What We Do
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tighter mt-6">
              Services That Drive<br /><span className="text-muted-foreground/40 italic">Digital Excellence</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div 
                key={i} 
                className="group bg-white border border-border hover:border-primary hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden bg-muted">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-xl font-display font-medium mb-4">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm mb-6">{service.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <a 
                    href={service.link}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-foreground transition-colors"
                  >
                    Learn More
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-foreground text-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tighter mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-background/70 leading-relaxed mb-8 max-w-2xl mx-auto">
            Let's discuss how our services can help transform your business. Contact us today 
            for a free consultation.
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
