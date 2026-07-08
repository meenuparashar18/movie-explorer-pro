import PropTypes from "prop-types";

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'

const FavoritesContext = createContext(null)
const STORAGE_KEY = 'movie-explorer-favorites'

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  const isFavorite = useCallback(
    (id) => favorites.some((m) => m.id === id),
    [favorites]
  )

  const toggleFavorite = useCallback((movie) => {
    setFavorites((prev) => {
      const exists = prev.some((m) => m.id === movie.id)
      if (exists) return prev.filter((m) => m.id !== movie.id)
      return [
        {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
          genre_ids: movie.genre_ids || movie.genres?.map((g) => g.id) || [],
        },
        ...prev,
      ]
    })
  }, [])

  const removeFavorite = useCallback((id) => {
    setFavorites((prev) => prev.filter((m) => m.id !== id))
  }, [])

  const value = useMemo(
    () => ({ favorites, isFavorite, toggleFavorite, removeFavorite }),
    [favorites, isFavorite, toggleFavorite, removeFavorite]
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}
FavoritesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};