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
  { id: 'don-demarco', name: 'Don Demarco', file: '/Soundbites/dj-don-demarco.mp3', category: 'Fresh & Fit' },
  { id: 'for-the-streets', name: 'For The Streets', file: '/Soundbites/she-belongs-to-the-streets-future-meme.mp3', category: 'Fresh & Fit' },
  { id: 'stop-the-cap', name: 'Stop The Cap', file: '/Soundbites/stop-the-cap-cut.mp3', category: 'Fresh & Fit' },
  { id: 'andrew-tate-theme', name: 'Top G Theme Song', file: '/Soundbites/andrew-tate-theme-song.mp3', category: 'Top G' },
  { id: 'emotional-damage', name: 'Emotional Damage', file: '/Soundbites/emotional-damage-meme.mp3', category: 'Reactions' },
  { id: 'gunshot1', name: 'Gunshot Drop', file: '/Soundbites/gunshot1.mp3', category: 'Fresh & Fit' },
  { id: 'falconpunch', name: 'Falcon Punch', file: '/Soundbites/falconpunch.mp3', category: 'Gaming & Anime' },
  { id: 'spongebob-fail', name: 'Spongebob Fail', file: '/Soundbites/spongebob-fail.mp3', category: 'Fails' },
  { id: 'fahhh', name: 'FAHHH', file: '/Soundbites/fahhh.mp3', category: 'Reactions' },
  { id: 'undertaker-bell', name: 'Undertaker Bell', file: '/Soundbites/undertakers-bell.mp3', category: 'Reactions' },
];

export const BANK_2_SOUNDS: SoundBite[] = [
  { id: 'youre-broke', name: "You're Broke", file: '/Soundbites/youre-broke.mp3', category: 'Fresh & Fit' },
  { id: 'button-it', name: 'Button It', file: '/Soundbites/button-it.mp3', category: 'Fresh & Fit' },
  { id: 'tate-air', name: 'Breathe Air', file: '/Soundbites/andrew-tate-breath-air.mp3', category: 'Top G' },
  { id: 'rizz', name: 'Rizz Sound Effect', file: '/Soundbites/rizz-sound-effect.mp3', category: 'Reactions' },
  { id: 'losing-horn', name: 'Price is Right Fail', file: '/Soundbites/losing-horn.mp3', category: 'Fails' },
  { id: 'stoopid', name: 'Stoopid', file: '/Soundbites/stoopid.mp3', category: 'Reactions' },
  { id: 'bruh', name: 'Bruh Sound', file: '/Soundbites/bruh.mp3', category: 'Reactions' },
  { id: 'tuco-get-out', name: 'Tuco: Get Out!', file: '/Soundbites/tuco-get-out.mp3', category: 'Reactions' },
  { id: 'rewind', name: 'Record Rewind', file: '/Soundbites/rewind.mp3', category: 'Fails' },
  { id: 'over-9000', name: "It's Over 9000!", file: '/Soundbites/over-9000.mp3', category: 'Gaming & Anime' },
];

export const ALL_VAULT_SOUNDS: SoundBite[] = [
  // 1. Fresh & Fit Core
  { id: 'don-demarco', name: 'Don Demarco', file: '/Soundbites/dj-don-demarco.mp3', category: 'Fresh & Fit' },
  { id: 'for-the-streets', name: 'For The Streets', file: '/Soundbites/she-belongs-to-the-streets-future-meme.mp3', category: 'Fresh & Fit' },
  { id: 'stop-the-cap', name: 'Stop The Cap', file: '/Soundbites/stop-the-cap-cut.mp3', category: 'Fresh & Fit' },
  { id: 'youre-broke', name: "You're Broke", file: '/Soundbites/youre-broke.mp3', category: 'Fresh & Fit' },
  { id: 'button-it', name: 'Button It', file: '/Soundbites/button-it.mp3', category: 'Fresh & Fit' },
  { id: 'gunshot1', name: 'Gunshot Drop', file: '/Soundbites/gunshot1.mp3', category: 'Fresh & Fit' },
  { id: 'tindeck_1', name: 'Tindeck Sound', file: '/Soundbites/tindeck_1.mp3', category: 'Fresh & Fit' },

  // 2. Top G / Andrew Tate
  { id: 'andrew-tate-theme', name: 'Top G Theme Song', file: '/Soundbites/andrew-tate-theme-song.mp3', category: 'Top G' },
  { id: 'tate-top-g', name: 'Top G Song', file: '/Soundbites/andrew-tate-top-g-song.mp3', category: 'Top G' },
  { id: 'tate-theme-2', name: 'Andrew Theme', file: '/Soundbites/andrew-theme.mp3', category: 'Top G' },
  { id: 'tate-air', name: 'Breathe Air', file: '/Soundbites/andrew-tate-breath-air.mp3', category: 'Top G' },
  { id: 'tate-haram', name: 'Andrew Tate: Haram', file: '/Soundbites/haram-andrew-tate.mp3', category: 'Top G' },
  { id: 'tate-super-gay', name: 'Tate: Super Gay', file: '/Soundbites/its-super-gay-andrew-tate.mp3', category: 'Top G' },

  // 3. Reactions & Memes
  { id: 'emotional-damage', name: 'Emotional Damage', file: '/Soundbites/emotional-damage-meme.mp3', category: 'Reactions' },
  { id: 'fahhh', name: 'FAHHH', file: '/Soundbites/fahhh.mp3', category: 'Reactions' },
  { id: 'rizz', name: 'Rizz Sound Effect', file: '/Soundbites/rizz-sound-effect.mp3', category: 'Reactions' },
  { id: 'undertaker-bell', name: 'Undertaker Bell', file: '/Soundbites/undertakers-bell.mp3', category: 'Reactions' },
  { id: 'stoopid', name: 'Stoopid', file: '/Soundbites/stoopid.mp3', category: 'Reactions' },
  { id: 'u-stoopid', name: 'U Stoopid', file: '/Soundbites/u-stoopid.mp3', category: 'Reactions' },
  { id: 'bruh', name: 'Bruh Sound', file: '/Soundbites/bruh.mp3', category: 'Reactions' },
  { id: 'tuco-get-out', name: 'Tuco: Get Out!', file: '/Soundbites/tuco-get-out.mp3', category: 'Reactions' },
  { id: 'cry-sob', name: 'Crying Sob', file: '/Soundbites/cry-sob.mp3', category: 'Reactions' },
  { id: 'bahahahha', name: 'Evil Laugh', file: '/Soundbites/bahahahha.mp3', category: 'Reactions' },
  { id: 'awkward-cricket', name: 'Awkward Crickets', file: '/Soundbites/awkward-cricket.mp3', category: 'Reactions' },
  { id: 'yoooo-japanese', name: 'Yoooo Japanese', file: '/Soundbites/yoooo-japanese.mp3', category: 'Reactions' },
  { id: 'yoooooooo', name: 'YOOOO Long', file: '/Soundbites/yoooooooo.mp3', category: 'Reactions' },
  { id: 'phone-ringing', name: 'Phone Ringing', file: '/Soundbites/youre-phone-is-ringing.mp3', category: 'Reactions' },
  { id: 'have-you-ever-had-a-dream', name: 'Had A Dream Kid', file: '/Soundbites/have-you-ever-had-a-dream.mp3', category: 'Reactions' },
  { id: 'romance', name: 'Careless Romance', file: '/Soundbites/romanceeeeeeeeeeeeee.mp3', category: 'Reactions' },
  { id: 'shocked', name: 'Shocked Sound', file: '/Soundbites/shocked-sound-effect.mp3', category: 'Reactions' },
  { id: 'anime-ahh', name: 'Anime Ahh', file: '/Soundbites/anime-ahh.mp3', category: 'Reactions' },
  { id: 'anime-wow', name: 'Anime Wow', file: '/Soundbites/anime-wow-sound-effect.mp3', category: 'Reactions' },

  // 4. Fails & Losses
  { id: 'spongebob-fail', name: 'Spongebob Fail', file: '/Soundbites/spongebob-fail.mp3', category: 'Fails' },
  { id: 'losing-horn', name: 'Price is Right Fail', file: '/Soundbites/losing-horn.mp3', category: 'Fails' },
  { id: 'rewind', name: 'Record Rewind', file: '/Soundbites/rewind.mp3', category: 'Fails' },
  { id: 'record-rewind', name: 'Classic Rewind', file: '/Soundbites/record-rewind.mp3', category: 'Fails' },

  // 5. Gaming & Anime
  { id: 'falconpunch', name: 'Falcon Punch', file: '/Soundbites/falconpunch.mp3', category: 'Gaming & Anime' },
  { id: 'over-9000', name: "It's Over 9000!", file: '/Soundbites/over-9000.mp3', category: 'Gaming & Anime' },
  { id: 'pokemon-battle', name: 'Pokemon Battle', file: '/Soundbites/pokemon-battle.mp3', category: 'Gaming & Anime' },
  { id: 'whos-that-pokemon', name: "Who's That Pokemon?", file: '/Soundbites/whos-that-pokemon.mp3', category: 'Gaming & Anime' },
  { id: 'punch-gaming', name: 'Punch Gaming HD', file: '/Soundbites/punch-gaming.mp3', category: 'Gaming & Anime' },
  { id: 'harp', name: 'Dreaming Harp', file: '/Soundbites/dreaming-harp-sound-effect.mp3', category: 'Gaming & Anime' },
  { id: 'ding', name: 'Ding Chime', file: '/Soundbites/ding.mp3', category: 'Gaming & Anime' },
  { id: 'notification', name: 'Notification Bell', file: '/Soundbites/notification.mp3', category: 'Gaming & Anime' },
  { id: 'trapcard', name: 'Trap Card Activated', file: '/Soundbites/trapcard.mp3', category: 'Gaming & Anime' },
  { id: 'among-us', name: 'Among Us Reveal', file: '/Soundbites/among-us-role-reveal-sound.mp3', category: 'Gaming & Anime' }
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
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = ['ALL', 'Fresh & Fit', 'Top G', 'Reactions', 'Fails', 'Gaming & Anime'];

  const filteredSounds = ALL_VAULT_SOUNDS.filter((sound) => {
    const matchesSearch = sound.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'ALL' || sound.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl bg-[#140b2e] border-2 border-[#FF007F] shadow-[0_0_50px_rgba(255,0,127,0.4)] rounded-2xl flex flex-col max-h-[85vh] overflow-hidden text-gray-100"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#FF007F]/40 flex items-center justify-between bg-[#0e0726]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF007F]/20 border border-[#FF007F] flex items-center justify-center text-[#FF007F]">
              <Music className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-2xl sm:text-3xl text-white tracking-wider uppercase">
                  SOUND VAULT
                </h2>
                <span className="bg-[#FF007F]/30 text-[#FF007F] text-xs font-mono font-bold px-2 py-0.5 rounded-full border border-[#FF007F]/50">
                  {ALL_VAULT_SOUNDS.length} FX
                </span>
              </div>
              <p className="text-xs text-gray-400 font-mono">
                Fresh & Fit Official Stream Soundboard (ESC to close)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white flex items-center justify-center border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Stream Deck Hotkey Bar (Bank 1 & 2) */}
        <div className="p-4 bg-[#0a051d] border-b border-white/10 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-gray-300">
              <Zap className="w-4 h-4 text-[#FFE600]" />
              <span>LIVE STREAM DECK HOTKEYS (KEYS 1 - 0)</span>
            </div>

            {/* Bank Toggle */}
            <div className="flex items-center gap-1 bg-[#180e38] p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setActiveBank(1)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  activeBank === 1
                    ? 'bg-[#FF007F] text-white shadow-[0_0_10px_#FF007F]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                BANK 1 (1-10)
              </button>
              <button
                onClick={() => setActiveBank(2)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  activeBank === 2
                    ? 'bg-[#00F5FF] text-black shadow-[0_0_10px_#00F5FF]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                BANK 2 (11-20)
              </button>
            </div>
          </div>

          {/* 10 Quick Hotkey Buttons */}
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
            {(activeBank === 1 ? BANK_1_SOUNDS : BANK_2_SOUNDS).map((sound, idx) => {
              const keyLabel = KEY_LABELS[idx];
              const isPlaying = playingSoundName === sound.name;

              return (
                <button
                  key={sound.id}
                  onClick={() => (isPlaying ? onStopSound() : onPlaySound(sound))}
                  className={`p-2 rounded-xl flex flex-col items-center justify-center gap-1 transition-all border text-center ${
                    isPlaying
                      ? 'bg-[#FF007F] text-white border-white animate-pulse shadow-[0_0_12px_#FF007F]'
                      : 'bg-[#180e38] hover:bg-[#25154d] text-gray-200 border-white/10 hover:border-white/30'
                  }`}
                  title={`${sound.name} (Key ${keyLabel})`}
                >
                  <span
                    className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono font-bold ${
                      isPlaying
                        ? 'bg-white text-[#FF007F]'
                        : 'bg-white/10 text-[#00F5FF]'
                    }`}
                  >
                    {keyLabel}
                  </span>
                  <span className="text-[11px] font-sans font-medium truncate w-full">
                    {sound.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="p-4 bg-[#140b2e] border-b border-white/10 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search sound effects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0e0726] border border-white/15 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#00F5FF]"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-sans font-medium transition-all ${
                  category === cat
                    ? 'bg-[#00F5FF] text-black font-bold shadow-[0_0_10px_rgba(0,245,255,0.5)]'
                    : 'bg-[#0e0726] hover:bg-white/10 text-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Full Sound Vault Grid */}
        <div className="p-4 overflow-y-auto flex-1 bg-[#0c0721] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          {filteredSounds.map((sound) => {
            const isPlaying = playingSoundName === sound.name;

            return (
              <button
                key={sound.id}
                onClick={() => (isPlaying ? onStopSound() : onPlaySound(sound))}
                className={`p-3 rounded-xl border flex items-center justify-between gap-2 text-left transition-all ${
                  isPlaying
                    ? 'bg-[#FF007F]/30 border-[#FF007F] text-white shadow-[0_0_15px_rgba(255,0,127,0.4)]'
                    : 'bg-[#180e38] hover:bg-[#22134a] border-white/10 hover:border-white/30 text-gray-200'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="font-sans font-medium text-xs sm:text-sm text-white truncate">
                    {sound.name}
                  </div>
                  <div className="font-mono text-[10px] text-gray-400 uppercase">
                    {sound.category}
                  </div>
                </div>

                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    isPlaying
                      ? 'bg-[#FF007F] text-white'
                      : 'bg-white/10 text-gray-300'
                  }`}
                >
                  {isPlaying ? (
                    <Square className="w-3.5 h-3.5 fill-current" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#0a051d] border-t border-white/10 flex items-center justify-between text-xs text-gray-400 font-mono">
          <div className="flex items-center gap-2">
            <span>NOW PLAYING:</span>
            <span className={playingSoundName ? 'text-[#00F5FF] font-bold' : 'text-gray-500'}>
              {playingSoundName || 'NONE (IDLE)'}
            </span>
          </div>
          {playingSoundName && (
            <button
              onClick={onStopSound}
              className="text-[#FF007F] hover:underline font-bold"
            >
              STOP AUDIO
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
