import { useEffect, useState } from "react";
import { listService } from "@/src/services/list.service";
import { movieService } from "../services/movie.service";
import { MovieList } from "../types/list";



export function useLists() {

    const [lists, setLists] = useState<MovieList[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    

    const loadLists = async () => {

        try {

            setLoading(true);
            setError(null);

            const response = await listService.getLists();
console.log("Listas a cargar: ",response)
            setLists(response);

        } catch (error: any) {
            console.error("Error cargando listas:", error);

            setError(
              error.response?.message ??
              "No se pudieron cargar las listas"
            );
        } finally {

            setLoading(false);
        }
    };


    const createList = async (name: string) => {

        const response = await listService.create(name);

        setLists(prev => [
            ...prev,
            response
        ]);

        return response;
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
                    ? response
                    : list
            )
        );

        return response;
    };

    const updateList = async (
      listId: number,
      name: string
    ) => {
      try {
        console.log("Datos a enviar: ",listId, name)
        const response = await listService.update(
          listId,
          name
        );

    

    await loadLists();

    return response;
  } catch (error) {
    console.error(
      "Error actualizando lista:",
      error
    );

    throw error;
  }
};

const removeMovieFromList = async (
  listId: number,
  movieId: number
) => {
  try {
    const response = await listService.removeMovie(
      listId,
      movieId
    );

    console.log("Respuesta de eliminar pelicula de lista: ",response)
    await loadLists();

    return response.data;
  } catch (error) {
    console.error(
      "Error eliminando película de la lista:",
      error
    );

    throw error;
  }
};

  const getList = async (
    listId: number,
  )=>{
    try {
        console.log("Datos a enviar: ",listId)
        const response = await listService.getById(listId)

        console.log("Lista recibida: ",response)
    

    return response;
  } catch (error) {
    console.error(
      "Error actualizando lista:",
      error
    );

    throw error;
  }
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
        reloadLists: loadLists,
        updateList,
        removeMovieFromList,
        getList,
    };
}