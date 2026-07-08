import PropTypes from "prop-types";

import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { useDebounce } from '../hooks/useDebounce'
import { tmdb, posterUrl, isConfigured } from '../services/tmdb'
import { formatYear } from '../utils/helpers'

SearchBar.propTypes = {
  autoFocus: PropTypes.bool,
  onSubmit: PropTypes.func
}

export default function SearchBar({ autoFocus = false, onSubmit }) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [open, setOpen] = useState(false)
  const debounced = useDebounce(query, 350)
  const navigate = useNavigate()
  const wrapperRef = useRef(null)

  useEffect(() => {
    if (!debounced || debounced.trim().length < 2 || !isConfigured) {
      setSuggestions([])
      return
    }
    let cancelled = false
    tmdb
      .search(debounced)
      .then((data) => {
        if (!cancelled) setSuggestions((data.results || []).slice(0, 6))
      })
      .catch(() => !cancelled && setSuggestions([]))
    return () => {
      cancelled = true
    }
  }, [debounced])

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function goToSearch(q) {
    const term = (q ?? query).trim()
    if (!term) return
    setOpen(false)
    if (onSubmit) onSubmit(term)
    navigate(`/search?q=${encodeURIComponent(term)}`)
  }

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          goToSearch()
        }}
        className="relative"
      >
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
        />
        <input
          autoFocus={autoFocus}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search for a movie title…"
          className="w-full pl-10 pr-10 py-2.5 rounded-sm surface-raised text-sm placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-marquee-gold/60"
          aria-label="Search movies"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setSuggestions([])
            }}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-marquee-gold"
          >
            <X size={16} />
          </button>
        )}
      </form>

      {open && suggestions.length > 0 && (
        <ul className="absolute z-30 mt-2 w-full surface rounded-sm shadow-marquee overflow-hidden">
          {suggestions.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => goToSearch(s.title)}
                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-marquee-panel2 text-left transition-colors"
              >
                <img
                  src={posterUrl(s.poster_path, 'w92')}
                  alt=""
                  className="w-8 h-12 object-cover rounded-sm flex-shrink-0 bg-marquee-panel2"
                />
                <span className="flex-1 min-w-0">
                  <span className="block text-sm font-medium truncate">{s.title}</span>
                  <span className="block text-xs text-muted">{formatYear(s.release_date)}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}