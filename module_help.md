# Module Development Guide

## Core Game State Access
All modules interact with the game state through Zustand store. Here's how it works:

```typescript
// src/hooks/useGameState.ts (core game state)
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface GameState {
  // Core stats that any module can access
  health: number;
  maxHealth: number;
  gold: number;
  materials: number;
  damage: number;
  potions: number;
  playerName: string;
}

interface GameStore extends GameState {
  // Actions that modules can use to update state
  updateStats: (stats: Partial<GameState>) => void;
}

export const useGameState = create<GameStore>()(
  immer((set) => ({
    // Initial state
    health: 100,
    maxHealth: 100,
    gold: 100,
    materials: 0,
    damage: 10,
    potions: 8,
    playerName: '',

    // Update method that modules will use
    updateStats: (stats) =>
      set((state) => {
        Object.assign(state, stats);
      }),
  }))
);
```

## Example Module: Materials Gathering

Here's a complete example of how to create a module:

```typescript
// src/modules/materials/types/materials.types.ts
export interface GatheringResult {
  amount: number;
  type: 'stone' | 'wood';
}

// src/modules/materials/hooks/useMaterials.ts
import { useGameState } from '@/hooks/useGameState';

export function useMaterials() {
  const { materials, updateStats } = useGameState();

  const gather = () => {
    const amount = Math.floor(Math.random() * 5) + 1;
    updateStats({ materials: materials + amount });
    return amount;
  };

  return { gather, materials };
}

// src/modules/materials/commands/materialsCommands.ts
import { Command } from '@/types/CommandTypes';
import { useMaterials } from '../hooks/useMaterials';

export const createMaterialsCommands = (): Record<string, Command> => {
  const { gather } = useMaterials();

  return {
    gather: {
      name: 'gather',
      description: 'Gather materials from the surrounding area',
      execute: () => {
        const amount = gather();
        return `You gathered ${amount} materials!`;
      }
    }
  };
};
```

## Adding Module Commands to the Game

```typescript
// src/hooks/useCommands.ts (updated)
import { useState } from 'react';
import { Command } from '@/types/CommandTypes';
import { createMaterialsCommands } from '@/modules/materials/commands/materialsCommands';

export function useCommands() {
  const [commandHistory, setCommandHistory] = useState<string[]>([]);

  // Base commands
  const baseCommands: Record<string, Command> = {
    help: {
      name: 'help',
      description: 'Display available commands',
      execute: () => {
        return Object.values(commands)
          .map(cmd => `${cmd.name} - ${cmd.description}`)
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
    }
  };

  // Combine base commands with module commands
  const commands = {
    ...baseCommands,
    ...createMaterialsCommands()
  };

  // Rest of useCommands implementation...
}
```

## Module Development Guidelines

1. **File Structure**
```
src/modules/[module-name]/
├── commands/         # Module's commands
├── components/       # Any UI components (if needed)
├── hooks/           # Custom hooks for module logic
├── types/           # TypeScript types for the module
└── index.ts         # Exports everything needed
```

2. **State Updates**
- Always use `updateStats` from `useGameState`
- Only update stats your module needs
- Example:
```typescript
const { gold, updateStats } = useGameState();
updateStats({ gold: gold + 10 });
```

3. **Adding Commands**
- Create command definitions in your module
- Export them for integration with useCommands
- Keep command responses clear and consistent

4. **Testing Your Module**
```typescript
// src/modules/[module-name]/__tests__/moduleTests.ts
import { renderHook } from '@testing-library/react-hooks';
import { useYourModule } from '../hooks/useYourModule';

test('module updates state correctly', () => {
  const { result } = renderHook(() => useYourModule());
  // Test your module's functionality
});
```

## Example: Creating a New Module

Let's say you want to create a "shop" module:

1. Create the directory structure:
```bash
mkdir -p src/modules/shop/{commands,hooks,types}
```

2. Define module types:
```typescript
// src/modules/shop/types/shop.types.ts
export interface ShopItem {
  name: string;
  cost: number;
  effect: () => void;
}
```

3. Create module hook:
```typescript
// src/modules/shop/hooks/useShop.ts
import { useGameState } from '@/hooks/useGameState';

export function useShop() {
  const { gold, updateStats } = useGameState();

  const buyItem = (cost: number) => {
    if (gold >= cost) {
      updateStats({ gold: gold - cost });
      return true;
    }
    return false;
  };

  return { buyItem };
}
```

4. Add commands:
```typescript
// src/modules/shop/commands/shopCommands.ts
export const createShopCommands = () => ({
  shop: {
    name: 'shop',
    description: 'View available items in the shop',
    execute: () => 'Available items:\nHealth Potion - 50 gold'
  }
});
```
