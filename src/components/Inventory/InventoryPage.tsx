import React, { useState } from 'react';
import { Skin } from '../../types';
import { UserWallet, ECONOMY_CONSTANTS } from '../../types/economy';

interface InventoryPageProps {
  wallet: UserWallet;
  inventory: Skin[];
  onSellItem: (skin: Skin, price: number) => void;
  onBuyKeys: (amount: number) => void;
  onDeposit: (amount: number) => void;
  onWithdraw: (amount: number) => void;
}

export function InventoryPage({
  wallet,
  inventory,
  onSellItem,
  onBuyKeys,
  onDeposit,
  onWithdraw,
}: InventoryPageProps) {
  const [selectedItem, setSelectedItem] = useState<Skin | null>(null);
  const [sellPrice, setSellPrice] = useState<string>('');
  const [depositAmount, setDepositAmount] = useState<string>('');

  const handleSellItem = () => {
    if (selectedItem && sellPrice) {
      const price = parseFloat(sellPrice);
      if (price >= ECONOMY_CONSTANTS.MIN_LISTING_PRICE && price <= ECONOMY_CONSTANTS.MAX_LISTING_PRICE) {
        onSellItem(selectedItem, price);
        setSelectedItem(null);
        setSellPrice('');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Wallet Section */}
      <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Your Wallet</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-purple-900/30 p-4 rounded-lg">
            <div className="text-purple-300 mb-1">Balance</div>
            <div className="text-2xl font-bold text-white">${wallet.balance.toFixed(2)}</div>
          </div>
          <div className="bg-purple-900/30 p-4 rounded-lg">
            <div className="text-purple-300 mb-1">Keys</div>
            <div className="text-2xl font-bold text-white">{wallet.keys}</div>
            <button
              onClick={() => onBuyKeys(1)}
              className="mt-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-1 px-3 rounded-lg text-sm"
            >
              Buy Key (${ECONOMY_CONSTANTS.KEY_PRICE})
            </button>
          </div>
          <div className="bg-purple-900/30 p-4 rounded-lg">
            <div className="text-purple-300 mb-1">Deposit/Withdraw</div>
            <div className="flex gap-2">
              <input
                type="number"
                min={ECONOMY_CONSTANTS.MIN_DEPOSIT}
                max={ECONOMY_CONSTANTS.MAX_DEPOSIT}
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="bg-purple-900/30 text-white px-2 py-1 rounded w-24"
                placeholder="Amount"
              />
              <button
                onClick={() => onDeposit(parseFloat(depositAmount))}
                className="bg-green-600 text-white py-1 px-3 rounded-lg text-sm"
              >
                Deposit
              </button>
              <button
                onClick={() => onWithdraw(parseFloat(depositAmount))}
                className="bg-red-600 text-white py-1 px-3 rounded-lg text-sm"
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Grid */}
      <h2 className="text-2xl font-bold text-white mb-4">Your Meme Collection</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {inventory.map((item) => (
          <div
            key={item.id}
            className={`bg-gradient-to-br from-purple-900/50 to-indigo-900/50 rounded-lg p-3 cursor-pointer transition-all
              ${selectedItem?.id === item.id ? 'ring-2 ring-purple-500' : 'hover:shadow-lg'}`}
            onClick={() => setSelectedItem(item)}
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full aspect-square object-cover rounded-lg mb-2"
            />
            <div className={`text-sm font-bold mb-1 truncate ${getRarityColor(item.rarity)}`}>
              {item.name}
            </div>
            <div className="text-xs text-purple-300">{item.wear}</div>
          </div>
        ))}
      </div>

      {/* Sell Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">Sell {selectedItem.name}</h3>
            <img
              src={selectedItem.imageUrl}
              alt={selectedItem.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="mb-4">
              <label className="text-purple-300 mb-1 block">Price</label>
              <input
                type="number"
                min={ECONOMY_CONSTANTS.MIN_LISTING_PRICE}
                max={ECONOMY_CONSTANTS.MAX_LISTING_PRICE}
                step="0.01"
                value={sellPrice}
                onChange={(e) => setSellPrice(e.target.value)}
                className="w-full bg-purple-900/30 text-white px-4 py-2 rounded-lg"
              />
              <div className="text-sm text-purple-400 mt-1">
                You'll receive: ${sellPrice ? (parseFloat(sellPrice) * (1 - ECONOMY_CONSTANTS.MARKET_FEE_PERCENTAGE)).toFixed(2) : '0.00'}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSellItem}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg"
              >
                List for Sale
              </button>
              <button
                onClick={() => setSelectedItem(null)}
                className="flex-1 bg-gray-700 text-white py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
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
