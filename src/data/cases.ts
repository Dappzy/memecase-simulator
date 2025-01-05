import { Case } from '../types';
import { fetchRandomMemes } from '../utils/meme-utils';

// Import case icons
import ClassicIcon from '@/caseicons/Classic.jpg';
import GodIcon from '@/caseicons/God.jpg';
import LegendIcon from '@/caseicons/Legend.jpg';

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
    description: 'Elite tier memes that achieved legendary status. Contains rare pepes, dank classics, and internet hall of fame entries.',
    keys: 2,
    imageUrl: LegendIcon,
    skins: [] // Will be populated dynamically
  },
  {
    id: 'god-tier',
    name: 'God Tier Collection',
    description: 'The most prestigious memes ever created. Features ultra-rare specimens and the dankest of the dank.',
    keys: 3,
    imageUrl: GodIcon,
    skins: [] // Will be populated dynamically
  }
];

// Function to populate cases with random memes
export async function populateCases() {
  for (const caseItem of cases) {
    const memeSkins = await fetchRandomMemes(10); // Get 10 random memes for each case
    caseItem.skins = memeSkins;
  }
}

// Initial population
populateCases().catch(console.error);