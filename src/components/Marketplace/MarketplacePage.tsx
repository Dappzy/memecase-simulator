import React, { useState } from 'react';
import { Skin } from '../../types';
import { MarketListing, ECONOMY_CONSTANTS } from '../../types/economy';

interface MarketplacePageProps {
  userBalance: number;
  userInventory: Skin[];
  listings: MarketListing[];
  onBuy: (listingId: string) => void;
  onList: (skin: Skin, price: number) => void;
}

export function MarketplacePage({
  userBalance,
  userInventory,
  listings,
  onBuy,
  onList,
}: MarketplacePageProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'recent'>('recent');
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
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        case 'recent':
        default:
          return new Date(b.listedAt).getTime() - new Date(a.listedAt).getTime();
      }
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
          Meme Market
        </h1>
        <div className="flex items-center gap-4">
          <div className="bg-purple-900/50 px-4 py-2 rounded-lg">
            <span className="text-purple-300">Balance: </span>
            <span className="text-white font-bold">${userBalance.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-wrap gap-4 mb-8">
        <input
          type="text"
          placeholder="Search memes..."
          className="bg-purple-900/30 text-white px-4 py-2 rounded-lg flex-grow"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="bg-purple-900/30 text-white px-4 py-2 rounded-lg"
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option value="all">All Rarities</option>
          <option value="Consumer">Consumer</option>
          <option value="Industrial">Industrial</option>
          <option value="Mil-Spec">Mil-Spec</option>
          <option value="Restricted">Restricted</option>
          <option value="Classified">Classified</option>
          <option value="Covert">Covert</option>
        </select>
        <select
          className="bg-purple-900/30 text-white px-4 py-2 rounded-lg"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
        >
          <option value="recent">Most Recent</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredListings.map(listing => (
          <div
            key={listing.id}
            className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 rounded-lg p-4 hover:shadow-xl transition-all"
          >
            <img
              src={listing.skin.imageUrl}
              alt={listing.skin.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className={`text-lg font-bold mb-2 ${getRarityColor(listing.skin.rarity)}`}>
              {listing.skin.name}
            </h3>
            <div className="flex justify-between items-center">
              <span className="text-purple-300">{listing.skin.wear}</span>
              <span className="text-white font-bold">${listing.price.toFixed(2)}</span>
            </div>
            <button
              onClick={() => onBuy(listing.id)}
              disabled={userBalance < listing.price}
              className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg font-medium 
                hover:from-purple-700 hover:to-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {userBalance < listing.price ? 'Insufficient Balance' : 'Buy Now'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function getRarityColor(rarity: string): string {
  switch (rarity) {
    case 'Consumer':
      return 'text-gray-400';
    case 'Industrial':
      return 'text-blue-400';
    case 'Mil-Spec':
      return 'text-blue-500';
    case 'Restricted':
      return 'text-purple-500';
    case 'Classified':
      return 'text-pink-500';
    case 'Covert':
      return 'text-red-500';
    default:
      return 'text-white';
  }
}
