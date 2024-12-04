// src/components/ui/Button.tsx
export function Button({ 
  children, 
  onClick, 
  disabled = false 
}: { 
  children: React.ReactNode; 
  onClick: () => void; 
  disabled?: boolean; 
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 border border-[var(--terminal-green)] text-[var(--terminal-green)] 
                 hover:bg-[var(--terminal-green)] hover:text-black transition-colors
                 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      &gt; {children}
    </button>
  );
}