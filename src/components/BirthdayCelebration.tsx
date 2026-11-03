import { useState } from 'react';
import { Heart, Sparkles, Flame, RotateCcw, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BirthdayCelebrationProps {
  onCelebrate?: () => void;
}

export function BirthdayCelebration({ onCelebrate }: BirthdayCelebrationProps) {
  // 5 glowing candles on the top tier
  const [candles, setCandles] = useState<boolean[]>([true, true, true, true, true]);
  const [wishMade, setWishMade] = useState(false);

  const allBlownOut = candles.every(c => !c);

  const triggerConfettiExplosion = () => {
    // Left cannon
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 55,
      origin: { x: 0.1, y: 0.7 },
      colors: ['#f43f5e', '#ec4899', '#f472b6', '#fbbf24', '#ffffff'],
    });
    // Right cannon
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 55,
      origin: { x: 0.9, y: 0.7 },
      colors: ['#f43f5e', '#ec4899', '#f472b6', '#fbbf24', '#ffffff'],
    });
    // Center heart burst
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#fda4af', '#f472b6', '#e11d48', '#f59e0b', '#ffffff'],
    });
  };

  const blowCandle = (index: number) => {
    const updated = [...candles];
    updated[index] = false;
    setCandles(updated);

    if (updated.every(c => !c)) {
      setWishMade(true);
      triggerConfettiExplosion();
    }
  };

  const blowAllCandles = () => {
    setCandles([false, false, false, false, false]);
    setWishMade(true);
    triggerConfettiExplosion();
    if (onCelebrate) onCelebrate();
  };

  const relightCandles = () => {
    setCandles([true, true, true, true, true]);
    setWishMade(false);
  };

  return (
    <section id="celebration" className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-[#FFF5F7] via-[#FFF0F4] to-[#FFE8EE]">
      {/* Floating Animated Balloons in Background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Balloon 1: Rose Gold */}
        <div className="absolute left-[8%] top-[12%] animate-balloon opacity-75">
          <div className="h-20 w-16 rounded-full bg-gradient-to-t from-rose-500 via-pink-400 to-rose-200 shadow-lg relative">
            <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-2 h-2 bg-rose-600 rounded-sm" />
            <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 w-[1px] h-12 bg-rose-400/70" />
          </div>
        </div>

        {/* Balloon 2: Soft Blush Pink */}
        <div className="absolute right-[12%] top-[18%] animate-balloon opacity-75" style={{ animationDelay: '1.5s' }}>
          <div className="h-24 w-20 rounded-full bg-gradient-to-t from-pink-400 via-rose-300 to-white shadow-lg relative">
            <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-2 h-2 bg-pink-500 rounded-sm" />
            <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 w-[1px] h-14 bg-pink-400/70" />
          </div>
        </div>

        {/* Balloon 3: Champagne Gold */}
        <div className="absolute left-[18%] bottom-[20%] animate-balloon opacity-60" style={{ animationDelay: '3s' }}>
          <div className="h-16 w-14 rounded-full bg-gradient-to-t from-amber-400 via-amber-200 to-yellow-100 shadow-lg relative">
            <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-2 h-2 bg-amber-500 rounded-sm" />
            <div className="absolute bottom-[-45px] left-1/2 -translate-x-1/2 w-[1px] h-11 bg-amber-300/70" />
          </div>
        </div>

        {/* Balloon 4: Deep Wine Rose */}
        <div className="absolute right-[22%] bottom-[15%] animate-balloon opacity-65" style={{ animationDelay: '2.2s' }}>
          <div className="h-20 w-16 rounded-full bg-gradient-to-t from-rose-600 via-rose-400 to-pink-200 shadow-lg relative">
            <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-2 h-2 bg-rose-700 rounded-sm" />
            <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 w-[1px] h-12 bg-rose-500/70" />
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-rose-600 uppercase mb-3">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          <span>Make A Birthday Wish</span>
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-rose-950 tracking-tight">
          May All Your Dreams Come True, <br />
          <span className="text-rose-gold font-serif">Ranu!</span>
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-rose-800/80">
          Blow out the candles on your custom 3D birthday cake, whisper your heart’s most sacred wish, and celebrate another wonderful year of you.
        </p>

        {/* 3D Birthday Cake Container */}
        <div className="mt-12 flex flex-col items-center justify-center">
          <div className="relative w-80 sm:w-96 flex flex-col items-center select-none">
            {/* Candles Row */}
            <div className="flex justify-center items-end gap-5 mb-1 z-20">
              {candles.map((isLit, idx) => (
                <div
                  key={idx}
                  onClick={() => blowCandle(idx)}
                  className="group cursor-pointer flex flex-col items-center transition-transform hover:scale-110"
                  title={isLit ? 'Click to blow out candle' : 'Candle blown out!'}
                >
                  {/* Candle Flame or Smoke */}
                  {isLit ? (
                    <div className="relative flex flex-col items-center">
                      <div className="animate-flicker w-3.5 h-6 rounded-full bg-gradient-to-t from-amber-500 via-amber-300 to-yellow-100 shadow-[0_0_12px_#fbbf24]" />
                      <div className="w-1.5 h-2 bg-orange-400 rounded-full blur-[1px] -mt-2" />
                    </div>
                  ) : (
                    <div className="h-6 flex flex-col items-center justify-end">
                      <span className="text-[10px] text-slate-400/80 animate-pulse">~💨</span>
                    </div>
                  )}

                  {/* Candle Wick */}
                  <div className="w-0.5 h-2 bg-slate-700" />

                  {/* Candle Body with Rose Gold Stripes */}
                  <div className="w-3.5 h-12 rounded-t-sm bg-gradient-to-b from-rose-200 via-pink-100 to-rose-300 border-x border-rose-300 shadow-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(244,63,94,0.3)_4px,rgba(244,63,94,0.3)_8px)]" />
                  </div>
                </div>
              ))}
            </div>

            {/* Cake Tier 1 (Top Tier) */}
            <div className="relative w-44 sm:w-52 h-20 rounded-t-2xl bg-gradient-to-r from-rose-100 via-pink-50 to-rose-200 border-t-4 border-rose-300 shadow-md flex items-center justify-center overflow-hidden z-10">
              {/* Decorative strawberry & rose piped frosting */}
              <div className="absolute top-0 inset-x-0 flex justify-around px-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-4 h-3 bg-white rounded-b-full shadow-sm -mt-0.5" />
                ))}
              </div>
              <span className="font-serif text-xs font-semibold text-rose-800 tracking-wider">
                RANU ❤️
              </span>
              {/* Pearl bead decoration */}
              <div className="absolute bottom-1 inset-x-0 flex justify-between px-3">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-rose-200/90 shadow-sm" />
                ))}
              </div>
            </div>

            {/* Cake Tier 2 (Middle Tier) */}
            <div className="relative w-60 sm:w-72 h-24 rounded-t-3xl bg-gradient-to-r from-pink-200 via-rose-100 to-pink-200 border-t-4 border-rose-300 shadow-lg flex items-center justify-center overflow-hidden z-5 -mt-1">
              <div className="absolute top-0 inset-x-0 flex justify-around px-3">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-5 h-4 bg-white rounded-b-full shadow-sm -mt-0.5" />
                ))}
              </div>
              <div className="flex items-center gap-2 text-rose-700/80 text-xs font-medium">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span>Sweetest Birthday Wishes</span>
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              </div>
            </div>

            {/* Cake Tier 3 (Bottom Tier) */}
            <div className="relative w-72 sm:w-88 h-28 rounded-t-3xl bg-gradient-to-r from-rose-300 via-pink-200 to-rose-300 border-t-4 border-rose-400 shadow-2xl flex flex-col items-center justify-center overflow-hidden -mt-1">
              <div className="absolute top-0 inset-x-0 flex justify-around px-4">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-5 h-4 bg-white rounded-b-full shadow-sm -mt-0.5" />
                ))}
              </div>

              {/* Rose Gold Gold Leaf Flecks */}
              <div className="font-script text-3xl font-bold text-rose-900 mt-2">
                Queen Ranu
              </div>

              <div className="text-[11px] font-sans text-rose-800/80 tracking-widest uppercase">
                Forever In My Heart
              </div>
            </div>

            {/* Cake Stand (Luxury Rose Gold Platter) */}
            <div className="w-80 sm:w-96 h-5 bg-gradient-to-r from-amber-200 via-rose-300 to-amber-200 rounded-full shadow-xl border-t border-white/60 -mt-0.5" />
            <div className="w-32 h-6 bg-gradient-to-b from-rose-300 to-rose-400 shadow-md rounded-b-lg -mt-0.5" />
            <div className="w-48 h-3 bg-gradient-to-r from-amber-200 via-rose-300 to-amber-200 rounded-full shadow-lg" />
          </div>

          {/* Interactive Wish Confirmation Banner */}
          {wishMade && (
            <div className="mt-8 animate-float rounded-2xl border border-rose-300 bg-white/95 px-6 py-4 shadow-xl backdrop-blur-md max-w-md">
              <div className="flex items-center justify-center gap-2 text-rose-600 font-serif text-lg font-bold">
                <Heart className="h-5 w-5 fill-rose-500" />
                <span>Wish Released to the Stars!</span>
                <Heart className="h-5 w-5 fill-rose-500" />
              </div>
              <p className="text-xs text-rose-800/90 mt-1">
                Your silent birthday wish has been sealed in love. May every heartbeat bring you closer to all you have ever dreamed of, Ranu! ✨
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {!allBlownOut ? (
              <button
                onClick={blowAllCandles}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-300/50 transition-all hover:scale-105 hover:shadow-xl active:scale-95"
              >
                <Flame className="h-4 w-4 text-amber-300" />
                <span>Blow All Candles & Make a Wish</span>
              </button>
            ) : (
              <button
                onClick={relightCandles}
                className="inline-flex items-center gap-2 rounded-full border border-rose-300 bg-white/90 px-5 py-2.5 text-sm font-medium text-rose-700 shadow-sm transition-all hover:bg-rose-50 active:scale-95"
              >
                <RotateCcw className="h-4 w-4 text-rose-500" />
                <span>Relight Candles</span>
              </button>
            )}

            <button
              onClick={triggerConfettiExplosion}
              className="inline-flex items-center gap-2 rounded-full bg-rose-950 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-rose-900 hover:scale-105 active:scale-95"
            >
              <PartyPopper className="h-4 w-4 text-amber-400" />
              <span>Celebrate Ranu! 🎉</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
