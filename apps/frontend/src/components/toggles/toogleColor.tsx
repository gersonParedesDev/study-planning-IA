import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

// Custom hook useTheme
export function useTheme(storageKey = 'study-theme') {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem(storageKey) as Theme) || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(storageKey, theme);
  }, [theme]);

  const toggle = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return { theme, toggle };
}

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

// Visual component Toggle
export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === 'dark';

  return (
    <button
      role="switch"
      aria-checked={isDark}
      aria-label="Cambiar tema"
      onClick={onToggle}
      style={{
        position: 'relative',
        width: 56,
        height: 30,
        borderRadius: 999,
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        flexShrink: 0,
        background: isDark ? '#3C3489' : '#f7f6f3',
        transition: 'background 0.35s ease',
        outline: 'none',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 3,
          left: 3,
          width: 24,
          height: 24,
          borderRadius: '50%',
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 13,
          transform: isDark ? 'translateX(26px)' : 'translateX(0)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  );
}