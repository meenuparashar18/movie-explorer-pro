import PropTypes from "prop-types";

import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import MovieCard from './MovieCard'
import { SkeletonGrid } from './SkeletonCard'

CategoryRow.propTypes = {
  title: PropTypes.string.isRequired,
  movies: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.object,
  viewAllTo: PropTypes.string
}

export default function CategoryRow({ title, movies, loading, error, viewAllTo }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display text-2xl sm:text-3xl tracking-wide">{title}</h2>
        {viewAllTo && (
          <Link
            to={viewAllTo}
            className="flex items-center gap-1 text-sm text-marquee-gold hover:gap-2 transition-all"
          >
            View All <ChevronRight size={16} />
          </Link>
        )}
      </div>

      {error ? (
        <p className="text-muted text-sm">Couldn't load {title.toLowerCase()} right now.</p>
      ) : loading ? (
        <SkeletonGrid count={5} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
          {movies.slice(0, 10).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  )
}
