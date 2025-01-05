import { Skin } from '../types';

// Define our actual memes with their names and rarities
const MEME_COLLECTION = [
  {
    id: 'disaster-girl',
    name: 'Disaster Girl | Chaos Edition',
    image: '/src/memes/disastergirl.jpg',
    defaultRarity: 'Epic'
  },
  {
    id: 'distracted',
    name: 'Distracted Boyfriend | Love Triangle',
    image: '/src/memes/distractedgirlfriend.png',
    defaultRarity: 'Rare'
  },
  {
    id: 'doge',
    name: 'Doge | Much Wow',
    image: '/src/memes/doge.png',
    defaultRarity: 'Legendary'
  },
  {
    id: 'forever-alone',
    name: 'Forever Alone | Solitude',
    image: '/src/memes/foreveralone.png',
    defaultRarity: 'Uncommon'
  },
  {
    id: 'rickroll',
    name: 'Rick Astley | Never Gonna',
    image: '/src/memes/rickroll.png',
    defaultRarity: 'Epic'
  },
  {
    id: 'rollsafe',
    name: 'Roll Safe | Big Brain',
    image: '/src/memes/rollsafe.jpg',
    defaultRarity: 'Rare'
  },
  {
    id: 'shrek',
    name: 'Shrek | Smirking',
    image: '/src/memes/shreksmirk.jpg',
    defaultRarity: 'Legendary'
  },
  {
    id: 'trollface',
    name: 'Troll Face | Problem?',
    image: '/src/memes/trollface.jpg',
    defaultRarity: 'Common'
  }
];

// Resolution-based wear system
export const MEME_WEAR = {
  'RTX ON': { weight: 5, color: 'text-purple-500', multiplier: 2.0 },
  'Full HD': { weight: 15, color: 'text-blue-500', multiplier: 1.5 },
  'Standard': { weight: 30, color: 'text-green-500', multiplier: 1.0 },
  'Pixelated': { weight: 30, color: 'text-yellow-500', multiplier: 0.7 },
  'Minecraft': { weight: 20, color: 'text-red-500', multiplier: 0.5 }
} as const;

export const MEME_RARITIES = {
  'Legendary': { weight: 5, color: 'text-yellow-500', basePrice: 500 },
  'Epic': { weight: 10, color: 'text-purple-500', basePrice: 100 },
  'Rare': { weight: 15, color: 'text-pink-500', basePrice: 50 },
  'Uncommon': { weight: 30, color: 'text-blue-500', basePrice: 10 },
  'Common': { weight: 40, color: 'text-gray-400', basePrice: 1 }
} as const;

type MemeWear = keyof typeof MEME_WEAR;
type MemeRarity = keyof typeof MEME_RARITIES;

export async function fetchRandomMemes(count: number = 10): Promise<Skin[]> {
  // Create multiple copies of our memes to fill the spinning animation
  const memes = Array(count).fill(null).map(() => {
    const meme = MEME_COLLECTION[Math.floor(Math.random() * MEME_COLLECTION.length)];
    const wear = getRandomMemeWear();
    const rarity = getRandomMemeRarity(meme.defaultRarity);
    const basePrice = MEME_RARITIES[rarity].basePrice;
    const wearMultiplier = MEME_WEAR[wear].multiplier;
    
    return {
      id: `${meme.id}-${Date.now()}-${Math.random()}`,
      name: meme.name,
      type: 'Meme',
      rarity: rarity,
      wear: wear,
      price: getRandomPrice(basePrice * wearMultiplier),
      imageUrl: meme.image
    };
  });

  // Ensure at least one high-rarity item appears
  const highRarityMeme = MEME_COLLECTION[Math.floor(Math.random() * MEME_COLLECTION.length)];
  memes[Math.floor(count / 2)] = {
    id: `${highRarityMeme.id}-${Date.now()}-special`,
    name: highRarityMeme.name,
    type: 'Meme',
    rarity: 'Legendary',
    wear: 'RTX ON',
    price: getRandomPrice(MEME_RARITIES.Legendary.basePrice * MEME_WEAR['RTX ON'].multiplier),
    imageUrl: highRarityMeme.image
  };

  return memes;
}

function getRandomMemeWear(): MemeWear {
  const wears = Object.entries(MEME_WEAR);
  const totalWeight = wears.reduce((sum, [_, data]) => sum + data.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const [wear, data] of wears) {
    if (random < data.weight) return wear as MemeWear;
    random -= data.weight;
  }
  
  return 'Standard' as MemeWear;
}

function getRandomMemeRarity(defaultRarity: MemeRarity): MemeRarity {
  // 20% chance to upgrade rarity, 20% chance to downgrade, 60% chance to keep default
  const roll = Math.random();
  const rarityLevels: MemeRarity[] = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
  const currentIndex = rarityLevels.indexOf(defaultRarity);
  
  if (roll < 0.2 && currentIndex < rarityLevels.length - 1) {
    return rarityLevels[currentIndex + 1];
  } else if (roll < 0.4 && currentIndex > 0) {
    return rarityLevels[currentIndex - 1];
  }
  
  return defaultRarity;
}

function getRandomPrice(basePrice: number): number {
  // Add some random variation (±20%)
  return +(basePrice * (0.8 + Math.random() * 0.4)).toFixed(2);
}
