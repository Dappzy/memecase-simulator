import React, { useState, useEffect, useCallback } from 'react';
import { Case, Skin } from '../../types';
import { SpinningCase } from './SpinningCase';
import { MEME_RARITIES } from '../../utils/meme-utils';
import '../../styles/fonts.css';

interface CaseOpeningModalProps {
  caseItem: Case;
  onClose: () => void;
  onComplete: (skin: Skin) => void;
}

export function CaseOpeningModal({ caseItem, onClose, onComplete }: CaseOpeningModalProps) {
  const [countdown, setCountdown] = useState(3);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedSkinIndex, setSelectedSkinIndex] = useState(-1);
  const [winner, setWinner] = useState<Skin | null>(null);
  const [showWinner, setShowWinner] = useState(false);

  // Handle countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(prev => prev - 1), 800);
    } else if (countdown === 0) {
      // Start spinning
      const randomIndex = Math.floor(Math.random() * caseItem.skins.length);
      setSelectedSkinIndex(randomIndex);
      setIsSpinning(true);
    }

    return () => clearTimeout(timer);
  }, [countdown, caseItem.skins.length]);

  // Handle spin completion
  const handleSpinComplete = useCallback((skin: Skin) => {
    setIsSpinning(false); // Stop spinning
    setWinner(skin);
    setShowWinner(true); // Show the winner overlay
    onComplete(skin);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full max-w-4xl p-4">
        {countdown > 0 ? (
          <div className="text-6xl text-center text-white font-bold mb-8 animate-bounce pixel-font-title">
            {countdown}
          </div>
        ) : (
          <div className="relative">
            <SpinningCase
              skins={caseItem.skins}
              selectedSkinIndex={selectedSkinIndex}
              isSpinning={isSpinning}
              onSpinComplete={handleSpinComplete}
            />
            
            {/* Winner overlay */}
            {winner && showWinner && (
              <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                <div className="bg-gradient-to-br from-purple-900 to-indigo-900 p-1 pixel-corners">
                  <div className="bg-black/90 p-8 pixel-corners pixel-border text-center transform scale-110 transition-transform duration-300 max-w-md w-full scanline">
                    <div className="pixel-font-title text-3xl mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text">
                      WINNER!
                    </div>
                    
                    <div className="relative w-48 h-48 mx-auto mb-6 pixel-corners pixel-border">
                      <img 
                        src={winner.imageUrl} 
                        alt={winner.name}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>

                    <h3 className={`text-2xl font-bold mb-4 pixel-font-title ${MEME_RARITIES[winner.rarity].color}`}>
                      {winner.name}
                    </h3>
                    <p className={`text-lg mb-6 pixel-font ${MEME_RARITIES[winner.rarity].color}`}>
                      {winner.wear}
                    </p>
                    
                    <button
                      onClick={onClose}
                      className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white 
                        hover:from-purple-700 hover:to-blue-700 transition-colors transform hover:scale-105 duration-200
                        shadow-lg hover:shadow-xl pixel-corners pixel-border pixel-font-clean"
                    >
                      CONTINUE
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}