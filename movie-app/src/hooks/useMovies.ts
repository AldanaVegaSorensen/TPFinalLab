import { useEffect, useState } from "react";
import { movieService } from "@/src/services/movie.service";
import { Movie, MovieCategory } from "@/src/types/movie";

export function useMovies(category: MovieCategory) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);
        setError(null);

        const movies = await movieService.getMovies(category);

        setMovies(movies);
      } catch (err) {
        console.error("Error cargando películas:", err);
        setError("No se pudieron cargar las películas.");
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, [category]);

  return {
    movies,
    loading,
    error,
  };
}