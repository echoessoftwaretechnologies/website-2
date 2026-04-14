import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Initial load
    setIsLoading(true);
    setIsExiting(false);

    // Simulate loading time (minimum for UX)
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => setIsLoading(false), 300);
    }, 800);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!isLoading) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center transition-opacity duration-300 ${isExiting ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Favicon Logo with Pulse Animation */}
      <div className="relative">
        <div className="absolute inset-0 animate-ping opacity-20">
          <img 
            src="/favicon.png" 
            alt="Loading" 
            className="w-16 h-16 object-contain"
          />
        </div>
        <img 
          src="/favicon.png" 
          alt="Echoes Software" 
          className="w-16 h-16 object-contain animate-pulse"
        />
      </div>

      {/* Loading Text */}
      <p className="mt-6 text-sm text-muted-foreground tracking-widest uppercase animate-pulse">
        Loading
      </p>

      {/* Progress Bar */}
      <div className="mt-4 w-32 h-[2px] bg-muted overflow-hidden rounded-full">
        <div className="h-full bg-blue-500 animate-[loading_0.8s_ease-in-out_infinite]" />
      </div>

      <style>{`
        @keyframes loading {
          0% { width: 0%; margin-left: 0%; }
          50% { width: 100%; margin-left: 0%; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </div>
  );
}
