import { useEffect, useState } from "react";
import { movieService } from "@/src/services/movie.service";
import { Movie } from "@/src/types/movie";

export function useAllMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMovies = async (pageToLoad: number) => {
    try {
      if (pageToLoad === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      setError(null);

      const response = await movieService.getAllMovies(pageToLoad);

      setMovies((prevMovies) => {
        if (pageToLoad === 1) {
          return response.results;
        }

        return [...prevMovies, ...response.results];
      });

      setHasMore(pageToLoad < response.total_pages);
      setPage(pageToLoad);
    } catch (err) {
      console.error("Error cargando películas:", err);
      setError("No se pudieron cargar las películas.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadMovies(1);
  }, []);

  const loadMoreMovies = () => {
    if (loadingMore || !hasMore) {
      return;
    }

    loadMovies(page + 1);
  };

  return {
    movies,
    loading,
    loadingMore,
    error,
    loadMoreMovies,
    hasMore,
  };
}