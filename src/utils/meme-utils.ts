import { Skin } from '../types';
import { memeImages } from '../memes';

// Define our actual memes with their names and rarities
const MEME_COLLECTION = [
  {
    id: 'disaster-girl',
    name: 'Disaster Girl | Chaos Edition',
    image: memeImages.disastergirl,
    defaultRarity: 'Epic'
  },
  {
    id: 'distracted',
    name: 'Distracted Boyfriend | Love Triangle',
    image: memeImages.distractedgirlfriend,
    defaultRarity: 'Rare'
  },
  {
    id: 'doge',
    name: 'Doge | Much Wow',
    image: memeImages.doge,
    defaultRarity: 'Legendary'
  },
  {
    id: 'forever-alone',
    name: 'Forever Alone | Solitude',
    image: memeImages.foreveralone,
    defaultRarity: 'Uncommon'
  },
  {
    id: 'rickroll',
    name: 'Rick Astley | Never Gonna',
    image: memeImages.rickroll,
    defaultRarity: 'Epic'
  },
  {
    id: 'rollsafe',
    name: 'Roll Safe | Big Brain',
    image: memeImages.rollsafe,
    defaultRarity: 'Rare'
  },
  {
    id: 'shrek',
    name: 'Shrek | Smirking',
    image: memeImages.shreksmirk,
    defaultRarity: 'Legendary'
  },
  {
    id: 'trollface',
    name: 'Troll Face | Problem?',
    image: memeImages.trollface,
    defaultRarity: 'Common'
  }
];

type MemeWear = 'RTX ON' | 'Full HD' | 'Standard' | 'Pixelated' | 'Minecraft';
type MemeRarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';

export async function fetchRandomMemes(count: number = 30): Promise<Skin[]> {
  const memes: Skin[] = [];
  
  // First, ensure we have at least one of each rarity
  const rarities: MemeRarity[] = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
  rarities.forEach(rarity => {
    const memesOfRarity = MEME_COLLECTION.filter(m => m.defaultRarity === rarity);
    if (memesOfRarity.length > 0) {
      const meme = memesOfRarity[Math.floor(Math.random() * memesOfRarity.length)];
      const wear = getRandomMemeWear();
      const keys = getRandomKeys(rarity);
      
      memes.push({
        id: `${meme.id}-${Date.now()}-guaranteed`,
        name: meme.name,
        type: 'Meme',
        wear,
        rarity,
        keys,
        imageUrl: meme.image
      });
    }
  });
  
  // Then fill the rest randomly
  for (let i = memes.length; i < count; i++) {
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
  
  // Shuffle the array
  return memes.sort(() => Math.random() - 0.5);
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
