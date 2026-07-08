import PropTypes from "prop-types";

import { Link } from 'react-router-dom'
import { Star, Heart } from 'lucide-react'
import { posterUrl } from '../services/tmdb'
import { formatYear, formatRating, mapGenreIds } from '../utils/helpers'
import { useFavorites } from '../context/FavoritesContext'
import { useGenres } from '../context/GenresContext'

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired
}

export default function MovieCard({ movie }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const { genres } = useGenres()
  const fav = isFavorite(movie.id)
  const genreNames = mapGenreIds(movie.genre_ids, genres).slice(0, 2)

  return (
    <div className="group relative rounded-md overflow-hidden surface hover:shadow-marquee transition-shadow duration-300 animate-fadeUp">
      <Link to={`/movie/${movie.id}`} className="block">
        <div className="relative aspect-[2/3] overflow-hidden bg-marquee-panel2">
          <img
            src={posterUrl(movie.poster_path)}
            alt={`${movie.title} poster`}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-2 left-2 chip flex items-center gap-1 bg-black/60 border-marquee-gold/30">
            <Star size={12} className="text-marquee-gold fill-marquee-gold" />
            <span>{formatRating(movie.vote_average)}</span>
          </div>
        </div>
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault()
          toggleFavorite(movie)
        }}
        aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
        aria-pressed={fav}
        className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center bg-black/60 hover:bg-black/80 transition-colors z-10"
      >
        <Heart
          size={16}
          className={fav ? 'fill-marquee-crimson text-marquee-crimson' : 'text-white'}
        />
      </button>

      <Link to={`/movie/${movie.id}`} className="block p-3">
        <h3 className="font-semibold text-sm leading-snug line-clamp-1" title={movie.title}>
          {movie.title}
        </h3>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-xs text-muted">{formatYear(movie.release_date)}</span>
          {genreNames.length > 0 && (
            <span className="text-xs text-muted line-clamp-1 max-w-[60%] text-right">
              {genreNames.join(', ')}
            </span>
          )}
        </div>
      </Link>
    </div>
  )
}