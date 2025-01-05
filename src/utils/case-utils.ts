import { Skin } from '../types';

export function getRandomSkin(skins: Skin[]): Skin {
  const weights = skins.map(skin => {
    switch (skin.rarity) {
      case 'Consumer': return 32;
      case 'Industrial': return 24;
      case 'Mil-Spec': return 16;
      case 'Restricted': return 8;
      case 'Classified': return 4;
      case 'Covert': return 1;
      default: return 1;
    }
  });

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