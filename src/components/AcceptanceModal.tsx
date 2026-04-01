import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface AcceptanceModalProps {
  onAccept: () => void;
  onReject: () => void;
}

export default function AcceptanceModal({ onAccept, onReject }: AcceptanceModalProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleAccept = () => {
    localStorage.setItem('echoes_acceptance', 'accepted');
    setIsOpen(false);
    onAccept();
  };

  const handleReject = () => {
    localStorage.setItem('echoes_acceptance', 'rejected');
    setIsOpen(false);
    onReject();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-lg">
        {/* Header */}
        <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
          Welcome
        </p>
        <h2 className="text-3xl md:text-4xl font-display font-light tracking-tight mb-6">
          Continue to<br />
          <span className="text-muted-foreground/40 italic">Echoes Software</span>
        </h2>

        {/* Content */}
        <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
          Please review our policies before continuing. By clicking accept, you agree to our terms.
        </p>

        {/* Policy Links */}
        <div className="space-y-3 mb-10">
          <a 
            href="/privacy" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center justify-between py-3 border-b border-border hover:border-primary transition-colors"
          >
            <span className="text-sm">Privacy Policy</span>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>

          <a 
            href="/terms" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center justify-between py-3 border-b border-border hover:border-primary transition-colors"
          >
            <span className="text-sm">Terms of Service</span>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleAccept}
            className="flex-1 py-2.5 px-4 bg-foreground text-background text-[11px] tracking-widest uppercase font-medium hover:bg-primary transition-colors"
          >
            Accept & Continue
          </button>
          
          <button
            onClick={handleReject}
            className="flex-1 py-2.5 px-4 border border-border text-muted-foreground text-[11px] tracking-widest uppercase font-medium hover:border-foreground hover:text-foreground transition-colors"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
