'use client';

import { useState, useEffect } from 'react';
import { Volume2, Play, Square } from 'lucide-react';
import { GlobalAudio } from './AnticipationOverlay';

const REAL_SOUND_BITES = [
  { id: 'demarco', hotkey: '1', name: 'DON DEMARCO', file: '/Soundbites/Voicy_DJ Don Demarco .mp3', startTime: 0 },
  { id: 'streets', hotkey: '2', name: 'FOR THE STREETS', file: '/Soundbites/she-belongs-to-the-streets-future-meme.mp3', startTime: 0 },
  { id: 'cap', hotkey: '3', name: 'STOP THE CAP', file: '/Soundbites/zias-stop-the-cap_RjHQpxU.mp3', startTime: 0 },
  { id: 'broke', hotkey: '4', name: "YOU'RE BROKE", file: '/Soundbites/your-broke-andrew-tate_fQJoCVt.mp3', startTime: 0.35 },
  { id: 'damage', hotkey: '5', name: 'EMOTIONAL DAMAGE', file: '/Soundbites/emotional-damage-meme.mp3', startTime: 0 },
  { id: 'losing', hotkey: '6', name: 'LOSING HORN', file: '/Soundbites/the-price-is-right-losing-horn_2.mp3', startTime: 0 },
  { id: 'undertaker', hotkey: '7', name: 'UNDERTAKER BELL', file: '/Soundbites/undertakers-bell_2UwFCIe.mp3', startTime: 0 },
  { id: 'rizz', hotkey: '8', name: 'RIZZ EFFECT', file: '/Soundbites/rizz-sound-effect.mp3', startTime: 0 },
  { id: 'buttonit', hotkey: '9', name: 'BUTTON IT', file: "/Soundbites/Voicy_And you're gettin' too fresh. So button it..mp3", startTime: 0 },
  { id: 'stoopid', hotkey: '0', name: 'STOOPID', file: '/Soundbites/stoopid.mp3', startTime: 0 },
];

export default function SoundboardBar() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const playSound = (sound: typeof REAL_SOUND_BITES[0]) => {
    setPlayingId(sound.id);
    GlobalAudio.play(sound.file, () => setPlayingId(null), sound.startTime || 0);
  };

  const stopSound = () => {
    GlobalAudio.stop();
    setPlayingId(null);
  };

  // Keyboard Hotkeys listener (1-9, 0)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore hotkeys when typing inside an input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      const sound = REAL_SOUND_BITES.find(
        (s) => s.hotkey.toLowerCase() === e.key.toLowerCase()
      );
      if (sound) {
        playSound(sound);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="sticky bottom-0 w-full bg-[#0c0721]/95 backdrop-blur-xl border-t-2 border-[#FF007F]/40 py-2.5 px-4 sm:px-6 flex items-center gap-4 sm:gap-6 overflow-x-auto z-40 shadow-[0_-8px_25px_rgba(255,0,127,0.3)]">
      {/* Soundboard Label - Left Aligned with Divider */}
      <div className="flex items-center gap-2 text-xs font-mono text-[#FFE600] uppercase font-bold shrink-0 border-r border-[#FF007F]/30 pr-4">
        <Volume2 className="w-4 h-4 animate-pulse text-[#FFE600]" />
        <span>CHRIS & BIG MO SOUNDBOARD:</span>
      </div>

      {/* Buttons - Flowing continuously to the right with padding offset */}
      <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-0.5 flex-1 pl-2">
        {REAL_SOUND_BITES.map((sound) => (
          <button
            key={sound.id}
            onClick={() => (playingId === sound.id ? stopSound() : playSound(sound))}
            className={`px-3.5 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              playingId === sound.id
                ? 'bg-[#FF007F] text-white scale-105 shadow-[0_0_15px_#FF007F] animate-pulse'
                : 'bg-[#180e38] text-[#00F5FF] border border-[#00F5FF]/40 hover:bg-[#00F5FF]/20 hover:border-[#00F5FF]'
            }`}
          >
            {playingId === sound.id ? (
              <Square className="w-3 h-3 fill-current text-white" />
            ) : (
              <Play className="w-3 h-3 fill-current text-[#00F5FF]" />
            )}
            <span className="text-[#FFE600] font-mono font-extrabold text-[10px]">[{sound.hotkey}]</span>
            <span>{sound.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
