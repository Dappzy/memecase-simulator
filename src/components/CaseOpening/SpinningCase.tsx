import React, { useEffect, useRef } from 'react';
import { Skin } from '../../types';
import '../../styles/fonts.css';

interface SpinningCaseProps {
  skins: Skin[];
  selectedSkinIndex: number;
  isSpinning: boolean;
  onSpinComplete: (skin: Skin) => void;
}

export function SpinningCase({ skins, selectedSkinIndex, isSpinning, onSpinComplete }: SpinningCaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = React.useState(0);
  const [finalPosition, setFinalPosition] = React.useState(0);

  // Calculate item width on mount
  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      setItemWidth(width);
    }
  }, []);

  // Update final position when spinning starts
  useEffect(() => {
    if (isSpinning && selectedSkinIndex >= 0) {
      // Add extra offset to ensure items spin past the viewport first
      const extraSpinDistance = window.innerWidth * 3; // Increased for longer spin
      const position = -(selectedSkinIndex * itemWidth + extraSpinDistance);
      setFinalPosition(position);
    }
  }, [isSpinning, selectedSkinIndex, itemWidth]);

  const spinStyle = {
    transform: `translateX(${finalPosition}px)`,
    transition: isSpinning 
      ? 'transform 8s cubic-bezier(0.15, 0.85, 0.35, 1.0)' // Increased from 4s to 8s
      : 'none'
  };

  // Create more duplicates for a longer spinning effect
  const duplicatedSkins = [...skins, ...skins, ...skins, ...skins, ...skins, ...skins]; // Added more duplicates

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-purple-900/30 to-indigo-900/30 p-6 pixel-corners pixel-border scanline">
      {/* Side gradients for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-purple-900 to-transparent z-20" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-purple-900 to-transparent z-20" />
      
      {/* Selection indicator */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-yellow-400/50 z-30">
        <div className="absolute inset-0 animate-pulse bg-yellow-300/50" />
      </div>

      {/* Container for spinning items */}
      <div 
        ref={containerRef} 
        className="relative flex items-center space-x-4 will-change-transform"
        style={spinStyle}
        onTransitionEnd={() => onSpinComplete(skins[selectedSkinIndex])}
      >
        {duplicatedSkins.map((skin, index) => (
          <div 
            key={`${skin.id}-${index}`} 
            className="flex-shrink-0 w-full aspect-square bg-gradient-to-br from-purple-800/50 to-indigo-800/50 p-4 pixel-corners pixel-border pixel-glow"
          >
            <div className="relative h-full w-full">
              <img 
                src={skin.imageUrl} 
                alt={skin.name}
                className="w-full h-full object-contain pixel-corners"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-2 pixel-corners">
                <h3 className="text-white text-center font-bold truncate pixel-font-clean">
                  {skin.name}
                </h3>
                <p className="text-gray-400 text-center text-sm pixel-font">
                  {skin.wear}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}