import { Skin } from '../types';

// Define our actual memes with their names and rarities
const MEME_COLLECTION = [
  {
    id: 'disaster-girl',
    name: 'Disaster Girl | Chaos Edition',
    image: '/memes/disastergirl.jpg',
    defaultRarity: 'Epic'
  },
  {
    id: 'distracted',
    name: 'Distracted Boyfriend | Love Triangle',
    image: '/memes/distractedgirlfriend.png',
    defaultRarity: 'Rare'
  },
  {
    id: 'doge',
    name: 'Doge | Much Wow',
    image: '/memes/doge.png',
    defaultRarity: 'Legendary'
  },
  {
    id: 'forever-alone',
    name: 'Forever Alone | Solitude',
    image: '/memes/foreveralone.png',
    defaultRarity: 'Uncommon'
  },
  {
    id: 'rickroll',
    name: 'Rick Astley | Never Gonna',
    image: '/memes/rickroll.png',
    defaultRarity: 'Epic'
  },
  {
    id: 'rollsafe',
    name: 'Roll Safe | Big Brain',
    image: '/memes/rollsafe.jpg',
    defaultRarity: 'Rare'
  },
  {
    id: 'shrek',
    name: 'Shrek | Smirking',
    image: '/memes/shreksmirk.jpg',
    defaultRarity: 'Legendary'
  },
  {
    id: 'trollface',
    name: 'Troll Face | Problem?',
    image: '/memes/trollface.jpg',
    defaultRarity: 'Common'
  }
];

type MemeWear = 'RTX ON' | 'Full HD' | 'Standard' | 'Pixelated' | 'Minecraft';
type MemeRarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';

export async function fetchRandomMemes(count: number = 10): Promise<Skin[]> {
  const memes: Skin[] = [];
  
  for (let i = 0; i < count; i++) {
    const meme = MEME_COLLECTION[Math.floor(Math.random() * MEME_COLLECTION.length)];
    const wear = getRandomMemeWear();
    const rarity = getRandomMemeRarity(meme.defaultRarity as MemeRarity);
    const keys = getRandomKeys(rarity);
    
    memes.push({
      id: `${meme.id}-${Date.now()}-${i}`,
      name: meme.name,
      type: 'Meme',
      wear,
      rarity,
      keys,
      imageUrl: meme.image
    });
  }
  
  return memes;
}

function getRandomMemeWear(): MemeWear {
  const wears: MemeWear[] = ['RTX ON', 'Full HD', 'Standard', 'Pixelated', 'Minecraft'];
  return wears[Math.floor(Math.random() * wears.length)];
}

function getRandomMemeRarity(defaultRarity: MemeRarity): MemeRarity {
  // 60% chance to get default rarity, 40% chance to get random
  if (Math.random() < 0.6) {
    return defaultRarity;
  }
  
  const rarities: MemeRarity[] = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
  return rarities[Math.floor(Math.random() * rarities.length)];
}

function getRandomKeys(rarity: MemeRarity): number {
  const baseKeys = {
    Common: 1,
    Uncommon: 2,
    Rare: 5,
    Epic: 10,
    Legendary: 25
  }[rarity];
  
  // Add some random variation (±20%)
  const variation = (Math.random() - 0.5) * 0.4;
  return Math.max(1, Math.round(baseKeys * (1 + variation)));
}
