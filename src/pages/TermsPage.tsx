import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import PageHero from '../components/PageHero';

export default function TermsPage() {
  return (
    <Layout>
      <PageHero
        label="Legal"
        title="Terms of Service"
        description="Last updated: April 1, 2026"
        backgroundImage="/hero-background/4.png"
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-neutral max-w-none">
            <h2 className="text-xl font-display font-medium mb-4">1. Agreement to Terms</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              By accessing or using our services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.
            </p>

            <h2 className="text-xl font-display font-medium mb-4">2. Services</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Echoes Software Technologies provides software development, cloud solutions, mobile app development, and related technology services. All services are subject to these terms and any additional agreements.
            </p>

            <h2 className="text-xl font-display font-medium mb-4">3. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The software, designs, and materials we create for you will be transferred according to the terms of your specific project agreement. We retain rights to our pre-existing intellectual property and general methodologies.
            </p>

            <h2 className="text-xl font-display font-medium mb-4">4. Payment Terms</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Payment terms are outlined in individual project agreements. Generally, we require an upfront deposit with subsequent payments tied to project milestones.
            </p>

            <h2 className="text-xl font-display font-medium mb-4">5. Confidentiality</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We agree to keep all client information confidential and will not disclose any proprietary information to third parties without consent.
            </p>

            <h2 className="text-xl font-display font-medium mb-4">6. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              In no event shall Echoes Software Technologies be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.
            </p>

            <h2 className="text-xl font-display font-medium mb-4">7. Termination</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Either party may terminate a project according to the terms specified in the project agreement. Upon termination, you remain responsible for payment for work completed.
            </p>

            <h2 className="text-xl font-display font-medium mb-4">8. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which our company is registered, without regard to conflict of law provisions.
            </p>

            <h2 className="text-xl font-display font-medium mb-4">9. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. Continued use of our services constitutes acceptance of the modified terms.
            </p>

            <h2 className="text-xl font-display font-medium mb-4">10. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these Terms of Service, please contact us at{' '}
                <Link to="/contact" className="text-primary hover:underline">
                  connect@echoess.in
                </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
