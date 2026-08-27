// src/hooks/useMovie.ts

import { useEffect, useState } from "react";
import { movieService } from "@/src/services/movie.service";
import { MovieDetails } from "@/src/types/movie";

export function useMovie(id: number) {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await movieService.getMovie(id);
        console.log("Respuesta recibida en frontend:", response.data);
        setMovie(response);
      } catch (error) {
        console.error("Error cargando película:", error);
        setError("No se pudo cargar la película");
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  return {
    movie,
    loading,
    error,
  };
}