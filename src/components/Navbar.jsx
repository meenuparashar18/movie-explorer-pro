import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Clapperboard, Heart, Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import SearchBar from './SearchBar'
import { useFavorites } from '../context/FavoritesContext'

const links = [
  { to: '/', label: 'Home' },
  { to: '/category/trending', label: 'Trending' },
  { to: '/category/popular', label: 'Popular' },
  { to: '/category/top_rated', label: 'Top Rated' },
  { to: '/category/upcoming', label: 'Upcoming' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { favorites } = useFavorites()

  return (
    <header className="sticky top-0 z-40 surface border-b backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <NavLink to="/" className="flex items-center gap-2 flex-shrink-0">
            <Clapperboard size={24} className="text-marquee-gold" />
            <span className="font-display text-xl tracking-widest hidden sm:block">
              MOVIE EXPLORER <span className="text-marquee-gold">PRO</span>
            </span>
          </NavLink>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium rounded-sm transition-colors ${
                    isActive
                      ? 'text-marquee-gold'
                      : 'text-muted hover:text-marquee-cream'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:block flex-1 max-w-xs xl:max-w-sm">
            <SearchBar />
          </div>

          <div className="flex items-center gap-2">
            <NavLink
              to="/favorites"
              className="relative w-9 h-9 flex items-center justify-center rounded-sm surface-raised hover:border-marquee-gold/50 transition-colors"
              aria-label="Favorites"
            >
              <Heart size={16} className="text-marquee-crimson" />
              {favorites.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-marquee-gold text-marquee-bg text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favorites.length > 9 ? '9+' : favorites.length}
                </span>
              )}
            </NavLink>
            <ThemeToggle />
            <button
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-sm surface-raised"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden pb-4 space-y-3 animate-fadeUp">
            <SearchBar />
            <nav className="flex flex-col gap-1">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2 text-sm font-medium rounded-sm transition-colors ${
                      isActive ? 'text-marquee-gold surface-raised' : 'text-muted'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}