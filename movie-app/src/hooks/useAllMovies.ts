import { useEffect, useState } from "react";
import { movieService } from "@/src/services/movie.service";
import { Movie } from "@/src/types/movie";

const PAGE_SIZE=10;

export function useAllMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [from, setFrom] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMovies = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await movieService.getAllMovies(PAGE_SIZE, 0);

      setMovies(data.results);
      setFrom(PAGE_SIZE);

    } catch (error:any) {
        console.error("Error cargando películas:", error);

        const status = error.response?.status;

        if (status === 404) {
          setError("No se encontraron películas");
        } else if (status === 400) {
          setError("Error en los datos");
        } else {
          setError("No se pudieron cargar las películas");
        }
    } finally {
      setLoading(false);
    }
  };

  const loadMoreMovies = async () => {
    if (loadingMore) return;

    try {
      setLoadingMore(true);
      setError(null);

      const data = await movieService.getAllMovies(
        PAGE_SIZE,
        from
      );

      setMovies((prev) => [
        ...prev,
        ...data.results,
      ]);

      setFrom((prev) => prev + PAGE_SIZE);

    } catch (error:any) {
      console.error("Error cargando más películas:", error);

        const status = error.response?.status;

        if (status === 404) {
          setError("No se encontraron películas");
        } else if (status === 400) {
          setError("Error en los datos");
        } else {
          setError("No se pudieron cargar las películas");
        }
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  return {
    movies,
    loading,
    loadingMore,
    error,
    loadMoreMovies,
  };
}