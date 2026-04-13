import { useEffect, useState } from 'react';

interface PageHeroProps {
  label: string;
  title: string;
  highlight?: string;
  description?: string;
  backgroundImage: string;
  children?: React.ReactNode;
}

export default function PageHero({ 
  label, 
  title, 
  highlight, 
  description, 
  backgroundImage,
  children 
}: PageHeroProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section 
      className="relative py-16 sm:py-20 md:py-32 overflow-hidden min-h-[300px] sm:min-h-[400px] md:min-h-[500px]"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundAttachment: isMobile ? 'scroll' : 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="text-[10px] sm:text-[11px] md:text-[12px] tracking-[0.2em] sm:tracking-[0.3em] font-semibold uppercase text-white/80">
            {label}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-tighter mt-4 sm:mt-6 mb-4 sm:mb-6 text-white">
            {title}
            {highlight && (
              <>
                <br className="hidden sm:block" />
                <span className="text-white/60 italic">{highlight}</span>
              </>
            )}
          </h1>
          {description && (
            <p className="text-base sm:text-lg text-white/80 leading-relaxed">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
