import { Heart, Sparkles, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WelcomeScreenProps {
  onEnter: () => void;
  hasEntered: boolean;
}

export function WelcomeScreen({ onEnter, hasEntered }: WelcomeScreenProps) {
  const handleEnterClick = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#ec4899', '#f472b6', '#fb7185', '#fbbf24', '#ffffff'],
    });
    onEnter();
    const celebrationEl = document.getElementById('celebration');
    if (celebrationEl) {
      celebrationEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="welcome"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{
        background: 'radial-gradient(ellipse at top, #fff0f5 0%, #fce7f3 45%, #ffd1dc 100%)',
      }}
    >
      {/* Background Hero Accent Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-multiply">
        <img
          src="/assets/images/hero_romantic_roses_gold_1793707844055.jpg"
          alt="Romantic rose background"
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Glow Aura */}
      <div className="absolute h-96 w-96 rounded-full bg-rose-300/30 blur-3xl -top-20 -left-20 pointer-events-none animate-pulse" />
      <div className="absolute h-96 w-96 rounded-full bg-pink-300/30 blur-3xl -bottom-20 -right-20 pointer-events-none animate-pulse" />

      <div className="relative z-10 mx-auto max-w-3xl space-y-8">
        {/* Couple Avatar / Ranu Portrait */}
        <div className="relative mx-auto w-28 h-28 sm:w-32 sm:h-32 mb-2 group">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-rose-400 via-pink-300 to-amber-300 blur-sm opacity-80 group-hover:opacity-100 transition-opacity animate-pulse" />
          <div className="relative h-full w-full rounded-full p-[3px] bg-gradient-to-tr from-rose-400 via-pink-400 to-amber-300 shadow-xl shadow-rose-300/40">
            <img
              src="/assets/aistudio/WhatsApp_Image_2026-11-03_at_5.54.34_PM__1__ddbf2da0.jpeg"
              alt="Ranu Solanki & Raj"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 z-20 rounded-full bg-rose-500 p-1.5 text-white shadow-md border-2 border-white animate-bounce">
            <Heart className="h-3.5 w-3.5 fill-white" />
          </div>
        </div>

        {/* Subtitle kicker */}
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-300/60 bg-white/70 px-5 py-2 text-xs md:text-sm font-medium text-rose-800 shadow-sm backdrop-blur-md animate-float">
          <Sparkles className="h-4 w-4 text-amber-500" />
          <span>A Special Day For Someone Special</span>
          <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
        </div>

        {/* Hero Title */}
        <div className="space-y-4">
          <h1 className="font-serif text-5xl font-bold tracking-tight text-rose-950 sm:text-6xl md:text-7xl lg:text-8xl">
            Happy Birthday, <br />
            <span className="text-rose-gold drop-shadow-sm font-serif">Ranu Solanki</span>
            <span className="inline-block text-rose-500 ml-3 animate-bounce">❤️</span>
          </h1>

          <p className="mx-auto max-w-xl text-base md:text-lg text-rose-900/80 font-light leading-relaxed">
            Welcome to your digital love sanctuary, crafted with love, cherished memories, and warm surprises to celebrate the queen of my heart on her most special day.
          </p>
        </div>

        {/* Animated Enter Button */}
        <div className="pt-4 flex flex-col items-center justify-center gap-4">
          <button
            onClick={handleEnterClick}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-rose-300/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-rose-400/60 active:scale-95"
          >
            {/* Shimmer overlay */}
            <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
            <Heart className="h-5 w-5 fill-white transition-transform group-hover:scale-125" />
            <span>{hasEntered ? 'Explore Your Surprises' : 'Open Your Birthday Surprise'}</span>
            <Sparkles className="h-4 w-4 text-amber-200 transition-transform group-hover:rotate-45" />
          </button>

          <span className="text-xs text-rose-700/70 font-medium">
            (Tap to reveal your celebration with romantic melody)
          </span>
        </div>

        {/* Down indicator */}
        <div className="pt-10">
          <a
            href="#celebration"
            className="inline-flex flex-col items-center text-xs font-medium text-rose-700/60 transition-colors hover:text-rose-900"
          >
            <span className="mb-1">Scroll to Celebrate</span>
            <ChevronDown className="h-4 w-4 animate-bounce text-rose-500" />
          </a>
        </div>
      </div>
    </section>
  );
}
