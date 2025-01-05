import React, { useEffect, useRef } from 'react';
import { Skin } from '../../types';
import '../../styles/fonts.css';

interface SpinningCaseProps {
  skins: Skin[];
  selectedIndex: number;
  onComplete: () => void;
}

export function SpinningCase({ skins, selectedIndex, onComplete }: SpinningCaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const spinCompleted = useRef(false);

  useEffect(() => {
    if (!containerRef.current || spinCompleted.current) return;

    const container = containerRef.current;
    const itemWidth = 200; // Width of each item
    const gap = 16; // Gap between items
    const totalWidth = (itemWidth + gap) * skins.length;
    const spinDuration = 6000; // 6 seconds
    
    // Calculate final position (add some extra spins)
    const extraSpins = 2; // Number of complete spins before landing
    const finalPosition = -(selectedIndex * (itemWidth + gap) + totalWidth * extraSpins);
    
    // Initial position (3 screens worth of items to the right)
    container.style.transform = `translateX(${totalWidth}px)`;
    
    // Force a reflow
    container.offsetHeight;
    
    // Add smooth transition with easing
    container.style.transition = `transform ${spinDuration}ms cubic-bezier(0.2, 0.4, 0.1, 1.0)`;
    
    // Move to final position
    container.style.transform = `translateX(${finalPosition}px)`;
    
    // Handle spin complete
    const timer = setTimeout(() => {
      spinCompleted.current = true;
      onComplete();
    }, spinDuration);

    return () => clearTimeout(timer);
  }, [selectedIndex, skins.length, onComplete]);

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

  // Create multiple sets of skins for smooth spinning
  const spinningItems = [...skins, ...skins, ...skins, ...skins, ...skins];

  return (
    <div className="relative w-full overflow-hidden bg-purple-900/30 p-8">
      {/* Selection indicator */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-yellow-400 transform -translate-x-1/2">
        <div className="absolute inset-0 animate-pulse bg-yellow-300/50"></div>
      </div>
      
      {/* Side gradients for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-purple-900 to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-purple-900 to-transparent z-10"></div>

      <div className="relative">
        <div
          ref={containerRef}
          className="flex gap-4"
          style={{ willChange: 'transform' }}
        >
          {spinningItems.map((skin, index) => (
            <div
              key={`${skin.id}-${index}`}
              className="flex-shrink-0 w-48 bg-purple-900/50 p-4 rounded-lg transform transition-transform hover:scale-105"
            >
              <img
                src={skin.imageUrl}
                alt={skin.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="text-lg font-bold mb-2 truncate">{skin.name}</h4>
              <div className="flex justify-between items-center">
                <span className={getRarityColor(skin.rarity)}>{skin.rarity}</span>
                <span className="text-yellow-400">{skin.keys} Keys</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}