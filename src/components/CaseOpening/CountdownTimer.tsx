import React, { useState, useEffect } from 'react';
import tickSound from '../../assets/sounds/tick.mp3';
import openingSound from '../../assets/sounds/opening.mp3';

interface CountdownTimerProps {
  onComplete: () => void;
}

export function CountdownTimer({ onComplete }: CountdownTimerProps) {
  const [count, setCount] = useState(5);

  useEffect(() => {
    console.log('Countdown effect running, count:', count);
    
    if (count > 0) {
      if (count === 4) {
        console.log('Playing tick sound for count:', count);
        const audio = new Audio(tickSound);
        audio.volume = 0.5;
        audio.play();
      }
      
      if (count === 1) {
        console.log('Playing opening sound');
        const audio = new Audio(openingSound);
        audio.volume = 0.5;
        audio.play();
      }

      const timer = setTimeout(() => {
        setCount(prev => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      console.log('Countdown complete, calling onComplete');
      onComplete();
    }
  }, [count, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      {count > 3 ? (
        <div className="flex flex-col items-center">
          <div className="text-4xl text-purple-300 mb-4 pixel-font-title">
            LOADING CASE
          </div>
          <div className="flex gap-2">
            {[...Array(count - 3)].map((_, i) => (
              <div 
                key={i}
                className="w-4 h-4 bg-purple-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 200}ms` }}
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="text-8xl font-bold text-white mb-4 pixel-font-title animate-bounce">
            {count}
          </div>
          <div className="text-xl text-purple-300 pixel-font">
            Opening case in...
          </div>
        </>
      )}
    </div>
  );
}