import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default function PrivacyPage() {
  return (
    <Layout>
      <section className="py-24 md:py-32 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[11px] tracking-[0.3em] font-semibold uppercase text-primary">
            Legal
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tighter mt-6 mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground">
            Last updated: April 1, 2026
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-neutral max-w-none">
            <h2 className="text-xl font-display font-medium mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We collect information that you provide directly to us, including name, email address, phone number, and any other information you choose to provide when contacting us or using our services.
            </p>

            <h2 className="text-xl font-display font-medium mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We use the information we collect to provide, maintain, and improve our services, communicate with you, and respond to your requests. We may also use this information to send you updates and marketing communications.
            </p>

            <h2 className="text-xl font-display font-medium mb-4">3. Information Sharing</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We do not sell, trade, or otherwise transfer your personal information to outside parties. This does not include trusted third parties who assist us in operating our website or servicing you.
            </p>

            <h2 className="text-xl font-display font-medium mb-4">4. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We implement a variety of security measures to maintain the safety of your personal information. All sensitive information is transmitted via Secure Socket Layer (SSL) technology.
            </p>

            <h2 className="text-xl font-display font-medium mb-4">5. Cookies</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We use cookies to understand and save your preferences for future visits and compile aggregate data about site traffic and interactions.
            </p>

            <h2 className="text-xl font-display font-medium mb-4">6. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us using the information below.
            </p>

            <h2 className="text-xl font-display font-medium mb-4">7. Refund Policy</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              <strong className="text-foreground">Strict No-Refund Policy:</strong> Once software or services have been delivered to the client, refunds are strictly NOT allowed under any circumstances. This policy applies regardless of whether the client has signed our Privacy Policy and Terms of Service documents. All sales are final upon project handover and delivery completion. By engaging our services, you acknowledge and agree to this strict no-refund policy.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              <strong className="text-foreground">Legal Action:</strong> Any attempt by the client to override, circumvent, or violate this refund policy through fraudulent chargebacks, false claims, or any other means will result in immediate legal action. Echoes Software Technologies reserves the right to pursue all available legal remedies and government actions against such violations to protect our business interests and intellectual property rights.
            </p>

            <h2 className="text-xl font-display font-medium mb-4">8. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              If you have any questions about this Privacy Policy, please contact us at{' '}
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
