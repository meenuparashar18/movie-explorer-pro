import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import SearchBar from '../components/SearchBar'
import MovieGrid from '../components/MovieGrid'
import LoadMore from '../components/LoadMore'
import ApiKeyNotice from '../components/ApiKeyNotice'
import { useInfiniteMovies } from '../hooks/useInfiniteMovies'
import { tmdb, isConfigured } from '../services/tmdb'

export default function SearchResults() {
  const [params] = useSearchParams()
  const query = params.get('q') || ''

  const { movies, loading, error, hasMore, loadMore, sentinelRef } = useInfiniteMovies(
    (page) => tmdb.search(query, page),
    query
  )

  if (!isConfigured) return <ApiKeyNotice />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-2 mb-2 text-muted">
        <Search size={18} />
        <span className="text-sm">Search results</span>
      </div>
      <h1 className="font-display text-3xl sm:text-4xl tracking-wide mb-6">
        {query ? `“${query}”` : 'Search'}
      </h1>

      <div className="mb-8 max-w-xl">
        <SearchBar />
      </div>

      {!query ? (
        <p className="text-muted">Start typing above to find a movie.</p>
      ) : (
        <>
          <MovieGrid
            movies={movies}
            loading={loading}
            error={error}
            initialLoad={movies.length === 0}
            emptyMessage={`We couldn't find anything for “${query}”. Try a different title.`}
          />
          <LoadMore
            hasMore={hasMore}
            loading={loading}
            onClick={loadMore}
            sentinelRef={sentinelRef}
          />
        </>
      )}
    </div>
  )
}