import React, { useState, useRef } from 'react';
import { Case, Skin } from '../../types';
import { CountdownTimer } from './CountdownTimer';
import { SpinningCase } from './SpinningCase';
import { useSound } from '../../hooks/useSound';
import winSound from '../../assets/sounds/win.mp3';

interface CaseOpeningModalProps {
  caseItem: Case;
  onClose: () => void;
  onComplete: (skin: Skin) => void;
}

export function CaseOpeningModal({ caseItem, onClose, onComplete }: CaseOpeningModalProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [selectedSkinIndex, setSelectedSkinIndex] = useState(-1);
  const [showWinner, setShowWinner] = useState(false);
  const [winner, setWinner] = useState<Skin | null>(null);
  const { playSound } = useSound();

  const handleCountdownComplete = () => {
    setIsOpening(true);
    // Pick a random skin from the case
    const randomIndex = Math.floor(Math.random() * caseItem.skins.length);
    setSelectedSkinIndex(randomIndex);
    setWinner(caseItem.skins[randomIndex]);
  };

  const handleSpinComplete = () => {
    setShowWinner(true);
    playSound(winSound);
    if (winner) {
      onComplete(winner);
    }
  };

  const getRarityColor = (rarity: string): string => {
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
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/90">
      <div className="bg-purple-900/50 p-8 rounded-lg max-w-2xl w-full mx-4 relative backdrop-blur-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white"
        >
          ✕
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">{caseItem.name}</h2>
          <p className="text-purple-300">{caseItem.description}</p>
        </div>

        {!isOpening && !showWinner && (
          <CountdownTimer onComplete={handleCountdownComplete} />
        )}

        {isOpening && !showWinner && (
          <SpinningCase
            skins={caseItem.skins}
            selectedIndex={selectedSkinIndex}
            onComplete={handleSpinComplete}
          />
        )}

        {showWinner && winner && (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Congratulations!</h3>
            <div className="bg-purple-900/50 p-4 rounded-lg inline-block">
              <img
                src={winner.imageUrl}
                alt={winner.name}
                className="w-64 h-64 object-cover rounded-lg mb-4 mx-auto"
              />
              <h4 className="text-xl font-bold mb-2">{winner.name}</h4>
              <div className="flex justify-center gap-4">
                <span className={getRarityColor(winner.rarity)}>{winner.rarity}</span>
                <span className="text-purple-300">{winner.wear}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}