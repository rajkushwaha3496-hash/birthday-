import { useState, useEffect } from 'react';
import { Heart, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TopNavProps {
  onOpenExportGuide: () => void;
}

export function TopNav({ onOpenExportGuide }: TopNavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBurst = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.15 },
      colors: ['#f472b6', '#fb7185', '#fda4af', '#f59e0b', '#ffffff'],
    });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 py-3 shadow-md backdrop-blur-md border-b border-rose-100'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#welcome"
          className="group flex items-center gap-2 font-serif text-xl font-bold tracking-tight text-rose-950 whitespace-nowrap shrink-0"
        >
          <span className="text-rose-500 transition-transform group-hover:scale-125">♥</span>
          <span>Ranu Solanki</span>
        </a>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-rose-900/80">
          <a
            href="#celebration"
            className="transition-colors hover:text-rose-600 hover:underline underline-offset-4 whitespace-nowrap shrink-0"
          >
            Celebration
          </a>
          <a
            href="#memories"
            className="transition-colors hover:text-rose-600 hover:underline underline-offset-4 whitespace-nowrap shrink-0"
          >
            Memories
          </a>
          <a
            href="#letter"
            className="transition-colors hover:text-rose-600 hover:underline underline-offset-4 whitespace-nowrap shrink-0"
          >
            Love Letter
          </a>
          <a
            href="#reasons"
            className="transition-colors hover:text-rose-600 hover:underline underline-offset-4 whitespace-nowrap shrink-0"
          >
            12 Reasons
          </a>
          <a
            href="#surprise"
            className="transition-colors hover:text-rose-600 hover:underline underline-offset-4 whitespace-nowrap shrink-0"
          >
            Gift Surprise
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenExportGuide}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-800 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition-colors whitespace-nowrap shrink-0"
            title="Download complete standalone code or view GitHub Pages guide"
          >
            <Download className="h-3.5 w-3.5 text-rose-500" />
            <span>Export & Guide</span>
          </button>

          <button
            onClick={handleBurst}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 rounded-full shadow-md shadow-rose-200 transition-transform hover:scale-105 active:scale-95 whitespace-nowrap shrink-0"
          >
            <Heart className="h-3.5 w-3.5 fill-current" />
            <span>Celebrate Ranu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
