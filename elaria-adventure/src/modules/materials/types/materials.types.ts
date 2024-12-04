// src/modules/materials/types/materials.types.ts
export interface GatheringLocation {
    name: string;
    description: string;
    minYield: number;
    maxYield: number;
    type: 'wood' | 'stone' | 'ore';
  }
  
  export interface GatheringResult {
    amount: number;
    type: GatheringLocation['type'];
    message: string;
  }