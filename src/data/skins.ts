import { Skin } from '../types';

export const SKINS: Skin[] = [
  {
    id: '1',
    name: 'AK-47 | Asiimov',
    type: 'Rifle',
    wear: 'RTX ON',
    rarity: 'Legendary',
    keys: 25,
    imageUrl: '/assets/skins/ak47-asiimov.png'
  },
  {
    id: '2',
    name: 'M4A4 | Neo-Noir',
    type: 'Rifle',
    wear: 'Full HD',
    rarity: 'Epic',
    keys: 10,
    imageUrl: '/assets/skins/m4a4-neo-noir.png'
  },
  {
    id: '3',
    name: 'Desert Eagle | Blaze',
    type: 'Pistol',
    wear: 'Standard',
    rarity: 'Rare',
    keys: 5,
    imageUrl: '/assets/skins/deagle-blaze.png'
  }
];

export const CASES = [
  {
    id: 'god-tier',
    name: 'God Tier Collection',
    description: 'The most prestigious memes ever created. Features ultra-rare specimens and the dankest of the dank.',
    keys: 5,
    imageUrl: '/assets/cases/god-tier.png',
    skins: SKINS
  },
  {
    id: 'viral-legends',
    name: 'Viral Legends Vault',
    description: 'Elite tier memes that achieved legendary status. Contains rare pepes, dank classics, and internet hall of fame entries.',
    keys: 3,
    imageUrl: '/assets/cases/viral-legends.png',
    skins: SKINS
  }
];