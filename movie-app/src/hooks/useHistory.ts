import { useState, useEffect, useCallback } from "react";
import { historyService } from "@/src/services/history.service";
import { movieService } from "@/src/services/movie.service";
import { History, HistoryMovie } from "@/src/types/history";
import { Movie } from "@/src/types/movie";

export function useHistory() {
    const [history, setHistory] = useState<History | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [movies, setMovies] = useState<Movie[]>([]);

    const loadHistory = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await historyService.getHistory();

            const historyMovies: HistoryMovie[] = response.movies;

            const responses = await Promise.all(
                historyMovies.map((item) =>
                    movieService.getMovie(item.movie_id)
                )
            );

            const moviesData = responses.map(
                (response) => response
            );

            setHistory(response);
            setMovies(moviesData);

        } catch (error: any) {
            console.error(
                "Error cargando historial:",
                error.response?.status,
                error.response?.data
            );

            setError(
                error.response?.data?.message ??
                "No se pudo cargar el historial"
            );

        } finally {
            setLoading(false);
        }
    }, []);

    const addMovie = async (
        movieId: number,
        watchedAt: string
    ) => {
        try {
            const response = await historyService.addMovie(
                movieId,
                watchedAt
            );

            console.log(
                "Se agregó una película:",
                response
            );

            setHistory(response.data);

            return response.data;

        } catch (error) {
            console.error(
                "Error agregando película al historial:",
                error
            );

            throw error;
        }
    };

    const updateHistory = async (
      movieId: number,
      watchedAt: string
  ) => {
      try {
          //Actualiza la fecha de visualizacion de una pelicula
          const response = await historyService.updateMovie(
              movieId,
              watchedAt
          );

          setHistory(response);

          return response;
      } catch (error) {
          console.error(
              "Error actualizando fecha del historial:",
              error
          );
          throw error;
      }
  };


    useEffect(() => {
        loadHistory();
    }, [loadHistory]);

    return {
        history,
        loading,
        error,
        addMovie,
        reloadHistory: loadHistory,
        movies,
        updateHistory
    };
}