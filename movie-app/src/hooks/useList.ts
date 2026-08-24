import { useEffect, useState } from "react";
import { listService } from "@/src/services/list.service";

export type MovieList = {
    id: number;
    user_id: number;
    name: string;
    movies: number[];
};

export function useLists() {

    const [lists, setLists] = useState<MovieList[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadLists = async () => {

        try {

            setLoading(true);
            setError(null);

            const response = await listService.getLists();

            setLists(response.data);

        } catch (error) {

            console.error("Error cargando listas:", error);

            setError("No se pudieron cargar las listas");

        } finally {

            setLoading(false);
        }
    };


    const createList = async (name: string) => {

        const response = await listService.create(name);

        setLists(prev => [
            ...prev,
            response.data
        ]);

        return response.data;
    };


    const addMovieToList = async (
        listId: number,
        movieId: number
    ) => {

        const response = await listService.addMovie(
            listId,
            movieId
        );

        setLists(prev =>
            prev.map(list =>
                list.id === listId
                    ? response.data
                    : list
            )
        );

        return response.data;
    };


    useEffect(() => {
        loadLists();
    }, []);


    return {
        lists,
        loading,
        error,
        createList,
        addMovieToList,
        reloadLists: loadLists
    };
}