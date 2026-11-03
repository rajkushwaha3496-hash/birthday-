/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ParticleCanvas } from './components/ParticleCanvas';
import { RomanticCursor } from './components/RomanticCursor';
import { TopNav } from './components/TopNav';
import { WelcomeScreen } from './components/WelcomeScreen';
import { BirthdayCelebration } from './components/BirthdayCelebration';
import { MemoriesGallery } from './components/MemoriesGallery';
import { RomanticLetter } from './components/RomanticLetter';
import { ReasonsSpecial } from './components/ReasonsSpecial';
import { InteractiveSurprise } from './components/InteractiveSurprise';
import { FinalBirthdayScreen } from './components/FinalBirthdayScreen';
import { RomanticAudioPlayer } from './components/RomanticAudioPlayer';
import { ExportGuideModal } from './components/ExportGuideModal';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isExportGuideOpen, setIsExportGuideOpen] = useState(false);

  const handleEnterSurprise = () => {
    setHasEntered(true);
  };

  return (
    <div className="relative min-h-screen bg-[#FFF5F7] text-slate-800 selection:bg-rose-200 selection:text-rose-900 overflow-x-hidden font-sans">
      {/* Floating Rose Petals & Hearts Particle Canvas */}
      <ParticleCanvas />

      {/* Romantic Cursor Trail for Desktop */}
      <RomanticCursor />

      {/* Top Navigation Bar */}
      <TopNav onOpenExportGuide={() => setIsExportGuideOpen(true)} />

      {/* Main Experience Flow */}
      <main>
        {/* Section 1: Welcome Screen */}
        <WelcomeScreen onEnter={handleEnterSurprise} hasEntered={hasEntered} />

        {/* Section 2: Birthday Celebration & 3D Cake */}
        <BirthdayCelebration />

        {/* Section 3: Our Memories Gallery (30+ Moments) */}
        <MemoriesGallery />

        {/* Section 4: Special Birthday Letter with Wax Seal */}
        <RomanticLetter />

        {/* Section 5: Reasons Why You Are Special (12 Cards) */}
        <ReasonsSpecial />

        {/* Section 7: Interactive Surprise (3D Gift Box) */}
        <InteractiveSurprise />
      </main>

      {/* Section 8: Final Birthday Screen & Wish Board */}
      <FinalBirthdayScreen />

      {/* Section 6: Persistent Romantic Background Music Player & Visualizer */}
      <RomanticAudioPlayer autoPlayRequested={hasEntered} />

      {/* Deliverables & Hosting Guide Modal */}
      <ExportGuideModal
        isOpen={isExportGuideOpen}
        onClose={() => setIsExportGuideOpen(false)}
      />
    </div>
  );
}
