// src/modules/materials/hooks/useMaterials.ts
import { useGameState } from '@/hooks/useGameState';
import { GatheringLocation, GatheringResult } from '../types/materials.types';

export function useMaterials() {
  const { materials, updateStats } = useGameState();

  // Predefined gathering locations
  const locations: GatheringLocation[] = [
    {
      name: 'Dense Forest',
      description: 'Ancient trees tower above, their branches rich with usable wood.',
      minYield: 2,
      maxYield: 5,
      type: 'wood'
    },
    {
      name: 'Mountain Quarry',
      description: 'A rocky outcropping with exposed stone perfect for harvesting.',
      minYield: 1,
      maxYield: 4,
      type: 'stone'
    },
    {
      name: 'Deep Cave',
      description: 'A dark cave with mineral deposits glinting in the shadows.',
      minYield: 1,
      maxYield: 3,
      type: 'ore'
    }
  ];

  const getRandomMessage = (location: GatheringLocation, amount: number): string => {
    const messages = {
      wood: [
        `You chop down several branches, gathering ${amount} wood.`,
        `After some careful cutting, you collect ${amount} wood.`,
        `The trees yield ${amount} wood after your efforts.`
      ],
      stone: [
        `You break apart some rocks, collecting ${amount} stone.`,
        `Mining the quarry yields ${amount} stone.`,
        `You gather ${amount} stone from the rocky surface.`
      ],
      ore: [
        `You discover a rich vein, mining ${amount} ore.`,
        `Deep in the cave, you extract ${amount} ore.`,
        `Your mining efforts produce ${amount} ore.`
      ]
    };

    const locationMessages = messages[location.type];
    return locationMessages[Math.floor(Math.random() * locationMessages.length)];
  };

  const gather = (): GatheringResult => {
    // Randomly select a location
    const location = locations[Math.floor(Math.random() * locations.length)];
    
    // Calculate random yield within location's range
    const amount = Math.floor(Math.random() * (location.maxYield - location.minYield + 1)) + location.minYield;
    
    // Update game state
    updateStats({ materials: materials + amount });

    return {
      amount,
      type: location.type,
      message: `At the ${location.name}, ${getRandomMessage(location, amount).toLowerCase()}`
    };
  };

  return { gather };
}