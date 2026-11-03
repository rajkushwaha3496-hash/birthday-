import { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX, Play, Pause, Upload, Music, Sparkles } from 'lucide-react';

interface RomanticAudioPlayerProps {
  autoPlayRequested?: boolean;
}

export function RomanticAudioPlayer({ autoPlayRequested }: RomanticAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [isMuted, setIsMuted] = useState(false);
  const [trackName, setTrackName] = useState('Ranu’s Melody: Romantic Piano Reverie');
  const [isCustomTrack, setIsCustomTrack] = useState(false);
  const [frequencies, setFrequencies] = useState<number[]>([12, 24, 18, 30, 22, 16, 28, 35, 20, 14, 26, 19]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthActiveRef = useRef(false);
  const synthTimerRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Romantic chord progression chords: Cmaj7 - Am9 - Fmaj7 - Gsus4 (warm romantic acoustic sound)
  const notesC = [
    [261.63, 329.63, 392.0, 493.88], // Cmaj7: C4, E4, G4, B4
    [220.0, 261.63, 329.63, 392.0],  // Am7: A3, C4, E4, G4
    [174.61, 261.63, 329.63, 349.23],// Fmaj7: F3, C4, E4, F4
    [196.0, 293.66, 392.0, 440.0],  // Gadd9: G3, D4, G4, A4
  ];

  // Initialize Web Audio Synth for romantic ambient piano arpeggio
  const playRomanticNote = useCallback((freq: number, duration = 2.4, velocity = 0.2) => {
    if (!audioContextRef.current || !masterGainRef.current) return;
    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const oscHarmonic = ctx.createOscillator();
    const noteGain = ctx.createGain();

    // Warm sine + subtle triangle for delicate rhodes/piano chime
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    oscHarmonic.type = 'triangle';
    oscHarmonic.frequency.setValueAtTime(freq * 2, ctx.currentTime);

    const now = ctx.currentTime;
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.exponentialRampToValueAtTime(velocity, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(noteGain);
    oscHarmonic.connect(noteGain);
    noteGain.connect(masterGainRef.current);

    osc.start(now);
    oscHarmonic.start(now);
    osc.stop(now + duration + 0.1);
    oscHarmonic.stop(now + duration + 0.1);
  }, []);

  const startSynthMelody = useCallback(() => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioContextRef.current = new AudioCtx();
      const gain = audioContextRef.current.createGain();
      gain.gain.setValueAtTime(isMuted ? 0 : volume, audioContextRef.current.currentTime);
      gain.connect(audioContextRef.current.destination);
      masterGainRef.current = gain;
    }

    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    synthActiveRef.current = true;
    let step = 0;

    const tick = () => {
      if (!synthActiveRef.current) return;

      const chordIndex = Math.floor(step / 4) % notesC.length;
      const noteIndex = step % 4;
      const baseChord = notesC[chordIndex];
      const freq = baseChord[noteIndex];

      // Add high romantic chime every 8 steps
      if (step % 8 === 0) {
        playRomanticNote(523.25 * 1.5, 3.2, 0.1); // High G5
      }

      playRomanticNote(freq, 2.5, 0.22);

      // Animate visualizer frequency bars dynamically
      setFrequencies(prev =>
        prev.map(() => Math.floor(Math.random() * 28) + 8)
      );

      step++;
      synthTimerRef.current = window.setTimeout(tick, 580);
    };

    tick();
  }, [isMuted, notesC, playRomanticNote, volume]);

  const stopSynthMelody = useCallback(() => {
    synthActiveRef.current = false;
    if (synthTimerRef.current) {
      clearTimeout(synthTimerRef.current);
      synthTimerRef.current = null;
    }
  }, []);

  const togglePlayback = useCallback(() => {
    if (isPlaying) {
      if (isCustomTrack && audioRef.current) {
        audioRef.current.pause();
      } else {
        stopSynthMelody();
      }
      setIsPlaying(false);
    } else {
      if (isCustomTrack && audioRef.current) {
        audioRef.current.play().catch(() => {
          // Autoplay policy or media interrupted - silent fallback
        });
      } else {
        startSynthMelody();
      }
      setIsPlaying(true);
    }
  }, [isCustomTrack, isPlaying, startSynthMelody, stopSynthMelody]);

  // When parent signals user interaction, trigger start
  useEffect(() => {
    if (autoPlayRequested && !isPlaying) {
      togglePlayback();
    }
  }, [autoPlayRequested, isPlaying, togglePlayback]);

  // Handle volume changes
  useEffect(() => {
    const effectiveVol = isMuted ? 0 : volume;
    if (masterGainRef.current && audioContextRef.current) {
      masterGainRef.current.gain.setValueAtTime(effectiveVol, audioContextRef.current.currentTime);
    }
    if (audioRef.current) {
      audioRef.current.volume = effectiveVol;
    }
  }, [volume, isMuted]);

  // Handle custom MP3 file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    if (audioRef.current) {
      audioRef.current.pause();
    }

    stopSynthMelody();

    const audio = new Audio(objectUrl);
    audio.loop = true;
    audio.volume = isMuted ? 0 : volume;
    audioRef.current = audio;

    setTrackName(file.name.replace(/\.[^/.]+$/, ''));
    setIsCustomTrack(true);
    setIsPlaying(true);

    audio.play().catch(() => {
      // Audio play restricted until user gesture
    });
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 max-w-sm rounded-2xl border border-rose-200/80 bg-white/90 p-3 shadow-xl backdrop-blur-md transition-all hover:shadow-2xl">
      <div className="flex items-center justify-between gap-3">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlayback}
          aria-label={isPlaying ? 'Pause music' : 'Play romantic music'}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow-md transition-transform hover:scale-105 active:scale-95"
        >
          {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="ml-0.5 h-5 w-5 fill-current" />}
        </button>

        {/* Track Info & Visualizer */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-900">
            <Music className="h-3.5 w-3.5 text-rose-500" />
            <span className="truncate">{trackName}</span>
          </div>

          {/* Animated Visualizer Bars */}
          <div className="mt-1.5 flex h-4 items-end gap-1">
            {frequencies.map((height, i) => (
              <span
                key={i}
                className="w-1 rounded-full bg-rose-400 transition-all duration-300"
                style={{
                  height: isPlaying ? `${Math.max(4, height)}px` : '3px',
                  opacity: isPlaying ? 0.85 : 0.35,
                }}
              />
            ))}
          </div>
        </div>

        {/* Controls: Mute toggle & MP3 upload */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-rose-100 hover:text-rose-700"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>

          {/* Upload Custom MP3 Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-rose-100 hover:text-rose-700"
            title="Upload custom romantic MP3 song"
          >
            <Upload className="h-4 w-4" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/mp3,audio/mpeg,audio/wav,audio/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
      </div>

      {/* Volume slider & notice */}
      <div className="mt-2.5 flex items-center justify-between border-t border-rose-100/70 pt-2 text-[11px] text-rose-700/80">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-medium text-slate-500">Volume</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={e => {
              setVolume(parseFloat(e.target.value));
              if (isMuted) setIsMuted(false);
            }}
            className="h-1 w-16 cursor-pointer accent-rose-500"
          />
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-1 font-medium text-rose-600 hover:underline"
        >
          <Sparkles className="h-2.5 w-2.5" />
          {isCustomTrack ? 'Change Song' : 'Upload MP3'}
        </button>
      </div>
    </div>
  );
}
