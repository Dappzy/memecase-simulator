export interface Skin {
  id: string;
  name: string;
  type: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
  wear: 'RTX ON' | 'Full HD' | 'Standard' | 'Pixelated' | 'Minecraft';
  price: number;
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
  price: number;
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
    basePrice: 500
  },
  Epic: {
    weight: 10,
    color: 'text-purple-500',
    basePrice: 100
  },
  Rare: {
    weight: 20,
    color: 'text-blue-500',
    basePrice: 50
  },
  Uncommon: {
    weight: 30,
    color: 'text-green-500',
    basePrice: 25
  },
  Common: {
    weight: 35,
    color: 'text-gray-500',
    basePrice: 10
  }
} as const;