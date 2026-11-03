import { useState } from 'react';
import { Heart, Sparkles, Smile, Sun, Shield, Music, Eye, Flame, Compass, Star, Gift, Coffee } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReasonItem {
  id: number;
  title: string;
  teaser: string;
  details: string;
  icon: typeof Heart;
}

const REASONS: ReasonItem[] = [
  {
    id: 1,
    title: 'Your Radiant Smile',
    teaser: 'It instantly brightens the darkest room.',
    details: 'The effortless way your face lights up when you are genuinely happy has a superpower of washing away all my worries.',
    icon: Smile,
  },
  {
    id: 2,
    title: 'Your Caring & Gentle Heart',
    teaser: 'You love with unmatched tenderness.',
    details: 'You notice the little things that most people miss, and your empathy for those around you is pure and unconditional.',
    icon: Heart,
  },
  {
    id: 3,
    title: 'Your Presence Is Magic',
    teaser: 'Any place becomes home with you.',
    details: 'Whether we are sitting in silence or running around in rain, just having you beside me makes everything feel complete.',
    icon: Sparkles,
  },
  {
    id: 4,
    title: 'Your Sparkling Eyes',
    teaser: 'A whole universe lives inside them.',
    details: 'When you talk about things you love, the excitement dancing in your eyes is the most mesmerizing view on earth.',
    icon: Eye,
  },
  {
    id: 5,
    title: 'How You Believe In Me',
    teaser: 'Even when I doubt myself.',
    details: 'Your quiet confidence in my dreams gives me courage. You are my strongest anchor and my sweetest cheerleader.',
    icon: Shield,
  },
  {
    id: 6,
    title: 'Your Infectious Laughter',
    teaser: 'The most melodic symphony.',
    details: 'Hearing you burst into honest, unfiltered laughter is my absolute favorite sound in the whole wide world.',
    icon: Music,
  },
  {
    id: 7,
    title: 'Your Warmth & Comfort',
    teaser: 'A safe haven in a chaotic world.',
    details: 'A single embrace from you after a tiring day melts away all fatigue. There is nowhere safer than in your arms.',
    icon: Sun,
  },
  {
    id: 8,
    title: 'Your Playful Goofiness',
    teaser: 'Cute quirks that make me adore you.',
    details: 'The silly faces you make, the funny dances you do when food arrives, and all the sweet antics only I get to see.',
    icon: Coffee,
  },
  {
    id: 9,
    title: 'Your Inner Strength',
    teaser: 'Grace under every pressure.',
    details: 'You face challenges with elegance and determination that constantly inspires me to be a better human being.',
    icon: Flame,
  },
  {
    id: 10,
    title: 'Making Ordinary Days Special',
    teaser: 'Every day feels like a celebration.',
    details: 'A quick grocery run or a walk down the street feels like a romantic date simply because you are there holding my hand.',
    icon: Compass,
  },
  {
    id: 11,
    title: 'Your Pure, Beautiful Soul',
    teaser: 'Rare, genuine, and irreplaceable.',
    details: 'You are so genuinely good-hearted, honest, and loving. Finding someone like Ranu is a once-in-a-lifetime blessing.',
    icon: Star,
  },
  {
    id: 12,
    title: 'Growing Old With You',
    teaser: 'My greatest dream and forever wish.',
    details: 'I cannot wait to celebrate dozens more birthdays with you, holding your wrinkled hand and still loving you just as deeply.',
    icon: Gift,
  },
];

export function ReasonsSpecial() {
  const [flippedIds, setFlippedIds] = useState<number[]>([1]); // first one flipped open by default

  const toggleFlip = (id: number) => {
    if (flippedIds.includes(id)) {
      setFlippedIds(flippedIds.filter(i => i !== id));
    } else {
      setFlippedIds([...flippedIds, id]);
      if (flippedIds.length + 1 === REASONS.length) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f43f5e', '#ec4899', '#fbbf24', '#ffffff'],
        });
      }
    }
  };

  const revealAll = () => {
    setFlippedIds(REASONS.map(r => r.id));
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#ec4899', '#fbbf24'],
    });
  };

  return (
    <section id="reasons" className="relative py-24 px-6 bg-[#FFF5F7]">
      <div className="mx-auto max-w-6xl text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-rose-600 uppercase mb-2">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          <span>Chapter 05 · Endless Reasons</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-rose-950">
          Why You Are Irreplaceable, Ranu
        </h2>
        <p className="mt-2 text-sm sm:text-base text-rose-800/80 max-w-xl mx-auto">
          There are a million reasons why I fell in love with you. Here are 12 interactive cards revealing what makes you so magical to me.
        </p>

        {/* Counter and Reveal All button */}
        <div className="mt-6 flex items-center justify-center gap-4 text-xs">
          <span className="text-rose-900 font-medium">
            Revealed: {flippedIds.length} of {REASONS.length} reasons
          </span>
          <button
            onClick={revealAll}
            className="text-rose-600 font-semibold hover:underline"
          >
            Reveal All
          </button>
        </div>

        {/* 12 Cards Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {REASONS.map(reason => {
            const isFlipped = flippedIds.includes(reason.id);
            const Icon = reason.icon;

            return (
              <div
                key={reason.id}
                onClick={() => toggleFlip(reason.id)}
                className={`group cursor-pointer rounded-2xl p-6 text-left transition-all duration-300 border flex flex-col justify-between min-h-[220px] select-none ${
                  isFlipped
                    ? 'bg-gradient-to-br from-white via-rose-50/70 to-pink-50 border-rose-300 shadow-lg scale-102'
                    : 'bg-white border-rose-100 hover:border-rose-300 shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                        isFlipped
                          ? 'bg-rose-500 text-white'
                          : 'bg-rose-100 text-rose-600 group-hover:bg-rose-200'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="text-[11px] font-semibold text-rose-400">
                      #0{reason.id > 9 ? reason.id : `0${reason.id}`}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-rose-950">
                    {reason.title}
                  </h3>

                  <p className="mt-1 text-xs text-rose-700/80 font-medium">
                    {reason.teaser}
                  </p>

                  {isFlipped && (
                    <p className="mt-3 text-xs text-slate-700 leading-relaxed font-light border-t border-rose-200/50 pt-2 animate-fadeIn">
                      {reason.details}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-2 border-t border-rose-100/60 flex items-center justify-between text-[11px] text-rose-500">
                  <span className="font-medium">
                    {isFlipped ? 'Tap to close' : 'Tap to reveal secret'}
                  </span>
                  <Heart
                    className={`h-3.5 w-3.5 ${
                      isFlipped ? 'fill-rose-500 text-rose-500' : 'text-rose-300'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
