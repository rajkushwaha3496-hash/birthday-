import { useState } from 'react';
import { Heart, Sparkles, Send, ArrowUp, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WishNote {
  id: string;
  name: string;
  message: string;
  time: string;
}

export function FinalBirthdayScreen() {
  const [wishes, setWishes] = useState<WishNote[]>([
    {
      id: '1',
      name: 'With All My Heart',
      message: 'May every sunrise bring you joy and every sunset bring you peace, Ranu! Happy Birthday!',
      time: 'Just now',
    },
    {
      id: '2',
      name: 'Your Biggest Fan',
      message: 'Keep shining and inspiring the world with that radiant smile! ❤️',
      time: 'A moment ago',
    },
  ]);

  const [author, setAuthor] = useState('');
  const [noteMessage, setNoteMessage] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteMessage.trim()) return;

    const newNote: WishNote = {
      id: Date.now().toString(),
      name: author.trim() || 'Well-wisher',
      message: noteMessage.trim(),
      time: 'Just now',
    };

    setWishes([newNote, ...wishes]);
    setNoteMessage('');
    setAuthor('');
    setHasSubmitted(true);

    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#f43f5e', '#ec4899', '#f472b6', '#ffffff'],
    });

    setTimeout(() => setHasSubmitted(false), 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-28 px-6 bg-[#2B0E1B] text-rose-100 overflow-hidden text-center">
      {/* Glowing Hearts & Starlight Bokeh Effect in Dark Luxury Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-rose-500 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-pink-500 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl space-y-10">
        {/* Glowing Heart Icon */}
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-rose-500/20 text-rose-400 border border-rose-400/30 shadow-[0_0_25px_rgba(244,63,94,0.4)] animate-bounce">
          <Heart className="h-8 w-8 fill-rose-500 text-rose-500" />
        </div>

        {/* Requested Final Header & Blessings */}
        <div className="space-y-4">
          <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white">
            Happy Birthday, My Favourite Person <span className="text-rose-400 inline-block">❤️</span>
          </h2>

          <p className="font-serif text-xl sm:text-2xl text-rose-200/90 italic max-w-2xl mx-auto leading-relaxed">
            "May your life always be filled with love, laughter, beautiful memories and endless happiness."
          </p>
        </div>

        {/* Birthday Wish Capsule / Interactive Guestbook */}
        <div className="mx-auto max-w-xl rounded-3xl bg-white/10 backdrop-blur-md p-6 sm:p-8 border border-white/15 shadow-2xl text-left">
          <div className="flex items-center gap-2 mb-4 text-rose-300 text-sm font-semibold">
            <Sparkles className="h-4 w-4" />
            <span>Leave a Special Birthday Note For Ranu</span>
          </div>

          <form onSubmit={handleAddWish} className="space-y-3">
            <input
              type="text"
              placeholder="Your name or nickname (e.g. Someone who adores you)"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              className="w-full rounded-xl bg-white/10 border border-white/20 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-rose-200/50 focus:border-rose-400 focus:outline-none"
            />
            <textarea
              rows={2}
              required
              placeholder="Write a sweet birthday wish for Ranu..."
              value={noteMessage}
              onChange={e => setNoteMessage(e.target.value)}
              className="w-full rounded-xl bg-white/10 border border-white/20 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-rose-200/50 focus:border-rose-400 focus:outline-none"
            />
            <div className="flex items-center justify-between">
              {hasSubmitted ? (
                <span className="text-xs text-rose-300 font-medium">Note sealed with a heart! ❤️</span>
              ) : (
                <span className="text-[11px] text-rose-300/60">Saved locally in your celebration</span>
              )}
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-xl bg-rose-500 hover:bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-md transition-colors"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Send Note</span>
              </button>
            </div>
          </form>

          {/* Recent Notes */}
          <div className="mt-6 space-y-3 max-h-48 overflow-y-auto pr-1">
            {wishes.map(w => (
              <div key={w.id} className="rounded-xl bg-white/5 border border-white/10 p-3 text-xs">
                <div className="flex items-center justify-between text-rose-300 font-medium mb-1">
                  <span>{w.name}</span>
                  <span className="text-[10px] text-rose-200/60">{w.time}</span>
                </div>
                <p className="text-rose-100/90 font-light italic">"{w.message}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll back to top */}
        <div className="pt-6 flex flex-col items-center justify-center gap-4">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 rounded-full border border-rose-300/40 bg-white/10 px-6 py-2.5 text-xs font-medium text-rose-200 hover:bg-white/20 transition-all hover:scale-105"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            <span>Replay Ranu's Birthday Surprise</span>
          </button>

          <p className="text-xs text-rose-300/60 font-light">
            Crafted with infinite love for Ranu Solanki · Forever & Always
          </p>
        </div>
      </div>
    </footer>
  );
}
