import { useEffect, useState } from "react";
import { movieService } from "@/src/services/movie.service";
import { Movie } from "@/src/types/movie";

export function useHomeMovies() {
  const [popular, setPopular] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);
        setError(null);

        const [
          popularMovies,
          topRatedMovies,
          upcomingMovies,
        ] = await Promise.all([
          movieService.getPopular(),
          movieService.getTopRated(),
          movieService.getUpcoming(),
        ]);

        setPopular(popularMovies);
        setTopRated(topRatedMovies);
        setUpcoming(upcomingMovies);

      } catch (err) {
        console.error("Error cargando películas:", err);
        setError("No se pudieron cargar las películas.");
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  return {
    popular,
    topRated,
    upcoming,
    loading,
    error,
  };
}