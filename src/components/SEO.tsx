// @ts-nocheck
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  schema?: object;
  noindex?: boolean;
  nofollow?: boolean;
}

export default function SEO({
  title,
  description,
  keywords = '',
  canonical = '',
  ogTitle,
  ogDescription,
  ogImage = 'https://echoess.in/og-image.png',
  ogType = 'website',
  twitterTitle,
  twitterDescription,
  twitterImage = 'https://echoess.in/og-image.png',
  schema,
  noindex = false,
  nofollow = false,
}: SEOProps) {
  const fullTitle = title.includes('Echoes Software') 
    ? title 
    : `${title} | Echoes Software Technologies`;

  const robotsContent = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow',
    'max-image-preview:large',
    'max-snippet:-1',
    'max-video-preview:-1'
  ].join(', ');

  const canonicalUrl = canonical 
    ? `https://echoess.in${canonical}`
    : 'https://echoess.in';

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:site_name" content="Echoes Software Technologies" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={twitterTitle || ogTitle || fullTitle} />
      <meta property="twitter:description" content={twitterDescription || ogDescription || description} />
      <meta property="twitter:image" content={twitterImage || ogImage} />

      {/* Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}

// Pre-defined SEO configurations for common pages
export const seoConfig = {
  home: {
    title: 'Custom Software Development & Digital Solutions',
    description: 'Leading software development company in Karur, Tamil Nadu. We build custom software, mobile apps, cloud solutions, and AI-powered applications. Get enterprise-grade technology solutions for your business.',
    keywords: 'software development, custom software, mobile app development, cloud solutions, AI development, web development, Karur, Tamil Nadu, India, Echoes Software, enterprise software, digital transformation',
  },
  services: {
    title: 'Our Services',
    description: 'Explore our comprehensive software development services including custom software, mobile apps, cloud solutions, AI & machine learning, and digital transformation consulting.',
    keywords: 'software services, custom development, mobile apps, cloud solutions, AI services, consulting, Karur software company',
  },
  about: {
    title: 'About Us',
    description: 'Learn about Echoes Software Technologies - a leading software development company in Karur, Tamil Nadu. Our mission, vision, and commitment to delivering innovative technology solutions.',
    keywords: 'about Echoes Software, software company Karur, IT company Tamil Nadu, software development team',
  },
  technology: {
    title: 'Technology Stack',
    description: 'Discover the cutting-edge technologies we use at Echoes Software Technologies. React, Node.js, Python, AWS, AI/ML, and more enterprise-grade technology solutions.',
    keywords: 'technology stack, React, Node.js, Python, AWS, cloud technologies, AI, machine learning, software technologies',
  },
  testimonials: {
    title: 'Client Testimonials',
    description: 'Read what our clients say about Echoes Software Technologies. Real reviews from businesses who have transformed their operations with our software solutions.',
    keywords: 'client testimonials, customer reviews, software company reviews, Echoes Software feedback',
  },
  contact: {
    title: 'Contact Us',
    description: 'Get in touch with Echoes Software Technologies. Contact us for custom software development, mobile apps, cloud solutions, and digital transformation services in Karur, Tamil Nadu.',
    keywords: 'contact Echoes Software, software development inquiry, hire developers Karur, software consultation Tamil Nadu',
  },
  premiumBundles: {
    title: 'Premium Software Bundles',
    description: 'Ready-to-deploy software solutions with instant delivery. Premium bundles for businesses looking for quick, professional technology solutions.',
    keywords: 'software bundles, ready to deploy software, instant software solutions, premium software packages',
  },
  exclusiveDeals: {
    title: 'Exclusive Deals & Offers',
    description: 'Special offers on software development services. Exclusive deals for startups and businesses looking for affordable technology solutions.',
    keywords: 'software deals, software offers, affordable software development, startup discounts',
  },
  privacy: {
    title: 'Privacy Policy',
    description: 'Privacy Policy of Echoes Software Technologies. Learn how we collect, use, and protect your personal information.',
    noindex: true,
  },
  terms: {
    title: 'Terms of Service',
    description: 'Terms of Service for Echoes Software Technologies. Read our terms and conditions for using our software development services.',
    noindex: true,
  },
  sitemap: {
    title: 'Sitemap',
    description: 'Complete sitemap of Echoes Software Technologies website. Navigate through all our pages and services.',
    noindex: true,
  },
};
