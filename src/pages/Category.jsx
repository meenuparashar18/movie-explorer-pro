import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import Filters from '../components/Filters'
import MovieGrid from '../components/MovieGrid'
import LoadMore from '../components/LoadMore'
import ApiKeyNotice from '../components/ApiKeyNotice'
import { useInfiniteMovies } from '../hooks/useInfiniteMovies'
import { tmdb, isConfigured } from '../services/tmdb'

const CATEGORY_META = {
  trending: { title: 'Trending', fetcher: tmdb.trending },
  popular: { title: 'Popular Movies', fetcher: tmdb.popular },
  top_rated: { title: 'Top Rated', fetcher: tmdb.topRated },
  upcoming: { title: 'Upcoming', fetcher: tmdb.upcoming },
}

export default function Category() {
  const { type } = useParams()
  const meta = CATEGORY_META[type] || CATEGORY_META.trending
  const [filters, setFilters] = useState({ genre: '', minRating: '', year: '', language: '' })

  const hasActiveFilters = Object.values(filters).some(Boolean)

  const fetchPage = useMemo(() => {
    if (hasActiveFilters) {
      return (page) => tmdb.discover(filters, page)
    }
    return (page) => meta.fetcher(page)
  }, [hasActiveFilters, filters, meta])

  const resetKey = `${type}-${JSON.stringify(filters)}`
  const { movies, loading, error, hasMore, loadMore, sentinelRef } = useInfiniteMovies(
    fetchPage,
    resetKey
  )

  if (!isConfigured) return <ApiKeyNotice />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-display text-3xl sm:text-4xl tracking-wide mb-6">{meta.title}</h1>

      <div className="mb-6">
        <Filters filters={filters} onChange={setFilters} />
      </div>

      <MovieGrid
        movies={movies}
        loading={loading}
        error={error}
        initialLoad={movies.length === 0}
        emptyMessage="No movies match these filters. Try loosening them up."
      />

      <LoadMore hasMore={hasMore} loading={loading} onClick={loadMore} sentinelRef={sentinelRef} />
    </div>
  )
}