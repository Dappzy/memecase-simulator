import React from 'react';

interface CountdownTimerProps {
  count: number;
}

export function CountdownTimer({ count }: CountdownTimerProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
      <span className="text-6xl font-bold text-white animate-pulse">
        {count}
      </span>
    </div>
  );
}