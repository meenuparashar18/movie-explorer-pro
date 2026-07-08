export default function Footer() {
  return (
    <footer className="mt-20 surface border-t">
      <div className="sprocket-divider" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-display tracking-widest text-sm text-muted">
          MOVIE EXPLORER <span className="text-marquee-gold">PRO</span>
        </p>
        <p className="text-xs text-muted text-center">
          Movie data and images provided by{' '}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noreferrer"
            className="text-marquee-gold hover:underline"
          >
            TMDB
          </a>
          . This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>
      </div>
    </footer>
  )
}