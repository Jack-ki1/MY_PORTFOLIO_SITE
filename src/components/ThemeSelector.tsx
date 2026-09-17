import React from 'react';
import { Palette, Sun, Moon, Droplets, Flame, Trees, Sparkles, Sunrise } from 'lucide-react';

export type ThemeName = 'default' | 'ocean' | 'sunset' | 'forest' | 'purple' | 'golden';

interface ThemeOption {
  name: ThemeName;
  label: string;
  icon: React.ElementType;
  color: string;
}

const themes: ThemeOption[] = [
  { name: 'default', label: 'Default Green', icon: Sun, color: '#D4F06D' },
  { name: 'ocean', label: 'Ocean Blue', icon: Droplets, color: '#00D9FF' },
  { name: 'sunset', label: 'Sunset Red', icon: Flame, color: '#FF6B6B' },
  { name: 'forest', label: 'Forest Green', icon: Trees, color: '#10B981' },
  { name: 'purple', label: 'Purple Dream', icon: Sparkles, color: '#A855F7' },
  { name: 'golden', label: 'Golden Hour', icon: Sunrise, color: '#F59E0B' },
];

interface ThemeSelectorProps {
  currentTheme: ThemeName;
  isLight: boolean;
  onThemeChange: (theme: ThemeName) => void;
  onModeToggle: () => void;
}

export function ThemeSelector({ currentTheme, isLight, onThemeChange, onModeToggle }: ThemeSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const currentThemeData = themes.find(t => t.name === currentTheme) || themes[0];
  const Icon = currentThemeData.icon;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 rounded-full hover:bg-[var(--border-color)] transition-colors text-foreground flex items-center gap-2"
        aria-label="Select Theme"
      >
        <Icon className="w-5 h-5" style={{ color: currentThemeData.color }} />
      </button>
      
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 top-12 w-64 bg-[var(--card)] border border-[var(--border-color)] rounded-2xl shadow-2xl z-50 overflow-hidden">
            {/* Mode Toggle */}
            <div className="p-4 border-b border-[var(--border-color)]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Mode</span>
                <button
                  onClick={onModeToggle}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg)] border border-[var(--border-color)] hover:border-accent transition-colors"
                >
                  {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  <span className="text-xs font-bold">{isLight ? 'Dark' : 'Light'}</span>
                </button>
              </div>
            </div>
            
            {/* Theme Options */}
            <div className="p-2 max-h-80 overflow-y-auto">
              <div className="text-xs font-bold uppercase tracking-widest text-[var(--muted)] mb-2 px-2">Themes</div>
              {themes.map((theme) => {
                const ThemeIcon = theme.icon;
                const isActive = currentTheme === theme.name;
                
                return (
                  <button
                    key={theme.name}
                    onClick={() => {
                      onThemeChange(theme.name);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-accent/10 border border-accent/30' 
                        : 'hover:bg-[var(--bg)] border border-transparent'
                    }`}
                  >
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${theme.color}20` }}
                    >
                      <ThemeIcon className="w-4 h-4" style={{ color: theme.color }} />
                    </div>
                    <div className="flex-1 text-left">
                      <div className={`text-sm font-bold ${isActive ? 'text-accent' : 'text-foreground'}`}>
                        {theme.label}
                      </div>
                    </div>
                    {isActive && (
                      <div className="w-2 h-2 rounded-full bg-accent" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
