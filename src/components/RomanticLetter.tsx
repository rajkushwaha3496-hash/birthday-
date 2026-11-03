import { useState } from 'react';
import { Heart, Sparkles, MailOpen, Printer, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

export function RomanticLetter() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    setIsOpen(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#fda4af', '#f472b6', '#f59e0b', '#fff'],
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="letter" className="relative py-24 px-6 bg-gradient-to-b from-[#FFE8EE] via-[#FFF0F4] to-[#FFF5F7]">
      <div className="mx-auto max-w-4xl text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-rose-600 uppercase mb-2">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          <span>Chapter 04 · From My Heart to Yours</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-rose-950">
          A Love Letter For Ranu
        </h2>
        <p className="mt-2 text-sm sm:text-base text-rose-800/80 max-w-xl mx-auto">
          Words can never completely capture what you mean to me, but every sentence here was written with endless devotion.
        </p>

        {/* Envelope & Letter Container */}
        <div className="mt-12 flex flex-col items-center">
          {!isOpen ? (
            /* Closed Envelope with Wax Seal */
            <div
              onClick={handleOpenLetter}
              className="group cursor-pointer relative w-80 sm:w-96 h-60 rounded-xl bg-gradient-to-tr from-rose-200 via-pink-100 to-rose-200 shadow-2xl border border-rose-300 p-4 flex flex-col items-center justify-between transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              {/* Envelope Flap Triangle */}
              <div
                className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-rose-300 to-rose-200 border-b border-rose-300/80 shadow-md transition-all duration-500 group-hover:-translate-y-1"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                }}
              />

              <div className="z-10 pt-1 text-center">
                <span className="font-serif text-xs uppercase tracking-widest text-rose-800/70">
                  Confidential & Precious
                </span>
              </div>

              {/* Wax Seal */}
              <div className="z-20 relative flex flex-col items-center justify-center my-auto">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-700 via-rose-600 to-pink-500 shadow-lg flex items-center justify-center border-2 border-amber-300/60 group-hover:scale-110 transition-transform">
                  <div className="w-12 h-12 rounded-full border border-amber-200/50 flex flex-col items-center justify-center text-amber-200 font-serif font-bold text-lg">
                    R
                  </div>
                </div>
                <span className="mt-2 text-xs font-semibold text-rose-900 group-hover:text-rose-600 transition-colors">
                  Tap to Unseal Letter
                </span>
              </div>

              {/* Envelope Bottom Address */}
              <div className="z-10 pb-1 text-center">
                <p className="font-script text-2xl text-rose-900">
                  For: Ranu Solanki ❤️
                </p>
                <p className="text-[10px] text-rose-700/80 uppercase tracking-wider">
                  To The Love of My Life
                </p>
              </div>
            </div>
          ) : (
            /* Open Romantic Letter View */
            <div className="relative w-full max-w-3xl rounded-3xl bg-[#FFFDF9] shadow-2xl border-4 border-[#F3E5D8] p-8 sm:p-14 text-left transition-all duration-700 animate-float">
              {/* Gold foil header ornament */}
              <div className="flex items-center justify-between pb-6 border-b border-rose-200/70">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="text-xs uppercase tracking-widest text-rose-800 font-medium">
                    Personal Love Letter
                  </span>
                </div>
                <div className="text-xs text-rose-700 font-medium">
                  On Your Birthday
                </div>
              </div>

              {/* Handwritten-Style Letter Prose */}
              <div className="mt-8 space-y-6 text-rose-950 font-serif">
                <h3 className="font-script text-4xl sm:text-5xl text-rose-800">
                  Dearest Ranu,
                </h3>

                <p className="text-base sm:text-lg leading-relaxed text-slate-800 font-light">
                  Today is not just another date on the calendar. It is the day the most beautiful soul was brought into this universe—the person who brought colors to my black-and-white world and taught my heart what genuine affection feels like.
                </p>

                <p className="text-base sm:text-lg leading-relaxed text-slate-800 font-light">
                  I want to take this moment to thank you. Thank you for your warmth, for your endless patience, for the way you look at me when you think I'm not noticing, and for making even the most mundane days feel like an extraordinary blessing. In every crowd, in every room, my eyes will always search for you first.
                </p>

                {/* Sweet romantic memory quote */}
                <div className="p-4 rounded-2xl bg-rose-50/70 border-l-2 border-rose-400 text-rose-900 font-script text-2xl sm:text-3xl leading-snug">
                  "Every late night conversation, every sweet laugh we shared, and every promise whispered under the stars has made me realize: loving you is the easiest and most sacred thing I have ever done."
                </div>

                <p className="text-base sm:text-lg leading-relaxed text-slate-800 font-light">
                  On this birthday, I make you a promise: I promise to celebrate your wins, to hold your hand through the stormy rains, to make you laugh whenever you are stressed, and to love you more fiercely tomorrow than I do today. You deserve every ounce of magic, happiness, and peace that this life can offer.
                </p>

                <p className="text-base sm:text-lg leading-relaxed text-slate-800 font-light">
                  May your year ahead be filled with blooming opportunities, deep joy, good health, and sweet surprises.
                </p>

                <div className="pt-6">
                  <p className="text-base text-slate-700">Forever & Always Yours,</p>
                  <p className="font-script text-4xl sm:text-5xl text-rose-600 mt-2">
                    With All My Love ❤️
                  </p>
                </div>
              </div>

              {/* Action Buttons: Close / Print */}
              <div className="mt-10 pt-6 border-t border-rose-200/60 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 hover:text-rose-900"
                >
                  <MailOpen className="h-4 w-4" />
                  <span>Fold Letter Back into Envelope</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-rose-200 text-xs font-medium text-rose-900 hover:bg-rose-50 shadow-xs"
                    title="Print or Save Letter as Keepsake"
                  >
                    <Printer className="h-3.5 w-3.5 text-rose-500" />
                    <span>Print Keepsake</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
