export function useSound() {
  const playSound = (src: string) => {
    const audio = new Audio(src);
    audio.volume = 0.5;
    audio.play().catch(() => {
      // Handle browsers that block autoplay
      console.log('Audio playback blocked');
    });
  };

  return { playSound };
}