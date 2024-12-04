// src/hooks/useCommands.ts
import { useState } from 'react';
import { createMaterialsCommands } from '@/modules/materials/commands/materialsCommands';

type Command = {
  name: string;
  description: string;
  execute: () => string;
};

export function useCommands() {
  const [commandHistory, setCommandHistory] = useState<string[]>([]);

  const commands: Record<string, Command> = {
    help: {
      name: 'help',
      description: 'Display available commands',
      execute: () => {
        const allCommands = { 
          help: 'Display available commands',
          clear: 'Clear the terminal',
          gather: 'Search the area for materials to gather'
        };
        
        return Object.entries(allCommands)
          .map(([name, desc]) => `${name} - ${desc}`)
          .join('\n');
      }
    },
    clear: {
      name: 'clear',
      description: 'Clear the terminal',
      execute: () => {
        setCommandHistory([]);
        return '';
      }
    },
    ...createMaterialsCommands()
  };

  const processCommand = (input: string) => {
    const commandName = input.trim().toLowerCase();
    const command = commands[commandName];
    
    let newHistory: string[];
    
    if (!command) {
      newHistory = [`> ${input}`, `Unknown command: '${commandName}'. Type 'help' for available commands.`];
    } else {
      const result = command.execute();
      newHistory = result ? [`> ${input}`, result] : [`> ${input}`];
    }
    
    setCommandHistory(newHistory);
  };

  return {
    processCommand,
    commandHistory
  };
}