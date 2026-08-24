import { useEffect, useState } from "react";

import { historyService } from "@/src/services/history.service";
import { movieService } from "../services/movie.service";

export type HistoryMovie = {
    movie_id: number;
    watched_at: string;
};

export type History = {
    user_id: number;
    movies: HistoryMovie[];
};


export function useHistory() {

    const [history, setHistory] =
        useState<History | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    const [movies, setMovies] = useState<any[]>([]);


    const loadHistory = async () => {

        try {

            setLoading(true);
            setError(null);

            const response =
                await historyService.getHistory();

            const history = response.data.movies;

            const movies = await Promise.all(
                        history.map((item: any) =>
                            movieService.getMovie(item.movie_id)
                        )
                    );


            setHistory(response.data);
            setMovies(movies.map((response) => response.data));

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
    };


    const addMovie = async (
        movieId: number,
        watchedAt: string
    ) => {

        try {

            const response =
                await historyService.addMovie(
                    movieId,
                    watchedAt
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


    useEffect(() => {

        loadHistory();

    }, []);


    return {
        history,
        loading,
        error,
        addMovie,
        reloadHistory: loadHistory,
        movies,
    };
}