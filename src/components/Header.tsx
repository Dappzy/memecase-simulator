import React from 'react';
import KeyIcon from '../assets/key-icon.svg';
import { Box } from 'lucide-react';

interface HeaderProps {
  userKeys: number;
  balance: number;
  inventoryCount: number;
  onBuyKey: () => void;
  onInventoryClick: () => void;
}

export function Header({ userKeys, balance, inventoryCount, onBuyKey, onInventoryClick }: HeaderProps) {
  return (
    <div className="fixed top-0 left-0 right-0 bg-purple-900 z-50">
      <div className="max-w-7xl mx-auto px-2 md:px-4 py-2">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-0 md:justify-between">
          <div className="flex flex-col md:flex-row items-center w-full md:w-auto gap-2 md:gap-0">
            <div className="flex w-full md:w-auto justify-center md:justify-start">
              <button 
                onClick={() => window.location.href = '/'}
                className="px-3 md:px-4 py-1 flex items-center gap-2 pixel-corners"
              >
                <Box className="w-4 h-4" />
                <span className="uppercase pixel-font-clean text-sm">Cases</span>
              </button>

              <button 
                onClick={onInventoryClick}
                className="px-3 md:px-4 py-1 flex items-center gap-2 pixel-corners"
              >
                <Box className="w-4 h-4" />
                <span className="uppercase pixel-font-clean text-sm">Inventory ({inventoryCount})</span>
              </button>
            </div>

            <div className="text-xl md:text-2xl md:ml-4 pixel-font-title text-purple-200 text-center md:text-left">
              MEMECASE SIMULATOR
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-center md:justify-end">
            <div className="flex items-center gap-2 pixel-corners">
              <div className="flex items-center gap-2">
                <img src={KeyIcon} alt="Keys" className="w-4 h-4" />
                <span className="text-yellow-400 font-bold pixel-font-clean text-sm whitespace-nowrap">{userKeys} KEYS</span>
              </div>
              <button 
                onClick={onBuyKey}
                className="ml-1 md:ml-2 px-2 md:px-4 py-1 bg-purple-800 hover:bg-purple-700 pixel-corners"
              >
                <span className="pixel-font-clean text-sm whitespace-nowrap">BUY ($2.49)</span>
              </button>
            </div>
            
            <div className="flex items-center gap-2 pixel-corners">
              <span className="pixel-font-clean text-sm">${balance.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}