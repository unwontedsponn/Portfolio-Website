import React, { useRef, useState, useEffect } from 'react';
import { createPlayer } from '@/app/game/models/Player';
import { Obstacle } from '@/app/game/models/Obstacles';
import { PowerUp } from '../game/models/PowerUps';
import IntroSection from '@/app/game/components/IntroSection';
import InstructionsSection from '@/app/game/components/InstructionsSection';
import GamePausedSection from '@/app/game/components/GamePausedSection';
import GameCanvas from '@/app/game/components/GameCanvas';
import { useGameLogic } from '@/app/game/hooks/useGameLogic';

const MyGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isPowerUpActive, setIsPowerUpActive] = useState(false);
  const [audioType, setAudioType] = useState<'normal' | '8bit'>('normal');

  const player = useRef(createPlayer(0));
  const obstacles = useRef<Obstacle[]>([]);
  const powerUps = useRef<PowerUp[]>([]);
  const animationFrameIdRef = useRef<number | null>(null);
  const gameLoopFunctionRef = useRef<(timestamp: number) => void>(() => {});

  // Function to reset obstacles and powerUps
  const resetObstacles = () => {obstacles.current = [];};
  const resetPowerUps = () => {powerUps.current = [];};

  // Use the custom hook for game logic
  useGameLogic({
    canvasRef,
    audioRef,
    player,
    obstacles,
    powerUps,
    gameStarted,
    gamePaused,
    setGamePaused,
    resumeGame: () => {}, // Placeholder, the logic is in the GamePausedSection
    animationFrameIdRef,
    gameLoopFunctionRef,
    setIsPowerUpActive,
  });

  // Effect to handle music switching when power-up is active
  useEffect(() => {
    if (isPowerUpActive && audioRef.current) {
      const audio = audioRef.current;
      const currentTime = audio.currentTime;

      // Pause the normal music and switch to 8-bit music at the same timestamp
      if (audioType === 'normal') {
        audio.pause();
        audio.src = '/audio/game/All Change 8-BIT.wav';
        audio.currentTime = currentTime;
        audio.play();
        setAudioType('8bit');

        // Switch back to the original music after 5 seconds
        setTimeout(() => {
          const newCurrentTime = audio.currentTime;
          audio.pause();
          audio.src = '/audio/game/All_Change.wav';
          audio.currentTime = newCurrentTime;
          audio.play();
          setAudioType('normal');
          setIsPowerUpActive(false);
        }, 5000);
      }
    }
  }, [isPowerUpActive, audioRef, audioType]);

  return (
    <section id="myGame" className="pt-[var(--header-height)] pb-[var(--footer-height)] flex flex-col w-full h-screen overflow-hidden">
      <div className="hidden md:flex flex-col justify-center gap-x-8 px-32 items-center h-screen overflow-hidden">
        
        {showIntro && (
          <IntroSection 
            setShowIntro={setShowIntro} 
            setShowInstructions={setShowInstructions} 
          />
        )}

        {showInstructions && !gameStarted && (
          <InstructionsSection 
            setGameStarted={setGameStarted} 
            setGamePaused={setGamePaused} 
            audioRef={audioRef} 
          />
        )}

        {gameStarted && !gamePaused && <GameCanvas canvasRef={canvasRef} />}

        {gamePaused && (
          <GamePausedSection 
            setGamePaused={setGamePaused} 
            animationFrameIdRef={animationFrameIdRef} 
            audioRef={audioRef} 
            gameLoopFunctionRef={gameLoopFunctionRef} 
            currentSection={currentSection} 
            setCurrentSection={setCurrentSection}
            resetObstacles={resetObstacles}
            resetPowerUps={resetPowerUps}
          />
        )}

        <audio ref={audioRef} src="/audio/game/All_Change.wav" preload="auto" loop>
          <track kind="captions" srcLang="en" label="English captions" />
        </audio>
      </div>
    </section>
  );
};

export default MyGame;
