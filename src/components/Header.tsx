import React from 'react';
import { Wallet, Box, Package } from 'lucide-react';

interface HeaderProps {
  inventoryCount: number;
}

export function Header({ inventoryCount }: HeaderProps) {
  return (
    <header className="bg-gray-900 text-white py-4 px-6 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Box className="w-8 h-8 text-purple-500" />
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
            SkinVault
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg flex items-center gap-2">
            <Package className="w-5 h-5" />
            <span>{inventoryCount} items</span>
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            <span>$0.00</span>
          </button>
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-2 rounded-lg font-medium">
            Deposit
          </button>
        </div>
      </div>
    </header>
  );
}