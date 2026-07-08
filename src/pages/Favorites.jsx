import { useFavorites } from "../context/FavoritesContext";
import MovieGrid from "../components/MovieGrid";

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-display text-3xl mb-6">My Favorites ❤️</h1>

      {favorites.length === 0 ? (
        <p className="text-muted">No favorite movies yet.</p>
      ) : (
        <MovieGrid
          movies={favorites}
          loading={false}
          error={null}
          initialLoad={false}
        />
      )}
    </div>
  );
}