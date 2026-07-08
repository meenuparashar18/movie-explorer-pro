import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="w-9 h-9 flex items-center justify-center rounded-sm surface-raised hover:border-marquee-gold/50 transition-colors"
    >
      {isDark ? <Sun size={16} className="text-marquee-gold" /> : <Moon size={16} />}
    </button>
  )
}