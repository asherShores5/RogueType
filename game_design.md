# Elaria Adventure Game - Design Document

## Game Overview
Elaria is a text-based RPG adventure game where players explore a fantasy world, fight enemies, gather resources, and upgrade their equipment. The game features a town hub, combat system, and character progression mechanics.

## Core Game Loop
1. Players explore from a main road hub
2. Choose between visiting town, gathering materials, or hunting
3. Engage in combat or resource gathering
4. Return to town to upgrade equipment and buy supplies
5. Progress through increasingly difficult encounters

## Game Systems

### Character System
- **Stats**
  - Health (starts at 100, upgradeable to 150, 200, and 250)
  - Gold (currency for purchases)
  - Base Damage (starts at 10)
  - Potions inventory
  - Materials inventory
  - Maximum Health

### Combat System
#### Player Combat Options
1. Stab Attack
   - 100% accuracy
   - 1x damage multiplier
2. Slash Attack
   - 60% accuracy
   - 2x damage multiplier
3. Power Attack
   - 40% accuracy
   - 4x damage multiplier
4. Heal
   - Consumes 1 health potion
   - Restores 100 HP

#### Enemy Combat System
- Random attack patterns
- Three attack types:
  1. Basic jab (1x damage)
  2. Side slash (1.5x damage)
  3. Blunt strike (2x damage)
- Chance to miss or be blocked
- Enemies drop gold and materials based on their stats

### Weapon Progression System
1. Rusty Sword (Starting weapon - 10 damage)
2. Awkward Cleaver (15 damage)
   - Costs: 100 gold, 50 materials
3. Sharpened Iron (20 damage)
   - Costs: 500 gold, 250 materials
4. Great Warhammer (25 damage)
   - Costs: 2000 gold, 1000 materials
5. Excalibur (50 damage)
   - Costs: 5000 gold, 3000 materials

### Enemy Types
1. Goblin
2. Giant Bat
3. Skeleton
4. Zombie
5. Bandit
6. Wild Wolf
7. Giant Spider
8. Dark Elf
9. Thief
10. Giant Slime

Enemy Attributes:
- Random damage (15-25)
- Random health (50-100)
- Randomly assigned weapon from 10 possible options

### Resource Systems

#### Materials
- Gathered through:
  1. Direct resource gathering (1-5 materials per trip)
  - Mining at quarries (stone)
  - Chopping at lumber mills (wood)
  2. Combat rewards
  - Based on enemy health and damage stats
  - ((health + damage) / 6) / (random 1-3)

#### Gold Economy
- Primary sources:
  1. Combat rewards
     - Based on enemy stats: ((health + damage) / 2) / (random 1-3)
- Death penalty: Loss of 50% current gold

#### Item Shop System
1. Health Potions
   - Single Potion: 35 gold
   - Five Potions: 160 gold
   - Ten Potions: 300 gold
   - Twenty-five Potions: 700 gold

2. Super Health Potions (Permanent max health upgrades)
   - Tier 1: 500 gold (increases to 150 max health)
   - Tier 2: 1000 gold (increases to 200 max health)
   - Tier 3: 2000 gold (increases to 250 max health)

### Location Systems

#### Main Road (Hub)
Options:
1. Travel to town
2. Gather Materials
3. Go on a Hunt
4. Check Progress
5. Save Game

#### Wayfarer Village (Town)
Locations:
1. Shop
   - Buy potions
   - Upgrade weapons
2. Tavern
   - Get tips and lore
   - Random advice system (5 different tips)
3. Return to main road

### Save System
- Manual save system
- Saves:
  - Character name
  - Current health
  - Gold amount
  - Damage stat
  - Potion count
  - Materials count
  - Maximum health

## Technical Features
- Input validation for all user choices
- Clear screen functionality for better readability
- Polymorphic enemy system
- Structured class hierarchy
- File I/O for save system

## Game Balance
- Enemy rewards scale with difficulty
- Upgrade costs increase exponentially
- Health potion bulk purchases offer small discounts
- Combat system balances risk/reward through accuracy-damage trade-offs

/*
src/
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI elements (buttons, cards, etc)
│   └── game/            # Game-specific components
├── contexts/            # React contexts for state management
├── hooks/               # Custom hooks for shared logic
├── modules/             # Feature modules
│   ├── materials/       # Materials feature
│   ├── combat/          # Combat feature
│   ├── inventory/       # Inventory feature
│   ├── shop/           # Shop feature
│   └── character/       # Character feature
├── services/           # Core game services
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
*/
