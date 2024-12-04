# Module Creation Guide for Elaria Adventure

## Overview
This guide will help you create a new game feature module without needing to understand the entire codebase. Each module is self-contained and only interacts with the game through a simple state interface.

## Quick Start Template
1. Create a new directory in `src/modules/[your-module-name]` with this structure:
```
src/modules/[your-module-name]/
├── components/          # UI Components
├── hooks/              # Custom hooks
├── types/              # TypeScript types
└── index.ts            # Public exports
```

## Step-by-Step Module Creation

### 1. Define Your Module's Types
Create `types/[your-module].types.ts`:
```typescript
// Example types for a crafting module
export interface CraftingItem {
  id: string;
  name: string;
  requiredMaterials: {
    materialType: string;
    amount: number;
  }[];
}

// Define what state your module needs
export interface CraftingState {
  recipes: CraftingItem[];
  currentlyCrafting: CraftingItem | null;
}
```

### 2. Create Your Module's Hook
Create `hooks/use[YourModule].ts`:
```typescript
import { useGameState } from '@/hooks/useGameState';
import type { CraftingItem } from '../types/[your-module].types';

export function useCrafting() {
  // Access only the game state you need
  const { materials, updateMaterials } = useGameState();
  
  // Create your module's functions
  const craftItem = (item: CraftingItem) => {
    // Example: Check if player has materials
    const canCraft = item.requiredMaterials.every(mat => 
      materials[mat.materialType] >= mat.amount
    );

    if (canCraft) {
      // Update materials through game state
      item.requiredMaterials.forEach(mat => {
        updateMaterials(mat.materialType, -mat.amount);
      });
      
      return true;
    }
    
    return false;
  };

  // Return only what other components need
  return {
    craftItem
  };
}
```

### 3. Create Your UI Components
Create `components/[YourComponent].tsx`:
```typescript
import { use[YourModule] } from '../hooks/use[YourModule]';

export function CraftingStation() {
  const { craftItem } = use[YourModule]();
  
  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold">Crafting Station</h2>
      {/* Your UI components */}
    </div>
  );
}
```

### 4. Export Your Module
Create `index.ts`:
```typescript
export * from './components/[YourComponent]';
export * from './hooks/use[YourModule]';
export type * from './types/[your-module].types';
```

## Game State Interface
Your module can interact with these core game values:

```typescript
interface GameState {
  // Resources
  materials: Record<string, number>;
  gold: number;
  
  // Character
  health: number;
  maxHealth: number;
  
  // Inventory
  items: Item[];
}

// Available actions
interface GameActions {
  updateMaterials: (type: string, amount: number) => void;
  updateGold: (amount: number) => void;
  updateHealth: (amount: number) => void;
  addItem: (item: Item) => void;
}
```

## Testing Your Module
1. Create test file: `[YourModule].test.tsx`
2. Test in isolation using mock game state:
```typescript
import { render, screen } from '@testing-library/react';
import { [YourComponent] } from './[YourComponent]';

test('component renders correctly', () => {
  render(<[YourComponent] />);
  // Add your tests
});
```

## Best Practices
1. Keep files small (<100 lines)
2. Only access game state through hooks
3. Use TypeScript for better type safety
4. Export only what other modules need
5. Document your module's purpose and usage

## Example Module: Gathering Materials
```typescript
// types/gathering.types.ts
export interface GatheringSpot {
  type: 'wood' | 'stone';
  yield: number;
}

// hooks/useGathering.ts
export function useGathering() {
  const { updateMaterials } = useGameState();
  
  const gather = (spot: GatheringSpot) => {
    const amount = Math.floor(Math.random() * spot.yield) + 1;
    updateMaterials(spot.type, amount);
    return amount;
  };
  
  return { gather };
}

// components/GatheringSpot.tsx
export function GatheringSpot({ type, yield }: GatheringSpot) {
  const { gather } = useGathering();
  
  return (
    <button 
      onClick={() => gather({ type, yield })}
      className="p-2 bg-blue-500 text-white rounded"
    >
      Gather {type}
    </button>
  );
}
```