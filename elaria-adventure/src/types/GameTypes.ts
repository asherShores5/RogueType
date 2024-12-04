// src/types/GameTypes.ts
export interface PlayerStats {
    health: number;
    maxHealth: number;
    gold: number;
    materials: number;
    damage: number;
    potions: number;
  }
  
  export interface GameState extends PlayerStats {
    playerName: string;
    isLoading: boolean;
    error: string | null;
  }