'use client';

import { useState, useEffect } from 'react';
import { Sparkles, X, Search, Play, Square, Layers, Music, Zap } from 'lucide-react';
import { GlobalAudio } from './AnticipationOverlay';

export interface SoundBite {
  id: string;
  name: string;
  file: string;
  category: 'Fresh & Fit' | 'Top G' | 'Reactions' | 'Fails' | 'Gaming & Anime';
  startTime?: number;
}

// BANK 1: Primary Stream Sampler (Curated 10 - Hotkeys [1] to [0])
export const BANK_1_SOUNDS: SoundBite[] = [
  { id: 'demarco', name: 'DON DEMARCO', file: '/Soundbites/Voicy_DJ Don Demarco .mp3', category: 'Fresh & Fit' },
  { id: 'streets', name: 'FOR THE STREETS', file: '/Soundbites/she-belongs-to-the-streets-future-meme.mp3', category: 'Fresh & Fit' },
  { id: 'cap', name: 'STOP THE CAP', file: '/Soundbites/stop-the-cap-cut.mp3', category: 'Fresh & Fit' },
  { id: 'tate_theme', name: 'TOP G THEME', file: '/Soundbites/andrew-tate-theme-song.mp3', category: 'Top G' },
  { id: 'damage', name: 'EMOTIONAL DAMAGE', file: '/Soundbites/emotional-damage-meme.mp3', category: 'Reactions' },
  { id: 'airhorn', name: 'AIRHORN BLAST', file: '/Soundbites/tindeck_1.mp3', category: 'Fresh & Fit' },
  { id: 'falcon', name: 'FALCON PUNCH', file: '/Soundbites/falconpunch.mp3', category: 'Gaming & Anime' },
  { id: 'spongebob', name: 'SPONGEBOB FAIL', file: '/Soundbites/spongebob-fail.mp3', category: 'Fails' },
  { id: 'fahhh', name: 'FAHHH', file: '/Soundbites/fahhh.mp3', category: 'Reactions' },
  { id: 'undertaker', name: 'UNDERTAKER BELL', file: '/Soundbites/undertakers-bell_2UwFCIe.mp3', category: 'Fresh & Fit' },
];

// BANK 2: Meme & Roast Sampler (Curated 10 - Hotkeys [1] to [0])
export const BANK_2_SOUNDS: SoundBite[] = [
  { id: 'broke', name: "YOU'RE BROKE", file: '/Soundbites/your-broke-andrew-tate_fQJoCVt.mp3', category: 'Top G', startTime: 0.35 },
  { id: 'buttonit', name: 'BUTTON IT', file: "/Soundbites/Voicy_And you're gettin' too fresh. So button it..mp3", category: 'Fresh & Fit' },
  { id: 'breath_air', name: 'BREATHE AIR', file: '/Soundbites/andrew-tate-breath-air.mp3', category: 'Top G' },
  { id: 'rizz', name: 'RIZZ EFFECT', file: '/Soundbites/rizz-sound-effect.mp3', category: 'Gaming & Anime' },
  { id: 'losing', name: 'LOSING HORN', file: '/Soundbites/the-price-is-right-losing-horn_2.mp3', category: 'Fails' },
  { id: 'stoopid', name: 'STOOPID', file: '/Soundbites/stoopid.mp3', category: 'Reactions' },
  { id: 'bruh', name: 'BRUH MOMENT', file: '/Soundbites/Bruh.mp3', category: 'Reactions' },
  { id: 'tuco', name: 'TUCO GET OUT', file: '/Soundbites/tuco-get-out.mp3', category: 'Reactions' },
  { id: 'rewind', name: 'RECORD REWIND', file: '/Soundbites/record-rewind.mp3', category: 'Fresh & Fit' },
  { id: 'over9000', name: 'OVER 9000', file: '/Soundbites/over-9000.mp3', category: 'Gaming & Anime' },
];

// COMPLETE GRADED SOUND VAULT (All 45+ audio files categorized)
export const ALL_VAULT_SOUNDS: SoundBite[] = [
  // 1. Fresh & Fit Essentials
  { id: 'demarco', name: 'DON DEMARCO', file: '/Soundbites/Voicy_DJ Don Demarco .mp3', category: 'Fresh & Fit' },
  { id: 'airhorn', name: 'AIRHORN BLAST', file: '/Soundbites/tindeck_1.mp3', category: 'Fresh & Fit' },
  { id: 'streets', name: 'FOR THE STREETS', file: '/Soundbites/she-belongs-to-the-streets-future-meme.mp3', category: 'Fresh & Fit' },
  { id: 'buttonit', name: 'BUTTON IT', file: "/Soundbites/Voicy_And you're gettin' too fresh. So button it..mp3", category: 'Fresh & Fit' },
  { id: 'cap', name: 'STOP THE CAP', file: '/Soundbites/stop-the-cap-cut.mp3', category: 'Fresh & Fit' },
  { id: 'cap_zias', name: 'ZIAS STOP THE CAP', file: '/Soundbites/zias-stop-the-cap_RjHQpxU.mp3', category: 'Fresh & Fit' },
  { id: 'rewind', name: 'RECORD REWIND', file: '/Soundbites/record-rewind.mp3', category: 'Fresh & Fit' },
  { id: 'rewind_alt', name: 'REWIND FX', file: '/Soundbites/Rewind.mp3', category: 'Fresh & Fit' },
  { id: 'gunshot', name: 'GUNSHOT DROP', file: '/Soundbites/gunshot1.mp3', category: 'Fresh & Fit' },
  { id: 'undertaker', name: 'UNDERTAKER GONG', file: '/Soundbites/undertakers-bell_2UwFCIe.mp3', category: 'Fresh & Fit' },

  // 2. Andrew Tate / Top G
  { id: 'tate_theme', name: 'TOP G THEME (TOURNER)', file: '/Soundbites/andrew-tate-theme-song.mp3', category: 'Top G' },
  { id: 'tate_anthem', name: 'ANDREW THEME EXTENDED', file: '/Soundbites/andrew-theme.mp3', category: 'Top G' },
  { id: 'tate_top_g', name: 'TOP G SONG', file: '/Soundbites/andrew-tate-top-g-song.mp3', category: 'Top G' },
  { id: 'broke', name: "YOU'RE BROKE", file: '/Soundbites/your-broke-andrew-tate_fQJoCVt.mp3', category: 'Top G', startTime: 0.35 },
  { id: 'breath_air', name: 'BREATHE AIR', file: '/Soundbites/andrew-tate-breath-air.mp3', category: 'Top G' },
  { id: 'haram_tate', name: 'HARAM TATE', file: '/Soundbites/haram-andrew-tate.mp3', category: 'Top G' },
  { id: 'super_gay_tate', name: "THAT'S SUPER GAY", file: '/Soundbites/its-super-gay-andrew-tate.mp3', category: 'Top G' },

  // 3. Reactions & Roasts
  { id: 'damage', name: 'EMOTIONAL DAMAGE', file: '/Soundbites/emotional-damage-meme.mp3', category: 'Reactions' },
  { id: 'stoopid', name: 'STOOPID (6IX9INE)', file: '/Soundbites/stoopid.mp3', category: 'Reactions' },
  { id: 'u_stoopid', name: 'YOU STOOPID (NO I NOT)', file: '/Soundbites/ustoopid_b1OPm4r.mp3', category: 'Reactions' },
  { id: 'tuco', name: 'TUCO GET OUT', file: '/Soundbites/tuco-get-out.mp3', category: 'Reactions' },
  { id: 'fahhh', name: 'FAHHH (FRESH)', file: '/Soundbites/fahhh.mp3', category: 'Reactions' },
  { id: 'bruh', name: 'BRUH MOMENT', file: '/Soundbites/Bruh.mp3', category: 'Reactions' },
  { id: 'bahaha', name: 'BAHAHA LAUGH', file: '/Soundbites/bahahahha.mp3', category: 'Reactions' },
  { id: 'phone_ringing', name: 'YOUR PHONE IS RINGING', file: '/Soundbites/youre-phone-is-ringing.mp3', category: 'Reactions' },
  { id: 'handsome_boy', name: 'VERY HANDSOME BOY', file: '/Soundbites/wow-kya-ladka-hai-very-handsome-boy.mp3', category: 'Reactions' },

  // 4. Fails & Reality Checks
  { id: 'spongebob', name: 'SPONGEBOB FAIL', file: '/Soundbites/spongebob-fail.mp3', category: 'Fails' },
  { id: 'losing', name: 'PRICE IS RIGHT LOSING HORN', file: '/Soundbites/the-price-is-right-losing-horn_2.mp3', category: 'Fails' },
  { id: 'crickets', name: 'AWKWARD CRICKETS', file: '/Soundbites/awkward-cricket-sound-effect_YK6dDJG.mp3', category: 'Fails' },
  { id: 'crickets_short', name: 'CRICKETS SHORT', file: '/Soundbites/crickets.swf.mp3', category: 'Fails' },
  { id: 'cry_sob', name: 'CRY & SOBBING', file: '/Soundbites/cry-sob.mp3', category: 'Fails' },
  { id: 'dream', name: 'HAVE YOU EVER HAD A DREAM', file: '/Soundbites/have-you-ever-had-a-dream_cuTVKBp.mp3', category: 'Fails' },
  { id: 'shocked', name: 'SHOCKED DRAMATIC', file: '/Soundbites/shocked-sound-effect.mp3', category: 'Fails' },

  // 5. Gaming & Anime
  { id: 'falcon', name: 'FALCON PUNCH', file: '/Soundbites/falconpunch.mp3', category: 'Gaming & Anime' },
  { id: 'over9000', name: 'OVER 9000 (DRAGON BALL)', file: '/Soundbites/over-9000.mp3', category: 'Gaming & Anime' },
  { id: 'yooo', name: 'YOOOO JAPANESE KABUKI', file: '/Soundbites/Yoooo Japanese.mp3', category: 'Gaming & Anime' },
  { id: 'yooo_long', name: 'YOOOO LONG', file: '/Soundbites/yooooooooooooooooooooooooo_4_objp8XX.mp3', category: 'Gaming & Anime' },
  { id: 'amongus', name: 'AMONG US REVEAL', file: '/Soundbites/among-us-role-reveal-sound.mp3', category: 'Gaming & Anime' },
  { id: 'pokemon_battle', name: 'POKEMON BATTLE THEME', file: '/Soundbites/pokemon-battle.mp3', category: 'Gaming & Anime' },
  { id: 'whos_pokemon', name: "WHO'S THAT POKEMON", file: '/Soundbites/whos-that-pokemon_.mp3', category: 'Gaming & Anime' },
  { id: 'trapcard', name: 'YOU ACTIVATED MY TRAP CARD', file: '/Soundbites/trapcard.mp3', category: 'Gaming & Anime' },
  { id: 'anime_wow', name: 'ANIME WOW', file: '/Soundbites/anime-wow-sound-effect.mp3', category: 'Gaming & Anime' },
  { id: 'anime_ahh', name: 'ANIME AHH', file: '/Soundbites/anime-ahh.mp3', category: 'Gaming & Anime' },
  { id: 'rizz', name: 'SYNTH RIZZ SOUND', file: '/Soundbites/rizz-sound-effect.mp3', category: 'Gaming & Anime' },
  { id: 'punch_gaming', name: 'HEAVY PUNCH HD', file: '/Soundbites/punch-gaming-sound-effect-hd_RzlG1GE.mp3', category: 'Gaming & Anime' },
  { id: 'romance', name: 'ROMANCE HARP', file: '/Soundbites/romanceeeeeeeeeeeeee.mp3', category: 'Gaming & Anime' },
  { id: 'harp', name: 'DREAMING HARP', file: '/Soundbites/dreaming-harp-sound-effect.mp3', category: 'Gaming & Anime' },
  { id: 'ding', name: 'DING CHIME', file: '/Soundbites/ding-sound-effect_2.mp3', category: 'Gaming & Anime' },
  { id: 'notification', name: 'NOTIFICATION BELL', file: '/Soundbites/notification_o14egLP.mp3', category: 'Gaming & Anime' },
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

  if (!isOpen) return null;

  const currentBankSounds = activeBank === 1 ? BANK_1_SOUNDS : BANK_2_SOUNDS;

  const filteredSounds = ALL_VAULT_SOUNDS.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'ALL' || s.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#0e0726] border-2 border-[#FF007F]/60 rounded-3xl max-w-5xl w-full p-5 sm:p-7 shadow-[0_0_65px_rgba(255,0,127,0.5)] flex flex-col max-h-[90vh] space-y-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#FF007F]/30 pb-3">
          <div className="flex items-center gap-3">
            <Sparkles className="w-7 h-7 text-[#FFE600] animate-pulse" />
            <div>
              <h3 className="font-display text-2xl sm:text-3xl text-white uppercase tracking-wider text-glow-pink leading-none">
                CHRIS & BIG MO SOUND VAULT
              </h3>
              <p className="text-[11px] font-mono text-[#00F5FF] pt-0.5 font-bold">
                45+ GRADED STREAM SOUNDBITES & KEYBOARD SAMPLER
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-[#180e38] border border-[#FF007F]/40 text-[#E0E0E0] hover:text-white hover:border-[#FF007F] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bank Presets Section (10 Active Hotkeys Display) */}
        <div className="bg-[#180e38] p-4 rounded-2xl border border-[#FF007F]/40 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-white font-bold">
              <Zap className="w-4 h-4 text-[#FFE600]" />
              <span>ACTIVE SAMPLER BANK (KEYS [1] TO [0]):</span>
            </div>
            {/* Bank 1 vs Bank 2 Switcher */}
            <div className="flex items-center bg-[#0c0721] p-1 rounded-xl border border-[#FF007F]/30 text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveBank(1)}
                className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeBank === 1
                    ? 'bg-[#FF007F] text-white shadow-[0_0_10px_#FF007F]'
                    : 'text-[#B3A0D2] hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>BANK 1: MAIN HITS</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveBank(2)}
                className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeBank === 2
                    ? 'bg-[#00F5FF] text-black shadow-[0_0_10px_#00F5FF]'
                    : 'text-[#B3A0D2] hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>BANK 2: MEMES & ROASTS</span>
              </button>
            </div>
          </div>

          {/* 10 Quick Hotkey Buttons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {currentBankSounds.map((sound, idx) => {
              const hotkey = KEY_LABELS[idx];
              const isPlaying = playingSoundName === sound.name;
              return (
                <button
                  key={sound.id}
                  type="button"
                  onClick={() => (isPlaying ? onStopSound() : onPlaySound(sound))}
                  className={`p-2 rounded-xl border text-left flex items-center justify-between gap-1.5 transition-all cursor-pointer ${
                    isPlaying
                      ? 'bg-[#FF007F] text-white border-white shadow-[0_0_15px_#FF007F] scale-[1.02]'
                      : 'bg-[#0c0721] border-[#00F5FF]/30 hover:border-[#00F5FF] text-white hover:bg-[#0c0721]/90'
                  }`}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="text-[#FFE600] font-mono font-extrabold text-xs shrink-0">
                      [{hotkey}]
                    </span>
                    <span className="font-display text-xs uppercase tracking-wider truncate">
                      {sound.name}
                    </span>
                  </div>
                  {isPlaying ? (
                    <Square className="w-3.5 h-3.5 fill-current shrink-0 animate-pulse" />
                  ) : (
                    <Play className="w-3.5 h-3.5 text-[#00F5FF] fill-current shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between pt-1">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#00F5FF]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search 45+ sound effects..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#180e38] border border-[#00F5FF]/40 text-xs font-mono text-white outline-none focus:border-[#00F5FF]"
            />
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs font-mono">
            {['ALL', 'Fresh & Fit', 'Top G', 'Reactions', 'Fails', 'Gaming & Anime'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-lg border font-bold transition-all cursor-pointer whitespace-nowrap ${
                  category === cat
                    ? 'bg-[#FF007F] text-white border-[#FF007F] shadow-[0_0_10px_#FF007F]'
                    : 'bg-[#180e38] text-[#B3A0D2] border-[#FF007F]/20 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* All Sounds Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 overflow-y-auto pr-1 py-1 flex-1 max-h-[380px]">
          {filteredSounds.map((sound) => {
            const isPlaying = playingSoundName === sound.name;
            return (
              <button
                key={sound.id}
                type="button"
                onClick={() => (isPlaying ? onStopSound() : onPlaySound(sound))}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between gap-1 transition-all cursor-pointer ${
                  isPlaying
                    ? 'bg-[#FF007F]/40 border-[#FF007F] shadow-[0_0_15px_#FF007F] scale-[1.02]'
                    : 'bg-[#180e38] border-[#00F5FF]/20 hover:border-[#00F5FF] hover:bg-[#180e38]/90'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono text-[#FFE600] font-bold uppercase tracking-wider">
                    {sound.category}
                  </span>
                  {isPlaying ? (
                    <Square className="w-3.5 h-3.5 text-[#FF007F] fill-current animate-pulse" />
                  ) : (
                    <Play className="w-3.5 h-3.5 text-[#00F5FF] fill-current" />
                  )}
                </div>
                <span className="font-display text-sm text-white uppercase tracking-wider leading-tight truncate">
                  {sound.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom Footer Info Bar */}
        <div className="border-t border-[#FF007F]/20 pt-2 flex items-center justify-between text-xs font-mono text-[#B3A0D2]">
          <span>
            💡 Hotkeys <strong className="text-[#FFE600]">[1]–[0]</strong> and <strong className="text-[#FFE600]">[Tab]</strong> work anytime during stream
          </span>
          <button
            type="button"
            onClick={onStopSound}
            className="px-3 py-1 rounded-lg bg-red-600/30 text-red-400 border border-red-500/40 hover:bg-red-600/50 font-bold cursor-pointer"
          >
            STOP ALL AUDIO
          </button>
        </div>
      </div>
    </div>
  );
}
