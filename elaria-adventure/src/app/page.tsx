// src/app/page.tsx
'use client';
import { useGameState } from '@/hooks/useGameState';
import { useCommands } from '@/hooks/useCommands';
import { StatDisplay } from '@/components/ui/StatDisplay';
import { useEffect, useState, useRef } from 'react';

export default function Home() {
  const gameState = useGameState();
  const [typing, setTyping] = useState('');
  const { processCommand, commandHistory } = useCommands();
  const [command, setCommand] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const welcomeText = "WELCOME TO ELARIA";

  useEffect(() => {
    if (!gameState.playerName) {
      let index = 0;
      const timer = setInterval(() => {
        if (index < welcomeText.length) {
          setTyping(welcomeText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 100);
      return () => clearInterval(timer);
    }
  }, [gameState.playerName]);

  // Focus input when clicking anywhere in the terminal
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && command.trim()) {
      processCommand(command);
      setCommand('');
    }
  };

  if (!gameState.playerName) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-black">
        <div className="terminal-container max-w-md w-full">
          <div className="retro-terminal space-y-4">
            <h1 className="text-2xl text-center">
              {typing}<span className="cursor-blink">_</span>
            </h1>
            <div className="border border-[var(--terminal-green)] p-4 mt-8">
              <p className="mb-2">&gt; IDENTIFY YOURSELF:</p>
              <input
                type="text"
                className="terminal-input"
                placeholder="_"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value) {
                    gameState.setPlayerName(e.currentTarget.value);
                  }
                }}
              />
            </div>
            <p className="text-sm text-center cursor-blink">PRESS [ENTER] TO BEGIN</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black p-8">
      <div className="terminal-container" onClick={handleTerminalClick}>
        <div className="retro-terminal">
          <h1 className="text-3xl mb-8">
            &gt; WELCOME, {gameState.playerName}
          </h1>
          
          <StatDisplay stats={gameState} />
  
          {/* Command History - only shows current command and response */}
          <div className="mt-8 space-y-2">
            {commandHistory.map((line, index) => (
              <div key={index} className="text-[var(--terminal-green)]">
                {line}
              </div>
            ))}
          </div>
  
          {/* Command Input */}
          <div className="mt-4 border border-[var(--terminal-green)] p-2">
            <div className="flex items-center">
              <span className="mr-2">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={handleCommand}
                className="terminal-input flex-grow bg-transparent border-none focus:outline-none"
                placeholder="ENTER COMMAND..."
              />
              <span className="cursor-blink">_</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}