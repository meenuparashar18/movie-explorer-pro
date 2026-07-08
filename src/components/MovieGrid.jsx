import PropTypes from "prop-types";

import { Frown, WifiOff } from 'lucide-react'
import MovieCard from './MovieCard'
import { SkeletonGrid } from './SkeletonCard'

MovieGrid.propTypes = {
  movies: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.object,
  emptyMessage: PropTypes.string,
  initialLoad: PropTypes.bool
}

export default function MovieGrid({ movies, loading, error, emptyMessage, initialLoad }) {
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 gap-3">
        <WifiOff size={36} className="text-marquee-crimson" />
        <p className="font-display text-2xl tracking-wide">Signal lost</p>
        <p className="text-muted max-w-sm">
          {error.code === 'NO_API_KEY'
            ? error.message
            : "We couldn't reach the film archive. Check your connection and try again."}
        </p>
      </div>
    )
  }

  if (initialLoad && loading) {
    return <SkeletonGrid />
  }

  if (!loading && (!movies || movies.length === 0)) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 gap-3">
        <Frown size={36} className="text-marquee-gold" />
        <p className="font-display text-2xl tracking-wide">No movies here</p>
        <p className="text-muted max-w-sm">{emptyMessage || 'Try a different search or filter.'}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )}