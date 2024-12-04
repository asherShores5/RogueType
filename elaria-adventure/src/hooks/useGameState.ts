// src/hooks/useGameState.ts
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { GameState, PlayerStats } from '@/types/GameTypes';

export interface GameStore extends GameState {
updateStats: (stats: Partial<PlayerStats>) => void;
setPlayerName: (name: string) => void;
setError: (error: string | null) => void;
}

export const useGameState = create<GameStore>()(
immer((set) => ({
    // Initial state
    playerName: '',
    health: 100,
    maxHealth: 100,
    gold: 100,
    materials: 0,
    damage: 10,
    potions: 8,
    isLoading: false,
    error: null,

    // Actions
    updateStats: (stats) =>
    set((state) => {
        Object.assign(state, stats);
    }),
    setPlayerName: (name) =>
    set((state) => {
        state.playerName = name;
    }),
    setError: (error) =>
    set((state) => {
        state.error = error;
    }),
}))
);
