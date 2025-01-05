import { Case } from '../types';
import { fetchRandomMemes } from '../utils/meme-utils';

// Import case icons
import ClassicIcon from '../caseicons/Classic.jpg';
import GodIcon from '../caseicons/God.jpg';
import LegendIcon from '../caseicons/Legend.jpg';

// Initial empty cases
export const cases: Case[] = [
  {
    id: 'meme-classics',
    name: 'Classic Meme Vault',
    description: 'A collection of timeless internet classics and viral sensations that defined an era. Features iconic moments and unforgettable reactions.',
    keys: 1,
    imageUrl: ClassicIcon,
    skins: [] // Will be populated dynamically
  },
  {
    id: 'viral-legends',
    name: 'Viral Legends Vault',
    description: "Premium collection of internet culture's greatest hits. Contains high-quality reaction images and legendary viral moments.",
    keys: 3,
    imageUrl: LegendIcon,
    skins: [] // Will be populated dynamically
  },
  {
    id: 'god-tier-collection',
    name: 'God Tier Collection',
    description: 'The ultimate vault containing the most prestigious and rare internet phenomena. Features the absolute pinnacle of meme culture.',
    keys: 5,
    imageUrl: GodIcon,
    skins: [] // Will be populated dynamically
  }
];

// Function to populate cases with random memes
export async function populateCases() {
  // Populate each case with random memes
  for (const caseItem of cases) {
    caseItem.skins = await fetchRandomMemes(10);
  }
}

// Initial population
populateCases().catch(console.error);