export interface Skin {
  id: string;
  name: string;
  type: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
  wear: 'RTX ON' | 'Full HD' | 'Standard' | 'Pixelated' | 'Minecraft';
  keys: number;
  imageUrl: string;
}

export interface Case {
  id: string;
  name: string;
  description: string;
  keys: number;
  imageUrl: string;
  skins: Skin[];
}

export interface MarketListing {
  id: string;
  skin: Skin;
  seller: string;
  keys: number;
  listingDate: Date;
}

export interface User {
  id: string;
  balance: number;
  inventory: Skin[];
}

export const RARITY_CONFIG = {
  Legendary: {
    weight: 5,
    color: 'text-yellow-500',
    baseKeys: 25
  },
  Epic: {
    weight: 10,
    color: 'text-pink-500',
    baseKeys: 10
  },
  Rare: {
    weight: 15,
    color: 'text-purple-500',
    baseKeys: 5
  },
  Uncommon: {
    weight: 30,
    color: 'text-blue-500',
    baseKeys: 2
  },
  Common: {
    weight: 40,
    color: 'text-gray-400',
    baseKeys: 1
  }
};