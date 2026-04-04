import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImagePopupProps {
  images: string[];
  intervalMinutes?: number;
}

export default function ImagePopup({ images, intervalMinutes = 5 }: ImagePopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);

  const openPopup = useCallback(() => {
    setIsOpen(true);
    setTimeout(() => setIsVisible(true), 50);
  }, []);

  const closePopup = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      setIsOpen(false);
      setCurrentIndex(0);
    }, 300);
  }, []);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    // Check if acceptance is already completed
    const checkAcceptance = () => {
      const acceptance = localStorage.getItem('echoes_acceptance');
      if (acceptance === 'accepted') {
        setIsAccepted(true);
      }
    };
    
    checkAcceptance();

    // Listen for storage changes (when user accepts in another tab/component)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'echoes_acceptance' && e.newValue === 'accepted') {
        setIsAccepted(true);
      }
    };

    // Also check periodically for same-tab updates
    const interval = setInterval(checkAcceptance, 1000);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (!isAccepted) return;

    const intervalMs = intervalMinutes * 60 * 1000;

    // Show immediately after acceptance
    openPopup();

    // Set up 5-minute interval for subsequent popups
    const interval = setInterval(() => {
      openPopup();
    }, intervalMs);

    return () => {
      clearInterval(interval);
    };
  }, [isAccepted, intervalMinutes, openPopup]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePopup();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closePopup, nextImage, prevImage]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={closePopup}
      />

      {/* Modal Container - Compact, adapts to image size */}
      <div 
        className={`relative max-w-xl w-auto mx-4 transform transition-all duration-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={closePopup}
          className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Image Container - Adapts to natural image size */}
        <div className="relative bg-white rounded-lg overflow-hidden shadow-2xl max-h-[70vh] w-auto">
          {/* Image - Uses natural dimensions */}
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="max-w-full max-h-[70vh] w-auto h-auto object-contain transition-transform duration-500"
          />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5 text-gray-800" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
              >
                <ChevronRight className="w-5 h-5 text-gray-800" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'bg-white w-6' 
                      : 'bg-white/60 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Counter */}
          <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 text-white text-sm rounded-full">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-4 text-center">
          <button
            onClick={closePopup}
            className="px-6 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}
