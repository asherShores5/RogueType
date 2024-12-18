// src/types/CommandTypes.ts
export interface Command {
    name: string;
    description: string;
    execute: (args: string[]) => void | string;
  }