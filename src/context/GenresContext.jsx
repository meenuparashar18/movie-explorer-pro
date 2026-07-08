import PropTypes from "prop-types";

import { createContext, useContext, useEffect, useState } from 'react'
import { tmdb, isConfigured } from '../services/tmdb'

const GenresContext = createContext({ genres: [] })

export function GenresProvider({ children }) {
  const [genres, setGenres] = useState([])

  useEffect(() => {
    if (!isConfigured) return
    tmdb
      .genres()
      .then((data) => setGenres(data.genres || []))
      .catch(() => setGenres([]))
  }, [])

  return <GenresContext.Provider value={{ genres }}>{children}</GenresContext.Provider>
}

export function useGenres() {
  return useContext(GenresContext)
}

GenresProvider.propTypes = {
  children: PropTypes.node.isRequired,
};