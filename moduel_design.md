# Elaria Adventure - Module Design Guide

## Module Purpose and Philosophy

Each module in Elaria Adventure should:
- Interact with exactly one core game state variable
- Provide exactly one primary command
- Handle its own internal complexity
- Integrate only through the command system

## Core Game State Interface

Available state variables that modules can interact with:
- `materials`: number
- `gold`: number
- `health`: number
- `maxHealth`: number
- `damage`: number
- `potions`: number
- `playerName`: string

Access pattern:
```typescript
const gameState = useGameState.getState();
gameState.updateStats({ /* only update your designated variable */ });
```

## Module Structure Template

```
src/modules/[module-name]/
├── commands/              # Command definitions
│   └── moduleCommands.ts  # Single command export
├── types/                 # Type definitions
│   └── module.types.ts    # Module-specific types
├── utils/                 # Internal helper functions
│   └── moduleUtils.ts     # Game logic, calculations
└── index.ts              # Public exports
```

## Command Integration Pattern

```typescript
// commands/moduleCommands.ts
export const createModuleCommands = () => ({
  commandName: {
    name: 'commandName',
    description: 'What this command does',
    execute: () => {
      const gameState = useGameState.getState();
      // Module logic here
      gameState.updateStats({ /* single state update */ });
      return 'Command result message';
    }
  }
});
```

## Module Development Checklist

1. State Integration
   - [ ] Identify single game state variable to modify
   - [ ] Define clear update patterns
   - [ ] Document state dependencies

2. Command Design
   - [ ] Create single, clear command name
   - [ ] Write helpful command description
   - [ ] Define expected output messages

3. Internal Logic
   - [ ] Keep calculations in utils
   - [ ] Define clear types
   - [ ] Handle edge cases
   - [ ] Add randomization where appropriate

4. Testing Considerations
   - [ ] Verify state updates
   - [ ] Check command integration
   - [ ] Test edge cases
   - [ ] Validate output messages

## Example: Materials Module Reference

```typescript
// Good Example
export const createMaterialsCommands = () => ({
  gather: {
    name: 'gather',
    description: 'Search the area for materials to gather',
    execute: () => {
      const gameState = useGameState.getState();
      const amount = calculateGatherAmount();
      gameState.updateStats({ materials: gameState.materials + amount });
      return formatGatherMessage(amount);
    }
  }
});

// Bad Example - Too Complex
export const createBadMaterialsCommands = () => ({
  gather: { /* multiple commands */ },
  gatherWood: { /* specific locations */ },
  checkLocations: { /* additional features */ }
});
```

## Common Pitfalls to Avoid

1. UI Complexity
   - Don't create UI components unless absolutely necessary
   - Stick to text-based interactions
   - Use command system for all player interactions

2. State Management
   - Don't modify multiple state variables
   - Don't create module-specific state
   - Use Zustand's getState() pattern

3. Command Design
   - Don't create multiple commands
   - Don't add command variations
   - Keep command responses simple and clear

4. Module Boundaries
   - Don't integrate with other modules directly
   - Don't modify game logic outside module scope
   - Keep internal logic self-contained

## Module Examples by Game Feature

### Combat Module
- State Variable: `health`
- Command: `fight`
- Internal Logic: Enemy generation, damage calculation
- Output: Combat results

### Shop Module
- State Variable: `gold`
- Command: `buy`
- Internal Logic: Item costs, inventory checks
- Output: Purchase results

### Training Module
- State Variable: `damage`
- Command: `train`
- Internal Logic: Skill progression, cost calculation
- Output: Training results

## Best Practices

1. Command Messages
   - Use varied response messages
   - Include relevant numbers
   - Keep output informative but concise

2. State Updates
   - Validate before updating
   - Update only after successful actions
   - Include clear feedback

3. Random Elements
   - Define clear ranges
   - Balance risk/reward
   - Provide adequate feedback

4. Error Handling
   - Clear insufficient resource messages
   - Helpful command usage hints
   - Graceful failure states

## Integration Testing Checklist

- [ ] Command appears in help
- [ ] State updates correctly
- [ ] Messages are clear
- [ ] Edge cases handled
- [ ] Performance is acceptable

## Future Module Considerations

- Keep modules independent
- Plan for future expansions
- Document integration points
- Consider command interactions