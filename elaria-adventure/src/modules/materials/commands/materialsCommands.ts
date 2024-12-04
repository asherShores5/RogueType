// src/modules/materials/commands/materialsCommands.ts
import { useGameState } from '@/hooks/useGameState';

export const createMaterialsCommands = () => {
  const locations = [
    {
      name: 'Dense Forest',
      type: 'wood',
      minYield: 2,
      maxYield: 5,
    },
    {
      name: 'Mountain Quarry',
      type: 'stone',
      minYield: 1,
      maxYield: 4,
    },
    {
      name: 'Deep Cave',
      type: 'ore',
      minYield: 1,
      maxYield: 3,
    }
  ];

  return {
    gather: {
      name: 'gather',
      description: 'Search the area for materials to gather',
      execute: () => {
        const gameState = useGameState.getState(); // Use getState() instead of the hook
        const location = locations[Math.floor(Math.random() * locations.length)];
        const amount = Math.floor(Math.random() * (location.maxYield - location.minYield + 1)) + location.minYield;
        
        gameState.updateStats({ materials: gameState.materials + amount });
        
        return `At the ${location.name}, you gather ${amount} ${location.type}.`;
      }
    }
  };
};