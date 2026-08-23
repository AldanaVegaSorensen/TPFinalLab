import { useEffect, useState } from "react";

import { historyService } from "@/src/services/history.service";

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


    const loadHistory = async () => {

        try {

            setLoading(true);
            setError(null);

            const response =
                await historyService.getHistory();

            setHistory(response.data);

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
    };
}