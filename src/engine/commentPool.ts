import { DelusionTier } from '../types';

const comments: Record<DelusionTier, string[]> = {
  [DelusionTier.GROUNDED]: [
    "You actually live in reality. Rare find in Miami!",
    "Very reasonable standards. The numbers are heavily in your favor.",
    "The numbers don't lie, and you passed the reality check with flying colors.",
    "No delusions here. You understand statistics.",
    "A grounded Queen! Realistic expectations backed by official Census math.",
    "Sensible filters. You understand what you bring to the table.",
    "Finally, someone who understands basic probability.",
    "You pass the Fresh & Fit reality check with ease.",
    "Grounded and based. You're fishing in a massive dating pool.",
    "Solid expectations. Proceed with confidence!"
  ],
  [DelusionTier.REASONABLE]: [
    "A bit selective, but mathematically very doable.",
    "You've got standards, and they actually make sense.",
    "Make it make sense! And you did.",
    "You're fishing in a solid pool of eligible men.",
    "Comforting lies vs. harsh truths? You chose the harsh truths and won.",
    "You can find this guy on dating apps if you swipe with intent.",
    "Fair standards. Just make sure you bring value to match.",
    "Normal, respectable standards for a modern woman.",
    "The odds are solid. Keep your standards grounded.",
    "Realistic standards. You won't need to hoard Purina just yet."
  ],
  [DelusionTier.SELECTIVE]: [
    "You're getting picky now. What do you bring to the table?",
    "Exit stage left if you don't have the fitness and peace of mind to match.",
    "A high-earning guy with a six-pack isn't looking for average.",
    "You're competing with high-value women for this demographic.",
    "The math is tightening up. Be careful with those filters.",
    "This guy has endless options. Why would he choose you?",
    "You need to be in top shape to demand these stats.",
    "Standards are climbing fast. Make sure your attitude matches.",
    "You're narrowing your options down to the top slice of men.",
    "Hope you bring peace, loyalty, and good communication to the table."
  ],
  [DelusionTier.PICKY]: [
    "You go queen! Enjoy that 30-year mortgage with 3 Maine Coons.",
    "You are Frank Castled from reality. Be serious!",
    "Start researching premium cat litter brands right now.",
    "The numbers don't lie, and they say your standards are way too high.",
    "Why would a top 1% bachelor pick you? Make it make sense!",
    "Delusion is setting in. You're pricing yourself right out of the market.",
    "You're looking for a needle in a haystack while blindfolded.",
    "Stop the cap! You need to relax at least two of these filters.",
    "Math is undefeated, and right now you're losing 100 to 0.",
    "You want a top-tier earner while bringing vibes and credit card debt."
  ],
  [DelusionTier.UNICORN_HUNTER]: [
    "Unicorn hunting season is officially closed!",
    "You are statistically searching for a ghost.",
    "You go queen! The local animal shelter already has your adoption papers ready.",
    "This man does not exist in your zip code. Be serious!",
    "He's on a yacht in Miami with supermodels, not on Tinder in your hometown.",
    "You've priced yourself out of existence.",
    "The harsh truth: these standards guarantee perpetual singlehood.",
    "You want a man who only exists in Korean dramas and Disney movies.",
    "Don Demarco! That standard belongs to the streets!",
    "Even Fresh wouldn't cap this hard. Re-evaluate your filters immediately."
  ],
  [DelusionTier.DELUSIONAL]: [
    "🤡🤡🤡 Completely Frank Castled! Exit stage left immediately!",
    "You go queen! Purina stock just jumped 15% because of your standards.",
    "🐈🐈🐈 5 Bags of Purina Max! Full Cat Lady prophecy unlocked.",
    "You have a higher mathematical chance of getting struck by lightning twice.",
    "This man is a mythological creature who doesn't exist on planet Earth.",
    "You are the exact reason this Delusion Calculator was built!",
    "Make it make sense! You're demanding the top 0.001% while bringing attitude.",
    "The numbers don't lie: this standard is 100% pure unfiltered delusion.",
    "Enjoy your 15 rescue cats and box wine. 🍷🐈",
    "BE SERIOUS! No man on Earth meets all of these criteria."
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
