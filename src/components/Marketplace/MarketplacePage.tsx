import React, { useState } from 'react';
import { Skin } from '../../types';
import { MarketListing } from '../../types/economy';

interface MarketplacePageProps {
  userBalance: number;
  userInventory: Skin[];
  listings: MarketListing[];
  onBuy: (listingId: string) => void;
  onList: (skin: Skin, keys: number) => void;
}

export function MarketplacePage({
  userBalance,
  userInventory,
  listings,
  onBuy,
  onList,
}: MarketplacePageProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'keys_asc' | 'keys_desc' | 'recent'>('recent');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredListings = listings
    .filter(listing => listing.status === 'active')
    .filter(listing => {
      if (searchQuery) {
        return listing.skin.name.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return true;
    })
    .filter(listing => {
      if (selectedFilter === 'all') return true;
      return listing.skin.rarity === selectedFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'keys_asc':
          return a.keys - b.keys;
        case 'keys_desc':
          return b.keys - a.keys;
        case 'recent':
        default:
          return new Date(b.listedAt).getTime() - new Date(a.listedAt).getTime();
      }
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
          Marketplace
        </h1>

        <div className="flex gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'keys_asc' | 'keys_desc' | 'recent')}
            className="bg-purple-900 text-white px-4 py-2 rounded-lg"
          >
            <option value="recent">Most Recent</option>
            <option value="keys_asc">Price: Low to High</option>
            <option value="keys_desc">Price: High to Low</option>
          </select>

          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="bg-purple-900 text-white px-4 py-2 rounded-lg"
          >
            <option value="all">All Rarities</option>
            <option value="Common">Common</option>
            <option value="Uncommon">Uncommon</option>
            <option value="Rare">Rare</option>
            <option value="Epic">Epic</option>
            <option value="Legendary">Legendary</option>
          </select>

          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-purple-900 text-white px-4 py-2 rounded-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredListings.map((listing) => (
          <div
            key={listing.id}
            className="bg-purple-900 rounded-lg p-4 flex flex-col"
          >
            <img
              src={listing.skin.imageUrl}
              alt={listing.skin.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">{listing.skin.name}</h3>
            <div className="flex justify-between items-center mb-4">
              <span className={getRarityColor(listing.skin.rarity)}>
                {listing.skin.rarity}
              </span>
              <span className="text-yellow-400">{listing.keys} Keys</span>
            </div>
            <button
              onClick={() => onBuy(listing.id)}
              disabled={userBalance < listing.keys}
              className="bg-purple-700 hover:bg-purple-600 disabled:bg-purple-800 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg mt-auto"
            >
              {userBalance < listing.keys ? 'Not enough keys' : 'Buy Now'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function getRarityColor(rarity: string): string {
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
