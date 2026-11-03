import { useState } from 'react';
import { Heart, Sparkles, Gift, Check, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

export function InteractiveSurprise() {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpenGift = () => {
    setIsOpened(true);
    // Burst fireworks
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#ec4899', '#fda4af', '#f59e0b', '#ffffff'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 60,
        origin: { x: 0.2, y: 0.7 },
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 60,
        origin: { x: 0.8, y: 0.7 },
      });
    }, 300);
  };

  return (
    <section id="surprise" className="relative py-24 px-6 bg-gradient-to-b from-[#FFF0F4] via-[#FFE8EE] to-[#FFF5F7]">
      <div className="mx-auto max-w-4xl text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-rose-600 uppercase mb-2">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          <span>Chapter 07 · The Birthday Surprise</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-rose-950">
          A Special Gift Just For Ranu
        </h2>
        <p className="mt-2 text-sm sm:text-base text-rose-800/80 max-w-xl mx-auto">
          Wrapped with warmth, tied with a ribbon of love, and made especially for you.
        </p>

        {/* 3D Gift Box Container */}
        <div className="mt-12 flex flex-col items-center justify-center">
          {!isOpened ? (
            <div
              onClick={handleOpenGift}
              className="group cursor-pointer relative flex flex-col items-center transition-transform hover:scale-105 active:scale-95 duration-300"
            >
              {/* Luxury Gift Box Visual */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden shadow-2xl border-2 border-rose-300/80 bg-rose-100 flex items-center justify-center">
                <img
                  src="/assets/images/gift_box_rose_gold_1793707845633.jpg"
                  alt="Luxury Gift Box for Ranu"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Shimmer overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/10 via-white/20 to-transparent pointer-events-none" />

                {/* Gift Tag Badge */}
                <div className="absolute bottom-4 inset-x-4 bg-white/90 backdrop-blur-md py-2 px-3 rounded-xl border border-rose-200 shadow-md text-center">
                  <span className="font-serif text-xs font-bold text-rose-950 block">
                    To: Ranu Solanki ❤️
                  </span>
                  <span className="text-[10px] text-rose-700/80">
                    Tap to open your present
                  </span>
                </div>
              </div>

              {/* Glowing Pulse Button below box */}
              <button
                onClick={handleOpenGift}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-rose-300/50 hover:shadow-2xl transition-all"
              >
                <Gift className="h-4 w-4" />
                <span>Click to Open Ranu's Surprise</span>
                <Sparkles className="h-4 w-4 text-amber-200" />
              </button>
            </div>
          ) : (
            /* Opened Surprise Reveal Card / Golden Ticket */
            <div className="relative w-full max-w-2xl rounded-3xl bg-white p-8 sm:p-12 shadow-2xl border-4 border-rose-200 text-center animate-float">
              {/* Floating Hearts Banner */}
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-rose-50 text-rose-600 mb-4 shadow-sm">
                <Heart className="h-8 w-8 fill-rose-500 text-rose-500 animate-pulse" />
              </div>

              {/* Requested Display Message */}
              <h3 className="font-serif text-2xl sm:text-4xl font-bold text-rose-950 tracking-tight leading-tight">
                "You deserve all the happiness in this world, Ranu! ❤️"
              </h3>

              <p className="mt-4 text-sm sm:text-base text-rose-800/90 leading-relaxed font-light">
                Today, tomorrow, and every single day of this journey, my mission is to see your eyes smile and your heart at peace.
              </p>

              {/* Golden Ticket / Romantic Keepsake Certificate */}
              <div className="mt-8 rounded-2xl border-2 border-dashed border-amber-300 bg-gradient-to-br from-amber-50/70 via-rose-50/60 to-pink-50/70 p-6 text-left relative overflow-hidden shadow-inner">
                <div className="flex items-center justify-between pb-3 border-b border-amber-200/70 text-xs text-amber-800 font-semibold uppercase tracking-wider">
                  <span>Golden Birthday Coupon #RANU-2026</span>
                  <span>Non-Expiring · Valid Forever</span>
                </div>

                <div className="py-4 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-800">
                      <strong>Unlimited Late Night Drives & Chai:</strong> Whenever you crave quiet roads and songs.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-800">
                      <strong>Emergency Comfort Hugs & Ice Cream:</strong> Instant delivery during tough days, no questions asked.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-800">
                      <strong>Unconditional Love & Active Listening:</strong> Always in your corner, cheering for your dreams.
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-amber-200/70 flex items-center justify-between text-xs text-amber-900 font-serif">
                  <span>Authorized by: Someone Who Loves You Dearly</span>
                  <span className="font-script text-xl text-rose-600">Forever Yours</span>
                </div>
              </div>

              {/* Re-wrap or celebrate again */}
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => setIsOpened(false)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Re-wrap Gift Box</span>
                </button>

                <button
                  onClick={handleOpenGift}
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-md transition-colors"
                >
                  <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                  <span>More Confetti!</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
