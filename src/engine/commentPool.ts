import { DelusionTier } from '../types';

const comments: Record<DelusionTier, string[]> = {
  [DelusionTier.GROUNDED]: [
    "You actually live in reality. Rare find.",
    "Very reasonable. You might actually find someone.",
    "The numbers don't lie, and they're in your favor.",
    "No delusions here. Proceed.",
    "You understand statistics. Congratulations.",
    "A grounded Queen! Be serious though, don't settle too much.",
    "Sensible filters. Good luck out there.",
    "You know what you bring to the table and what to ask for.",
    "Finally, someone who understands math.",
    "You pass the reality check."
  ],
  [DelusionTier.REASONABLE]: [
    "A bit selective, but not impossible.",
    "You've got standards, but they make sense.",
    "Make it make sense! And you did.",
    "You're fishing in a decent sized pond.",
    "Comforting lies vs harsh truths? You chose truths.",
    "You can find this guy on Hinge if you swipe long enough.",
    "Not bad, but you better be a catch yourself.",
    "These are normal standards for a modern woman.",
    "You want a good guy, and they are out there.",
    "Fair enough. The odds are decent."
  ],
  [DelusionTier.SELECTIVE]: [
    "You're getting picky now.",
    "What do you bring to the table for this guy?",
    "Exit stage left if you don't have the looks to match.",
    "You better be hitting the gym for these stats.",
    "This guy has options. Do you?",
    "A CEO with a six-pack isn't looking for average.",
    "You're competing with Instagram models for this one.",
    "The math is getting tight. Be careful.",
    "You need to be a 9 or 10 to demand this.",
    "Hope you have a great personality to back this up."
  ],
  [DelusionTier.PICKY]: [
    "You are Frank Castled from reality.",
    "Start looking at cat breeds.",
    "Hope you like Maine Coons.",
    "This guy is dating 22-year-olds.",
    "You're asking for the top 1%. Are you the top 1%?",
    "Delusion is starting to set in.",
    "You better have no baggage for this guy.",
    "Why would he choose you? Make it make sense!",
    "The numbers don't lie, and they say you're single.",
    "You're pricing yourself out of the market."
  ],
  [DelusionTier.UNICORN_HUNTER]: [
    "Unicorn hunting season is closed.",
    "You are statistically looking for a ghost.",
    "Buy a dog. And a cat. And maybe a parrot.",
    "This man does not exist in your zip code.",
    "You're delusional! Be serious!",
    "He's on a yacht in Miami, not on Tinder in Ohio.",
    "You've priced yourself out of existence.",
    "The harsh truth is you will be single forever with these standards.",
    "You want a guy who only exists in romance novels.",
    "Stop watching Disney movies. Welcome to reality."
  ],
  [DelusionTier.DELUSIONAL]: [
    "🤡🤡🤡 You are completely delusional.",
    "Frank Castled! Exit stage left immediately.",
    "🐈🐈🐈 Start hoarding cat food now.",
    "You have a better chance of winning the lottery.",
    "This man is a statistical anomaly who is already married.",
    "You are the reason this calculator exists.",
    "Make it make sense! You want 0.0001% of men?",
    "You bring nothing to the table for a man of this caliber.",
    "The numbers don't lie: you are completely out of your mind.",
    "Enjoy your 15 cats and box wine. 🍷🐈"
  ]
};

export function getDefaultComment(tier: DelusionTier): string {
  const pool = comments[tier] || comments[DelusionTier.DELUSIONAL];
  return pool[0];
}

export function getRandomComment(tier: DelusionTier): string {
  const pool = comments[tier] || comments[DelusionTier.DELUSIONAL];
  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}
