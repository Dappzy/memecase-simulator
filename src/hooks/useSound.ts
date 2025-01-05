import { useRef } from 'react';

export function useSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = (src: string) => {
    // Stop any currently playing sound
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Create new audio instance
    audioRef.current = new Audio(src);
    audioRef.current.volume = 0.5;
    audioRef.current.play().catch(() => {
      // Handle browsers that block autoplay
      console.log('Audio playback blocked');
    });
  };

  return { playSound };
}