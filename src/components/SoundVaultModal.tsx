'use client';

import { useState, useEffect } from 'react';
import { Sparkles, X, Play, Square, Search, Music, Zap, Layers } from 'lucide-react';

export interface SoundBite {
  id: string;
  name: string;
  file: string;
  category: 'Fresh & Fit' | 'Top G' | 'Reactions' | 'Fails' | 'Gaming & Anime';
  startTime?: number;
}

export const BANK_1_SOUNDS: SoundBite[] = [
  { id: 'don-demarco', name: 'Don Demarco', file: '/Soundbites/dondemarco_FvSgG9q.mp3', category: 'Fresh & Fit' },
  { id: 'for-the-streets', name: 'For The Streets', file: '/Soundbites/she-belongs-to-the-streets-future_zJ7u1gY.mp3', category: 'Fresh & Fit' },
  { id: 'stop-the-cap', name: 'Stop The Cap', file: '/Soundbites/stop-the-cap-cut.mp3', category: 'Fresh & Fit' },
  { id: 'andrew-tate-theme', name: 'Top G Theme Song', file: '/Soundbites/andrew-tate-theme-song.mp3', category: 'Top G' },
  { id: 'emotional-damage', name: 'Emotional Damage', file: '/Soundbites/emotional-damage-meme.mp3', category: 'Reactions' },
  { id: 'airhorn', name: 'Airhorn Blast', file: '/Soundbites/airhorn-sound.mp3', category: 'Reactions' },
  { id: 'falconpunch', name: 'Falcon Punch', file: '/Soundbites/falconpunch.mp3', category: 'Gaming & Anime' },
  { id: 'spongebob-fail', name: 'Spongebob Fail', file: '/Soundbites/spongebob-fail.mp3', category: 'Fails' },
  { id: 'fahhh', name: 'FAHHH', file: '/Soundbites/fahhh.mp3', category: 'Reactions' },
  { id: 'undertaker-bell', name: 'Undertaker Bell', file: '/Soundbites/the-undertaker-bell-toll.mp3', category: 'Reactions' },
];

export const BANK_2_SOUNDS: SoundBite[] = [
  { id: 'youre-broke', name: "You're Broke", file: '/Soundbites/youre-broke.mp3', category: 'Fresh & Fit' },
  { id: 'button-it', name: 'Button It', file: '/Soundbites/button-it.mp3', category: 'Fresh & Fit' },
  { id: 'tate-air', name: 'Breathe Air', file: '/Soundbites/breathe-air-andrew-tate.mp3', category: 'Top G' },
  { id: 'rizz', name: 'Rizz Sound Effect', file: '/Soundbites/rizz-sound-effect.mp3', category: 'Reactions' },
  { id: 'losing-horn', name: 'Price is Right Fail', file: '/Soundbites/the-price-is-right-losing-horn.mp3', category: 'Fails' },
  { id: 'stoopid', name: 'Stoopid', file: '/Soundbites/stoopid_rZk013J.mp3', category: 'Reactions' },
  { id: 'bruh', name: 'Bruh Sound #2', file: '/Soundbites/bruh-sound-effect_WaeWi7S.mp3', category: 'Reactions' },
  { id: 'tuco-get-out', name: 'Tuco: Get Out!', file: '/Soundbites/tuco-get-out_eF2qK47.mp3', category: 'Reactions' },
  { id: 'rewind', name: 'Record Scratch', file: '/Soundbites/record-scratch-sound-effect.mp3', category: 'Fails' },
  { id: 'over-9000', name: "It's Over 9000!", file: '/Soundbites/its-over-9000_1.mp3', category: 'Gaming & Anime' },
];

export const ALL_VAULT_SOUNDS: SoundBite[] = [
  // 1. Fresh & Fit Core
  { id: 'don-demarco', name: 'Don Demarco', file: '/Soundbites/dondemarco_FvSgG9q.mp3', category: 'Fresh & Fit' },
  { id: 'for-the-streets', name: 'For The Streets', file: '/Soundbites/she-belongs-to-the-streets-future_zJ7u1gY.mp3', category: 'Fresh & Fit' },
  { id: 'stop-the-cap', name: 'Stop The Cap', file: '/Soundbites/stop-the-cap-cut.mp3', category: 'Fresh & Fit' },
  { id: 'youre-broke', name: "You're Broke", file: '/Soundbites/youre-broke.mp3', category: 'Fresh & Fit' },
  { id: 'button-it', name: 'Button It', file: '/Soundbites/button-it.mp3', category: 'Fresh & Fit' },
  { id: 'fnf-bell', name: 'Boxing Round Bell', file: '/Soundbites/boxing-bell.mp3', category: 'Fresh & Fit' },
  { id: 'tindeck_1', name: 'Tindeck Sound', file: '/Soundbites/tindeck_1.mp3', category: 'Fresh & Fit' },
  { id: 'gunshot1', name: 'Gunshot Drop', file: '/Soundbites/gunshot1.mp3', category: 'Fresh & Fit' },
  { id: 'slap', name: 'Slap Sound', file: '/Soundbites/slap-sound-effect.mp3', category: 'Fresh & Fit' },

  // 2. Top G / Andrew Tate
  { id: 'andrew-tate-theme', name: 'Top G Theme Song', file: '/Soundbites/andrew-tate-theme-song.mp3', category: 'Top G' },
  { id: 'tate-bugatti', name: 'What Color Bugatti?', file: '/Soundbites/what-color-is-your-bugatti-tate.mp3', category: 'Top G' },
  { id: 'tate-air', name: 'Breathe Air', file: '/Soundbites/breathe-air-andrew-tate.mp3', category: 'Top G' },
  { id: 'tate-haram', name: 'Andrew Tate: Haram', file: '/Soundbites/haram-andrew-tate.mp3', category: 'Top G' },

  // 3. Reactions & Memes
  { id: 'emotional-damage', name: 'Emotional Damage', file: '/Soundbites/emotional-damage-meme.mp3', category: 'Reactions' },
  { id: 'fahhh', name: 'FAHHH', file: '/Soundbites/fahhh.mp3', category: 'Reactions' },
  { id: 'airhorn', name: 'Airhorn Blast', file: '/Soundbites/airhorn-sound.mp3', category: 'Reactions' },
  { id: 'undertaker-bell', name: 'Undertaker Bell', file: '/Soundbites/the-undertaker-bell-toll.mp3', category: 'Reactions' },
  { id: 'rizz', name: 'Rizz Sound Effect', file: '/Soundbites/rizz-sound-effect.mp3', category: 'Reactions' },
  { id: 'stoopid', name: 'Stoopid', file: '/Soundbites/stoopid_rZk013J.mp3', category: 'Reactions' },
  { id: 'bruh', name: 'Bruh Sound #2', file: '/Soundbites/bruh-sound-effect_WaeWi7S.mp3', category: 'Reactions' },
  { id: 'tuco-get-out', name: 'Tuco: Get Out!', file: '/Soundbites/tuco-get-out_eF2qK47.mp3', category: 'Reactions' },
  { id: 'cry-sob', name: 'Crying Sob', file: '/Soundbites/cry-sob.mp3', category: 'Reactions' },
  { id: 'dun-dun-dun', name: 'Dun Dun Dun!', file: '/Soundbites/dun-dun-dun-sound-effect.mp3', category: 'Reactions' },
  { id: 'drumroll', name: 'Dramatic Drumroll', file: '/Soundbites/drumroll.mp3', category: 'Reactions' },
  { id: 'crickets', name: 'Awkward Crickets', file: '/Soundbites/crickets-sound-effect_0G207N2.mp3', category: 'Reactions' },
  { id: 'crowd-cheer', name: 'Crowd Cheering', file: '/Soundbites/crowd-cheering.mp3', category: 'Reactions' },
  { id: 'boing', name: 'Cartoon Boing', file: '/Soundbites/cartoon-boing-sound-effect.mp3', category: 'Reactions' },

  // 4. Fails & Losses
  { id: 'spongebob-fail', name: 'Spongebob Fail', file: '/Soundbites/spongebob-fail.mp3', category: 'Fails' },
  { id: 'losing-horn', name: 'Price is Right Fail', file: '/Soundbites/the-price-is-right-losing-horn.mp3', category: 'Fails' },
  { id: 'wasted', name: 'GTA V Wasted', file: '/Soundbites/gta-v-wasted-sound-effect.mp3', category: 'Fails' },
  { id: 'sad-trombone', name: 'Sad Trombone', file: '/Soundbites/sad-trombone.mp3', category: 'Fails' },
  { id: 'coffin-dance', name: 'Coffin Dance', file: '/Soundbites/coffin-dance-meme.mp3', category: 'Fails' },
  { id: 'rewind', name: 'Record Scratch', file: '/Soundbites/record-scratch-sound-effect.mp3', category: 'Fails' },
  { id: 'oof', name: 'Roblox OOF', file: '/Soundbites/roblox-death-sound-effect_oQecL5G.mp3', category: 'Fails' },

  // 5. Gaming & Anime
  { id: 'falconpunch', name: 'Falcon Punch', file: '/Soundbites/falconpunch.mp3', category: 'Gaming & Anime' },
  { id: 'over-9000', name: "It's Over 9000!", file: '/Soundbites/its-over-9000_1.mp3', category: 'Gaming & Anime' },
  { id: 'ultra-instinct', name: 'Ultra Instinct', file: '/Soundbites/ultra-instinct-theme.mp3', category: 'Gaming & Anime' },
  { id: 'mario-coin', name: 'Super Mario Coin', file: '/Soundbites/super-mario-coin-sound.mp3', category: 'Gaming & Anime' },
  { id: 'mario-jump', name: 'Mario Jump', file: '/Soundbites/mario-jump-sound-effect.mp3', category: 'Gaming & Anime' },
  { id: 'harp', name: 'Dreaming Harp', file: '/Soundbites/dreaming-harp-sound-effect.mp3', category: 'Gaming & Anime' },
  { id: 'ding', name: 'Ding Chime', file: '/Soundbites/ding-sound-effect_2.mp3', category: 'Gaming & Anime' },
  { id: 'notification', name: 'Notification Bell', file: '/Soundbites/notification_o14egLP.mp3', category: 'Gaming & Anime' },
];

export const KEY_LABELS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

interface SoundVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeBank: 1 | 2;
  setActiveBank: (bank: 1 | 2) => void;
  playingSoundName: string | null;
  onPlaySound: (sound: SoundBite) => void;
  onStopSound: () => void;
}

export default function SoundVaultModal({
  isOpen,
  onClose,
  activeBank,
  setActiveBank,
  playingSoundName,
  onPlaySound,
  onStopSound,
}: SoundVaultModalProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('ALL');

  // Listen for Escape key to close modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentBankSounds = activeBank === 1 ? BANK_1_SOUNDS : BANK_2_SOUNDS;

  const filteredSounds = ALL_VAULT_SOUNDS.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'ALL' || s.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-[#0e0726] border border-[#FF007F]/40 rounded-2xl max-w-4xl w-full p-5 sm:p-6 shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex flex-col max-h-[88vh] space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#FF007F]/20 pb-3">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-[#FFE600]" />
            <div>
              <h3 className="font-display text-xl sm:text-2xl text-white uppercase tracking-wide leading-none">
                CHRIS & BIG MO SOUND VAULT
              </h3>
              <p className="text-xs font-mono text-[#00F5FF] pt-0.5 font-medium">
                45+ Soundbites • Press <span className="text-[#FFE600] font-bold">[ESC]</span> or click outside to close
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#180e38] text-[#B3A0D2] hover:text-white hover:bg-[#25154d] transition-colors cursor-pointer"
            title="Close [ESC]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bank Presets Section (10 Active Hotkeys Display) */}
        <div className="bg-[#140b2e] p-3.5 rounded-xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-white font-semibold">
              <Zap className="w-3.5 h-3.5 text-[#FFE600]" />
              <span>KEYBOARD SAMPLER [KEYS 1 TO 0]:</span>
            </div>
            {/* Bank 1 vs Bank 2 Switcher */}
            <div className="flex items-center bg-[#0a051b] p-0.5 rounded-lg border border-white/10 text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveBank(1)}
                className={`px-2.5 py-1 rounded font-semibold transition-all cursor-pointer ${
                  activeBank === 1
                    ? 'bg-[#FF007F] text-white shadow-sm'
                    : 'text-[#B3A0D2] hover:text-white'
                }`}
              >
                BANK 1 (Main Hits)
              </button>
              <button
                type="button"
                onClick={() => setActiveBank(2)}
                className={`px-2.5 py-1 rounded font-semibold transition-all cursor-pointer ${
                  activeBank === 2
                    ? 'bg-[#00F5FF] text-black shadow-sm'
                    : 'text-[#B3A0D2] hover:text-white'
                }`}
              >
                BANK 2 (Memes & Roasts)
              </button>
            </div>
          </div>

          {/* 10 Quick Hotkey Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 pt-1">
            {currentBankSounds.map((sound, idx) => {
              const isPlaying = playingSoundName === sound.name;
              return (
                <button
                  key={sound.id}
                  type="button"
                  onClick={() => (isPlaying ? onStopSound() : onPlaySound(sound))}
                  className={`p-2 rounded-lg border text-left flex items-center justify-between transition-all cursor-pointer ${
                    isPlaying
                      ? 'bg-[#FF007F] text-white border-[#FF007F] shadow-[0_0_10px_#FF007F]'
                      : 'bg-[#180e38] hover:bg-[#25154d] text-[#E0E0E0] border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="font-mono text-xs font-bold text-[#FFE600] shrink-0">
                      [{KEY_LABELS[idx]}]
                    </span>
                    <span className="text-xs font-sans font-medium truncate">
                      {sound.name}
                    </span>
                  </div>
                  {isPlaying ? (
                    <Square className="w-3 h-3 fill-current text-white shrink-0" />
                  ) : (
                    <Play className="w-3 h-3 text-[#00F5FF] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search 45+ soundbites..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#140b2e] border border-white/15 text-white placeholder-gray-400 text-xs font-sans focus:outline-none focus:border-[#FF007F]"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 justify-end w-full sm:w-auto text-xs font-sans">
            {['ALL', 'Fresh & Fit', 'Top G', 'Reactions', 'Fails', 'Gaming & Anime'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  category === cat
                    ? 'bg-[#FF007F] text-white font-semibold'
                    : 'bg-[#140b2e] text-[#B3A0D2] hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Soundboard Grid */}
        <div className="overflow-y-auto pr-1 flex-1 max-h-[42vh] custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {filteredSounds.map((sound) => {
              const isPlaying = playingSoundName === sound.name;
              return (
                <button
                  key={sound.id}
                  type="button"
                  onClick={() => (isPlaying ? onStopSound() : onPlaySound(sound))}
                  className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    isPlaying
                      ? 'bg-[#FF007F] text-white border-[#FF007F] shadow-[0_0_12px_rgba(255,0,127,0.6)]'
                      : 'bg-[#140b2e] hover:bg-[#1f1042] text-[#E0E0E0] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex flex-col truncate pr-2">
                    <span className="font-sans font-medium text-xs text-white truncate">
                      {sound.name}
                    </span>
                    <span className="text-[10px] font-mono text-[#00F5FF]">
                      {sound.category}
                    </span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-black/40 shrink-0">
                    {isPlaying ? (
                      <Square className="w-3.5 h-3.5 fill-current text-white" />
                    ) : (
                      <Play className="w-3.5 h-3.5 text-[#FFE600]" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
