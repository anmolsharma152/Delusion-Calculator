export type ShortcutEntry = {
  keys: string[];
  label: string;
};

export type ShortcutGroup = {
  title: string;
  entries: ShortcutEntry[];
};

// Single source of truth for every keyboard shortcut.
// Consumed by the ShortcutsCheatsheet overlay (and kept in sync with the
// keydown handler in src/app/page.tsx).
export const SHORTCUT_GROUPS: ShortcutGroup[] = [
  {
    title: 'Navigation',
    entries: [{ keys: ['Enter'], label: 'Next stage / Calculate' }],
  },
  {
    title: 'Stream Mode',
    entries: [{ keys: ['S', 'Space'], label: 'Toggle stream mode' }],
  },
  {
    title: 'Sound Bank',
    entries: [{ keys: ['Tab', '`', 'Q'], label: 'Switch sound bank 1 / 2' }],
  },
  {
    title: 'Sound Effects',
    entries: [{ keys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'], label: 'Trigger soundbite (active bank)' }],
  },
  {
    title: 'Sound Vault',
    entries: [{ keys: ['M'], label: 'Open / close sound vault' }],
  },
  {
    title: 'Fullscreen',
    entries: [{ keys: ['F'], label: 'Toggle fullscreen' }],
  },
  {
    title: 'Theme',
    entries: [{ keys: ['T'], label: 'Toggle Vaporwave / Obsidian' }],
  },
  {
    title: 'Popups',
    entries: [{ keys: ['Esc'], label: 'Close sound vault / share card' }],
  },
];
