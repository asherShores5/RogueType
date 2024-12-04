// src/components/ui/StatDisplay.tsx
import { PlayerStats } from '@/types/GameTypes';
import { useState, useEffect } from 'react';

export function StatDisplay({ stats }: { stats: PlayerStats }) {
  const [visible, setVisible] = useState<boolean[]>(new Array(5).fill(false));

  useEffect(() => {
    visible.forEach((_, index) => {
      setTimeout(() => {
        setVisible(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, index * 200);
    });
  }, []);

  const statItems = [
    { label: 'HEALTH', value: `${stats.health}/${stats.maxHealth}` },
    { label: 'GOLD', value: stats.gold },
    { label: 'MATERIALS', value: stats.materials },
    { label: 'DAMAGE', value: stats.damage },
    { label: 'POTIONS', value: stats.potions }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 p-4 border border-[var(--terminal-green)]">
      {statItems.map((stat, index) => (
        <div key={stat.label} 
             className={`transition-opacity duration-300 ${visible[index] ? 'opacity-100' : 'opacity-0'}`}>
          &gt;  {stat.label}: {stat.value}
        </div>
      ))}
    </div>
  );
}