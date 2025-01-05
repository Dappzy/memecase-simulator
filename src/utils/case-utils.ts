import { Skin } from '../types';

export function getRarityColor(rarity: string): string {
  switch (rarity) {
    case 'Common':
      return 'text-gray-400';
    case 'Uncommon':
      return 'text-blue-400';
    case 'Rare':
      return 'text-purple-400';
    case 'Epic':
      return 'text-pink-400';
    case 'Legendary':
      return 'text-yellow-400';
    default:
      return 'text-gray-400';
  }
}

export function getRarityWeight(rarity: string): number {
  switch (rarity) {
    case 'Common':
      return 100;
    case 'Uncommon':
      return 50;
    case 'Rare':
      return 25;
    case 'Epic':
      return 10;
    case 'Legendary':
      return 5;
    default:
      return 100;
  }
}

export function getRandomSkin(skins: Skin[]): Skin {
  const weights = skins.map(skin => getRarityWeight(skin.rarity));

  const totalWeight = weights.reduce((a, b) => a + b, 0);
  let random = Math.random() * totalWeight;
  
  for (let i = 0; i < skins.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return skins[i];
    }
  }
  
  return skins[0];
}