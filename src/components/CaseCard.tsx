import React from 'react';
import { Case } from '../types';
import '../styles/fonts.css';
import KeyIcon from '../assets/key-icon.svg';

interface CaseCardProps {
  caseItem: Case;
  onClick: () => void;
}

export function CaseCard({ caseItem, onClick }: CaseCardProps) {
  return (
    <div 
      className="group relative bg-gradient-to-br from-purple-800/50 to-indigo-800/50 p-4 cursor-pointer transform transition-all duration-200 hover:scale-105 pixel-corners pixel-border scanline pixel-glow"
      onClick={onClick}
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-blue-500/10 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pixel-corners" />
      
      {/* Container for content */}
      <div className="relative z-10">
        {/* Image container with fixed aspect ratio */}
        <div className="relative w-full pt-[100%] mb-4">
          <img
            src={caseItem.imageUrl}
            alt={caseItem.name}
            className="absolute top-0 left-0 w-full h-full object-contain pixel-corners pixel-border"
          />
          
          {/* Key cost overlay */}
          <div className="absolute top-2 right-2 bg-black/80 pixel-corners pixel-border p-2 flex items-center gap-2">
            <img 
              src={KeyIcon}
              alt="Key"
              className="w-4 h-4"
            />
            <span className="text-yellow-400 font-bold pixel-font-clean">
              {caseItem.keys}
            </span>
          </div>
        </div>

        {/* Text content */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-white mb-2 pixel-font-title" style={{ fontSize: '16px' }}>{caseItem.name}</h3>
          <p className="text-gray-300 text-sm mb-4 h-12 overflow-hidden pixel-font" style={{ fontSize: '12px', lineHeight: '16px' }}>
            {caseItem.description}
          </p>
          <div className="flex items-center justify-center">
            <div className="pixel-border bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 p-2">
              <div className="text-yellow-500 font-bold pixel-font-clean">COST TO OPEN</div>
              <div className="flex items-center justify-center gap-2 mt-1">
                <img 
                  src={KeyIcon}
                  alt="Key Required" 
                  className="w-5 h-5"
                />
                <span className="text-yellow-400 font-bold pixel-font-clean">
                  {caseItem.keys} {caseItem.keys === 1 ? 'KEY' : 'KEYS'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}