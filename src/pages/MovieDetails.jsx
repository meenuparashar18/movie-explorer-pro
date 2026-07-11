import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tmdb, posterUrl, backdropUrl } from "../services/tmdb";
import { formatRuntime, formatRating } from "../utils/helpers";


export default function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const data = await tmdb.details(id);
        setMovie(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="text-white text-center py-20 text-xl">
        Loading...
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-white text-center py-20 text-xl">
        Movie not found.
      </div>
    );
  }

  const trailer = movie?.videos?.results?.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Trailer"
  );

  return (
    <div className="min-h-screen bg-black text-white">

      
      <div
        className="h-[420px] bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${backdropUrl(movie.backdrop_path)})`,
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-10 flex gap-8 items-end h-full">

         
          <img
            src={posterUrl(movie.poster_path)}
            alt={movie.title}
            className="w-72 rounded-xl shadow-2xl"
          />

        
          <div className="pb-5">

            <h1 className="text-5xl font-bold">
              {movie.title}
            </h1>

            <div className="flex gap-6 mt-5 text-lg">

              <span>
                ⭐ {formatRating(movie.vote_average)}
              </span>

              <span>
                📅 {movie.release_date}
              </span>

              <span>
                ⏱ {formatRuntime(movie.runtime)}
              </span>

            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-yellow-600 px-3 py-1 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="mt-6 text-gray-300 leading-8 max-w-3xl">
              {movie.overview}
            </p>
                     
            <div className="mt-8">
              {trailer ? (
               <div className="mt-8">
  {trailer ? (
    <button
      onClick={() => setShowTrailer(!showTrailer)}
      className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition"
    >
      {showTrailer ? "✖ Close Trailer" : "▶ Watch Trailer"}
    </button>
  ) : (
    <button
      disabled
      className="bg-gray-700 text-gray-300 px-6 py-3 rounded-lg cursor-not-allowed"
    >
      Trailer Not Available
    </button>
  )}
</div>
              ) : (
                <button
                  disabled
                  className="bg-gray-700 text-gray-300 px-6 py-3 rounded-lg cursor-not-allowed"
                >
                  Trailer Not Available
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
{showTrailer && trailer && (
  <div className="max-w-6xl mx-auto px-6 py-10">

    <h2 className="text-3xl font-bold mb-6">
      Official Trailer
    </h2>

    <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">

      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
        title="Movie Trailer"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />

    </div>

  </div>
)}
    
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold mb-6">
          Top Cast
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">

          {movie.credits?.cast?.slice(0, 6).map((actor) => (
            <div
              key={actor.id}
              className="text-center"
            >
              <img
                src={
                  actor.profile_path
                    ? posterUrl(actor.profile_path, "w185")
                    : "/placeholder-poster.svg"
                }
                alt={actor.name}
                className="rounded-lg mb-2"
              />

              <p className="font-semibold">
                {actor.name}
              </p>

              <p className="text-sm text-gray-400">
                {actor.character}
              </p>
            </div>
          ))}

        </div>
      </div>

    
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold mb-6">
          Similar Movies
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">

          {movie.similar?.results?.slice(0, 5).map((film) => (
            <div
              key={film.id}
              className="bg-zinc-900 rounded-lg overflow-hidden hover:scale-105 transition"
            >
              <img
                src={posterUrl(film.poster_path)}
                alt={film.title}
                className="w-full"
              />

              <div className="p-3">
                <h3 className="font-semibold line-clamp-1">
                  {film.title}
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  ⭐ {formatRating(film.vote_average)}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
}