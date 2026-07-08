import PropTypes from "prop-types";

import { SlidersHorizontal, RotateCcw } from 'lucide-react'
import { useGenres } from '../context/GenresContext'

Filters.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

const YEARS = Array.from({ length: 45 }, (_, i) => new Date().getFullYear() - i)
const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi' },
  { code: 'es', label: 'Spanish' },
  { code: 'fr', label: 'French' },
  { code: 'ja', label: 'Japanese' },
  { code: 'ko', label: 'Korean' },
  { code: 'de', label: 'German' },
]
const RATINGS = [9, 8, 7, 6, 5]

export default function Filters({ filters, onChange }) {
  const { genres } = useGenres()

  function update(key, value) {
    onChange({ ...filters, [key]: value })
  }

  function reset() {
    onChange({ genre: '', minRating: '', year: '', language: '' })
  }

  const selectClass =
    'w-full text-sm rounded-sm surface-raised px-3 py-2 focus:outline-none focus:ring-1 focus:ring-marquee-gold/60'

  return (
    <div className="surface rounded-md p-4 sm:p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gap-2 font-display text-lg tracking-wide">
          <SlidersHorizontal size={16} className="text-marquee-gold" />
          Filters
        </h2>
        <button
          onClick={reset}
          className="flex items-center gap-1 text-xs text-muted hover:text-marquee-gold transition-colors"
        >
          <RotateCcw size={12} /> Reset
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div>
          <label className="block text-xs text-muted mb-1.5">Genre</label>
          <select
            className={selectClass}
            value={filters.genre}
            onChange={(e) => update('genre', e.target.value)}
          >
            <option value="">All Genres</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-muted mb-1.5">Min Rating</label>
          <select
            className={selectClass}
            value={filters.minRating}
            onChange={(e) => update('minRating', e.target.value)}
          >
            <option value="">Any Rating</option>
            {RATINGS.map((r) => (
              <option key={r} value={r}>
                {r}+
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-muted mb-1.5">Release Year</label>
          <select
            className={selectClass}
            value={filters.year}
            onChange={(e) => update('year', e.target.value)}
          >
            <option value="">Any Year</option>
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-muted mb-1.5">Language</label>
          <select
            className={selectClass}
            value={filters.language}
            onChange={(e) => update('language', e.target.value)}
          >
            <option value="">Any Language</option>
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}