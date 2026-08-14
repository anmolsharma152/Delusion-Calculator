'use client';

import { useState } from 'react';
import { Volume2, Play, Square } from 'lucide-react';
import { GlobalAudio } from './AnticipationOverlay';

const REAL_SOUND_BITES = [
  { id: 'demarco', name: 'DON DEMARCO', file: '/Soundbites/Voicy_DJ Don Demarco .mp3' },
  { id: 'streets', name: 'FOR THE STREETS', file: '/Soundbites/she-belongs-to-the-streets-future-meme.mp3' },
  { id: 'cap', name: 'STOP THE CAP', file: '/Soundbites/zias-stop-the-cap_RjHQpxU.mp3' },
  { id: 'broke', name: 'YOU BROKE', file: '/Soundbites/your-broke-andrew-tate_fQJoCVt.mp3' },
  { id: 'damage', name: 'EMOTIONAL DAMAGE', file: '/Soundbites/emotional-damage-meme.mp3' },
  { id: 'losing', name: 'LOSING HORN', file: '/Soundbites/the-price-is-right-losing-horn_2.mp3' },
  { id: 'undertaker', name: 'UNDERTAKER BELL', file: '/Soundbites/undertakers-bell_2UwFCIe.mp3' },
  { id: 'rizz', name: 'RIZZ EFFECT', file: '/Soundbites/rizz-sound-effect.mp3' },
  { id: 'air', name: 'BREATHE AIR', file: '/Soundbites/andrew-tate-breath-air.mp3' },
  { id: 'stoopid', name: 'STOOPID', file: '/Soundbites/stoopid.mp3' },
  { id: 'buttonit', name: 'BUTTON IT', file: "/Soundbites/Voicy_And you're gettin' too fresh. So button it..mp3" },
];

export default function SoundboardBar() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const playSound = (sound: typeof REAL_SOUND_BITES[0]) => {
    setPlayingId(sound.id);
    GlobalAudio.play(sound.file, () => setPlayingId(null));
  };

  const stopSound = () => {
    GlobalAudio.stop();
    setPlayingId(null);
  };

  return (
    <div className="w-full bg-[#180e38]/95 border-y-2 border-[#FF007F]/40 py-2.5 px-4 flex items-center gap-4 overflow-x-auto z-20 shadow-[0_0_20px_rgba(255,0,127,0.2)]">
      {/* Soundboard Label - Left Aligned */}
      <div className="flex items-center gap-2 text-xs font-mono text-[#FFE600] uppercase font-bold shrink-0">
        <Volume2 className="w-4 h-4 animate-pulse text-[#FFE600]" />
        <span>CHRIS & BIG MO SOUNDBOARD:</span>
      </div>

      {/* Buttons - Flowing continuously starting immediately after label */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 flex-1">
        {REAL_SOUND_BITES.map((sound) => (
          <button
            key={sound.id}
            onClick={() => (playingId === sound.id ? stopSound() : playSound(sound))}
            className={`px-3.5 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              playingId === sound.id
                ? 'bg-[#FF007F] text-white scale-105 shadow-[0_0_15px_#FF007F] animate-pulse'
                : 'bg-[#0c0721] text-[#00F5FF] border border-[#00F5FF]/40 hover:bg-[#00F5FF]/20 hover:border-[#00F5FF]'
            }`}
          >
            {playingId === sound.id ? (
              <Square className="w-3 h-3 fill-current text-white" />
            ) : (
              <Play className="w-3 h-3 fill-current text-[#00F5FF]" />
            )}
            <span>{sound.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
