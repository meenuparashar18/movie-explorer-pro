import PropTypes from "prop-types";

import { Link } from 'react-router-dom'
import { Play, Info, Star } from 'lucide-react'
import { backdropUrl } from '../services/tmdb'
import { formatYear, formatRating } from '../utils/helpers'

Hero.propTypes = {
  movie: PropTypes.object
}

export default function Hero({ movie }) {
  if (!movie) {
    return (
      <div className="relative h-[60vh] min-h-[380px] surface skeleton" />
    )
  }

  const backdrop = backdropUrl(movie.backdrop_path)

  return (
    <section className="relative h-[64vh] min-h-[420px] max-h-[640px] overflow-hidden">
      {backdrop && (
        <img
          src={backdrop}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-marquee-bg via-marquee-bg/70 to-marquee-bg/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-marquee-bg/90 via-marquee-bg/30 to-transparent" />
      <div className="absolute inset-0 bg-spotlight" />

      {/* marquee bulb strip */}
      <div className="absolute top-0 left-0 right-0 flex justify-center gap-3 py-2 opacity-70">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-marquee-gold animate-bulb"
            style={{ animationDelay: `${(i % 6) * 0.25}s` }}
          />
        ))}
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-14">
        <span className="chip w-fit mb-4 border-marquee-gold/40">Now Trending</span>
        <h1 className="font-display text-4xl sm:text-6xl tracking-wide max-w-2xl leading-[0.95]">
          {movie.title}
        </h1>
        <div className="flex items-center gap-4 mt-4 text-sm text-muted">
          <span className="flex items-center gap-1 text-marquee-gold">
            <Star size={14} className="fill-marquee-gold" />
            {formatRating(movie.vote_average)}
          </span>
          <span>{formatYear(movie.release_date)}</span>
        </div>
        <p className="mt-4 max-w-xl text-sm sm:text-base text-marquee-cream/90 line-clamp-3">
          {movie.overview}
        </p>
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <Link to={`/movie/${movie.id}`} className="btn-gold">
            <Info size={16} /> View Details
          </Link>
          <a
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + ' trailer')}`}
            target="_blank"
            rel="noreferrer"
            className="btn-outline"
          >
            <Play size={16} /> Watch Trailer
          </a>
        </div>
      </div>
    </section>
  )
}